import { describe, expect, it } from "vitest";
import { friendlyError } from "./auth-messages";

describe("friendlyError", () => {
  it("gives a wrong email and a wrong password the same message", () => {
    expect(friendlyError({ code: "INVALID_EMAIL_OR_PASSWORD" })).toBe(
      "That email and password don't match.",
    );
  });

  it("asks people to wait after too many tries", () => {
    expect(friendlyError({ status: 429 })).toMatch(/wait a few minutes/);
  });

  it("never shows raw server wording for unknown problems", () => {
    expect(friendlyError({ code: "SOMETHING_ELSE", message: "db exploded at row 3" })).toBe(
      "Something went wrong. Please try again.",
    );
    expect(friendlyError(null)).toBe("Something went wrong. Please try again.");
  });
});
