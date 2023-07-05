import { describe, expect, it } from "vitest";
import {
  DEFAULT_CODE,
  DEFAULT_MESSAGE,
  DEFAULT_METADATA,
  ErrorWithMixedDefaults,
} from "./example-errors";
import BetterError from "../src";

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
});
