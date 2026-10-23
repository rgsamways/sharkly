/**
 * Copies content/species.ts and content/facts.ts into the database. Safe to run again: species are matched by slug and
 * months by month, so a second run changes nothing unless the content changed.
 *
 *   pnpm --filter @sharkly/web seed:content
 *
 * It reads DATABASE_URL (from apps/web/.env.local, or the environment) and refuses to load any
 * entry that is missing something the site relies on, such as a source link.
 */
import { randomUUID } from "node:crypto";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { factEntries } from "../content/facts";
import { featuredMonths, speciesEntries } from "../content/species";
import { facts } from "../db/facts-schema";
import { sharkOfTheMonth, species } from "../db/species-schema";
import { FACT_TOPICS, VERDICTS } from "../lib/fact-rules";
import { HABITATS, IUCN_STATUSES } from "../lib/species-rules";

function check(): string[] {
  const problems: string[] = [];
  const slugs = new Set<string>();
  for (const s of speciesEntries) {
    const where = s.slug || "(no slug)";
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.slug))
      problems.push(`${where}: slug must be kebab-case`);
    if (slugs.has(s.slug)) problems.push(`${where}: duplicate slug`);
    slugs.add(s.slug);
    if (s.sources.length < 1) problems.push(`${where}: needs at least one source link`);
    for (const src of s.sources) {
      if (!/^https:\/\//.test(src.url))
        problems.push(`${where}: source "${src.label}" needs an https link`);
    }
    if (!/^https:\/\/www\.iucnredlist\.org\//.test(s.iucnSourceUrl)) {
      problems.push(`${where}: iucnSourceUrl must be an iucnredlist.org link`);
    }
    if (!IUCN_STATUSES.some((x) => x.value === s.iucnStatus))
      problems.push(`${where}: unknown status`);
    for (const h of s.habitats) {
      if (!HABITATS.some((x) => x.value === h)) problems.push(`${where}: unknown habitat "${h}"`);
    }
    if (s.habitats.length === 0) problems.push(`${where}: needs a habitat`);
    if (!(s.maxLengthCm > 0)) problems.push(`${where}: maxLengthCm must be positive`);
    if (s.depthMinM !== undefined && s.depthMaxM !== undefined && s.depthMinM > s.depthMaxM) {
      problems.push(`${where}: depth range is backwards`);
    }
    if (!s.summary.trim() || !s.weirdBit.trim())
      problems.push(`${where}: summary and weirdBit are required`);
  }
  const months = new Set<string>();
  for (const m of featuredMonths) {
    if (!/^[0-9]{4}-(0[1-9]|1[0-2])$/.test(m.month))
      problems.push(`${m.month}: month must be YYYY-MM`);
    if (months.has(m.month)) problems.push(`${m.month}: month listed twice`);
    months.add(m.month);
    if (!slugs.has(m.slug)) problems.push(`${m.month}: no species with slug "${m.slug}"`);
  }
  const factSlugs = new Set<string>();
  for (const f of factEntries) {
    const where = f.slug || "(no slug)";
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(f.slug))
      problems.push(`${where}: slug must be kebab-case`);
    if (factSlugs.has(f.slug)) problems.push(`${where}: duplicate fact slug`);
    factSlugs.add(f.slug);
    if (!FACT_TOPICS.some((t) => t.value === f.topic)) problems.push(`${where}: unknown topic`);
    if (f.sources.length < 1) problems.push(`${where}: needs at least one source link`);
    for (const src of f.sources) {
      if (!/^https:\/\//.test(src.url))
        problems.push(`${where}: source "${src.label}" needs an https link`);
    }
    if (!f.title.trim() || !f.body.trim()) problems.push(`${where}: title and body are required`);
    if (f.topic === "myths") {
      if (!f.verdict || !(f.verdict in VERDICTS)) problems.push(`${where}: a myth needs a verdict`);
      if (!f.shortAnswer?.trim()) problems.push(`${where}: a myth needs a shortAnswer`);
    } else if (f.verdict || f.shortAnswer) {
      problems.push(`${where}: only myths have a verdict or shortAnswer`);
    }
  }
  return problems;
}

async function main() {
  const problems = check();
  if (problems.length > 0) {
    console.error(`Not loading anything. Fix these first:\n  ${problems.join("\n  ")}`);
    process.exit(1);
  }
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const pool = new pg.Pool({ connectionString: url, max: 1 });
  const db = drizzle(pool);
  try {
    await db.transaction(async (tx) => {
      for (const s of speciesEntries) {
        const values = {
          slug: s.slug,
          commonName: s.commonName,
          scientificName: s.scientificName,
          maxLengthCm: s.maxLengthCm,
          habitats: s.habitats,
          depthMinM: s.depthMinM ?? null,
          depthMaxM: s.depthMaxM ?? null,
          diet: s.diet,
          iucnStatus: s.iucnStatus,
          iucnSourceUrl: s.iucnSourceUrl,
          iucnAssessedYear: s.iucnAssessedYear,
          summary: s.summary,
          weirdBit: s.weirdBit,
          sources: s.sources,
        };
        await tx
          .insert(species)
          .values({ id: randomUUID(), ...values })
          .onConflictDoUpdate({ target: species.slug, set: { ...values, updatedAt: sql`now()` } });
      }
      const rows = await tx.select({ id: species.id, slug: species.slug }).from(species);
      const idBySlug = new Map(rows.map((r) => [r.slug, r.id]));
      for (const m of featuredMonths) {
        const speciesId = idBySlug.get(m.slug)!;
        await tx
          .insert(sharkOfTheMonth)
          .values({ id: randomUUID(), month: m.month, speciesId, teaser: m.teaser })
          .onConflictDoUpdate({
            target: sharkOfTheMonth.month,
            set: { speciesId, teaser: m.teaser },
          });
      }
    });
    await db.transaction(async (tx) => {
      for (const f of factEntries) {
        const values = {
          slug: f.slug,
          topic: f.topic,
          title: f.title,
          shortAnswer: f.shortAnswer ?? null,
          verdict: f.verdict ?? null,
          body: f.body,
          sources: f.sources,
        };
        await tx
          .insert(facts)
          .values({ id: randomUUID(), ...values })
          .onConflictDoUpdate({ target: facts.slug, set: { ...values, updatedAt: sql`now()` } });
      }
    });
    const [{ s }] = (await pool.query("select count(*)::int as s from species")).rows;
    const [{ f }] = (await pool.query("select count(*)::int as f from facts")).rows;
    const [{ m }] = (await pool.query("select count(*)::int as m from shark_of_the_month")).rows;
    console.log(`Done. species: ${s}, featured months: ${m}, facts: ${f}.`);
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
