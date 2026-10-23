import { topicLabel, VERDICTS, type Verdict } from "@/lib/fact-rules";
import type { Fact } from "@/lib/facts";

function Sources({ sources }: { sources: Fact["sources"] }) {
  return (
    <p className="mt-3 text-sm text-muted">
      Sources:{" "}
      {sources.map((source, i) => (
        <span key={source.url}>
          {i > 0 && ", "}
          <a href={source.url} rel="noopener noreferrer" className="underline underline-offset-4">
            {source.label}
          </a>
        </span>
      ))}
    </p>
  );
}

/** A plain fact: a headline, a short paragraph, and where it came from. */
export function FactCard({ fact }: { fact: Fact }) {
  return (
    <li
      id={fact.slug}
      className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 target:border-accent"
    >
      <p className="text-xs font-bold tracking-wide text-highlight uppercase">
        {topicLabel(fact.topic)}
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold">{fact.title}</h3>
      <p className="mt-2">{fact.body}</p>
      <Sources sources={fact.sources} />
    </li>
  );
}

/** A "myth or fact?" entry: the claim, the verdict in words and a symbol, then the answer. */
export function MythCard({ fact }: { fact: Fact }) {
  const verdict = VERDICTS[(fact.verdict as Verdict) ?? "partly"] ?? VERDICTS.partly;
  return (
    <li
      id={fact.slug}
      className="scroll-mt-24 rounded-2xl border border-line bg-surface p-5 target:border-accent"
    >
      <p className="text-xs font-bold tracking-wide text-highlight uppercase">Myth or fact?</p>
      <h3 className="mt-1 font-display text-xl font-semibold">&ldquo;{fact.title}&rdquo;</h3>
      <div className="mt-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-sm font-bold">
          <span aria-hidden>{verdict.symbol}</span>
          {verdict.label}
        </span>
        <p className="mt-2 font-semibold">{fact.shortAnswer}</p>
      </div>
      <p className="mt-3">{fact.body}</p>
      <Sources sources={fact.sources} />
    </li>
  );
}
