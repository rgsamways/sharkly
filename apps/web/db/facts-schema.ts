import { sql } from "drizzle-orm";
import { check, index, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import type { SpeciesSource } from "./species-schema";

/**
 * A short, sourced shark fact, or a "myth or fact?" entry (topic "myths"). The words are written
 * in content/facts.ts and loaded by scripts/seed-species.ts. See lib/fact-rules.ts for the topics
 * and verdicts that are allowed.
 */
export const facts = pgTable(
  "facts",
  {
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    /** The anchor in the address, for example "sharks-are-older-than-trees". */
    slug: text("slug").notNull(),
    /** senses, anatomy, babies, history, records or myths. */
    topic: text("topic").notNull(),
    /** The fact's headline, or for a myth the popular claim. */
    title: text("title").notNull(),
    /** Myths only: a one-sentence answer shown first. */
    shortAnswer: text("short_answer"),
    /** Myths only: "true", "false" or "partly". */
    verdict: text("verdict"),
    body: text("body").notNull(),
    /** Where the entry came from, as a list of { label, url }. At least one is required. */
    sources: jsonb("sources").$type<SpeciesSource[]>().notNull(),
  },
  (t) => [
    uniqueIndex("facts_slug_key").on(t.slug),
    index("facts_topic_idx").on(t.topic),
    check(
      "facts_topic_known",
      sql`${t.topic} in ('senses','anatomy','babies','history','records','myths')`,
    ),
    check("facts_has_a_source", sql`jsonb_array_length(${t.sources}) >= 1`),
    check(
      "facts_myth_shape",
      sql`(${t.topic} = 'myths' and ${t.verdict} in ('true','false','partly') and ${t.shortAnswer} is not null) or (${t.topic} <> 'myths' and ${t.verdict} is null and ${t.shortAnswer} is null)`,
    ),
  ],
);
