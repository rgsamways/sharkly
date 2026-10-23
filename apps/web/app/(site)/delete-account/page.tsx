import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { ConfirmDelete } from "@/components/delete-account";
import { LinkButton } from "@/components/link-button";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = { title: "Delete your account", robots: { index: false } };

export default function DeleteAccountPage({ searchParams }: PageProps<"/delete-account">) {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-surface-2" />}>
        <Confirmation searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Confirmation({ searchParams }: Pick<PageProps<"/delete-account">, "searchParams">) {
  await connection();
  const raw = await searchParams;
  const token = typeof raw.token === "string" ? raw.token : "";

  if (!token) {
    return (
      <div className="rounded-xl border border-line bg-surface p-5 sm:p-8">
        <h1 className="font-display text-3xl font-semibold">This link isn&apos;t valid</h1>
        <p className="mt-3 text-muted">
          Ask for a new one from your account page. Nothing has been deleted.
        </p>
        <div className="mt-5">
          <LinkButton href="/account">Go to my account</LinkButton>
        </div>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    const back = `/delete-account?token=${encodeURIComponent(token)}`;
    return (
      <div className="rounded-xl border border-line bg-surface p-5 sm:p-8">
        <h1 className="font-display text-3xl font-semibold">Sign in to continue</h1>
        <p className="mt-3 text-muted">
          To delete your account, sign in first. We&rsquo;ll bring you straight back here. Nothing
          has been deleted.
        </p>
        <div className="mt-5">
          <LinkButton href={`/sign-in?next=${encodeURIComponent(back)}`}>Sign in</LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-bad/40 bg-surface p-5 sm:p-8">
      <h1 className="font-display text-3xl font-semibold">Delete your account?</h1>
      <p className="mt-3">
        You&rsquo;re signed in as <strong className="break-all">{user.email}</strong>. If you
        continue, we will permanently remove:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        <li>your account, name and email address</li>
        <li>your password</li>
        <li>your sign-in records</li>
        <li>your votes</li>
      </ul>
      <p className="mt-3 text-muted">
        This can&rsquo;t be undone. You&rsquo;re welcome to join again later with a fresh account.
      </p>
      <div className="mt-6">
        <ConfirmDelete token={token} />
      </div>
      <p className="mt-6 text-sm text-muted">
        Changed your mind? Just close this page, or{" "}
        <Link href="/account" className="underline underline-offset-4">
          go back to your account
        </Link>
        .
      </p>
    </div>
  );
}
