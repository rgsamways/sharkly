import { conservationLabel } from "@/lib/species-rules";

/** How worried we are, 1 (fine) to 5 (very worried). Data Deficient has no level. */
const LEVEL: Record<string, number> = { LC: 1, NT: 2, VU: 3, EN: 4, CR: 5 };

/**
 * The conservation status in plain words with the official name beside it. The little meter
 * repeats the level by how many segments are filled, so it never depends on colour alone.
 */
export function ConservationLabel({ code }: { code: string }) {
  const { plain, official } = conservationLabel(code);
  const level = LEVEL[code] ?? 0;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
      <span aria-hidden className="inline-flex gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={`h-2.5 w-2 rounded-sm ${n <= level ? "bg-highlight" : "bg-surface-3"}`}
          />
        ))}
        {level === 0 && <span className="ml-1 text-xs font-bold text-muted">?</span>}
      </span>
      <span>
        <span className="font-semibold">{plain}</span>{" "}
        <span className="text-muted">({official})</span>
      </span>
    </span>
  );
}
