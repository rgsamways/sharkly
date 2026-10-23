import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "./auth";
import { type Permission, PERMISSIONS } from "./permissions";
import { hasRole, isRole, type Role } from "./roles";

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

/** The signed-in user, or null. Always checked on the server, never trusted from the browser. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) return null;
  const { id, email, name } = session.user;
  const role = (session.user as { role?: unknown }).role;
  return { id, email, name, role: isRole(role) ? role : "customer" };
}

/** For pages: send signed-out visitors to sign in. */
export async function requireUser(returnTo?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect(returnTo ? `/sign-in?next=${encodeURIComponent(returnTo)}` : "/sign-in");
  return user;
}

/**
 * For admin pages and every server action that changes data. Pages that merely redirect are not
 * protection on their own, so each action must call this itself.
 */
export async function requireRole(required: Role): Promise<CurrentUser> {
  const user = await requireUser();
  if (!hasRole(user.role, required)) redirect("/");
  return user;
}

/** Like requireRole, but by the name of what is being done. See lib/permissions.ts. */
export async function requirePermission(permission: Permission): Promise<CurrentUser> {
  return requireRole(PERMISSIONS[permission]);
}
