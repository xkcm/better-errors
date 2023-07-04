import BetterError, { BetterErrorSupportedCode } from "../src/main";
import {
  BetterErrorSupportedMetadata,
  withCode,
  withMessage,
  withMetadata
} from "../src/main";

export const DEFAULT_METADATA = {
  testValue: "test"
};
export const DEFAULT_CODE = "test.fs.empty_file";
export const DEFAULT_MESSAGE = "This is a default message";


@withMetadata(DEFAULT_METADATA)
export class ErrorWithDefaultMetadata extends BetterError<BetterErrorSupportedCode, { testValue: string }> {}

@withCode(DEFAULT_CODE)
export class ErrorWithDefaultCode extends BetterError<string> {}

@withMessage(DEFAULT_MESSAGE)
export class ErrorWithDefaultMessage extends BetterError {}
