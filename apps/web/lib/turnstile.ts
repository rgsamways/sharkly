const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Checks a Cloudflare Turnstile token with Cloudflare. Fails CLOSED: if the check can't be done
 * (network trouble, bad response) the answer is "not verified", so a bot can't get past by making
 * the check break. A real person who hits this sees the error and can try again.
 */
export async function verifyTurnstile(
  input: { token: string; secret: string; ip?: string },
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  if (!input.token) return false;
  try {
    const body = new URLSearchParams({ secret: input.secret, response: input.token });
    if (input.ip) body.set("remoteip", input.ip);
    const response = await fetchImpl(VERIFY_URL, { method: "POST", body });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: unknown };
    return result.success === true;
  } catch {
    return false;
  }
}
