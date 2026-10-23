import { describe, expect, it } from "vitest";
import { speciesEntries } from "@/content/species";
import { parseCompare, sizeLineup } from "./compare";

const sharks = [
  { slug: "small", commonName: "Small", maxLengthCm: 20 },
  { slug: "big", commonName: "Big", maxLengthCm: 1200 },
  { slug: "mid", commonName: "Mid", maxLengthCm: 400 },
  { slug: "tall", commonName: "Tall", maxLengthCm: 170 },
  { slug: "alsotall", commonName: "Alsotall", maxLengthCm: 170 },
];

describe("sizeLineup", () => {
  it("lists sharks longest first and puts the person where they fall", () => {
    const names = sizeLineup(sharks).map((r) => r.name);
    // The two sharks exactly as tall as the person come before them, ties by name.
    expect(names).toEqual(["Big", "Mid", "Alsotall", "Tall", "You", "Small"]);
  });

  it("puts the person last when every shark is taller, and first when every shark is shorter", () => {
    expect(
      sizeLineup([{ slug: "a", commonName: "A", maxLengthCm: 500 }]).map((r) => r.name),
    ).toEqual(["A", "You"]);
    expect(
      sizeLineup([{ slug: "a", commonName: "A", maxLengthCm: 50 }]).map((r) => r.name),
    ).toEqual(["You", "A"]);
  });

  it("draws bars in proportion to the longest, with a minimum", () => {
    const rows = sizeLineup(sharks);
    const width = (name: string) => rows.find((r) => r.name === name)!.widthPct;
    expect(width("Big")).toBe(100);
    expect(width("Mid")).toBe(33); // 400 of 1200
    expect(width("Small")).toBeGreaterThanOrEqual(2);
  });

  it("works with the real sharks: the whale shark leads and there is exactly one person", () => {
    const rows = sizeLineup(speciesEntries);
    expect(rows[0]!.slug).toBe("whale-shark");
    expect(rows.filter((r) => r.kind === "person")).toHaveLength(1);
    expect(rows).toHaveLength(speciesEntries.length + 1);
  });
});

describe("parseCompare", () => {
  const known = ["great-white-shark", "whale-shark"];

  it("accepts two different known sharks", () => {
    expect(parseCompare({ a: "great-white-shark", b: "whale-shark" }, known)).toEqual({
      a: "great-white-shark",
      b: "whale-shark",
      ok: true,
      note: null,
    });
  });

  it("says nothing when nothing has been chosen", () => {
    expect(parseCompare({}, known)).toMatchObject({ ok: false, note: null });
  });

  it("explains an unusable choice", () => {
    expect(parseCompare({ a: "whale-shark" }, known).note).toMatch(/two sharks/);
    expect(parseCompare({ a: "whale-shark", b: "whale-shark" }, known).note).toMatch(/different/);
    expect(parseCompare({ a: "whale-shark", b: "unicorn" }, known).note).toMatch(/could not find/);
  });
});
