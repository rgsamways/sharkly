import { describe, expect, it } from "vitest";
import {
  conservationLabel,
  currentFeatureMonth,
  formatLength,
  monthLabel,
  parseSpeciesFilters,
  sizeBand,
  sizeBarWidths,
} from "./species-rules";

describe("sizeBand", () => {
  it("puts the edges in the band that starts there", () => {
    expect(sizeBand(99)).toBe("pocket");
    expect(sizeBand(100)).toBe("person");
    expect(sizeBand(299)).toBe("person");
    expect(sizeBand(300)).toBe("car");
    expect(sizeBand(600)).toBe("giant");
    expect(sizeBand(1200)).toBe("giant");
  });
});

describe("conservationLabel", () => {
  it("gives plain words next to the official name", () => {
    expect(conservationLabel("EN")).toEqual({ official: "Endangered", plain: "In danger" });
    expect(conservationLabel("LC").plain).toBe("Doing okay");
  });

  it("copes with a code it does not know", () => {
    expect(conservationLabel("XX").plain).toBe("Not enough information");
  });
});

describe("parseSpeciesFilters", () => {
  it("keeps valid values and trims the search text", () => {
    expect(
      parseSpeciesFilters({ q: "  hammer ", habitat: "deep-sea", size: "giant", status: "LC" }),
    ).toEqual({ q: "hammer", habitat: "deep-sea", size: "giant", status: "LC" });
  });

  it("ignores values that do not exist instead of failing", () => {
    expect(parseSpeciesFilters({ habitat: "moon", size: "huge", status: "ZZ" })).toEqual({
      q: "",
      habitat: null,
      size: null,
      status: null,
    });
  });

  it("uses the first value when a filter is repeated", () => {
    expect(parseSpeciesFilters({ habitat: ["reef", "polar"] }).habitat).toBe("reef");
  });
});

describe("currentFeatureMonth", () => {
  it("changes month at midnight Toronto time, not UTC", () => {
    // 03:59 UTC on 1 November is still 23:59 on 31 October in Toronto (EDT, UTC-4).
    expect(currentFeatureMonth(new Date("2026-11-01T03:59:00Z"))).toBe("2026-10");
    expect(currentFeatureMonth(new Date("2026-11-01T04:00:00Z"))).toBe("2026-11");
  });

  it("follows the winter offset too", () => {
    // 04:59 UTC on 1 December is 23:59 on 30 November in Toronto (EST, UTC-5).
    expect(currentFeatureMonth(new Date("2026-12-01T04:59:00Z"))).toBe("2026-11");
    expect(currentFeatureMonth(new Date("2026-12-01T05:00:00Z"))).toBe("2026-12");
  });
});

describe("small helpers", () => {
  it("names a month", () => {
    expect(monthLabel("2026-10")).toBe("October 2026");
  });

  it("writes lengths the way people say them", () => {
    expect(formatLength(20)).toBe("20 cm");
    expect(formatLength(350)).toBe("3.5 m");
    expect(formatLength(600)).toBe("6 m");
  });

  it("keeps a tiny shark visible next to a person", () => {
    const { shark, person } = sizeBarWidths(20);
    expect(person).toBe(100);
    expect(shark).toBeGreaterThanOrEqual(4);
    expect(shark).toBeLessThan(person);
  });

  it("makes a big shark longer than the person bar", () => {
    const { shark, person } = sizeBarWidths(350);
    expect(shark).toBe(100);
    expect(person).toBeLessThan(shark);
  });
});
