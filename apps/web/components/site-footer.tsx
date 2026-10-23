import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-sm text-muted sm:px-6">
        <p>{site.name} · Sharks are amazing. Come back next month for another one.</p>
        <nav aria-label="Site information" className="flex flex-wrap gap-x-5">
          {[
            { href: "/credits", label: "Photo credits" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center underline underline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
