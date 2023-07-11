import { describe, expect, it } from "vitest";
import { BetterError } from "../src";

describe("Getters", () => {
  it("should use getter message", () => {
    const message = "This is a message from error with getter";
    const ErrorWithGetter = BetterError.withMessage(() => message);
    const error = new ErrorWithGetter();

    expect(error.message).toEqual(message);
  });

  it("should use getter code", () => {
    const code = "getter_code";
    const ErrorWithGetter = BetterError.withCode(() => code);
    const error = new ErrorWithGetter();

    expect(error.code).toEqual(code);
  });

  it("should use getter message", () => {
    const metadata = {
      testValue: "42",
    };
    const ErrorWithGetter = BetterError.withMetadata(() => metadata);
    const error = new ErrorWithGetter();

    expect(error.metadata).toStrictEqual(metadata);
  });
});
