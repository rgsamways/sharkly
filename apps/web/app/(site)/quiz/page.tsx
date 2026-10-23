import type { Metadata } from "next";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/content/quiz";

export const metadata: Metadata = {
  title: "Which shark are you?",
  description: "Answer six quick questions and find out which shark matches you.",
};

export default function QuizPage({ searchParams }: PageProps<"/quiz">) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="font-display text-4xl font-semibold">Which shark are you?</h1>
      <p className="mt-2 text-lg text-muted">
        Six quick questions. Pick the answer that sounds most like you.
      </p>
      <Suspense fallback={null}>
        <MissingNote searchParams={searchParams} />
      </Suspense>
      <form action="/quiz/result" method="get" className="mt-6 space-y-6">
        {quizQuestions.map((question, qi) => (
          <fieldset
            key={question.prompt}
            className="rounded-2xl border border-line bg-surface p-4 sm:p-5"
          >
            <legend className="float-left w-full font-display text-xl font-semibold">
              <span className="text-highlight">{qi + 1}.</span> {question.prompt}
            </legend>
            <div className="clear-both grid gap-2 pt-3">
              {question.options.map((option, oi) => (
                <label key={option.label} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={`q${qi + 1}`}
                    value={oi}
                    required
                    className="peer sr-only"
                  />
                  <span className="flex min-h-11 items-center rounded-xl border border-line-strong px-4 py-2.5 transition-colors hover:border-accent peer-checked:border-accent peer-checked:bg-surface-2 peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <Button type="submit" className="h-12 w-full text-base">
          Show me my shark
        </Button>
      </form>
    </main>
  );
}

/** Shown when someone is sent back because a question was left blank. */
async function MissingNote({ searchParams }: Pick<PageProps<"/quiz">, "searchParams">) {
  const { missing } = await searchParams;
  if (!missing) return null;
  return (
    <p className="mt-4 rounded-xl border-l-4 border-highlight bg-surface-2 p-3" role="alert">
      Almost there! Please answer every question and try again.
    </p>
  );
}
