import { describe, expect, it } from "vitest";
import { InferMetadata } from "../src";
import { DEFAULT_METADATA, ErrorWithDefaultMetadata, GenericError } from "./example-errors";

describe("Static methods", () => {
  it("should use metadata passed to withMetadata static method", () => {
    const metadataObject = {
      testValue: "42",
    };

    const ErrorWithMetadata = GenericError.withMetadata(metadataObject);
    const error = new ErrorWithMetadata();

    expect(error.metadata).toStrictEqual(metadataObject);
  });

  it("should use default metadata from decorator after static method was called", () => {
    const newMetadata: InferMetadata<ErrorWithDefaultMetadata> = { testValue: "new-value" };
    const newerMetadata = { testValue: "newer-value" };
    const ErrorWithNewMetadata = ErrorWithDefaultMetadata.withMetadata(newMetadata);
    const ErrorWithNewerMetadata = ErrorWithNewMetadata.withMetadata(newerMetadata);

    const defaultError = new ErrorWithDefaultMetadata();
    const newError = new ErrorWithNewMetadata();
    const newerError = new ErrorWithNewerMetadata();

    expect(defaultError.metadata).toStrictEqual(DEFAULT_METADATA);
    expect(newError.metadata).toStrictEqual(newMetadata);
    expect(newerError.metadata).toStrictEqual(newerMetadata);
  });
});
