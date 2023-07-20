import { describe, expect, it } from "vitest";
import {
  DEFAULT_CODE,
  DEFAULT_MESSAGE,
  DEFAULT_METADATA,
  ErrorWithMixedDefaults,
} from "./example-errors";
import { BetterError } from "../src";

describe("Main functionality", () => {
  it("should throw an error with mixed defaults", () => {
    expect(() => {
      throw new ErrorWithMixedDefaults();
    }).toThrowError(
      expect.objectContaining({
        message: DEFAULT_MESSAGE,
        metadata: DEFAULT_METADATA,
        code: DEFAULT_CODE,
      }),
    );
  });

  it("should throw an error with passed data to constructor", () => {
    const message = "Test message";
    const code = "testing_code";
    const metadata = {
      testKey: "testValue",
    };
    const cause = new BetterError({
      message: "low-level test error",
    });

    expect(() => {
      throw new BetterError({
        message,
        code,
        metadata,
        cause,
      });
    }).toThrowError(
      expect.objectContaining({
        message,
        code,
        metadata,
        cause,
      }),
    );
  });

  it("should use metadata getter, merge and parse message template", () => {
    const timestamp = new Date();
    const metadata = { userId: 42 };

    const templateMessage = "User with id=%{metadata.userId} not found (occurred at %{metadata.timestamp})";
    const expectedMessage = `User with id=${metadata.userId} not found (occurred at ${timestamp})`;

    const ErrorWithDefaults = BetterError
      .withMetadata(() => ({ timestamp }), "compromise:firm")
      .withMessage(templateMessage);

    const error = new ErrorWithDefaults({ metadata });

    expect(error.metadata).toStrictEqual({ timestamp, userId: metadata.userId });
    expect(error.message).toStrictEqual(expectedMessage);
  });

  it("should throw plain BetterError", () => {
    expect(() => {
      throw new BetterError();
    }).toThrowError("Unknown error");
  });
});
