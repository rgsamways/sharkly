import { describe, expect, it } from "vitest";
import { quizResults } from "@/content/quiz";
import { speciesEntries } from "@/content/species";
import { quizResultPreview, sharkPreview } from "./previews";

type Preview = NonNullable<ReturnType<typeof sharkPreview>>;
const imageOf = (m: Preview): string | undefined => {
  const images = m.openGraph?.images;
  const first = Array.isArray(images) ? images[0] : images;
  return typeof first === "object" && first && "url" in first ? String(first.url) : undefined;
};

describe("share previews", () => {
  it("gives every shark a title, a description under 200 characters, and an https photo", () => {
    for (const s of speciesEntries) {
      const m = sharkPreview(s.slug)!;
      expect(m.title, s.slug).toBe(s.commonName);
      expect(String(m.description).length, s.slug).toBeLessThanOrEqual(200);
      expect(imageOf(m), s.slug).toMatch(/^https:\/\//);
    }
  });

  it("gives every quiz result a first-person title and the shark's photo", () => {
    for (const r of quizResults) {
      const m = quizResultPreview(r.slug)!;
      expect(m.title).toBe(`I'm a ${r.title}!`);
      expect(imageOf(m), r.slug).toMatch(/^https:\/\//);
    }
  });

  it("returns nothing for an unknown shark or result", () => {
    expect(sharkPreview("not-a-shark")).toBeNull();
    expect(quizResultPreview("not-a-shark")).toBeNull();
  });
});
