import type { BetterError } from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { Getter } from "../utils/types.utils.ts";

export default function withMessage(defaultMessage: Getter<string>) {
  return <ErrorClass extends BetterError>(
    target: { new (...args: any[]): ErrorClass },
  ) => {
    defineMetadata("defaults:message", defaultMessage, target.prototype);
  };
}
