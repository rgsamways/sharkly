import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import { site } from "@/content/site";
import { indexingAllowed } from "@/lib/indexing";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// The site's public address, so share-image paths become full web addresses. It is already set
// everywhere the site runs (it is also what sign-in uses).
const siteUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3500";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.tagline,
  openGraph: { siteName: site.name, type: "website", title: site.name, description: site.tagline },
  twitter: { card: "summary_large_image", title: site.name, description: site.tagline },
  // Kept out of search results until ALLOW_INDEXING=true.
  robots: indexingAllowed() ? undefined : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${fredoka.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
