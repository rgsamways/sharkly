import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  return indexingAllowed()
    ? { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] } }
    : { rules: { userAgent: "*", disallow: "/" } };
}
