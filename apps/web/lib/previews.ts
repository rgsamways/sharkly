import type { Metadata } from "next";
import { quizResults } from "@/content/quiz";
import { speciesEntries } from "@/content/species";
import { speciesImages } from "@/content/species-images";

/*
 * What a link to a shark or to a quiz result looks like when it is pasted into a message. Built
 * from the content files only, so it never needs the database.
 */

const shorten = (text: string, max = 200): string =>
  text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;

function withImage(
  title: string,
  description: string,
  image: string | undefined,
  alt: string,
): Metadata {
  const images = image ? [{ url: image, alt }] : undefined;
  return {
    title,
    description,
    openGraph: { title, description, ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
  };
}

/** The preview for a shark's profile page. Unknown slugs get nothing, so the page's own 404 shows. */
export function sharkPreview(slug: string): Metadata | null {
  const shark = speciesEntries.find((s) => s.slug === slug);
  if (!shark) return null;
  return withImage(
    shark.commonName,
    shorten(shark.summary),
    speciesImages[slug]?.url,
    shark.commonName,
  );
}

/** The preview for a "Which shark are you?" result. */
export function quizResultPreview(slug: string): Metadata | null {
  const result = quizResults.find((r) => r.slug === slug);
  if (!result) return null;
  return withImage(
    `I'm a ${result.title}!`,
    shorten(result.description),
    speciesImages[slug]?.url,
    result.title,
  );
}
