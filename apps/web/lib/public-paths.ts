import { quizResults } from "@/content/quiz";
import { speciesEntries } from "@/content/species";

/** The pages anyone can open and that belong in search results. Private pages are not here. */
const STATIC_PATHS = [
  "/",
  "/sharks",
  "/sharks/sizes",
  "/compare",
  "/shark-of-the-month",
  "/shark-of-the-month/archive",
  "/facts",
  "/quiz",
  "/vote",
  "/credits",
  "/privacy",
  "/terms",
  "/join",
];

/** Every public page, in a fixed order with no repeats: the main pages, sharks, then quiz results. */
export function publicPaths(): string[] {
  return [
    ...new Set([
      ...STATIC_PATHS,
      ...speciesEntries.map((s) => `/sharks/${s.slug}`),
      ...quizResults.map((r) => `/quiz/result/${r.slug}`),
    ]),
  ];
}
