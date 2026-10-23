import { auditLog } from "@/db/audit-schema";
import type { AppDb } from "@/db/schema";

export interface AuditEntry {
  actor: { id: string; email: string };
  action: string;
  targetType?: string;
  targetId?: string;
  detail?: Record<string, unknown>;
}

/** Writes one line to the audit trail. Call it after the change it describes has succeeded. */
export async function recordAudit(db: AppDb, entry: AuditEntry): Promise<void> {
  await db.insert(auditLog).values({
    actorId: entry.actor.id,
    actorLabel: entry.actor.email,
    action: entry.action,
    targetType: entry.targetType ?? null,
    targetId: entry.targetId ?? null,
    detail: entry.detail ?? {},
  });
}
