/** Rules shared by the species pages: allowed values, plain-word labels, size bands, filters. */

export const HABITATS = [
  { value: "reef", label: "Coral reef" },
  { value: "coastal", label: "Coast and shallows" },
  { value: "open-ocean", label: "Open ocean" },
  { value: "deep-sea", label: "Deep sea" },
  { value: "polar", label: "Cold polar water" },
  { value: "estuary", label: "Rivers and estuaries" },
] as const;

export type Habitat = (typeof HABITATS)[number]["value"];

/** IUCN Red List codes, with the official wording and a plain-word label for everyone. */
export const IUCN_STATUSES = [
  { value: "LC", official: "Least Concern", plain: "Doing okay" },
  { value: "NT", official: "Near Threatened", plain: "Close to trouble" },
  { value: "VU", official: "Vulnerable", plain: "In trouble" },
  { value: "EN", official: "Endangered", plain: "In danger" },
  { value: "CR", official: "Critically Endangered", plain: "In serious danger" },
  { value: "DD", official: "Data Deficient", plain: "Not enough information" },
] as const;

export type IucnStatus = (typeof IUCN_STATUSES)[number]["value"];

/** Size bands by maximum length. The lower edge belongs to the band. */
export const SIZE_BANDS = [
  { value: "pocket", label: "Pocket-sized", hint: "under 1 m", minCm: 0 },
  { value: "person", label: "Person-sized", hint: "1 to 3 m", minCm: 100 },
  { value: "car", label: "Bigger than a car", hint: "3 to 6 m", minCm: 300 },
  { value: "giant", label: "Giant", hint: "6 m and up", minCm: 600 },
] as const;

export type SizeBand = (typeof SIZE_BANDS)[number]["value"];

/** The height of the adult we compare every shark with. */
export const PERSON_CM = 170;

export function sizeBand(maxLengthCm: number): SizeBand {
  let band: SizeBand = SIZE_BANDS[0].value;
  for (const candidate of SIZE_BANDS) {
    if (maxLengthCm >= candidate.minCm) band = candidate.value;
  }
  return band;
}

export function sizeBandLabel(band: SizeBand): string {
  return SIZE_BANDS.find((b) => b.value === band)!.label;
}

/** The [min, max) length range of a band in centimetres; max is null for the top band. */
export function sizeBandRange(band: SizeBand): { minCm: number; maxCm: number | null } {
  const index = SIZE_BANDS.findIndex((b) => b.value === band);
  const next = SIZE_BANDS[index + 1];
  return { minCm: SIZE_BANDS[index]!.minCm, maxCm: next ? next.minCm : null };
}

export function conservationLabel(code: string): { official: string; plain: string } {
  const found = IUCN_STATUSES.find((s) => s.value === code);
  return found
    ? { official: found.official, plain: found.plain }
    : { official: "Unknown", plain: "Not enough information" };
}

export function habitatLabel(value: string): string {
  return HABITATS.find((h) => h.value === value)?.label ?? value;
}

/** "3.5 m" for big sharks and "20 cm" for small ones. */
export function formatLength(cm: number): string {
  if (cm < 100) return `${cm} cm`;
  const metres = cm / 100;
  return `${Number.isInteger(metres) ? metres : metres.toFixed(1)} m`;
}

/**
 * Bar widths (percent of the row) for the size comparison. The longer of the two fills the row;
 * the shorter keeps at least a visible sliver so a tiny shark never disappears.
 */
export function sizeBarWidths(sharkCm: number, personCm: number = PERSON_CM) {
  const longest = Math.max(sharkCm, personCm);
  const clamp = (cm: number) => Math.max(4, Math.round((cm / longest) * 100));
  return { shark: clamp(sharkCm), person: clamp(personCm) };
}

export interface SpeciesFilters {
  q: string;
  habitat: Habitat | null;
  size: SizeBand | null;
  status: IucnStatus | null;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string =>
  (Array.isArray(value) ? value[0] : value) ?? "";

/** Reads the page address into filters. Anything unknown is ignored, never an error. */
export function parseSpeciesFilters(params: RawParams): SpeciesFilters {
  const habitat = first(params.habitat);
  const size = first(params.size);
  const status = first(params.status);
  return {
    q: first(params.q).trim().slice(0, 60),
    habitat: HABITATS.some((h) => h.value === habitat) ? (habitat as Habitat) : null,
    size: SIZE_BANDS.some((b) => b.value === size) ? (size as SizeBand) : null,
    status: IUCN_STATUSES.some((s) => s.value === status) ? (status as IucnStatus) : null,
  };
}

export const FEATURE_TIME_ZONE = "America/Toronto";

/** The calendar month, as "YYYY-MM", where the site's owner lives. */
export function currentFeatureMonth(
  now: Date = new Date(),
  timeZone: string = FEATURE_TIME_ZONE,
): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const year = parts.find((p) => p.type === "year")!.value;
  const month = parts.find((p) => p.type === "month")!.value;
  return `${year}-${month}`;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-10" becomes "October 2026". */
export function monthLabel(month: string): string {
  const [year, number] = month.split("-");
  const name = MONTH_NAMES[Number(number) - 1];
  return name ? `${name} ${year}` : month;
}
