import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { subscribers } from "./mailing-schema";

export const newsletterStatus = pgEnum("newsletter_status", ["draft", "sending", "sent"]);
export const deliveryStatus = pgEnum("delivery_status", [
  "queued",
  "sending",
  "sent",
  "failed",
  "skipped",
]);

/**
 * A newsletter the team writes and sends to everyone subscribed. Only a draft can be edited. Once
 * sending starts, the list of recipients is fixed (see `newsletter_deliveries`).
 */
export const newsletters = pgTable("newsletters", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject: text("subject").notNull(),
  /** The grey preview line some inboxes show beside the subject. */
  preview: text("preview").notNull().default(""),
  /** Plain text. Blank lines separate paragraphs. */
  body: text("body").notNull(),
  buttonLabel: text("button_label"),
  buttonUrl: text("button_url"),
  status: newsletterStatus("status").notNull().default("draft"),
  /** Who wrote it (their email at the time). */
  createdBy: text("created_by").notNull(),
  recipientCount: integer("recipient_count").notNull().default(0),
  sendStartedAt: timestamp("send_started_at", { withTimezone: true }),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

/**
 * One row per person a newsletter goes to, written when sending starts. Each row is claimed before
 * its email goes out, so a repeated or overlapping run can never send the same person twice.
 */
export const newsletterDeliveries = pgTable(
  "newsletter_deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    newsletterId: uuid("newsletter_id")
      .notNull()
      .references(() => newsletters.id, { onDelete: "cascade" }),
    subscriberId: uuid("subscriber_id")
      .notNull()
      .references(() => subscribers.id, { onDelete: "cascade" }),
    status: deliveryStatus("status").notNull().default("queued"),
    error: text("error"),
    claimedAt: timestamp("claimed_at", { withTimezone: true }),
    sentAt: timestamp("sent_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("newsletter_deliveries_uniq").on(t.newsletterId, t.subscriberId),
    index("newsletter_deliveries_status_idx").on(t.newsletterId, t.status),
  ],
);
