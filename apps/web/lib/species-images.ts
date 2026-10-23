import type { SpeciesImage } from "@/content/species-images";

/** The licenses we accept. Anything else is refused when the content is loaded. */
export const ALLOWED_LICENSES = /^(public domain|cc0|cc by \d\.\d|cc by-sa \d\.\d)$/i;

/** The visible credit line, for example "Photo: Albert Kok, CC BY-SA 3.0, via Wikimedia Commons". */
export function creditText(image: Pick<SpeciesImage, "photographer" | "license">): string {
  const publicDomain = /^public domain$/i.test(image.license);
  if (publicDomain) {
    return image.photographer
      ? `Photo: ${image.photographer} (public domain), via Wikimedia Commons`
      : "Public domain photo, via Wikimedia Commons";
  }
  return `Photo: ${image.photographer ?? "Unknown"}, ${image.license}, via Wikimedia Commons`;
}

/**
 * Wikimedia makes the same picture at several fixed widths, named by the width in the address.
 * We store the 960 pixel address and ask for a smaller one (for example 500) where a card is small.
 */
export function imageAtWidth(url: string, width: 500 | 960): string {
  return url.replace(/\/\d+px-/, `/${width}px-`);
}
