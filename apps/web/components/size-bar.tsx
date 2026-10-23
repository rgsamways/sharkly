import { formatLength, PERSON_CM, sizeBarWidths } from "@/lib/species-rules";

/**
 * A shark's length next to an adult person (1.7 m). The sentence says the same thing in words,
 * so the picture is a help, not the only way to get the answer.
 */
export function SizeBar({ name, lengthCm }: { name: string; lengthCm: number }) {
  const widths = sizeBarWidths(lengthCm);
  const you = formatLength(PERSON_CM);
  const shark = formatLength(lengthCm);
  return (
    <div>
      <p className="sr-only">
        You: {you}. {name}: {shark}.
      </p>
      <div aria-hidden className="space-y-3">
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>You</span>
            <span className="text-muted">{you}</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-muted" style={{ width: `${widths.person}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between text-sm">
            <span>{name}</span>
            <span className="text-muted">{shark}</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-3">
            <div className="h-full rounded-full bg-accent" style={{ width: `${widths.shark}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
