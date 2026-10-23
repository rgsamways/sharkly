import type { ReactNode } from "react";
import { site } from "@/content/site";

/** The frame for the privacy and terms pages: readable width, a title, and the update date. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">{title}</h1>
      <p className="mt-1 text-sm text-muted">Last updated {site.legalUpdated}</p>
      <div className="mt-6 space-y-6 text-base leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}

/** The contact section. It is left out until a mailbox that receives mail has been set. */
export function ContactSection() {
  if (!site.contactEmail) return null;
  return (
    <>
      <h2>Contact</h2>
      <p>
        Questions, or want your account deleted? Email{" "}
        <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
      </p>
    </>
  );
}
