import { describe, expect, it } from "vitest";
import BetterError from "../src";

describe("Static methods", () => {
  it("should use metadata passed to withMetadata static method", () => {
    const metadataObject = {
      testValue: 42,
    };

    const error = new (BetterError.withMetadata(metadataObject))();

    expect(error.metadata).toStrictEqual(metadataObject);
  });
});
