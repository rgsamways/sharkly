import { redirect } from "next/navigation";
import { Suspense } from "react";
import { safeNextPath } from "@/lib/safe-path";
import { getCurrentUser } from "@/lib/session";

export const metadata = { robots: { index: false } };

/** Where every sign-in lands. Sends members on to where they were going, or to their account. */
export default function ContinuePage({ searchParams }: PageProps<"/auth/continue">) {
  return (
    <Suspense fallback={null}>
      <Route searchParams={searchParams} />
    </Suspense>
  );
}

async function Route({ searchParams }: Pick<PageProps<"/auth/continue">, "searchParams">) {
  const user = await getCurrentUser();
  if (!user) return redirect("/sign-in");
  const { next } = await searchParams;
  return redirect(safeNextPath(next));
}
