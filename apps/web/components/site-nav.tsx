"use client";

import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isCurrentPath } from "@/lib/nav";

export interface NavItem {
  label: string;
  href: string;
}

const linkState =
  "text-muted hover:bg-surface-2 hover:text-fg aria-[current=page]:bg-surface-2 aria-[current=page]:font-semibold aria-[current=page]:text-fg";

/** The main pages as links in the header, from the medium screen size up. */
export function DesktopNav({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 md:flex md:flex-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={isCurrentPath(item.href, pathname) ? "page" : undefined}
          className={`inline-flex min-h-10 items-center rounded-full px-3 text-sm whitespace-nowrap ${linkState}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

/**
 * The phone menu: a native disclosure (so it works even before scripts load) with a little script
 * to close it when a page is chosen, on Escape, and when someone taps outside it.
 */
export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);

  // Choosing a page closes the menu.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const close = (returnFocus: boolean) => {
      const details = ref.current;
      if (!details?.open) return;
      details.open = false;
      if (returnFocus) details.querySelector("summary")?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  return (
    <details ref={ref} className="group relative md:hidden">
      <summary
        aria-label="Menu"
        className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-line-strong bg-surface text-fg transition-colors hover:border-accent [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5 group-open:hidden" aria-hidden />
        <X className="hidden size-5 group-open:block" aria-hidden />
      </summary>
      <nav
        aria-label="Main"
        className="menu-panel absolute top-full left-0 z-50 mt-2 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-2 shadow-xl"
      >
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrentPath(item.href, pathname) ? "page" : undefined}
                className={`flex min-h-12 items-center rounded-xl px-4 text-base ${linkState}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2 border-t border-line pt-2">
          <Link
            href="/account"
            className={`flex min-h-12 items-center gap-3 rounded-xl px-4 text-base ${linkState}`}
          >
            <UserRound className="size-5" aria-hidden />
            Account and sign in
          </Link>
        </div>
      </nav>
    </details>
  );
}
