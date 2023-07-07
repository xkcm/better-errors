import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { Getter, SupportedMetadata } from "../types";

export default function withMessage(defaultMessage: Getter<string>) {
  return <
    M extends SupportedMetadata,
    TargetError extends typeof BetterError<M>,
  >(target: TargetError) => {
    defineMetadata("defaults:message", defaultMessage, target.prototype);
  };
}
