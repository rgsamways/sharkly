import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { FeaturedSharkHero } from "@/components/featured-shark";
import { LinkButton } from "@/components/link-button";
import { SharkPicture } from "@/components/shark-picture";
import { site } from "@/content/site";
import { getFactOfTheDay } from "@/lib/facts";
import { getHomeFeatures } from "@/lib/species";
import { monthLabel } from "@/lib/species-rules";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<Welcome />}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <FactOfTheDay />
      </Suspense>
      <section className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
        <h2 className="font-display text-3xl font-semibold">Which shark are you?</h2>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted">
          Six quick questions, and we will match you with a shark.
        </p>
        <div className="mt-5 flex justify-center">
          <LinkButton href="/quiz">Take the quiz</LinkButton>
        </div>
      </section>
      <section className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
        <h2 className="font-display text-3xl font-semibold">Join the Shark of the Month club</h2>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted">
          One shark every month, with the best facts and the weirdest details. It&apos;s free.
        </p>
        <div className="mt-5 flex justify-center">
          <LinkButton href="/join">Join for free</LinkButton>
        </div>
      </section>
    </main>
  );
}

/** Shown while the page loads, and when no shark has been featured yet. */
function Welcome() {
  return (
    <section className="py-8">
      <h1 className="font-display text-5xl font-semibold">{site.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">{site.tagline}</p>
      <div className="mt-5">
        <LinkButton href="/sharks" variant="ghost">
          Browse all the sharks
        </LinkButton>
      </div>
    </section>
  );
}

async function Features() {
  await connection();
  const { current, previous } = await getHomeFeatures();
  if (!current) return <Welcome />;
  return (
    <>
      <FeaturedSharkHero feature={current} isCurrent={current.isCurrent} />
      {previous.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Sharks we have met</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {previous.map(({ month, teaser, species: shark }) => (
              <li key={month}>
                <Link
                  href={`/sharks/${shark.slug}`}
                  className="block h-full rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-accent"
                >
                  <SharkPicture
                    name={shark.commonName}
                    slug={shark.slug}
                    imageUrl={shark.imageUrl}
                    imageCredit={null}
                  />
                  <p className="mt-3 text-xs font-bold tracking-wide text-highlight uppercase">
                    {monthLabel(month)}
                  </p>
                  <h3 className="font-display text-xl font-semibold">{shark.commonName}</h3>
                  <p className="text-sm text-muted">{teaser}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** One fact a day, the same for everyone. Leaves itself out when there are no facts yet. */
async function FactOfTheDay() {
  await connection();
  const fact = await getFactOfTheDay();
  if (!fact) return null;
  return (
    <section className="mt-12 rounded-2xl border-l-4 border-highlight bg-surface-2 p-5 sm:p-6">
      <p className="text-xs font-bold tracking-wide text-highlight uppercase">Fact of the day</p>
      <h2 className="mt-1 font-display text-2xl font-semibold">{fact.title}</h2>
      <p className="mt-2 text-lg">{fact.body}</p>
      <p className="mt-3 text-sm">
        <Link href={`/facts#${fact.slug}`} className="underline underline-offset-4">
          Sources and more facts
        </Link>
      </p>
    </section>
  );
}
