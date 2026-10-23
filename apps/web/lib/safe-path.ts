/**
 * Turns a "go here after signing in" value from the address bar into a path that is safe to
 * redirect to. Only paths on this site are allowed, so a crafted link can't send a member to
 * another website. Anything else becomes the fallback.
 */
export function safeNextPath(value: unknown, fallback = "/account"): string {
  if (typeof value !== "string") return fallback;
  // Must start with exactly one "/". "//host" and "/\host" are treated as other websites by browsers.
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (/[\u0000-\u001f\u007f\\]/.test(value)) return fallback;
  return value;
}
