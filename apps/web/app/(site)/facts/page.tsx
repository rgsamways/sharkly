import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { FactCard, MythCard } from "@/components/fact-card";
import { FACT_TOPICS, parseFactTopic, type FactTopic } from "@/lib/fact-rules";
import { countFactsByTopic, listFacts } from "@/lib/facts";

export const metadata: Metadata = {
  title: "Shark facts",
  description: "Short, sourced facts about sharks, and straight answers to popular myths.",
};

export default function FactsPage({ searchParams }: PageProps<"/facts">) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">Shark facts</h1>
      <p className="mt-2 text-lg text-muted">
        Short facts, and straight answers to things people say about sharks. Every one lists where
        we found it.
      </p>
      <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-2xl bg-surface-2" />}>
        <Library searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Library({ searchParams }: Pick<PageProps<"/facts">, "searchParams">) {
  await connection();
  const topic = parseFactTopic(await searchParams);
  const [entries, counts] = await Promise.all([listFacts(topic), countFactsByTopic()]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <TopicChoices current={topic} counts={counts} total={total} />
      {entries.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-line bg-surface p-6">
          Nothing here yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {entries.map((entry) =>
            entry.topic === "myths" ? (
              <MythCard key={entry.id} fact={entry} />
            ) : (
              <FactCard key={entry.id} fact={entry} />
            ),
          )}
        </ul>
      )}
    </>
  );
}

function TopicChoices({
  current,
  counts,
  total,
}: {
  current: FactTopic | null;
  counts: Record<string, number>;
  total: number;
}) {
  const choices: { href: string; label: string; count: number; active: boolean }[] = [
    { href: "/facts", label: "All", count: total, active: current === null },
    ...FACT_TOPICS.map((t) => ({
      href: `/facts?topic=${t.value}`,
      label: t.label,
      count: counts[t.value] ?? 0,
      active: current === t.value,
    })),
  ];
  return (
    <nav aria-label="Topics" className="mt-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-2 sm:flex-wrap">
        {choices.map((c) => (
          <li key={c.href} className="shrink-0">
            <Link
              href={c.href}
              aria-current={c.active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm whitespace-nowrap ${
                c.active
                  ? "border-accent bg-accent font-bold text-accent-fg"
                  : "border-line-strong bg-surface hover:border-fg"
              }`}
            >
              {c.label}
              <span className={c.active ? "opacity-80" : "text-muted"}>{c.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
