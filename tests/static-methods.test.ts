import { describe, expect, it } from "vitest";
import { InferMetadata } from "../src";

import {
  DEFAULT_CODE,
  DEFAULT_MESSAGE,
  DEFAULT_METADATA,
  ErrorWithDefaultCode,
  ErrorWithDefaultMessage,
  ErrorWithDefaultMetadata,
  GenericError,
} from "./example-errors";

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

  it("should use default code from decorator after static method was called", () => {
    const newCode = "new.code";
    const newerCode = "newer.code";
    const ErrorWithNewCode = ErrorWithDefaultCode.withCode(newCode);
    const ErrorWithNewerCode = ErrorWithNewCode.withCode(newerCode);

    const defaultError = new ErrorWithDefaultCode();
    const newError = new ErrorWithNewCode();
    const newerError = new ErrorWithNewerCode();

    expect(defaultError.code).toEqual(DEFAULT_CODE);
    expect(newError.code).toEqual(newCode);
    expect(newerError.code).toEqual(newerCode);
  });

  it("should use default message from decorator after static method was called", () => {
    const newMessage = "New message";
    const newerMessage = "Newer message";
    const ErrorWithNewMessage = ErrorWithDefaultMessage.withMessage(newMessage);
    const ErrorWithNewerMessage = ErrorWithNewMessage.withMessage(newerMessage);

    const defaultError = new ErrorWithDefaultMessage();
    const newError = new ErrorWithNewMessage();
    const newerError = new ErrorWithNewerMessage();

    expect(defaultError.message).toEqual(DEFAULT_MESSAGE);
    expect(newError.message).toEqual(newMessage);
    expect(newerError.message).toEqual(newerMessage);
  });
});
