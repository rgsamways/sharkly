import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { FeaturedExtras, FeaturedSharkHero } from "@/components/featured-shark";
import { LinkButton } from "@/components/link-button";
import { getCurrentFeature } from "@/lib/species";

export const metadata: Metadata = {
  title: "Shark of the Month",
  description: "Meet a new shark every month.",
};

export default function SharkOfTheMonthPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
        <Current />
      </Suspense>
    </main>
  );
}

async function Current() {
  await connection();
  const feature = await getCurrentFeature();
  if (!feature) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <h1 className="font-display text-4xl font-semibold">Our first shark is coming soon</h1>
        <p className="mt-3 text-lg text-muted">
          Every month we pick one shark and tell you everything good about it. While you wait, meet
          them all.
        </p>
        <div className="mt-6 flex justify-center">
          <LinkButton href="/sharks">Browse all the sharks</LinkButton>
        </div>
      </div>
    );
  }
  return (
    <>
      <FeaturedSharkHero feature={feature} isCurrent={feature.isCurrent} heading="h1" />
      <FeaturedExtras feature={feature} />
    </>
  );
}
