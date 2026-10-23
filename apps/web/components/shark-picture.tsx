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
          d="M4 34c14-14 34-22 58-22 8 0 14 2 20 6l8-14c1-2 4-1 4 1l-2 18c8 2 16 6 22 12-8-2-16-2-24 0l2 16c0 2-3 3-4 1l-10-10c-10 6-22 8-34 6C26 46 12 42 4 34Z"
        />
        <circle cx="30" cy="30" r="2" fill="#06344a" />
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
