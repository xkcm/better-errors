import type { BetterError } from "../core/BetterError.class";
import { getDefaultMergingBehavior } from "../core/default-merging-behavior";
import type { InferMetadata, MergingBehavior } from "../types";
import type { Getter } from "../utils/types.utils.ts";

export default function withMetadata<
  ErrorClass extends BetterError,
  ErrorClassMetadata extends InferMetadata<ErrorClass>,
  T extends ErrorClassMetadata,
>(
  defaultMetadata: Getter<T>,
  mergingBehavior: MergingBehavior = getDefaultMergingBehavior(),
) {
  return (
    target: { new (...args: any[]): ErrorClass },
  ) => {
    Reflect.defineMetadata("defaults:metadata", defaultMetadata, target.prototype);
    Reflect.defineMetadata("defaults:metadata", mergingBehavior, target.prototype, "mergingBehavior");
  };
}
