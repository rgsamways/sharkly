/**
 * Whether search engines may list the site. Off by default, so a site that is live but still has
 * placeholder wording never gets filler into search results. Set ALLOW_INDEXING=true when the real
 * words are in and the site is ready to be found.
 */
export function indexingAllowed(value: string | undefined = process.env.ALLOW_INDEXING): boolean {
  return value === "true";
}
