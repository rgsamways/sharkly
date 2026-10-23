"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";

/** Ends the session and goes to the home page. Used by every Sign out on the site. */
export function useSignOut() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const signOut = () =>
    startTransition(async () => {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    });
  return { signOut, pending };
}
