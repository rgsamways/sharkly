import { describe, expect, it } from "vitest";
import { quizResults } from "@/content/quiz";
import { speciesEntries } from "@/content/species";
import { publicPaths } from "./public-paths";

describe("publicPaths", () => {
  const paths = publicPaths();

  it("lists every shark profile and every quiz result", () => {
    for (const s of speciesEntries) expect(paths).toContain(`/sharks/${s.slug}`);
    for (const r of quizResults) expect(paths).toContain(`/quiz/result/${r.slug}`);
  });

  it("has no repeats and every path starts with a slash", () => {
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p.startsWith("/")).toBe(true);
  });

  it("leaves out the private pages", () => {
    for (const p of paths) {
      expect(p).not.toMatch(
        /^\/(account|sign-in|check-email|forgot-password|reset-password|auth|api)/,
      );
    }
  });
});
