/**
 * A small sliding-window limiter: at most `limit` hits per key in any `windowMs`. It lives in
 * memory, so each server instance counts separately. That slows down guessing but is not a
 * complete defence; the host's firewall rate limiting should back it up.
 */
export function createRateLimiter(options: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return {
    check(key: string, now: number = Date.now()): { allowed: boolean; retryAfterMs: number } {
      const cutoff = now - options.windowMs;
      const recent = (hits.get(key) ?? []).filter((t) => t > cutoff);

      if (recent.length >= options.limit) {
        hits.set(key, recent);
        return { allowed: false, retryAfterMs: recent[0]! + options.windowMs - now };
      }
      recent.push(now);
      hits.set(key, recent);

      // Forget idle keys now and then so the map can't grow without bound.
      if (hits.size > 5000) {
        for (const [k, times] of hits) {
          if (times.every((t) => t <= cutoff)) hits.delete(k);
        }
      }
      return { allowed: true, retryAfterMs: 0 };
    },
  };
}
