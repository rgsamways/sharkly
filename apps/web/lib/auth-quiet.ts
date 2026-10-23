/**
 * Lets the code that adds a team member say "don't send the usual confirm-your-email message for
 * this address": they get a welcome email instead, so they are not sent two. Only addresses added
 * here are affected, and only for the moment the account is being created.
 */
const quiet = new Set<string>();

export function isQuiet(email: string): boolean {
  return quiet.has(email.trim().toLowerCase());
}

export async function withoutVerificationEmail<T>(
  email: string,
  work: () => Promise<T>,
): Promise<T> {
  const key = email.trim().toLowerCase();
  quiet.add(key);
  try {
    return await work();
  } finally {
    quiet.delete(key);
  }
}
