import {
  describe,
  expect,
  it,
} from "vitest";

import {
  DEFAULT_CODE,
  DEFAULT_MESSAGE,
  DEFAULT_METADATA,
  ErrorWithDefaultCode,
  ErrorWithDefaultMessage,
  ErrorWithDefaultMetadata,
  ErrorWithMixedDefaults,
} from "./example-errors";

describe("Decorators", () => {
  it("should use default metadata", () => {
    const errorWithMetadata = new ErrorWithDefaultMetadata();
    expect(errorWithMetadata.metadata).toStrictEqual(DEFAULT_METADATA);
  });

  it("should use default code", () => {
    const errorWithCode = new ErrorWithDefaultCode();
    expect(errorWithCode.code).toEqual(DEFAULT_CODE);
  });

  it("should use default message", () => {
    const errorWithMessage = new ErrorWithDefaultMessage();
    expect(errorWithMessage.message).toEqual(DEFAULT_MESSAGE);
  });

  it("should work with mixed defaults", () => {
    const errorWithMixedDefaults = new ErrorWithMixedDefaults();

    expect(errorWithMixedDefaults.metadata).toStrictEqual(DEFAULT_METADATA);
    expect(errorWithMixedDefaults.message).toEqual(DEFAULT_MESSAGE);
    expect(errorWithMixedDefaults.code).toEqual(DEFAULT_CODE);
  });
});
