import type { Metadata } from "next";
import { Suspense } from "react";
import { SignOutButton } from "@/components/auth-forms";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Suspense
        fallback={<div className="h-40 animate-pulse rounded-xl border border-line bg-surface" />}
      >
        <AccountContents />
      </Suspense>
    </main>
  );
}

async function AccountContents() {
  const user = await requireUser("/account");
  return (
    <section className="rounded-xl border border-line bg-surface p-5 sm:p-8">
      <h1 className="font-display text-3xl font-semibold">Your account</h1>
      <dl className="mt-4 space-y-3">
        <div>
          <dt className="text-sm text-muted">Name</dt>
          <dd className="font-semibold break-words">{user.name}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Email</dt>
          <dd className="font-semibold break-all">{user.email}</dd>
        </div>
      </dl>
      <p className="mt-6 text-muted">
        You&rsquo;re in the club. Each month you&rsquo;ll meet a new shark here.
      </p>
      <div className="mt-6">
        <SignOutButton />
      </div>
    </section>
  );
}
