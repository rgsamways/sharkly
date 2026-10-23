import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted sm:px-6">
        {site.name} · Sharks are amazing. Come back next month for another one.
      </div>
    </footer>
  );
}
