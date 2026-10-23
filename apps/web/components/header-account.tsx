import { getCurrentUser } from "@/lib/session";
import { LinkButton } from "./link-button";
import { UserMenu } from "./user-menu";

/** What a signed-out visitor sees, and what every page shows first. */
export function SignedOutLinks() {
  return (
    <div className="flex items-center gap-2">
      {/* Phones sign in from the menu, which keeps the header on one row. */}
      <span className="hidden sm:block">
        <LinkButton href="/sign-in" variant="ghost" className="px-4">
          Sign in
        </LinkButton>
      </span>
      <LinkButton href="/join" className="px-4">
        <span className="sm:hidden">Join</span>
        <span className="hidden sm:inline">Join the club</span>
      </LinkButton>
    </div>
  );
}

/**
 * The header's account area. Reading who is signed in makes it per-visitor, so it sits inside a
 * Suspense boundary with the signed-out buttons as the fallback, which keeps the pages cached.
 */
export async function HeaderAccount() {
  const user = await getCurrentUser();
  if (!user) return <SignedOutLinks />;
  return <UserMenu name={user.name} email={user.email} />;
}
