import { createHash, timingSafeEqual } from "node:crypto";

const digest = (value: string) => createHash("sha256").update(value).digest();

/**
 * True only when the request carries `Authorization: Bearer <secret>`. Compared in constant time
 * on hashes, so neither the value nor its length leaks through timing.
 */
export function isAuthorizedCron(authorization: string | null, secret: string): boolean {
  if (!authorization || !secret) return false;
  return timingSafeEqual(digest(authorization), digest(`Bearer ${secret}`));
}
