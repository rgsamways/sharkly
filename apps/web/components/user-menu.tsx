"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "./use-sign-out";

/**
 * The menu behind a signed-in member's button in the site header. Keyboard and screen reader
 * friendly (Radix), with big rows for fingers, and kept inside the screen on a phone.
 */
export function UserMenu({ name, email }: { name: string; email: string }) {
  const { signOut, pending } = useSignOut();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Your account"
        className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-fg transition-colors hover:border-highlight"
      >
        <UserRound className="size-5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        collisionPadding={12}
        className="w-64 max-w-[calc(100vw-1.5rem)] p-1.5"
      >
        <DropdownMenuLabel className="px-2 py-2">
          <span className="block truncate text-sm font-semibold text-fg">{name}</span>
          <span className="block truncate text-xs font-normal text-muted">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="min-h-11 px-2 py-2">
          <Link href="/account">Your account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={pending}
          onSelect={(event) => {
            event.preventDefault();
            signOut();
          }}
          className="min-h-11 px-2 py-2"
        >
          {pending ? "Signing out…" : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
