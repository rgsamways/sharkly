import { describe, expect, it } from "vitest";
import { speciesEntries } from "@/content/species";
import { votingRounds, type VotingRound } from "@/content/voting";
import { openRound } from "./voting";

const round = (month: string): VotingRound => ({ month, candidates: ["a", "b"], hooks: {} });

describe("openRound", () => {
  it("opens the round for a month that has not started", () => {
    expect(openRound(new Date("2026-10-23T15:00:00Z"), [round("2027-04")])?.month).toBe("2027-04");
  });

  it("closes once the month has started (Toronto time)", () => {
    // 03:59 UTC on 1 April is still 31 March in Toronto, so voting for April is open.
    expect(openRound(new Date("2027-04-01T03:59:00Z"), [round("2027-04")])?.month).toBe("2027-04");
    // 04:00 UTC is midnight in Toronto: April has begun.
    expect(openRound(new Date("2027-04-01T04:00:00Z"), [round("2027-04")])).toBeNull();
  });

  it("picks the earliest upcoming round", () => {
    const rounds = [round("2027-06"), round("2027-05"), round("2026-01")];
    expect(openRound(new Date("2027-04-10T12:00:00Z"), rounds)?.month).toBe("2027-05");
  });

  it("returns null when there are no rounds left", () => {
    expect(openRound(new Date("2030-01-01T12:00:00Z"))).toBeNull();
  });
});

describe("voting content", () => {
  it("offers at least two candidates, all real species with a hook", () => {
    const known = new Set(speciesEntries.map((s) => s.slug));
    for (const r of votingRounds) {
      expect(r.month).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      expect(r.candidates.length).toBeGreaterThanOrEqual(2);
      for (const slug of r.candidates) {
        expect(known.has(slug), slug).toBe(true);
        expect(r.hooks[slug]?.trim(), `hook for ${slug}`).toBeTruthy();
      }
    }
  });
});
