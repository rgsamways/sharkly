/** developer can do everything an admin can, and an admin everything a customer can. */
export const ROLES = ["customer", "admin", "developer"] as const;
export type Role = (typeof ROLES)[number];

const RANK: Record<Role, number> = { customer: 0, admin: 1, developer: 2 };

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

/** An unknown or missing role counts as no access at all. */
export function hasRole(actual: unknown, required: Role): boolean {
  return isRole(actual) && RANK[actual] >= RANK[required];
}
