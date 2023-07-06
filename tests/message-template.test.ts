import { describe, expect, it } from "vitest";
import BetterError from "../src";

describe("Message template usage", () => {
  it("should use code in the message", () => {
    const code = "test.code";
    const messageTemplate = "Error code: %{code}";
    const expectedMessage = `Error code: ${code}`;

    const ErrorWithCode = BetterError.withCode(code);
    const error = new ErrorWithCode({ message: messageTemplate });

    expect(error.message).toEqual(expectedMessage);
  });

  it("should use metadata in the message", () => {
    const metadata = {
      users: [
        {
          addresses: [
            {
              street: "Main Avenue",
              buildingNumber: 12,
              city: "Orlean",
            },
          ],
        },
      ],
    };
    const messageTemplate = "User lives in %{metadata.users[0].addresses[0].city}";
    const expectedMessage = `User lives in ${metadata.users[0].addresses[0].city}`;

    const ErrorWithMetadata = BetterError.withMetadata(metadata);
    const error = new ErrorWithMetadata({ message: messageTemplate });

    expect(error.message).toEqual(expectedMessage);
  });
});
