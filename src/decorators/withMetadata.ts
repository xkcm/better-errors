import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { InferMetadata, MergingBehavior } from "../types";
import type { Getter } from "../utils/types.utils.ts";

export default function withMetadata<
  ErrorClass extends BetterError,
  ErrorClassMetadata extends InferMetadata<ErrorClass>,
  T extends ErrorClassMetadata,
>(
  defaultMetadata: Getter<T>,
  mergingBehavior: MergingBehavior = "submissive",
) {
  return (
    target: { new (...args: any[]): ErrorClass },
  ) => {
    defineMetadata("defaults:metadata", defaultMetadata, target.prototype);
    defineMetadata("defaults:metadata", mergingBehavior, target.prototype, "mergingBehavior");
  };
}
