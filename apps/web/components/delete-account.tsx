"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

/** Step one: ask for the link. Nothing is deleted by pressing this. */
export function RequestDeleteButton() {
  const [state, setState] = useState<"idle" | "sent" | "problem">("idle");
  const [pending, startTransition] = useTransition();

  function request() {
    startTransition(async () => {
      const { error } = await authClient.deleteUser({});
      setState(error ? "problem" : "sent");
    });
  }

  if (state === "sent") {
    return (
      <p className="rounded-xl bg-surface-2 p-4" role="status">
        We&rsquo;ve emailed you a link. Open it to review and confirm. Nothing has been deleted yet,
        and the link works once for an hour. Can&rsquo;t see it? Check your junk folder.
      </p>
    );
  }
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={request}
        className="h-11 border-bad text-bad hover:bg-bad/10"
      >
        {pending ? "Sending…" : "Email me a link to delete my account"}
      </Button>
      {state === "problem" && (
        <p className="mt-3 text-sm text-bad" role="alert">
          Something went wrong. Please try again in a minute.
        </p>
      )}
    </div>
  );
}

/** Step two: the explicit confirmation, on our own page. */
export function ConfirmDelete({ token }: { token: string }) {
  const router = useRouter();
  const [problem, setProblem] = useState(false);
  const [pending, startTransition] = useTransition();

  function confirm() {
    setProblem(false);
    startTransition(async () => {
      const { error } = await authClient.deleteUser({ token });
      if (error) {
        setProblem(true);
        return;
      }
      router.push("/goodbye");
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          disabled={pending}
          onClick={confirm}
          className="h-12 bg-bad text-base text-white hover:bg-bad/90"
        >
          {pending ? "Deleting…" : "Yes, delete my account"}
        </Button>
        <Link
          href="/account"
          className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-base font-bold hover:border-fg"
        >
          No, keep my account
        </Link>
      </div>
      {problem && (
        <p className="mt-4 text-sm text-bad" role="alert">
          This link has expired, was already used, or belongs to a different account. Nothing was
          deleted.{" "}
          <Link href="/account" className="underline underline-offset-4">
            Ask for a new link from your account page.
          </Link>
        </p>
      )}
    </div>
  );
}
