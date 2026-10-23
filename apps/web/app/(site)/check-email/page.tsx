import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Check your email", robots: { index: false } };

const MESSAGES: Record<string, { title: string; body: string }> = {
  "sign-in": {
    title: "Check your email",
    body: "If that address has an account, we've sent a link that signs you in. It works once and expires in 10 minutes.",
  },
  verify: {
    title: "Confirm your email",
    body: "We've sent you a link to confirm your email address. Open it to finish joining. Can't see it? Look in your junk folder.",
  },
  reset: {
    title: "Check your email",
    body: "If that address has an account, we've sent a link to choose a new password.",
  },
};

export default function CheckEmailPage({ searchParams }: PageProps<"/check-email">) {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16">
      <Suspense fallback={null}>
        <Message searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Message({ searchParams }: Pick<PageProps<"/check-email">, "searchParams">) {
  const raw = await searchParams;
  const kind = typeof raw.kind === "string" && raw.kind in MESSAGES ? raw.kind : "sign-in";
  const message = MESSAGES[kind]!;
  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto mb-6 grid size-[72px] place-items-center rounded-full border-2 border-highlight text-highlight">
        <Mail className="size-8" aria-hidden />
      </div>
      <h1 className="font-display text-3xl font-semibold">{message.title}</h1>
      <p className="mt-3 text-muted">{message.body}</p>
    </div>
  );
}
