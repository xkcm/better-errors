import BetterError from "../BetterError.class";
import { defineMetadata } from "../metadata.utils";

import type { SupportedMetadata } from "../types";

export default function withMessage(defaultMessage: string) {
  return <
    M extends SupportedMetadata,
    TargetError extends typeof BetterError<M>,
  >(target: TargetError) => {
    defineMetadata("defaults:message", defaultMessage, target.prototype);
  };
}
