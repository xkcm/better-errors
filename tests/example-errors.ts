/* eslint-disable max-classes-per-file */

import BetterError, {
  BetterErrorSupportedCode,
  withCode,
  withMessage,
  withMetadata,
} from "../src";

export const DEFAULT_METADATA = {
  testValue: "test",
};
export const DEFAULT_CODE = "test.fs.empty_file" as string;
export const DEFAULT_MESSAGE = "This is a default message";

@withMetadata(DEFAULT_METADATA)
export class ErrorWithDefaultMetadata extends BetterError<
  BetterErrorSupportedCode,
  typeof DEFAULT_METADATA
> {}

@withCode(DEFAULT_CODE)
export class ErrorWithDefaultCode extends BetterError<string> {}

@withMessage(DEFAULT_MESSAGE)
export class ErrorWithDefaultMessage extends BetterError<string, typeof DEFAULT_METADATA> {}

@withMetadata(DEFAULT_METADATA)
@withCode(DEFAULT_CODE)
export class ErrorWithMixedDefaults extends ErrorWithDefaultMessage {}