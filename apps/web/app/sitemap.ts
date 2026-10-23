import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";
import { publicPaths } from "@/lib/public-paths";

/** Every public page, as full addresses. Empty while indexing is off, so we never advertise pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingAllowed()) return [];
  const base = (process.env.BETTER_AUTH_URL ?? "http://localhost:3500").replace(/\/$/, "");
  return publicPaths().map((path) => ({ url: `${base}${path === "/" ? "" : path}` }));
}
