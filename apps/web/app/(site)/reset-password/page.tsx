import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth-forms";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = { title: "Choose a password", robots: { index: false } };

export default function ResetPasswordPage({ searchParams }: PageProps<"/reset-password">) {
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={null}>
        <Form searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Form({ searchParams }: Pick<PageProps<"/reset-password">, "searchParams">) {
  const raw = await searchParams;
  const token = typeof raw.token === "string" ? raw.token : "";
  if (!token || typeof raw.error === "string") {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold">This link isn&apos;t valid</h1>
        <p className="mt-3 text-muted">
          It may have expired or already been used. Ask for a new one.
        </p>
        <div className="mt-6 flex justify-center">
          <LinkButton href="/forgot-password" variant="ghost">
            Send me a new link
          </LinkButton>
        </div>
      </div>
    );
  }
  return <ResetPasswordForm token={token} />;
}
