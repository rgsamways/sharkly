import { sql } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { magicLink } from "better-auth/plugins/magic-link";
import * as authSchema from "@/db/auth-schema";
import {
  sendDeleteAccount,
  sendPasswordReset,
  sendSignInLink,
  sendVerifyEmail,
} from "./email/auth-emails";
import { isQuiet } from "./auth-quiet";
import { getDb } from "./db";
import { getEnv } from "./env";

function createAuth() {
  const env = getEnv();
  return betterAuth({
    database: drizzleAdapter(getDb(), { provider: "pg", schema: authSchema }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      // Accounts must prove they own the email before they can sign in with a password.
      requireEmailVerification: true,
      sendResetPassword: async ({ user, url }) => {
        await sendPasswordReset(user.email, url);
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        if (isQuiet(user.email)) return;
        await sendVerifyEmail(user.email, url);
      },
    },
    user: {
      additionalFields: {
        // `input: false` means a request can never set it, so nobody can sign up as an admin.
        role: { type: "string", required: true, defaultValue: "customer", input: false },
      },
      deleteUser: {
        enabled: true,
        // The link is good for an hour and works once. It opens our own page, which asks again
        // before anything is deleted, so an email scanner opening the link can't delete anyone.
        deleteTokenExpiresIn: 60 * 60,
        sendDeleteAccountVerification: async ({ user, token }) => {
          await sendDeleteAccount(
            user.email,
            `${env.BETTER_AUTH_URL}/delete-account?token=${encodeURIComponent(token)}`,
          );
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 30,
      updateAge: 60 * 60 * 24,
    },
    plugins: [
      magicLink({
        expiresIn: 60 * 10,
        // A link never makes an account. New customers use "Create an account".
        disableSignUp: true,
        sendMagicLink: async ({ email, url }) => {
          // The page answers the same for every email, so nobody can learn who has an account.
          // With no account there is nothing to sign in to, so nothing is sent.
          const [account] = await getDb()
            .select({ id: authSchema.user.id })
            .from(authSchema.user)
            .where(sql`lower(${authSchema.user.email}) = ${email.trim().toLowerCase()}`);
          if (account) await sendSignInLink(email, url);
        },
      }),
      // Lets server actions set the session cookie. Keep last.
      nextCookies(),
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;

let cached: Auth | undefined;

/** Created on first use, so building the app does not need the environment. */
export function getAuth(): Auth {
  cached ??= createAuth();
  return cached;
}
