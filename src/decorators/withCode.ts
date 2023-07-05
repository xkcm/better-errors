import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { SupportedMetadata } from "../types";

export default function withCode(defaultCode: string) {
  return <
    M extends SupportedMetadata,
    TargetError extends typeof BetterError<M>,
  >(target: TargetError) => {
    defineMetadata("defaults:code", defaultCode, target.prototype);
  };
}
