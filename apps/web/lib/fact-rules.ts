import { FEATURE_TIME_ZONE } from "./species-rules";

/** The topics on the facts page. "myths" entries are the myth-or-fact answers. */
export const FACT_TOPICS = [
  { value: "senses", label: "Super senses" },
  { value: "anatomy", label: "Body" },
  { value: "babies", label: "Babies and life" },
  { value: "history", label: "Long ago" },
  { value: "records", label: "Records" },
  { value: "myths", label: "Myth or fact?" },
] as const;

export type FactTopic = (typeof FACT_TOPICS)[number]["value"];

/** Verdicts are always shown as words plus a symbol, never colour alone. */
export const VERDICTS = {
  true: { label: "True", symbol: "✓" },
  partly: { label: "Partly true", symbol: "◐" },
  false: { label: "Myth", symbol: "✗" },
} as const;

export type Verdict = keyof typeof VERDICTS;

export function topicLabel(topic: string): string {
  return FACT_TOPICS.find((t) => t.value === topic)?.label ?? topic;
}

type RawParams = Record<string, string | string[] | undefined>;

/** Reads ?topic= from the page address. Anything unknown means "all", never an error. */
export function parseFactTopic(params: RawParams): FactTopic | null {
  const raw = Array.isArray(params.topic) ? params.topic[0] : params.topic;
  return FACT_TOPICS.find((t) => t.value === raw)?.value ?? null;
}

/** Whole days since 1970 for the calendar date in Toronto, so it changes at Toronto midnight. */
function torontoDayNumber(now: Date, timeZone: string = FEATURE_TIME_ZONE): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((p) => p.type === type)!.value);
  return Math.floor(Date.UTC(get("year"), get("month") - 1, get("day")) / 86_400_000);
}

/**
 * The fact for today. Everyone sees the same one all day (Toronto time), it moves to the next fact
 * at midnight, and it starts over after the last. Facts are put in a fixed order (by slug) first,
 * so adding a fact never reshuffles more than the order of the cycle.
 */
export function factOfTheDay<T extends { slug: string }>(
  facts: readonly T[],
  now: Date = new Date(),
): T | null {
  if (facts.length === 0) return null;
  const ordered = [...facts].sort((a, b) => a.slug.localeCompare(b.slug));
  return ordered[torontoDayNumber(now) % ordered.length]!;
}
