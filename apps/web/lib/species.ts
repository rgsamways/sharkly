import { and, asc, desc, eq, ilike, lte, or, sql, type SQL } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { sharkOfTheMonth, species } from "@/db/species-schema";
import { getDb } from "./db";
import { currentFeatureMonth, sizeBandRange, type SpeciesFilters } from "./species-rules";

/*
 * Reads for the public species and Shark of the Month pages. Callers run `await connection()`
 * inside a Suspense boundary first, so none of this touches the database while the site builds.
 * The reads are cached for about an hour, which is also how fast a new month shows up.
 */

export type Species = typeof species.$inferSelect;

export interface FeaturedShark {
  month: string;
  teaser: string;
  species: Species;
}

/** Escapes % and _ so a search for "100%" is matched as text, not as a wildcard. */
function likePattern(text: string): string {
  return `%${text.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
}

export async function listSpecies(filters: SpeciesFilters): Promise<Species[]> {
  "use cache";
  cacheLife("hours");

  const conditions: SQL[] = [];
  if (filters.q) {
    const pattern = likePattern(filters.q);
    conditions.push(
      or(ilike(species.commonName, pattern), ilike(species.scientificName, pattern))!,
    );
  }
  if (filters.habitat) {
    conditions.push(sql`${species.habitats} @> ARRAY[${filters.habitat}]::text[]`);
  }
  if (filters.size) {
    const { minCm, maxCm } = sizeBandRange(filters.size);
    conditions.push(sql`${species.maxLengthCm} >= ${minCm}`);
    if (maxCm !== null) conditions.push(sql`${species.maxLengthCm} < ${maxCm}`);
  }
  if (filters.status) conditions.push(eq(species.iucnStatus, filters.status));

  return getDb()
    .select()
    .from(species)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(species.commonName));
}

export async function countSpecies(): Promise<number> {
  "use cache";
  cacheLife("hours");
  const [row] = await getDb()
    .select({ n: sql<number>`count(*)::int` })
    .from(species);
  return row?.n ?? 0;
}

export async function getSpeciesBySlug(slug: string): Promise<Species | null> {
  "use cache";
  cacheLife("hours");
  const [row] = await getDb().select().from(species).where(eq(species.slug, slug)).limit(1);
  return row ?? null;
}

/** Joined rows for the featured months up to and including `upToMonth`, newest first. */
async function featuresUpTo(upToMonth: string, limit?: number): Promise<FeaturedShark[]> {
  const query = getDb()
    .select({ month: sharkOfTheMonth.month, teaser: sharkOfTheMonth.teaser, species })
    .from(sharkOfTheMonth)
    .innerJoin(species, eq(sharkOfTheMonth.speciesId, species.id))
    .where(lte(sharkOfTheMonth.month, upToMonth))
    .orderBy(desc(sharkOfTheMonth.month));
  return limit ? query.limit(limit) : query;
}

/**
 * This month's shark, or the most recent earlier one when this month has none. `isCurrent` says
 * which of the two it is. Null only when no month has ever been featured.
 */
export async function getCurrentFeature(): Promise<
  (FeaturedShark & { isCurrent: boolean }) | null
> {
  "use cache";
  cacheLife("hours");
  const month = currentFeatureMonth();
  const [latest] = await featuresUpTo(month, 1);
  return latest ? { ...latest, isCurrent: latest.month === month } : null;
}

/** Every month that has started, newest first. Months in the future are never listed. */
export async function listArchive(): Promise<FeaturedShark[]> {
  "use cache";
  cacheLife("hours");
  return featuresUpTo(currentFeatureMonth());
}

/** The home page: the current shark plus up to three earlier ones. */
export async function getHomeFeatures(): Promise<{
  current: (FeaturedShark & { isCurrent: boolean }) | null;
  previous: FeaturedShark[];
}> {
  "use cache";
  cacheLife("hours");
  const month = currentFeatureMonth();
  const rows = await featuresUpTo(month, 4);
  const [latest, ...rest] = rows;
  return {
    current: latest ? { ...latest, isCurrent: latest.month === month } : null,
    previous: rest,
  };
}
