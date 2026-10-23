import { describe, expect, it } from "vitest";
import { speciesEntries } from "@/content/species";
import { speciesImages } from "@/content/species-images";
import { ALLOWED_LICENSES, creditText, imageAtWidth } from "./species-images";

describe("species photos", () => {
  it("has a photo for every species and none for unknown ones", () => {
    const slugs = speciesEntries.map((s) => s.slug).sort();
    expect(Object.keys(speciesImages).sort()).toEqual(slugs);
  });

  it("only uses open licenses, Wikimedia addresses, and a link to the image's page", () => {
    for (const [slug, image] of Object.entries(speciesImages)) {
      expect(image.license, slug).toMatch(ALLOWED_LICENSES);
      expect(image.url, slug).toMatch(/^https:\/\/(upload|thumb)\.wikimedia\.org\//);
      // Either the 960 pixel version, or the original when it is smaller than that.
      expect(image.url, slug).toMatch(
        /(\/960px-|^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[0-9a-f]\/[0-9a-f]{2}\/[^/]+$)/,
      );
      expect(image.filePage, slug).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      // Only public domain files may leave out the photographer.
      if (!image.photographer) expect(image.license, slug).toMatch(/public domain/i);
    }
  });
});

describe("creditText", () => {
  it("names the photographer and license", () => {
    expect(creditText({ photographer: "Albert Kok", license: "CC BY-SA 3.0" })).toBe(
      "Photo: Albert Kok, CC BY-SA 3.0, via Wikimedia Commons",
    );
  });

  it("handles public domain with and without a name", () => {
    expect(creditText({ photographer: "NOAA", license: "Public domain" })).toBe(
      "Photo: NOAA (public domain), via Wikimedia Commons",
    );
    expect(creditText({ photographer: null, license: "Public domain" })).toBe(
      "Public domain photo, via Wikimedia Commons",
    );
  });
});

describe("imageAtWidth", () => {
  it("asks for the smaller size of the same picture", () => {
    expect(
      imageAtWidth(
        "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/X.jpg/960px-X.jpg",
        500,
      ),
    ).toBe("https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/X.jpg/500px-X.jpg");
  });
});
