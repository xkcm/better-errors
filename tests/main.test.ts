import { describe, expect, it } from "vitest";
import {
  DEFAULT_CODE,
  DEFAULT_MESSAGE,
  DEFAULT_METADATA,
  ErrorWithMixedDefaults,
} from "./example-errors";

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
});
