import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/link-button";
import { SharkPicture } from "@/components/shark-picture";
import { Sparkle } from "@/components/sparkle";
import { quizResults } from "@/content/quiz";
import { speciesImages } from "@/content/species-images";
import { quizResultPreview } from "@/lib/previews";
import { creditText } from "@/lib/species-images";

// These pages look up the address first so that an unknown one answers a real 404 straight away.
// Every real address is built ahead of time (generateStaticParams), so visitors still get them
// instantly. Saying so here tells Next the wait is on purpose.
export const instant = false;

export function generateStaticParams() {
  return quizResults.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/quiz/result/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return quizResultPreview(slug) ?? { title: "Which shark are you?" };
}

export default async function QuizResultPage({ params }: PageProps<"/quiz/result/[slug]">) {
  const { slug } = await params;
  const result = quizResults.find((r) => r.slug === slug);
  if (!result) notFound();
  const photo = speciesImages[result.slug];

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="eyebrow text-sm font-bold tracking-wide text-highlight uppercase">
        Which shark are you?
      </p>
      <div className="relative">
        <h1 className="mt-1 pr-8 font-display text-4xl font-semibold sm:text-5xl">
          You&apos;re a {result.title}!
        </h1>
        <Sparkle size={22} className="top-0 right-0" delay={0.3} />
        <Sparkle
          size={11}
          tone="accent"
          className="top-9 right-4 hidden sm:block"
          delay={1.4}
          duration={3.5}
        />
        <Sparkle size={14} className="bottom-1 right-1 hidden sm:block" delay={2.2} duration={5} />
        <Sparkle size={9} tone="accent" className="top-1/2 -left-3 hidden sm:block" delay={0.9} />
      </div>
      <div className="mt-6">
        <SharkPicture
          name={result.title}
          slug={result.slug}
          imageUrl={photo?.url ?? null}
          imageCredit={photo ? creditText(photo) : null}
          imageCreditUrl={photo?.filePage ?? null}
          priority
        />
      </div>
      <p className="mt-6 text-lg">{result.description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={`/sharks/${result.slug}`}>Meet the {result.title}</LinkButton>
        <LinkButton href="/quiz" variant="ghost">
          Take the quiz again
        </LinkButton>
      </div>
      <p className="mt-6 text-sm text-muted">
        Want a friend to see your shark? Send them this page&apos;s link.{" "}
        <Link href="/sharks" className="underline underline-offset-4">
          Browse all the sharks
        </Link>
      </p>
    </main>
  );
}
