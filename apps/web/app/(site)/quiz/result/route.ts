import { NextResponse } from "next/server";
import { readAnswers, scoreQuiz } from "@/lib/quiz";

/**
 * Scores a submitted quiz and sends the visitor to their result. The result itself lives at
 * /quiz/result/<slug>, so it can be shared. A missing or invalid answer goes back to the quiz.
 */
export function GET(request: Request): NextResponse {
  const url = new URL(request.url);
  const answers = readAnswers(url.searchParams);
  const slug = answers.includes(null) ? null : scoreQuiz(answers);
  const target = slug ? `/quiz/result/${slug}` : "/quiz?missing=1";
  return NextResponse.redirect(new URL(target, url), 303);
}
