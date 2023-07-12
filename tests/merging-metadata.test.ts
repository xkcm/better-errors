import {
  describe,
  expect,
  it,
} from "vitest";
import { BetterError, setDefaultMergingBehavior } from "../src";

describe("Merging metadata behavior", () => {
  it("should merge metadata using 'firm' behavior", () => {
    const defaultMetadata = {
      a: 1,
      b: 2,
      c: 3,
    };
    const metadata = {
      a: 11,
      b: 22,
      c: 33,
    };

    const ErrorWithMetadata = BetterError.withMetadata(defaultMetadata, "firm");
    const error = new ErrorWithMetadata({ metadata });

    expect(error.metadata).toStrictEqual(defaultMetadata);
  });

  it("should merge metadata using 'submissive' behavior", () => {
    const defaultMetadata = {
      a: 1,
      b: 2,
      c: 3,
    };
    const metadata = {
      a: 11,
      b: 22,
      c: 33,
    };

    const ErrorWithMetadata = BetterError.withMetadata(defaultMetadata, "submissive");
    const error = new ErrorWithMetadata({ metadata });

    expect(error.metadata).toStrictEqual(metadata);
  });

  it("should merge metadata using 'compromise:firm' behavior", () => {
    const defaultMetadata = {
      a: 1,
      users: [],
      days: ["Monday"],
      info: {
        T: 45,
      },
    };
    const metadata = {
      b: 2,
      days: ["Tuesday"],
      users: "user",
      info: {
        T: 145,
        F: 94,
      },
    };

    const ErrorWithMetadata = BetterError.withMetadata(defaultMetadata, "compromise:firm");
    const error = new ErrorWithMetadata({ metadata });

    expect(error.metadata).toStrictEqual({
      a: 1,
      b: 2,
      users: [],
      days: ["Monday", "Tuesday"],
      info: {
        T: 45,
        F: 94,
      },
    });
  });

  it("should merge metadata using 'compromise:submissive' behavior", () => {
    const defaultMetadata = {
      a: 1,
      users: [],
      days: ["Monday"],
      info: {
        T: 45,
      },
    };
    const metadata = {
      b: 2,
      days: ["Tuesday"],
      users: "user",
      info: {
        T: 145,
        F: 94,
      },
    };

    const ErrorWithMetadata = BetterError.withMetadata(defaultMetadata, "compromise:submissive");
    const error = new ErrorWithMetadata({ metadata });

    expect(error.metadata).toStrictEqual({
      a: 1,
      b: 2,
      users: "user",
      days: ["Tuesday", "Monday"],
      info: {
        T: 145,
        F: 94,
      },
    });
  });

  it("should set new default merging behavior", () => {
    const defaultMetadata = { test: true };
    const metadata = { newTest: false };

    const NewError1 = BetterError.withMetadata(defaultMetadata);
    const error1 = new NewError1({ metadata });

    expect(error1.metadata).toStrictEqual(metadata);

    setDefaultMergingBehavior("firm");
    const NewError2 = BetterError.withMetadata(defaultMetadata);
    const error2 = new NewError2({ metadata });

    expect(error2.metadata).toStrictEqual(defaultMetadata);

    setDefaultMergingBehavior("compromise:firm");
    const NewError3 = BetterError.withMetadata(defaultMetadata);
    const error3 = new NewError3({ metadata });

    expect(error3.metadata).toStrictEqual({
      test: true,
      newTest: false,
    });

    // clean-up
    setDefaultMergingBehavior("submissive");
  });
});
