import { quizQuestions, quizResults, type QuizQuestion, type QuizResult } from "@/content/quiz";

export const QUIZ_QUESTION_COUNT = quizQuestions.length;

/**
 * Turns the chosen answers into a result slug. `answers[i]` is the option index (0 to 3) picked
 * for question i. Each chosen option gives a point to the sharks it lists; the most points wins,
 * and a tie goes to whichever shark comes first in `quizResults`. Returns null unless every
 * question has a valid answer, so a half-finished submission never gets a result.
 */
export function scoreQuiz(
  answers: readonly unknown[],
  questions: readonly QuizQuestion[] = quizQuestions,
  results: readonly Pick<QuizResult, "slug">[] = quizResults,
): string | null {
  if (answers.length !== questions.length) return null;

  const points = new Map<string, number>(results.map((r) => [r.slug, 0]));
  for (const [index, question] of questions.entries()) {
    const answer = answers[index];
    if (typeof answer !== "number" || !Number.isInteger(answer)) return null;
    const option = question.options[answer];
    if (!option) return null;
    for (const slug of option.points) points.set(slug, (points.get(slug) ?? 0) + 1);
  }

  let winner = results[0]!.slug;
  for (const result of results) {
    if (points.get(result.slug)! > points.get(winner)!) winner = result.slug;
  }
  return winner;
}

/** Reads q1..q6 from a form submission. Anything missing or not 0 to 3 stays unanswered. */
export function readAnswers(params: URLSearchParams): (number | null)[] {
  return quizQuestions.map((_, i) => {
    const raw = params.get(`q${i + 1}`);
    return raw !== null && /^[0-3]$/.test(raw) ? Number(raw) : null;
  });
}
