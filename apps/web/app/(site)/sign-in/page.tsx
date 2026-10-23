import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/auth-forms";
import { safeNextPath } from "@/lib/safe-path";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function SignInPage({ searchParams }: PageProps<"/sign-in">) {
  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<SignInForm />}>
        <SignIn searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

/** A finished password reset sends people here with ?reset=1; ?next= is where they were going. */
async function SignIn({ searchParams }: Pick<PageProps<"/sign-in">, "searchParams">) {
  const { reset, next } = await searchParams;
  return <SignInForm passwordSaved={reset === "1"} next={safeNextPath(next)} />;
}
