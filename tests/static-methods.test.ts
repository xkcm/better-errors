import { describe, expect, it } from "vitest";
import { GenericError } from "./example-errors";

describe("Static methods", () => {
  it("should use metadata passed to withMetadata static method", () => {
    const metadataObject = {
      testValue: "42",
    };

    const ErrorWithMetadata = GenericError.withMetadata(metadataObject);
    const error = new ErrorWithMetadata();

    expect(error.metadata).toStrictEqual(metadataObject);
  });
});
