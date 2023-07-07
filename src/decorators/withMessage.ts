import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { SupportedMetadata } from "../types";
import type { Getter } from "../utils/types.utils.ts";

export default function withMessage(defaultMessage: Getter<string>) {
  return <
    M extends SupportedMetadata,
    TargetError extends typeof BetterError<M>,
  >(target: TargetError) => {
    defineMetadata("defaults:message", defaultMessage, target.prototype);
  };
}
