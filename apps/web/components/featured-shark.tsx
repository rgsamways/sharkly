import Link from "next/link";
import type { FeaturedShark } from "@/lib/species";
import { formatLength, monthLabel, sizeBand, sizeBandLabel } from "@/lib/species-rules";
import { ConservationLabel } from "./conservation-label";
import { LinkButton } from "./link-button";
import { SharkPicture } from "./shark-picture";
import { Sparkle } from "./sparkle";
import { SizeBar } from "./size-bar";

/** The big "this month's shark" block, used on the home page and the monthly page. */
export function FeaturedSharkHero({
  feature,
  isCurrent,
  heading = "h2",
}: {
  feature: FeaturedShark;
  isCurrent: boolean;
  heading?: "h1" | "h2";
}) {
  const { species: shark, month, teaser } = feature;
  const Heading = heading;
  return (
    <section className="relative isolate grid items-center gap-6 md:grid-cols-2 md:gap-10">
      <div aria-hidden className="glitter absolute -inset-4 -z-10" />
      <div>
        <p className="eyebrow text-sm font-bold tracking-wide text-highlight uppercase">
          {isCurrent ? "Shark of the Month" : "Our latest Shark of the Month"} · {monthLabel(month)}
        </p>
        <Heading className="mt-1 font-display text-4xl font-semibold sm:text-5xl">
          {shark.commonName}
        </Heading>
        <p className="italic text-muted">{shark.scientificName}</p>
        <p className="mt-3 text-lg">{teaser}</p>
        <p className="mt-3 text-sm text-muted">
          {sizeBandLabel(sizeBand(shark.maxLengthCm))} · up to {formatLength(shark.maxLengthCm)}
        </p>
        <div className="mt-2">
          <ConservationLabel code={shark.iucnStatus} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton href={`/sharks/${shark.slug}`}>Meet the {shark.commonName}</LinkButton>
          <LinkButton href="/shark-of-the-month/archive" variant="ghost">
            Past sharks
          </LinkButton>
        </div>
      </div>
      <div className="relative">
        <SharkPicture
          name={shark.commonName}
          slug={shark.slug}
          imageUrl={shark.imageUrl}
          imageCredit={shark.imageCredit}
          imageCreditUrl={shark.imageCreditUrl}
          priority
        />
        <Sparkle size={22} className="-top-2.5 -right-1.5" delay={0.2} />
        <Sparkle
          size={12}
          tone="accent"
          className="top-1/3 -left-2 hidden sm:block"
          delay={1.1}
          duration={5}
        />
        <Sparkle size={16} className="-bottom-3 left-1/4" delay={2.1} duration={4.5} />
        <Sparkle
          size={9}
          tone="accent"
          className="-bottom-1 -right-2 hidden sm:block"
          delay={0.8}
          duration={3}
        />
      </div>
    </section>
  );
}

/** The month's page body: a quick-facts panel under the hero. */
export function FeaturedExtras({ feature }: { feature: FeaturedShark }) {
  const { species: shark } = feature;
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl font-semibold">The weird bit</h2>
        <p className="mt-2">{shark.weirdBit}</p>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl font-semibold">Size, compared with you</h2>
        <div className="mt-3">
          <SizeBar name={shark.commonName} lengthCm={shark.maxLengthCm} />
        </div>
      </div>
      <div className="rounded-2xl border border-line bg-surface p-5 md:col-span-2">
        <h2 className="font-display text-xl font-semibold">What it eats</h2>
        <p className="mt-2">{shark.diet}</p>
        <p className="mt-3 text-sm">
          <Link href={`/sharks/${shark.slug}`} className="underline underline-offset-4">
            See the full profile and sources
          </Link>
        </p>
      </div>
    </div>
  );
}
