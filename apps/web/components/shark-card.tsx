import Link from "next/link";
import type { Species } from "@/lib/species";
import { formatLength, sizeBand, sizeBandLabel } from "@/lib/species-rules";
import { ConservationLabel } from "./conservation-label";
import { SharkPicture } from "./shark-picture";

export function SharkCard({ shark }: { shark: Species }) {
  return (
    <li>
      <Link
        href={`/sharks/${shark.slug}`}
        className="block h-full rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <SharkPicture
          name={shark.commonName}
          slug={shark.slug}
          imageUrl={shark.imageUrl}
          imageCredit={null}
        />
        <h3 className="mt-3 font-display text-xl font-semibold">{shark.commonName}</h3>
        <p className="text-sm text-muted">
          {sizeBandLabel(sizeBand(shark.maxLengthCm))} · up to {formatLength(shark.maxLengthCm)}
        </p>
        <div className="mt-2">
          <ConservationLabel code={shark.iucnStatus} />
        </div>
      </Link>
    </li>
  );
}
