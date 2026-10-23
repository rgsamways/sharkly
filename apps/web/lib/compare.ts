import { PERSON_CM } from "./species-rules";

/** Narrowest a bar is drawn, in percent, so a tiny shark never vanishes. */
const MIN_BAR_PCT = 2;

export interface LineupRow {
  kind: "shark" | "person";
  slug: string | null;
  name: string;
  lengthCm: number;
  /** Bar width, as a percent of the row, scaled to the longest in the lineup. */
  widthPct: number;
}

/**
 * All sharks from longest to shortest (ties by name), with a row for a person of `personCm` placed
 * where that height falls. Bars are scaled to the longest row, with a small minimum width.
 */
export function sizeLineup(
  sharks: readonly { slug: string; commonName: string; maxLengthCm: number }[],
  personCm: number = PERSON_CM,
): LineupRow[] {
  const sorted = [...sharks].sort(
    (a, b) => b.maxLengthCm - a.maxLengthCm || a.commonName.localeCompare(b.commonName),
  );
  const longest = Math.max(personCm, ...sorted.map((s) => s.maxLengthCm));
  const width = (cm: number) => Math.max(MIN_BAR_PCT, Math.round((cm / longest) * 100));

  const rows: LineupRow[] = sorted.map((s) => ({
    kind: "shark",
    slug: s.slug,
    name: s.commonName,
    lengthCm: s.maxLengthCm,
    widthPct: width(s.maxLengthCm),
  }));
  const person: LineupRow = {
    kind: "person",
    slug: null,
    name: "You",
    lengthCm: personCm,
    widthPct: width(personCm),
  };
  // A shark exactly as tall as the person goes first, then the person, then shorter sharks.
  const at = rows.findIndex((r) => r.lengthCm < personCm);
  rows.splice(at === -1 ? rows.length : at, 0, person);
  return rows;
}

type RawParams = Record<string, string | string[] | undefined>;

export interface CompareChoice {
  a: string | null;
  b: string | null;
  /** True only when both are known sharks and they are different. */
  ok: boolean;
  /** A friendly note about an unusable choice, or null when there is nothing to say. */
  note: string | null;
}

const first = (value: string | string[] | undefined): string =>
  (Array.isArray(value) ? value[0] : value) ?? "";

/** Reads ?a= and ?b= from the page address. Never throws; bad input becomes a friendly note. */
export function parseCompare(params: RawParams, knownSlugs: readonly string[]): CompareChoice {
  const rawA = first(params.a);
  const rawB = first(params.b);
  const known = new Set(knownSlugs);
  const a = known.has(rawA) ? rawA : null;
  const b = known.has(rawB) ? rawB : null;

  if (!rawA && !rawB) return { a, b, ok: false, note: null };
  if ((rawA && !a) || (rawB && !b)) {
    return { a, b, ok: false, note: "We could not find one of those sharks. Please pick again." };
  }
  if (!a || !b) return { a, b, ok: false, note: "Pick two sharks to compare." };
  if (a === b) return { a, b, ok: false, note: "Pick two different sharks to compare." };
  return { a, b, ok: true, note: null };
}
