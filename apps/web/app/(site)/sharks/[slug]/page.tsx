import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { ConservationLabel } from "@/components/conservation-label";
import { SharkPicture } from "@/components/shark-picture";
import { SizeBar } from "@/components/size-bar";
import { speciesEntries } from "@/content/species";
import { getSpeciesBySlug } from "@/lib/species";
import { formatLength, habitatLabel, sizeBand, sizeBandLabel } from "@/lib/species-rules";

export const metadata: Metadata = { title: "Shark profile" };

/**
 * The known slugs come from the content file, not the database, so building the site needs no
 * database. It also lets an unknown address answer 404 straight away, before any streaming starts.
 */
export function generateStaticParams() {
  return speciesEntries.map((s) => ({ slug: s.slug }));
}

export default async function SharkProfilePage({ params }: PageProps<"/sharks/[slug]">) {
  const { slug } = await params;
  if (!speciesEntries.some((s) => s.slug === slug)) notFound();
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/sharks" className="text-sm underline underline-offset-4">
        All the sharks
      </Link>
      <Suspense fallback={<div className="mt-6 h-96 animate-pulse rounded-2xl bg-surface-2" />}>
        <Profile slug={slug} />
      </Suspense>
    </main>
  );
}

async function Profile({ slug }: { slug: string }) {
  await connection();
  const shark = await getSpeciesBySlug(slug);
  if (!shark) notFound();

  const depth =
    shark.depthMinM !== null && shark.depthMaxM !== null
      ? `${shark.depthMinM.toLocaleString("en-CA")} to ${shark.depthMaxM.toLocaleString("en-CA")} m down`
      : shark.depthMaxM !== null
        ? `Down to ${shark.depthMaxM.toLocaleString("en-CA")} m`
        : null;

  return (
    <article className="mt-4">
      <h1 className="font-display text-4xl font-semibold">{shark.commonName}</h1>
      <p className="italic text-muted">{shark.scientificName}</p>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <SharkPicture
          name={shark.commonName}
          slug={shark.slug}
          imageUrl={shark.imageUrl}
          imageCredit={shark.imageCredit}
          imageCreditUrl={shark.imageCreditUrl}
          priority
        />
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-xl font-semibold">Size, compared with you</h2>
          <div className="mt-3">
            <SizeBar name={shark.commonName} lengthCm={shark.maxLengthCm} />
          </div>
          <p className="mt-3 text-sm text-muted">
            {sizeBandLabel(sizeBand(shark.maxLengthCm))}. Grows up to about{" "}
            {formatLength(shark.maxLengthCm)}.
          </p>
        </div>
      </div>

      <section className="mt-8 max-w-2xl">
        <p className="text-lg">{shark.summary}</p>
        <div className="mt-4 rounded-xl border-l-4 border-highlight bg-surface-2 p-4">
          <h2 className="text-sm font-bold tracking-wide text-highlight uppercase">
            The weird bit
          </h2>
          <p className="mt-1">{shark.weirdBit}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Quick facts</h2>
        <dl className="mt-3 grid gap-4 sm:grid-cols-2">
          <Fact term="Where it lives">
            {shark.habitats.map(habitatLabel).join(", ")}
            {depth && <span className="block text-sm text-muted">{depth}</span>}
          </Fact>
          <Fact term="What it eats">{shark.diet}</Fact>
          <Fact term="How worried are we?">
            <ConservationLabel code={shark.iucnStatus} />
            <span className="mt-1 block text-sm text-muted">
              Assessed in {shark.iucnAssessedYear} by the{" "}
              <a
                href={shark.iucnSourceUrl}
                className="underline underline-offset-4"
                rel="noopener noreferrer"
              >
                IUCN Red List
              </a>
              .
            </span>
          </Fact>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-2xl font-semibold">Where we got this</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {shark.sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                className="underline underline-offset-4"
                rel="noopener noreferrer"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <dt className="text-sm text-muted">{term}</dt>
      <dd className="mt-1 font-semibold">{children}</dd>
    </div>
  );
}
