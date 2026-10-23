import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const subscriberStatus = pgEnum("subscriber_status", [
  "pending",
  "subscribed",
  "unsubscribed",
]);

/**
 * Mailing list subscribers, with the proof of consent kept for each: when they asked, where from,
 * and the exact wording they agreed to. A person is only "subscribed" after confirming from their
 * inbox (double opt-in); until then they are "pending" and get no marketing email.
 */
export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    status: subscriberStatus("status").notNull().default("pending"),
    /** Where they signed up, for example "footer". */
    source: text("source").notNull(),
    /** The consent wording shown next to the checkbox when they signed up. */
    consentText: text("consent_text").notNull(),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [uniqueIndex("subscribers_email_lower_uniq").on(sql`lower(${t.email})`)],
);
