import { and, desc, eq, ilike, sql, type SQL } from "drizzle-orm";
import { subscribers } from "@/db/mailing-schema";
import type { AppDb } from "@/db/schema";

export const SUBSCRIBER_FILTERS = ["all", "subscribed", "pending", "unsubscribed"] as const;
export type SubscriberFilter = (typeof SUBSCRIBER_FILTERS)[number];

export interface SubscriberRow {
  id: string;
  email: string;
  status: "pending" | "subscribed" | "unsubscribed";
  source: string;
  consentText: string;
  consentAt: Date;
  confirmedAt: Date | null;
  unsubscribedAt: Date | null;
  createdAt: Date;
}

/** Mailing list members, newest sign-ups first. Search matches part of the email. */
export async function listSubscribers(
  db: AppDb,
  input: { filter?: SubscriberFilter; search?: string; limit?: number; offset?: number } = {},
): Promise<SubscriberRow[]> {
  const conditions: SQL[] = [];
  if (input.filter && input.filter !== "all") {
    conditions.push(eq(subscribers.status, input.filter));
  }
  const term = input.search?.trim();
  if (term) {
    conditions.push(ilike(subscribers.email, `%${term.replace(/[\\%_]/g, (c) => `\\${c}`)}%`));
  }
  return db
    .select()
    .from(subscribers)
    .where(and(...conditions))
    .orderBy(desc(subscribers.createdAt), desc(subscribers.id))
    .limit(Math.min(input.limit ?? 50, 200))
    .offset(input.offset ?? 0);
}

export async function getSubscriber(db: AppDb, id: string): Promise<SubscriberRow | null> {
  const [row] = await db.select().from(subscribers).where(eq(subscribers.id, id));
  return row ?? null;
}

export interface SubscriberCounts {
  subscribed: number;
  pending: number;
  unsubscribed: number;
}

export async function countSubscribers(db: AppDb): Promise<SubscriberCounts> {
  const rows = await db
    .select({ status: subscribers.status, n: sql<number>`count(*)::int` })
    .from(subscribers)
    .groupBy(subscribers.status);
  const counts: SubscriberCounts = { subscribed: 0, pending: 0, unsubscribed: 0 };
  for (const r of rows) counts[r.status] = r.n;
  return counts;
}
