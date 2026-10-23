import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { user } from "@/db/auth-schema";
import type { AppDb } from "@/db/schema";
import type { Auth } from "./auth";
import { withoutVerificationEmail } from "./auth-quiet";
import type { Role } from "./roles";

/**
 * Creates an account with a role, for the developer and the admins (there is no public sign-up for
 * those). The password is random and never shown: the person signs in with an emailed link, or
 * uses "forgot password" to choose their own. Their email counts as verified because whoever adds them
 * vouched for it.
 */
export async function createUserWithRole(
  deps: { auth: Auth; db: AppDb },
  input: {
    email: string;
    name: string;
    role: Role;
    password?: string;
    /** Skip the usual confirm-your-email message because a welcome email is sent instead. */
    quiet?: boolean;
  },
): Promise<{ id: string }> {
  const email = input.email.trim().toLowerCase();
  const signUp = () =>
    deps.auth.api.signUpEmail({
      body: {
        email,
        name: input.name,
        // Only the browser tests pass a known password.
        password: input.password ?? randomBytes(24).toString("base64url"),
      },
    });
  const result = input.quiet ? await withoutVerificationEmail(email, signUp) : await signUp();
  await deps.db
    .update(user)
    .set({ role: input.role, emailVerified: true })
    .where(eq(user.id, result.user.id));
  return { id: result.user.id };
}
