import type { Role } from "./roles";

/**
 * The lowest role that may do each sensitive thing. Pages and server actions ask for these by name
 * (requirePermission) instead of naming a role, so a limited role can be added later by changing
 * a line here. Today every one of them is "admin".
 */
export const PERMISSIONS = {
  "orders.refund": "admin",
  "discounts.manage": "admin",
  "newsletters.manage": "admin",
  "mailingList.manage": "admin",
  "team.manage": "admin",
  "activity.view": "admin",
  "pages.edit": "admin",
  "campaigns.plan": "admin",
  "ai.use": "admin",
} as const satisfies Record<string, Role>;

export type Permission = keyof typeof PERMISSIONS;
