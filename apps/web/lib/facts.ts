import { asc, eq, ne, sql } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { facts } from "@/db/facts-schema";
import { getDb } from "./db";
import { factOfTheDay, type FactTopic } from "./fact-rules";

/*
 * Reads for the facts page and the fact of the day. As with the species reads, callers run
 * `await connection()` inside a Suspense boundary first, so the build never touches the database.
 */

export type Fact = typeof facts.$inferSelect;

export async function listFacts(topic: FactTopic | null): Promise<Fact[]> {
  "use cache";
  cacheLife("hours");
  return getDb()
    .select()
    .from(facts)
    .where(topic ? eq(facts.topic, topic) : undefined)
    .orderBy(asc(facts.topic), asc(facts.slug));
}

/** How many entries each topic has, for the topic choices. */
export async function countFactsByTopic(): Promise<Record<string, number>> {
  "use cache";
  cacheLife("hours");
  const rows = await getDb()
    .select({ topic: facts.topic, n: sql<number>`count(*)::int` })
    .from(facts)
    .groupBy(facts.topic);
  return Object.fromEntries(rows.map((r) => [r.topic, r.n]));
}

/** Today's fact, chosen from the entries that are not myths. Null when there are none. */
export async function getFactOfTheDay(): Promise<Fact | null> {
  "use cache";
  cacheLife("hours");
  const rows = await getDb().select().from(facts).where(ne(facts.topic, "myths"));
  return factOfTheDay(rows);
}
