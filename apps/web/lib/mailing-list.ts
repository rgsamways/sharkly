import { createHmac, timingSafeEqual } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { subscribers } from "@/db/mailing-schema";
import type { AppDb } from "@/db/schema";

/* ---------- links in emails: signed, so nothing needs to be stored ---------- */

export type TokenPurpose = "confirm" | "unsubscribe";

const sign = (secret: string, payload: string) =>
  createHmac("sha256", createHmac("sha256", secret).update("mailing-list-v1").digest())
    .update(payload)
    .digest("base64url");

/**
 * A link token for one subscriber and one purpose. Confirm links expire; unsubscribe links must
 * keep working forever (anyone must always be able to leave).
 */
export function createToken(
  secret: string,
  input: { subscriberId: string; purpose: TokenPurpose; expiresAtMs: number | null },
): string {
  const payload = [input.subscriberId, input.purpose, input.expiresAtMs ?? "never"].join(".");
  return `${Buffer.from(payload).toString("base64url")}.${sign(secret, payload)}`;
}

/** The subscriber id inside a token, if it is genuine, unexpired, and for the expected purpose. */
export function readToken(
  secret: string,
  token: string,
  expected: TokenPurpose,
  nowMs: number,
): string | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || token.split(".").length !== 2) return null;
  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }
  const good = Buffer.from(sign(secret, payload));
  const given = Buffer.from(signature);
  if (good.length !== given.length || !timingSafeEqual(good, given)) return null;

  const [subscriberId, purpose, expires] = payload.split(".");
  if (!subscriberId || purpose !== expected) return null;
  if (expires !== "never" && !(Number(expires) > nowMs)) return null;
  return subscriberId;
}

/** True when a link token is genuine, unexpired and for the right purpose, as of right now. */
export function tokenIsValid(secret: string, token: string, expected: TokenPurpose): boolean {
  return token !== "" && readToken(secret, token, expected, Date.now()) !== null;
}

export const CONFIRM_LINK_DAYS = 7;

/* ---------- the list itself ---------- */

export type SubscribeOutcome =
  { outcome: "needs_confirmation"; id: string; email: string } | { outcome: "already_subscribed" };

const normalise = (email: string) => email.trim().toLowerCase();

/**
 * Records a sign-up request. A new, pending or previously unsubscribed address goes to "pending"
 * with fresh consent and needs a confirmation email. An address that is already subscribed is left
 * alone. Nobody becomes "subscribed" here.
 */
export async function requestSubscription(
  db: AppDb,
  input: { email: string; source: string; consentText: string; now: Date },
): Promise<SubscribeOutcome> {
  const email = normalise(input.email);

  const tryUpdate = async (): Promise<SubscribeOutcome | null> => {
    const [existing] = await db
      .select()
      .from(subscribers)
      .where(sql`lower(${subscribers.email}) = ${email}`);
    if (!existing) return null;
    if (existing.status === "subscribed") return { outcome: "already_subscribed" };
    await db
      .update(subscribers)
      .set({
        status: "pending",
        source: input.source,
        consentText: input.consentText,
        consentAt: input.now,
        unsubscribedAt: null,
      })
      .where(eq(subscribers.id, existing.id));
    return { outcome: "needs_confirmation", id: existing.id, email };
  };

  const updated = await tryUpdate();
  if (updated) return updated;

  try {
    const [row] = await db
      .insert(subscribers)
      .values({
        email,
        source: input.source,
        consentText: input.consentText,
        consentAt: input.now,
      })
      .returning({ id: subscribers.id });
    return { outcome: "needs_confirmation", id: row!.id, email };
  } catch (error) {
    // Two sign-ups for the same address at the same moment: the second one finds the first.
    const again = await tryUpdate();
    if (again) return again;
    throw error;
  }
}

/** Turns a pending sign-up into a subscription. Safe to repeat. */
export async function confirmSubscription(
  db: AppDb,
  input: { id: string; now: Date },
): Promise<"confirmed" | "already_subscribed" | "not_found"> {
  const [row] = await db.select().from(subscribers).where(eq(subscribers.id, input.id));
  if (!row) return "not_found";
  if (row.status === "subscribed") return "already_subscribed";
  if (row.status === "unsubscribed") return "not_found"; // they left since; they must sign up again
  await db
    .update(subscribers)
    .set({ status: "subscribed", confirmedAt: input.now })
    .where(eq(subscribers.id, input.id));
  return "confirmed";
}

/** Removes someone from the list. Safe to repeat, and works for any status. */
export async function unsubscribe(
  db: AppDb,
  input: { id: string; now: Date },
): Promise<"unsubscribed" | "not_found"> {
  const rows = await db
    .update(subscribers)
    .set({ status: "unsubscribed", unsubscribedAt: input.now })
    .where(eq(subscribers.id, input.id))
    .returning({ id: subscribers.id });
  return rows.length > 0 ? "unsubscribed" : "not_found";
}
