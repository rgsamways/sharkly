import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ConservationLabel } from "@/components/conservation-label";
import { SharkPicture } from "@/components/shark-picture";
import { Button } from "@/components/ui/button";
import { speciesEntries, type SpeciesEntry } from "@/content/species";
import { speciesImages } from "@/content/species-images";
import { parseCompare } from "@/lib/compare";
import { formatLength, habitatLabel, PERSON_CM } from "@/lib/species-rules";

export const metadata: Metadata = {
  title: "Compare two sharks",
  description: "Pick any two sharks and see how they compare in size, home, food and more.",
};

const sorted = [...speciesEntries].sort((a, b) => a.commonName.localeCompare(b.commonName));
const slugs = speciesEntries.map((s) => s.slug);

export default function ComparePage({ searchParams }: PageProps<"/compare">) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">Compare two sharks</h1>
      <p className="mt-2 text-lg text-muted">
        Pick any two and see how they stack up. Or see{" "}
        <Link href="/sharks/sizes" className="underline underline-offset-4">
          every shark in a size lineup
        </Link>
        .
      </p>
      <Suspense fallback={<div className="mt-6 h-64 animate-pulse rounded-2xl bg-surface-2" />}>
        <Comparison searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Comparison({ searchParams }: Pick<PageProps<"/compare">, "searchParams">) {
  const choice = parseCompare(await searchParams, slugs);
  const a = choice.ok ? speciesEntries.find((s) => s.slug === choice.a)! : null;
  const b = choice.ok ? speciesEntries.find((s) => s.slug === choice.b)! : null;

  return (
    <>
      <Form a={choice.a} b={choice.b} note={choice.note} />
      {a && b && <Result a={a} b={b} />}
    </>
  );
}

const select =
  "mt-1 h-11 w-full rounded-lg border border-input bg-surface px-3 text-base font-normal";

function Form({ a, b, note }: { a: string | null; b: string | null; note: string | null }) {
  return (
    <form
      action="/compare"
      method="get"
      className="mt-6 grid gap-3 rounded-2xl border border-line bg-surface p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
    >
      {(["a", "b"] as const).map((name, i) => (
        <label key={name} className="block text-sm font-semibold">
          {i === 0 ? "First shark" : "Second shark"}
          <select name={name} defaultValue={(i === 0 ? a : b) ?? ""} className={select} required>
            <option value="" disabled>
              Choose a shark
            </option>
            {sorted.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.commonName}
              </option>
            ))}
          </select>
        </label>
      ))}
      <Button type="submit" className="h-11 text-base">
        Compare
      </Button>
      {note && (
        <p className="text-sm sm:col-span-3" role="alert">
          {note}
        </p>
      )}
    </form>
  );
}

function Result({ a, b }: { a: SpeciesEntry; b: SpeciesEntry }) {
  const longest = Math.max(a.maxLengthCm, b.maxLengthCm, PERSON_CM);
  const bars = [
    { label: a.commonName, cm: a.maxLengthCm, color: "bg-accent" },
    { label: b.commonName, cm: b.maxLengthCm, color: "bg-highlight" },
    { label: "You (an adult)", cm: PERSON_CM, color: "bg-muted" },
  ];
  const ratio = Math.max(a.maxLengthCm, b.maxLengthCm) / Math.min(a.maxLengthCm, b.maxLengthCm);
  const [bigger, smaller] = a.maxLengthCm >= b.maxLengthCm ? [a, b] : [b, a];

  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-2xl font-semibold">Size</h2>
        <p className="mt-1">
          {bigger.maxLengthCm === smaller.maxLengthCm
            ? `Both grow to about ${formatLength(a.maxLengthCm)}.`
            : `The ${bigger.commonName.toLowerCase()} grows about ${timesText(ratio)} as long as the ${smaller.commonName.toLowerCase()}.`}
        </p>
        <div className="mt-4 space-y-3" aria-hidden>
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{bar.label}</span>
                <span className="text-muted">{formatLength(bar.cm)}</span>
              </div>
              <div className="h-2.5 rounded-full bg-surface-3">
                <div
                  className={`h-full rounded-full ${bar.color}`}
                  style={{ width: `${Math.max(2, Math.round((bar.cm / longest) * 100))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[a, b].map((shark) => (
          <article key={shark.slug} className="rounded-2xl border border-line bg-surface p-4">
            <SharkPicture
              name={shark.commonName}
              slug={shark.slug}
              imageUrl={speciesImages[shark.slug]?.url ?? null}
              imageCredit={null}
              width={500}
            />
            <h2 className="mt-3 font-display text-2xl font-semibold">{shark.commonName}</h2>
            <p className="text-sm text-muted italic">{shark.scientificName}</p>
            <dl className="mt-3 space-y-3 text-sm">
              <Row term="Grows up to">{formatLength(shark.maxLengthCm)}</Row>
              <Row term="Where it lives">{shark.habitats.map(habitatLabel).join(", ")}</Row>
              <Row term="What it eats">{shark.diet}</Row>
              <Row term="How worried are we?">
                <ConservationLabel code={shark.iucnStatus} />
              </Row>
              <Row term="The weird bit">{shark.weirdBit}</Row>
            </dl>
            <p className="mt-4">
              <Link href={`/sharks/${shark.slug}`} className="underline underline-offset-4">
                Full profile and sources
              </Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/** "2 times", "1.4 times", "10 times": one decimal when it matters, none when it does not. */
function timesText(ratio: number): string {
  if (ratio >= 10) return `${Math.round(ratio)} times`;
  return `${ratio.toFixed(1).replace(/\.0$/, "")} times`;
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-muted">{term}</dt>
      <dd className="mt-0.5 font-semibold">{children}</dd>
    </div>
  );
}
