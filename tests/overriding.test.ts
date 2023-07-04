import { describe, expect, it } from "vitest";
import { ErrorWithDefaultCode, ErrorWithDefaultMessage, ErrorWithDefaultMetadata } from "./example-errors";
import BetterError from "../src";

describe("Overriding defaults from decorators", () => {
  describe("Overriding with constructor", () => {
    it("should override default metadata", () => {
      const overrideMetadata = {
        testValue: "overriden",
      };
      const error = new ErrorWithDefaultMetadata({
        metadata: overrideMetadata,
      });

      expect(error.metadata).toStrictEqual(overrideMetadata);
    });

    it("should override default message", () => {
      const overrideMessage = "This message was overriden";
      const error = new ErrorWithDefaultMessage({ message: overrideMessage });

      expect(error.message).toEqual(overrideMessage);
    });

    it("should override default code", () => {
      const overrideCode = "code.overriden";
      const error = new ErrorWithDefaultCode({ code: overrideCode });

      expect(error.code).toEqual(overrideCode);
    });
  });

  describe("Overriding with static methods", () => {
    it("should override default metadata", () => {
      const overrideMetadata = {
        testValue: "overriden",
      };
      const error = new (ErrorWithDefaultMetadata.withMetadata(overrideMetadata))();

      expect(error.metadata).toStrictEqual(overrideMetadata);
    });

    it("should override default message", () => {
      const overrideMessage = "This message was overriden";
      const error = new (ErrorWithDefaultMessage.withMessage(overrideMessage))();

      expect(error.message).toEqual(overrideMessage);
    });

    it("should override default code", () => {
      const overrideCode = "code.overriden";
      const error = new (ErrorWithDefaultCode.withCode(overrideCode))();

      expect(error.code).toEqual(overrideCode);
    });
  });
});

describe("Overriding defaults from static methods", () => {
  describe("Overriding with constructor", () => {
    it("should override default metadata", () => {
      const overrideMetadata = {
        testValue: "overriden",
      };

      const LocalErrorWithDefaultMetadata = BetterError.withMetadata({
        testValue: "original",
      });
      const error = new LocalErrorWithDefaultMetadata({
        metadata: overrideMetadata,
      });

      expect(error.metadata).toStrictEqual(overrideMetadata);
    });

    it("should override default message", () => {
      const overrideMessage = "This message was overriden";

      const LocalErrorWithDefaultMessage = BetterError.withMessage("original message");
      const error = new LocalErrorWithDefaultMessage({ message: overrideMessage });

      expect(error.message).toEqual(overrideMessage);
    });

    it("should override default code", () => {
      const overrideCode = "code.overriden";

      const LocalErrorWithDefaultCode = BetterError.withCode("original.code");
      const error = new LocalErrorWithDefaultCode({ code: overrideCode });

      expect(error.code).toEqual(overrideCode);
    });
  });
});
