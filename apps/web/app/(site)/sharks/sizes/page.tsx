import type { Metadata } from "next";
import Link from "next/link";
import { SharkPicture } from "@/components/shark-picture";
import { speciesEntries } from "@/content/species";
import { speciesImages } from "@/content/species-images";
import { sizeLineup } from "@/lib/compare";
import { formatLength } from "@/lib/species-rules";

export const metadata: Metadata = {
  title: "Shark size lineup",
  description: "Every shark in one line, from the biggest to the smallest, next to you.",
};

/** Every shark as a bar, longest first, with a person in their place. Needs no database. */
export default function SizeLineupPage() {
  const rows = sizeLineup(speciesEntries);
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/sharks" className="text-sm underline underline-offset-4">
        All the sharks
      </Link>
      <h1 className="mt-2 font-display text-4xl font-semibold">Shark size lineup</h1>
      <p className="mt-2 text-lg text-muted">
        Every shark on the site, from the longest to the shortest, with you in your place. The bars
        show the longest a shark is known to grow.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/compare" className="underline underline-offset-4">
          Compare two sharks side by side
        </Link>
      </p>

      <ol className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
        {rows.map((row) => {
          const photo = row.slug ? speciesImages[row.slug] : undefined;
          const person = row.kind === "person";
          return (
            <li
              key={row.slug ?? "you"}
              className={`flex items-center gap-3 p-3 ${person ? "bg-surface-2" : ""}`}
            >
              <div className="w-16 shrink-0">
                {person ? (
                  <div
                    aria-hidden
                    className="grid aspect-[3/2] w-full place-items-center rounded-xl bg-highlight text-sm font-bold text-white"
                  >
                    You
                  </div>
                ) : (
                  <SharkPicture
                    name={row.name}
                    slug={row.slug!}
                    imageUrl={photo?.url ?? null}
                    imageCredit={null}
                    width={500}
                    compact
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  {person ? (
                    <span className="font-semibold">You (an adult)</span>
                  ) : (
                    <Link
                      href={`/sharks/${row.slug}`}
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {row.name}
                    </Link>
                  )}
                  <span className="shrink-0 text-sm text-muted">{formatLength(row.lengthCm)}</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-surface-3" aria-hidden>
                  <div
                    className={`h-full rounded-full ${person ? "bg-highlight" : "bg-accent"}`}
                    style={{ width: `${row.widthPct}%` }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
