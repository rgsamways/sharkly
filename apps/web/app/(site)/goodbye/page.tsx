import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";

export const metadata: Metadata = { title: "Goodbye", robots: { index: false } };

export default function GoodbyePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-12 text-center sm:px-6 sm:py-16">
      <div aria-hidden className="text-5xl">
        👋
      </div>
      <h1 className="mt-4 font-display text-4xl font-semibold">Your account is deleted</h1>
      <p className="mt-3 text-lg text-muted">
        Your account, sign-in records and votes have been removed. Thank you for spending time with
        the sharks. You can still read everything on Sharkly, and you&rsquo;re welcome to join again
        whenever you like.
      </p>
      <div className="mt-6 flex justify-center">
        <LinkButton href="/">Back to Sharkly</LinkButton>
      </div>
    </main>
  );
}
