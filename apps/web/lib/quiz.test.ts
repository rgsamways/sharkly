import { describe, expect, it } from "vitest";
import { quizQuestions, quizResults } from "@/content/quiz";
import { speciesEntries } from "@/content/species";
import { readAnswers, scoreQuiz } from "./quiz";

const answers = (pick: number) => quizQuestions.map(() => pick);

describe("scoreQuiz", () => {
  it("gives the same shark for the same answers", () => {
    expect(scoreQuiz(answers(0))).toBe(scoreQuiz(answers(0)));
    expect(scoreQuiz(answers(0))).not.toBeNull();
  });

  it("settles a tie by the order sharks are listed in", () => {
    const results = [{ slug: "a" }, { slug: "b" }];
    const option = (points: string[]) => ({ label: "x", points });
    const questions = [
      { prompt: "q", options: [option(["b"]), option(["a"]), option([]), option([])] },
    ] as unknown as Parameters<typeof scoreQuiz>[1];
    // Picking option 0 gives "b" the only point, option 1 gives "a" the only point, and options 2
    // and 3 give nobody a point, which is a tie that goes to the shark listed first.
    expect(scoreQuiz([0], questions, results)).toBe("b"); // b has the only point
    expect(scoreQuiz([1], questions, results)).toBe("a");
    expect(scoreQuiz([2], questions, results)).toBe("a"); // 0-0 tie goes to the first listed
  });

  it("refuses unanswered or invalid answers", () => {
    expect(scoreQuiz([0, 1, 2])).toBeNull();
    expect(scoreQuiz([...answers(0).slice(1), 4])).toBeNull();
    expect(scoreQuiz([...answers(0).slice(1), -1])).toBeNull();
    expect(scoreQuiz([...answers(0).slice(1), "0"])).toBeNull();
  });

  it("can reach every shark", () => {
    // Try every combination of answers (4^6 = 4096) and collect the sharks that come out.
    const reached = new Set<string>();
    for (let n = 0; n < 4 ** quizQuestions.length; n++) {
      const picks = quizQuestions.map((_, i) => Math.floor(n / 4 ** i) % 4);
      reached.add(scoreQuiz(picks)!);
    }
    expect([...reached].sort()).toEqual(quizResults.map((r) => r.slug).sort());
  });
});

describe("quiz content", () => {
  it("links every result to a real species", () => {
    const known = new Set(speciesEntries.map((s) => s.slug));
    for (const result of quizResults) expect(known.has(result.slug)).toBe(true);
  });

  it("only awards points to sharks that exist", () => {
    const slugs = new Set(quizResults.map((r) => r.slug));
    for (const q of quizQuestions) {
      for (const o of q.options) for (const p of o.points) expect(slugs.has(p)).toBe(true);
    }
  });
});

describe("readAnswers", () => {
  it("keeps valid choices and leaves the rest unanswered", () => {
    const params = new URLSearchParams("q1=0&q2=3&q3=4&q4=x&q6=2");
    expect(readAnswers(params)).toEqual([0, 3, null, null, null, 2]);
  });
});
