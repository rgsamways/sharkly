import { sql } from "drizzle-orm";
import { check, index, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { species } from "./species-schema";

/**
 * A member's vote for next-up Shark of the Month. One row per member per round, enforced by the
 * unique index, so changing a vote replaces the row. Deleted with the account.
 */
export const sharkVotes = pgTable(
  "shark_votes",
  {
    id: text("id").primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    /** The round, as the month being decided: "YYYY-MM". */
    month: text("month").notNull(),
    speciesId: text("species_id")
      .notNull()
      .references(() => species.id, { onDelete: "restrict" }),
  },
  (t) => [
    uniqueIndex("shark_votes_user_month_key").on(t.userId, t.month),
    index("shark_votes_month_species_idx").on(t.month, t.speciesId),
    check("shark_votes_month_format", sql`${t.month} ~ '^[0-9]{4}-(0[1-9]|1[0-2])$'`),
  ],
);
