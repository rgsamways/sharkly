import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed()) return { rules: { userAgent: "*", disallow: "/" } };
  const base = (process.env.BETTER_AUTH_URL ?? "http://localhost:3500").replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
