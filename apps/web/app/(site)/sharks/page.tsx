import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SharkCard } from "@/components/shark-card";
import { Button } from "@/components/ui/button";
import { countSpecies, listSpecies } from "@/lib/species";
import {
  HABITATS,
  IUCN_STATUSES,
  parseSpeciesFilters,
  SIZE_BANDS,
  type SpeciesFilters,
} from "@/lib/species-rules";

export const metadata: Metadata = {
  title: "All the sharks",
  description: "Browse sharks by where they live, how big they are, and how worried we are.",
};

const field = "h-11 w-full rounded-lg border border-input bg-surface px-3 text-base";

export default function SharksPage({ searchParams }: PageProps<"/sharks">) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">All the sharks</h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Search by name, or narrow the list by where a shark lives, how big it gets, and how worried
        we are about it.
      </p>
      <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <Link
          href="/sharks/sizes"
          className="inline-flex min-h-11 items-center underline underline-offset-4"
        >
          Size lineup: every shark next to you
        </Link>
        <Link
          href="/compare"
          className="inline-flex min-h-11 items-center underline underline-offset-4"
        >
          Compare two sharks
        </Link>
      </p>
      <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-2xl bg-surface-2" />}>
        <Browser searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Browser({ searchParams }: Pick<PageProps<"/sharks">, "searchParams">) {
  await connection();
  const filters = parseSpeciesFilters(await searchParams);
  const [sharks, total] = await Promise.all([listSpecies(filters), countSpecies()]);
  const filtered = Boolean(filters.q || filters.habitat || filters.size || filters.status);

  return (
    <>
      <FilterForm filters={filters} filtered={filtered} />
      <p className="mt-6 text-sm text-muted" role="status">
        {filtered ? `${sharks.length} of ${total} sharks` : `${total} sharks`}
      </p>
      {sharks.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
          <p className="font-semibold">No sharks matched.</p>
          <p className="mt-1 text-muted">Try fewer filters, or a different spelling.</p>
          <Link href="/sharks" className="mt-3 inline-block underline underline-offset-4">
            Clear the filters
          </Link>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sharks.map((shark) => (
            <SharkCard key={shark.id} shark={shark} />
          ))}
        </ul>
      )}
    </>
  );
}

function FilterForm({ filters, filtered }: { filters: SpeciesFilters; filtered: boolean }) {
  return (
    <form
      action="/sharks"
      method="get"
      className="mt-6 grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="block text-sm font-semibold sm:col-span-2 lg:col-span-4">
        Search by name
        <input
          type="search"
          name="q"
          defaultValue={filters.q}
          placeholder="For example: hammerhead"
          maxLength={60}
          className={`${field} mt-1 font-normal`}
        />
      </label>
      <label className="block text-sm font-semibold">
        Where it lives
        <select
          name="habitat"
          defaultValue={filters.habitat ?? ""}
          className={`${field} mt-1 font-normal`}
        >
          <option value="">Anywhere</option>
          {HABITATS.map((h) => (
            <option key={h.value} value={h.value}>
              {h.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        How big
        <select
          name="size"
          defaultValue={filters.size ?? ""}
          className={`${field} mt-1 font-normal`}
        >
          <option value="">Any size</option>
          {SIZE_BANDS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label} ({b.hint})
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        How worried are we?
        <select
          name="status"
          defaultValue={filters.status ?? ""}
          className={`${field} mt-1 font-normal`}
        >
          <option value="">Any</option>
          {IUCN_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.plain} ({s.official})
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-3">
        <Button type="submit" className="h-11 flex-1 text-base">
          Show sharks
        </Button>
        {filtered && (
          <Link
            href="/sharks"
            className="inline-flex h-11 items-center text-sm underline underline-offset-4"
          >
            Clear
          </Link>
        )}
      </div>
    </form>
  );
}
