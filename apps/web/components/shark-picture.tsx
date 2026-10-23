/**
 * A shark's picture, or a friendly silhouette until a real one exists. Both have a text
 * alternative naming the species. A real image always shows its credit.
 */

const TINTS = ["#1c8fa6", "#2a7fb8", "#3a8f8a", "#4a76b0", "#2f9aa0", "#5a82a8"];

function tintFor(slug: string): string {
  let sum = 0;
  for (const char of slug) sum += char.charCodeAt(0);
  return TINTS[sum % TINTS.length]!;
}

function Silhouette({ name, slug, compact }: { name: string; slug: string; compact: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${name}: picture coming soon`}
      className="relative grid aspect-[3/2] w-full place-items-center overflow-hidden rounded-xl"
      style={{ background: `linear-gradient(160deg, ${tintFor(slug)}, #06344a)` }}
    >
      <svg viewBox="0 0 120 60" className="w-2/3 text-white/85" aria-hidden>
        <path
          fill="currentColor"
          d="M6 38C22 28 40 24 58 24L66 8C70 18 74 22 80 25C92 26 102 30 110 34L116 18C114 28 113 33 112 37L118 54C108 46 100 44 92 44C74 46 62 49 52 49L42 58L40 49C24 48 12 44 6 38Z"
        />
        <circle cx="21" cy="37" r="1.8" fill="#06344a" />
        <path
          d="M34 34l-2 8M38 34l-2 8M42 34l-2 8"
          stroke="#06344a"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {!compact && (
        <span className="absolute bottom-2 left-3 text-xs tracking-wide text-white/70">
          Picture coming soon
        </span>
      )}
    </div>
  );
}

export function SharkPicture({
  name,
  slug,
  imageUrl,
  imageCredit,
  compact = false,
}: {
  name: string;
  slug: string;
  imageUrl: string | null;
  imageCredit: string | null;
  /** Small thumbnails leave out the "coming soon" caption, which would not fit. */
  compact?: boolean;
}) {
  if (!imageUrl) return <Silhouette name={name} slug={slug} compact={compact} />;
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote hosts are not configured yet */}
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="aspect-[3/2] w-full rounded-xl object-cover"
      />
      {imageCredit && <figcaption className="mt-1 text-xs text-muted">{imageCredit}</figcaption>}
    </figure>
  );
}
