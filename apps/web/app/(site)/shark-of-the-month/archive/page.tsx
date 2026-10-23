import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SharkPicture } from "@/components/shark-picture";
import { LinkButton } from "@/components/link-button";
import { listArchive } from "@/lib/species";
import { monthLabel } from "@/lib/species-rules";

export const metadata: Metadata = {
  title: "Past sharks of the month",
  description: "Every shark we have featured so far.",
};

export default function ArchivePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">Past sharks of the month</h1>
      <p className="mt-2 text-lg text-muted">Every shark we have featured, newest first.</p>
      <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-2xl bg-surface-2" />}>
        <Entries />
      </Suspense>
    </main>
  );
}

async function Entries() {
  await connection();
  const entries = await listArchive();
  if (entries.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <p className="font-semibold">Nothing here yet.</p>
        <p className="mt-1 text-muted">Our first Shark of the Month is on its way.</p>
        <div className="mt-4">
          <LinkButton href="/sharks" variant="ghost">
            Browse all the sharks
          </LinkButton>
        </div>
      </div>
    );
  }
  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
      {entries.map(({ month, teaser, species: shark }) => (
        <li key={month}>
          <Link
            href={`/sharks/${shark.slug}`}
            className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-accent"
          >
            <div className="w-28 shrink-0 sm:w-32">
              <SharkPicture
                name={shark.commonName}
                slug={shark.slug}
                imageUrl={shark.imageUrl}
                imageCredit={null}
                compact
              />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-highlight uppercase">
                {monthLabel(month)}
              </p>
              <h2 className="font-display text-xl font-semibold">{shark.commonName}</h2>
              <p className="text-sm text-muted">{teaser}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
