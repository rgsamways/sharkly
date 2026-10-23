import { randomUUID } from "node:crypto";
import { eq, sql, and } from "drizzle-orm";
import { sharkVotes } from "@/db/votes-schema";
import { species } from "@/db/species-schema";
import { getDb } from "./db";

/** The slug of the shark this member has voted for in a round, or null if they have not voted. */
export async function getMyVote(userId: string, month: string): Promise<string | null> {
  const [row] = await getDb()
    .select({ slug: species.slug })
    .from(sharkVotes)
    .innerJoin(species, eq(sharkVotes.speciesId, species.id))
    .where(and(eq(sharkVotes.userId, userId), eq(sharkVotes.month, month)))
    .limit(1);
  return row?.slug ?? null;
}

/** How many votes each shark has in a round, keyed by species slug. */
export async function getTally(month: string): Promise<Record<string, number>> {
  const rows = await getDb()
    .select({ slug: species.slug, n: sql<number>`count(*)::int` })
    .from(sharkVotes)
    .innerJoin(species, eq(sharkVotes.speciesId, species.id))
    .where(eq(sharkVotes.month, month))
    .groupBy(species.slug);
  return Object.fromEntries(rows.map((r) => [r.slug, r.n]));
}

/**
 * Records a member's vote, replacing an earlier one in the same round. The database allows only
 * one row per member per round, so this can never give anyone two votes. The caller has already
 * checked that the shark is a candidate in the open round.
 */
export async function saveVote(userId: string, month: string, slug: string): Promise<boolean> {
  const db = getDb();
  const [shark] = await db
    .select({ id: species.id })
    .from(species)
    .where(eq(species.slug, slug))
    .limit(1);
  if (!shark) return false;
  await db
    .insert(sharkVotes)
    .values({ id: randomUUID(), userId, month, speciesId: shark.id })
    .onConflictDoUpdate({
      target: [sharkVotes.userId, sharkVotes.month],
      set: { speciesId: shark.id, updatedAt: sql`now()` },
    });
  return true;
}
