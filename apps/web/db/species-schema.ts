import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** One link that backs up a claim: where a fact or a conservation status came from. */
export interface SpeciesSource {
  label: string;
  url: string;
}

/**
 * A shark species. The text is written in content/species.ts and loaded here by the seed script
 * (scripts/seed-species.ts), so it can be reviewed in git. See lib/species-rules.ts for the
 * allowed habitat and conservation-status values.
 */
export const species = pgTable(
  "species",
  {
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    /** The page address, for example "goblin-shark". */
    slug: text("slug").notNull(),
    commonName: text("common_name").notNull(),
    scientificName: text("scientific_name").notNull(),
    /** Longest length ever reliably recorded, in centimetres. */
    maxLengthCm: integer("max_length_cm").notNull(),
    habitats: text("habitats").array().notNull(),
    depthMinM: integer("depth_min_m"),
    depthMaxM: integer("depth_max_m"),
    diet: text("diet").notNull(),
    /** IUCN Red List code: LC, NT, VU, EN, CR or DD. */
    iucnStatus: text("iucn_status").notNull(),
    iucnSourceUrl: text("iucn_source_url").notNull(),
    /** The year of the IUCN Red List assessment the status comes from. */
    iucnAssessedYear: integer("iucn_assessed_year").notNull(),
    summary: text("summary").notNull(),
    weirdBit: text("weird_bit").notNull(),
    /** Where the facts came from, as a list of { label, url }. At least one is required. */
    sources: jsonb("sources").$type<SpeciesSource[]>().notNull(),
    imageUrl: text("image_url"),
    imageCredit: text("image_credit"),
  },
  (t) => [
    uniqueIndex("species_slug_key").on(t.slug),
    check("species_max_length_positive", sql`${t.maxLengthCm} > 0`),
    check("species_iucn_status_known", sql`${t.iucnStatus} in ('LC','NT','VU','EN','CR','DD')`),
    check("species_has_a_source", sql`jsonb_array_length(${t.sources}) >= 1`),
  ],
);

/** Which species is featured in which calendar month. */
export const sharkOfTheMonth = pgTable(
  "shark_of_the_month",
  {
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    /** The month as "YYYY-MM", for example "2026-10". One row per month. */
    month: text("month").notNull(),
    speciesId: text("species_id")
      .notNull()
      .references(() => species.id, { onDelete: "restrict" }),
    /** One friendly line shown on the archive and the home page. */
    teaser: text("teaser").notNull(),
  },
  (t) => [
    uniqueIndex("shark_of_the_month_month_key").on(t.month),
    index("shark_of_the_month_species_idx").on(t.speciesId),
    check("shark_of_the_month_month_format", sql`${t.month} ~ '^[0-9]{4}-(0[1-9]|1[0-2])$'`),
  ],
);
