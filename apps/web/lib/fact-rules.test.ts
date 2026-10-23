import { describe, expect, it } from "vitest";
import { factOfTheDay, parseFactTopic } from "./fact-rules";

const facts = [{ slug: "c" }, { slug: "a" }, { slug: "b" }];

describe("parseFactTopic", () => {
  it("accepts a real topic", () => {
    expect(parseFactTopic({ topic: "senses" })).toBe("senses");
    expect(parseFactTopic({ topic: ["myths", "senses"] })).toBe("myths");
  });

  it("treats anything else as all topics", () => {
    expect(parseFactTopic({ topic: "pirates" })).toBeNull();
    expect(parseFactTopic({})).toBeNull();
  });
});

describe("factOfTheDay", () => {
  it("is the same all day in Toronto", () => {
    const morning = factOfTheDay(facts, new Date("2026-10-23T14:00:00Z")); // 10:00 Toronto
    const night = factOfTheDay(facts, new Date("2026-10-24T03:30:00Z")); // 23:30 Toronto, same day
    expect(night).toEqual(morning);
  });

  it("moves to the next fact at Toronto midnight", () => {
    const before = factOfTheDay(facts, new Date("2026-10-24T03:59:00Z")); // 23:59 on the 23rd
    const after = factOfTheDay(facts, new Date("2026-10-24T04:00:00Z")); // 00:00 on the 24th
    expect(after).not.toEqual(before);
    // The cycle is in slug order, so the next one follows the previous one.
    const order = ["a", "b", "c"];
    expect(order.indexOf(after!.slug)).toBe((order.indexOf(before!.slug) + 1) % 3);
  });

  it("starts over after the last fact", () => {
    const slugs = [0, 1, 2, 3].map(
      (day) => factOfTheDay(facts, new Date(Date.UTC(2026, 9, 20 + day, 17)))!.slug,
    );
    expect(slugs[3]).toBe(slugs[0]);
  });

  it("returns nothing when there are no facts", () => {
    expect(factOfTheDay([], new Date())).toBeNull();
  });
});
