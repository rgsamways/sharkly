import type { Metadata } from "next";
import Link from "next/link";
import { speciesEntries } from "@/content/species";
import { speciesImages } from "@/content/species-images";
import { imageAtWidth } from "@/lib/species-images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Who took the photos on Sharkly, and the licenses they are shared under.",
};

/** Every photo with its photographer and license. This page needs no database. */
export default function CreditsPage() {
  const rows = speciesEntries
    .map((s) => ({ species: s, image: speciesImages[s.slug] }))
    .filter(
      (r): r is { species: (typeof speciesEntries)[number]; image: NonNullable<typeof r.image> } =>
        Boolean(r.image),
    )
    .sort((a, b) => a.species.commonName.localeCompare(b.species.commonName));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">Photo credits</h1>
      <p className="mt-2 text-lg text-muted">
        Thank you to the photographers who share their pictures so everyone can learn about sharks.
        All of these come from{" "}
        <a
          href="https://commons.wikimedia.org/"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Wikimedia Commons
        </a>{" "}
        and are public domain or shared under a Creative Commons license.
      </p>
      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface">
        {rows.map(({ species, image }) => (
          <li key={species.slug} className="flex gap-4 p-3 sm:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- Wikimedia serves the sizes for us */}
            <img
              src={imageAtWidth(image.url, 500)}
              alt={species.commonName}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-24 shrink-0 rounded-lg bg-surface-2 object-cover sm:w-32"
            />
            <div className="min-w-0">
              <h2 className="font-display text-lg font-semibold">
                <Link
                  href={`/sharks/${species.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {species.commonName}
                </Link>
              </h2>
              <p className="text-sm">
                {image.photographer ? `Photo by ${image.photographer}` : "Photographer not named"}
                {" · "}
                {image.licenseUrl ? (
                  <a
                    href={image.licenseUrl}
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {image.license}
                  </a>
                ) : (
                  image.license
                )}
              </p>
              <p className="text-sm">
                <a
                  href={image.filePage}
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  See the original on Wikimedia Commons
                </a>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
