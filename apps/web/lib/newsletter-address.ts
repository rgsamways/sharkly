import { site } from "@/content/site";

/**
 * The postal address printed in newsletters, or null when sending isn't allowed yet. Real
 * (production) sending needs the owners' address; while developing, a visible placeholder is used
 * so the layout can be checked.
 */
export function newsletterAddress(
  nodeEnv: string | undefined = process.env.NODE_ENV,
  address: string = site.postalAddress,
): string | null {
  const trimmed = address.trim();
  if (trimmed !== "") return trimmed;
  return nodeEnv === "production" ? null : "[Placeholder postal address]";
}
