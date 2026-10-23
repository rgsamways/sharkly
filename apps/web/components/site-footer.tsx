import Link from "next/link";
import { site } from "@/content/site";

const explore = [
  { href: "/sharks", label: "All the sharks" },
  { href: "/sharks/sizes", label: "Size lineup" },
  { href: "/compare", label: "Compare sharks" },
  { href: "/shark-of-the-month", label: "Shark of the Month" },
  { href: "/facts", label: "Facts" },
  { href: "/quiz", label: "Quiz" },
  { href: "/vote", label: "Vote" },
];

const about = [
  { href: "/join", label: "Join the club" },
  { href: "/credits", label: "Photo credits" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const link =
  "inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-fg hover:underline";

function LinkGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <ul className="mt-1">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl font-semibold text-accent">
            <span aria-hidden>🦈&nbsp;</span>
            {site.name}
          </p>
          <p className="mt-2 max-w-xs text-balance text-muted">
            A new shark to meet every month, and facts for curious kids and grown-ups.
          </p>
        </div>
        <LinkGroup title="Explore" links={explore} />
        <LinkGroup title="About" links={about} />
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-4 text-sm text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>
            &copy; {site.since} {site.name}
          </p>
          <p>
            Photos from Wikimedia Commons, credited on the{" "}
            <Link href="/credits" className="underline underline-offset-4 hover:text-fg">
              photo credits
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </footer>
  );
}
