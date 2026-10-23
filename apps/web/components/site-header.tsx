import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/content/site";
import { HeaderAccount, SignedOutLinks } from "./header-account";
import { Sparkle } from "./sparkle";

/**
 * Logo and account buttons on one row. The site menu sits under them on a phone as a strip that
 * scrolls sideways if it ever gets long, and moves up beside the logo on wider screens.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6 md:flex-nowrap">
        <Link href="/" className="font-display text-2xl font-semibold text-accent">
          <span aria-hidden>🦈 </span>
          <span className="relative inline-block pr-3">
            <span className="logo-shimmer">{site.name}</span>
            <Sparkle size={11} className="-top-0.5 right-0" delay={0.4} />
            <Sparkle size={6} tone="accent" className="top-3.5 -right-1" delay={1.6} duration={3} />
          </span>
        </Link>
        <nav
          aria-label="Main"
          className="order-3 -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:order-none md:mx-0 md:w-auto md:flex-1 md:overflow-visible md:px-0 md:pb-0"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full bg-surface-2 px-4 text-sm whitespace-nowrap text-muted hover:text-fg md:bg-transparent md:px-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <Suspense fallback={<SignedOutLinks />}>
            <HeaderAccount />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
