import { describe, expect, it } from "vitest";
import { isCurrentPath } from "./nav";

describe("isCurrentPath", () => {
  it("is current on its own address and below it", () => {
    expect(isCurrentPath("/sharks", "/sharks")).toBe(true);
    expect(isCurrentPath("/sharks", "/sharks/goblin-shark")).toBe(true);
    expect(isCurrentPath("/sharks", "/sharks/sizes")).toBe(true);
  });

  it("is not current on a page that merely starts with the same letters", () => {
    expect(isCurrentPath("/sharks", "/shark-of-the-month")).toBe(false);
    expect(isCurrentPath("/shark-of-the-month", "/sharks")).toBe(false);
  });

  it("treats the home page as current only on the home page", () => {
    expect(isCurrentPath("/", "/")).toBe(true);
    expect(isCurrentPath("/", "/facts")).toBe(false);
  });
});
