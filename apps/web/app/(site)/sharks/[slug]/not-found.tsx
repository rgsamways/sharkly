import Link from "next/link";
import { LinkButton } from "@/components/link-button";

export default function SharkNotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="font-display text-3xl font-semibold">We couldn&apos;t find that shark</h1>
      <p className="mt-3 text-muted">
        Maybe it swam off, or the address has a typo. Here is the whole school of them.
      </p>
      <div className="mt-6 flex justify-center">
        <LinkButton href="/sharks">See all the sharks</LinkButton>
      </div>
      <p className="mt-4 text-sm">
        <Link href="/" className="underline underline-offset-4">
          Back to the home page
        </Link>
      </p>
    </div>
  );
}
