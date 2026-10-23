import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Append-only record of what admins did: who, what, to what, and when. Rows are never updated or
 * deleted by the app. `actor_label` keeps the person's email as it was at the time, so the trail
 * still reads correctly if their account changes later.
 */
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorId: text("actor_id"),
    actorLabel: text("actor_label").notNull(),
    /** A short verb phrase such as "product.saved" or "stock.adjusted". */
    action: text("action").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    detail: jsonb("detail").$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_log_created_idx").on(t.createdAt),
    index("audit_log_actor_idx").on(t.actorId, t.createdAt),
  ],
);
