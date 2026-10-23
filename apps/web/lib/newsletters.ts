import { and, asc, desc, eq, inArray, lt, sql } from "drizzle-orm";
import { newsletterDeliveries, newsletters } from "@/db/newsletter-schema";
import { subscribers } from "@/db/mailing-schema";
import type { AppDb } from "@/db/schema";

/**
 * Writing and sending newsletters. Sending is built to be safe to interrupt and repeat: the
 * recipients are fixed when sending starts, each one is claimed before its email goes out, and a
 * person who unsubscribes part-way through is skipped.
 */

/** A problem the writer can fix, with a plain message. */
export class NewsletterError extends Error {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = "NewsletterError";
  }
}

export type NewsletterStatus = "draft" | "sending" | "sent";

export interface NewsletterInput {
  id?: string;
  subject: string;
  preview: string;
  body: string;
  buttonLabel: string;
  buttonUrl: string;
  /** Their email, kept as the author of a new draft. */
  author: string;
}

const MAX_BODY = 20_000;

/** Checks and tidies what the writer typed. */
export function cleanNewsletter(input: Omit<NewsletterInput, "id" | "author">) {
  const subject = input.subject.trim();
  if (subject === "") throw new NewsletterError("Write a subject line", "subject");
  if (subject.length > 150)
    throw new NewsletterError("Keep the subject under 150 characters", "subject");
  if (/[\r\n]/.test(subject)) throw new NewsletterError("The subject must be one line", "subject");
  const preview = input.preview.trim();
  if (preview.length > 200)
    throw new NewsletterError("Keep the preview under 200 characters", "preview");
  if (/[\r\n]/.test(preview)) throw new NewsletterError("The preview must be one line", "preview");
  const body = input.body.replace(/\r\n/g, "\n").trim();
  if (body === "") throw new NewsletterError("Write the message", "body");
  if (body.length > MAX_BODY) throw new NewsletterError("That message is too long", "body");

  const label = input.buttonLabel.trim();
  const url = input.buttonUrl.trim();
  let buttonLabel: string | null = null;
  let buttonUrl: string | null = null;
  if (label !== "" || url !== "") {
    if (label === "") throw new NewsletterError("Give the button a label", "buttonLabel");
    if (url === "") throw new NewsletterError("Give the button a link", "buttonUrl");
    if (label.length > 40)
      throw new NewsletterError("Keep the button label under 40 characters", "buttonLabel");
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new NewsletterError(
        "The button link must be a full web address, like https://sharkly.example/sharks",
        "buttonUrl",
      );
    }
    if (parsed.protocol !== "https:") {
      throw new NewsletterError("The button link must start with https://", "buttonUrl");
    }
    buttonLabel = label;
    buttonUrl = parsed.toString();
  }
  return { subject, preview, body, buttonLabel, buttonUrl };
}

export interface NewsletterRow {
  id: string;
  subject: string;
  status: NewsletterStatus;
  recipientCount: number;
  createdBy: string;
  createdAt: Date;
  sentAt: Date | null;
}

export async function listNewsletters(db: AppDb): Promise<NewsletterRow[]> {
  return db
    .select({
      id: newsletters.id,
      subject: newsletters.subject,
      status: newsletters.status,
      recipientCount: newsletters.recipientCount,
      createdBy: newsletters.createdBy,
      createdAt: newsletters.createdAt,
      sentAt: newsletters.sentAt,
    })
    .from(newsletters)
    .orderBy(desc(newsletters.createdAt), desc(newsletters.id));
}

export interface DeliveryCounts {
  queued: number;
  sending: number;
  sent: number;
  failed: number;
  skipped: number;
}

export interface NewsletterDetail extends NewsletterRow {
  preview: string;
  body: string;
  buttonLabel: string | null;
  buttonUrl: string | null;
  sendStartedAt: Date | null;
  counts: DeliveryCounts;
}

export async function getNewsletter(db: AppDb, id: string): Promise<NewsletterDetail | null> {
  const [row] = await db.select().from(newsletters).where(eq(newsletters.id, id));
  if (!row) return null;
  const grouped = await db
    .select({ status: newsletterDeliveries.status, n: sql<number>`count(*)::int` })
    .from(newsletterDeliveries)
    .where(eq(newsletterDeliveries.newsletterId, id))
    .groupBy(newsletterDeliveries.status);
  const counts: DeliveryCounts = { queued: 0, sending: 0, sent: 0, failed: 0, skipped: 0 };
  for (const g of grouped) counts[g.status] = g.n;
  return { ...row, counts };
}

/** Creates a draft or updates one. Only a draft can be changed. */
export async function saveNewsletter(
  db: AppDb,
  input: NewsletterInput,
): Promise<{ newsletterId: string }> {
  const clean = cleanNewsletter(input);
  if (input.id) {
    const rows = await db
      .update(newsletters)
      .set(clean)
      .where(and(eq(newsletters.id, input.id), eq(newsletters.status, "draft")))
      .returning({ id: newsletters.id });
    if (rows.length === 0) {
      throw new NewsletterError("This newsletter has already been sent, so it can't be changed.");
    }
    return { newsletterId: input.id };
  }
  const [row] = await db
    .insert(newsletters)
    .values({ ...clean, createdBy: input.author })
    .returning({ id: newsletters.id });
  return { newsletterId: row!.id };
}

/** Deletes a draft. A newsletter that has started sending is kept as a record. */
export async function deleteDraft(db: AppDb, id: string): Promise<string | null> {
  const rows = await db
    .delete(newsletters)
    .where(and(eq(newsletters.id, id), eq(newsletters.status, "draft")))
    .returning({ subject: newsletters.subject });
  if (rows.length === 0) {
    throw new NewsletterError(
      "Only a draft can be deleted. Sent newsletters are kept as a record.",
    );
  }
  return rows[0]!.subject;
}

/** How many people a newsletter would go to right now. */
export async function countSubscribed(db: AppDb): Promise<number> {
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(subscribers)
    .where(eq(subscribers.status, "subscribed"));
  return row?.n ?? 0;
}

/**
 * Starts sending: fixes the recipient list (everyone subscribed right now) and moves the
 * newsletter to "sending". Nothing is emailed here; `sendBatch` does that.
 */
export async function startSending(
  db: AppDb,
  input: { id: string; now: Date },
): Promise<{ recipients: number }> {
  return db.transaction(async (tx) => {
    const [n] = await tx
      .select()
      .from(newsletters)
      .where(eq(newsletters.id, input.id))
      .for("update");
    if (!n) throw new NewsletterError("That newsletter no longer exists.");
    if (n.status !== "draft") throw new NewsletterError("This newsletter has already been sent.");

    const inserted = (
      await tx.execute<{ id: string }>(sql`
        insert into newsletter_deliveries (newsletter_id, subscriber_id)
        select ${n.id}::uuid, s.id from subscribers s where s.status = 'subscribed'
        on conflict do nothing
        returning id`)
    ).rows;
    if (inserted.length === 0) {
      throw new NewsletterError("Nobody is subscribed yet, so there is no one to send to.");
    }
    await tx
      .update(newsletters)
      .set({ status: "sending", sendStartedAt: input.now, recipientCount: inserted.length })
      .where(eq(newsletters.id, n.id));
    return { recipients: inserted.length };
  });
}

export interface DeliveryJob {
  deliveryId: string;
  newsletterId: string;
  subscriberId: string;
  email: string;
}

export interface BatchResult {
  sent: number;
  failed: number;
  skipped: number;
  /** True when nothing is left to send for any newsletter that was being sent. */
  finished: boolean;
}

/** A claim that never finished (the server stopped mid-send) is given up on after this long. */
const STALE_CLAIM_MS = 10 * 60_000;

/**
 * Sends up to `limit` queued emails, one at a time, for one newsletter (or whichever are being
 * sent). `send` does the actual delivery and throws on failure. Safe to run twice at once: each
 * row is claimed first. When nothing is left, the newsletter is marked sent.
 */
export async function sendBatch(
  db: AppDb,
  input: {
    newsletterId?: string;
    limit: number;
    now: Date;
    send: (job: DeliveryJob) => Promise<void>;
  },
): Promise<BatchResult> {
  const scope = input.newsletterId
    ? eq(newsletterDeliveries.newsletterId, input.newsletterId)
    : undefined;

  // Give up on claims left behind by a crash. They might have been sent, so they are marked
  // failed (not queued again) and a person decides whether to retry.
  await db
    .update(newsletterDeliveries)
    .set({ status: "failed", error: "Interrupted before it was confirmed sent" })
    .where(
      and(
        scope,
        eq(newsletterDeliveries.status, "sending"),
        lt(newsletterDeliveries.claimedAt, new Date(input.now.getTime() - STALE_CLAIM_MS)),
      ),
    );

  const result: BatchResult = { sent: 0, failed: 0, skipped: 0, finished: false };
  const touched = new Set<string>();

  for (let i = 0; i < input.limit; i += 1) {
    const claimed = await db.execute<{
      id: string;
      newsletter_id: string;
      subscriber_id: string;
    }>(sql`
      update newsletter_deliveries d
         set status = 'sending', claimed_at = ${input.now}
       where d.id = (
         select q.id from newsletter_deliveries q
          join newsletters n on n.id = q.newsletter_id
          where q.status = 'queued' and n.status = 'sending'
            ${input.newsletterId ? sql`and q.newsletter_id = ${input.newsletterId}` : sql``}
          order by q.id
          limit 1
          for update of q skip locked)
      returning d.id, d.newsletter_id, d.subscriber_id
    `);
    const row = claimed.rows[0];
    if (!row) break;
    touched.add(row.newsletter_id);

    const [sub] = await db.select().from(subscribers).where(eq(subscribers.id, row.subscriber_id));
    if (!sub || sub.status !== "subscribed") {
      await db
        .update(newsletterDeliveries)
        .set({ status: "skipped", error: "No longer subscribed" })
        .where(eq(newsletterDeliveries.id, row.id));
      result.skipped += 1;
      continue;
    }
    try {
      await input.send({
        deliveryId: row.id,
        newsletterId: row.newsletter_id,
        subscriberId: sub.id,
        email: sub.email,
      });
      await db
        .update(newsletterDeliveries)
        .set({ status: "sent", sentAt: input.now, error: null })
        .where(eq(newsletterDeliveries.id, row.id));
      result.sent += 1;
    } catch (error) {
      await db
        .update(newsletterDeliveries)
        .set({
          status: "failed",
          error: (error instanceof Error ? error.message : String(error)).slice(0, 300),
        })
        .where(eq(newsletterDeliveries.id, row.id));
      result.failed += 1;
    }
  }

  // A newsletter with nothing queued or in progress is done.
  const sending = await db
    .select({ id: newsletters.id })
    .from(newsletters)
    .where(
      and(
        eq(newsletters.status, "sending"),
        input.newsletterId ? eq(newsletters.id, input.newsletterId) : undefined,
      ),
    )
    .orderBy(asc(newsletters.createdAt));
  let anyLeft = false;
  for (const { id } of sending) {
    const [open] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(newsletterDeliveries)
      .where(
        and(
          eq(newsletterDeliveries.newsletterId, id),
          inArray(newsletterDeliveries.status, ["queued", "sending"]),
        ),
      );
    if ((open?.n ?? 0) === 0) {
      await db
        .update(newsletters)
        .set({ status: "sent", sentAt: input.now })
        .where(and(eq(newsletters.id, id), eq(newsletters.status, "sending")));
    } else {
      anyLeft = true;
    }
  }
  result.finished = !anyLeft;
  return result;
}

/** Puts failed deliveries back in the queue, for a person to retry after fixing the cause. */
export async function retryFailed(db: AppDb, id: string): Promise<number> {
  return db.transaction(async (tx) => {
    const rows = await tx
      .update(newsletterDeliveries)
      .set({ status: "queued", error: null, claimedAt: null })
      .where(
        and(eq(newsletterDeliveries.newsletterId, id), eq(newsletterDeliveries.status, "failed")),
      )
      .returning({ id: newsletterDeliveries.id });
    if (rows.length > 0) {
      await tx
        .update(newsletters)
        .set({ status: "sending", sentAt: null })
        .where(eq(newsletters.id, id));
    }
    return rows.length;
  });
}
