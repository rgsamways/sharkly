import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/content/site";
import { HeaderAccount, SignedOutLinks } from "./header-account";
import { DesktopNav, MobileMenu } from "./site-nav";
import { Sparkle } from "./sparkle";

/**
 * One row: the menu button (phones), the logo, the main pages (wide screens) and the account
 * buttons. It stays at the top of the screen while the page scrolls.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-2.5 sm:px-6 md:gap-4">
        <MobileMenu items={site.nav} />
        {/* A block-level box, so the focus outline is a tidy rectangle around the logo only. */}
        <Link
          href="/"
          className="inline-flex items-center rounded-lg px-1 font-display text-2xl font-semibold text-accent"
        >
          <span aria-hidden>🦈&nbsp;</span>
          <span className="relative inline-block pr-3">
            <span className="logo-shimmer">{site.name}</span>
            <Sparkle size={11} className="-top-0.5 right-0" delay={0.4} />
            <Sparkle size={6} tone="accent" className="top-3.5 -right-1" delay={1.6} duration={3} />
          </span>
        </Link>
        <DesktopNav items={site.nav} />
        <div className="ml-auto">
          <Suspense fallback={<SignedOutLinks />}>
            <HeaderAccount />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
