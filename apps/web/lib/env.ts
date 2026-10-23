import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().regex(/^postgres(ql)?:\/\//, "must be a postgres:// connection string"),
  /** Shared secret the scheduler sends so only it can run scheduled jobs. */
  CRON_SECRET: z.string().min(32, "must be at least 32 characters"),
  /** Most database connections one server instance keeps open. Hosting plans cap the total. */
  DATABASE_POOL_MAX: z.coerce.number().int().min(1).max(20).default(10),
  /** Signs sessions and tokens. Generate with: openssl rand -base64 32 */
  BETTER_AUTH_SECRET: z.string().min(32, "must be at least 32 characters"),
  /** The public address of the site, for example https://example.com (no trailing slash). */
  BETTER_AUTH_URL: z.url("must be a full URL"),
  /** Sends sign-in, verification and newsletter emails. When unset, emails are printed to the log. */
  RESEND_API_KEY: z.string().startsWith("re_", "must start with re_").optional(),
  /** The From line on every email, for example: Sharkly <hello@yourdomain>. */
  EMAIL_FROM: z.string().min(3),
  /** Mailing list sign-ups allowed per person per 10 minutes. Raised only for automated tests. */
  SIGNUP_ATTEMPTS: z.coerce.number().int().min(1).max(10_000).default(5),
  /** Cloudflare Turnstile. Set BOTH to switch the check on; leave both unset to run without it. */
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  /** Search engines may list the site only when this is "true". Anything else but "false" is refused. */
  ALLOW_INDEXING: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.enum(["true", "false"]).optional(),
  ),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Checks the environment and returns it typed. The error names every bad variable and why, and
 * never prints a value, so it is safe to show in logs.
 */
export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = EnvSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `  ${issue.path.join(".") || "(env)"}: ${issue.message}`,
    );
    throw new Error(`Invalid environment variables:\n${problems.join("\n")}`);
  }
  // Without a key, emails can only be logged. That is fine locally and never fine in a running
  // production server. Building the app sends no email, so the build is exempt.
  const building = source.NEXT_PHASE === "phase-production-build";
  if (source.NODE_ENV === "production" && !building && !result.data.RESEND_API_KEY) {
    throw new Error(
      "Invalid environment variables:\n  RESEND_API_KEY: required in production, otherwise no email can be sent",
    );
  }
  // Turnstile needs both keys, or the form would demand a check it can't show.
  if (!result.data.TURNSTILE_SECRET_KEY !== !result.data.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    throw new Error(
      "Invalid environment variables:\n  TURNSTILE_SECRET_KEY / NEXT_PUBLIC_TURNSTILE_SITE_KEY: set both or neither",
    );
  }
  return result.data;
}

let cached: Env | undefined;

export function getEnv(): Env {
  cached ??= parseEnv(process.env);
  return cached;
}
