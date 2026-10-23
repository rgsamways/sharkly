import { describe, expect, it } from "vitest";
import { safeNextPath } from "./safe-path";

describe("safeNextPath", () => {
  it("keeps paths on this site", () => {
    expect(safeNextPath("/account")).toBe("/account");
    expect(safeNextPath("/sharks/goblin?tab=facts")).toBe("/sharks/goblin?tab=facts");
  });

  it("falls back for anything that could leave the site", () => {
    for (const bad of [
      "//evil.example",
      "/\\evil.example",
      "https://evil.example",
      "evil",
      "",
      "/a\nb",
    ]) {
      expect(safeNextPath(bad)).toBe("/account");
    }
  });

  it("falls back when the value is missing or not text", () => {
    expect(safeNextPath(undefined)).toBe("/account");
    expect(safeNextPath(["/a"], "/home")).toBe("/home");
  });
});
