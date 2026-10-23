import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { LinkButton } from "@/components/link-button";
import { SharkPicture } from "@/components/shark-picture";
import { Button } from "@/components/ui/button";
import { speciesEntries } from "@/content/species";
import { speciesImages } from "@/content/species-images";
import { getCurrentUser } from "@/lib/session";
import { monthLabel } from "@/lib/species-rules";
import { getMyVote, getTally } from "@/lib/votes";
import { openRound } from "@/lib/voting";
import { castVote } from "./actions";

export const metadata: Metadata = {
  title: "Vote for the next shark",
  description: "Club members help choose a future Shark of the Month.",
};

export default function VotePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
        <Round />
      </Suspense>
    </main>
  );
}

async function Round() {
  await connection();
  const round = openRound();
  if (!round) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <h1 className="font-display text-4xl font-semibold">Voting is closed for now</h1>
        <p className="mt-3 text-lg text-muted">
          We open a new vote every so often. Meanwhile, meet this month&apos;s shark.
        </p>
        <div className="mt-6 flex justify-center">
          <LinkButton href="/shark-of-the-month">Shark of the Month</LinkButton>
        </div>
      </div>
    );
  }

  const user = await getCurrentUser();
  const myVote = user ? await getMyVote(user.id, round.month) : null;
  // The counts are only fetched for someone who has voted, so they cannot sway anyone's choice.
  const tally = myVote ? await getTally(round.month) : null;
  const total = tally ? Object.values(tally).reduce((a, b) => a + b, 0) : 0;

  return (
    <>
      <p className="eyebrow text-sm font-bold tracking-wide text-highlight uppercase">Club vote</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">
        Help choose {monthLabel(round.month)}&apos;s shark
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-muted">
        Three sharks, one winner. Members vote for the one they most want to meet.
      </p>

      {!user && (
        <div className="mt-6 rounded-2xl border-l-4 border-highlight bg-surface-2 p-4 sm:p-5">
          <p className="font-semibold">Join the club to vote. It&apos;s free.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <LinkButton href="/join">Join the club</LinkButton>
            <LinkButton href="/sign-in?next=%2Fvote" variant="ghost">
              Sign in
            </LinkButton>
          </div>
        </div>
      )}

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {round.candidates.map((slug) => {
          const shark = speciesEntries.find((s) => s.slug === slug)!;
          const photo = speciesImages[slug];
          const chosen = myVote === slug;
          const count = tally?.[slug] ?? 0;
          return (
            <li
              key={slug}
              className={`rounded-2xl border bg-surface p-3 ${chosen ? "border-accent" : "border-line"}`}
            >
              <SharkPicture
                name={shark.commonName}
                slug={slug}
                imageUrl={photo?.url ?? null}
                imageCredit={null}
                width={500}
              />
              <h2 className="mt-3 font-display text-xl font-semibold">{shark.commonName}</h2>
              <p className="mt-1 text-sm">{round.hooks[slug]}</p>
              <p className="mt-2 text-sm">
                <a href={`/sharks/${slug}`} className="underline underline-offset-4">
                  See the full profile
                </a>
              </p>

              {tally && (
                <div className="mt-3">
                  <div className="flex justify-between text-sm">
                    <span>{chosen ? "Your vote" : "Votes"}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                  <div
                    className="mt-1 h-2.5 rounded-full bg-surface-3"
                    role="img"
                    aria-label={`${count} of ${total} votes`}
                  >
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${total ? Math.round((count / total) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              )}

              {user && (
                <form action={castVote} className="mt-3">
                  <input type="hidden" name="candidate" value={slug} />
                  <Button
                    type="submit"
                    variant={chosen ? "secondary" : "default"}
                    disabled={chosen}
                    className="h-11 w-full"
                  >
                    {chosen
                      ? "✓ Your vote"
                      : myVote
                        ? "Change my vote to this"
                        : "Vote for this shark"}
                  </Button>
                </form>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-sm text-muted">
        {myVote
          ? "Thanks for voting! You can change your vote while the round is open."
          : "The results appear after you vote, so nobody is swayed by the totals."}
      </p>
    </>
  );
}
