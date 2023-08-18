import type { BetterError } from "../core/BetterError.class";
import type { InferMetadata, MergingBehavior } from "../types";
import type { Getter } from "../utils/types.utils.ts";

export default function withMetadata<
  ErrorClass extends BetterError,
  ErrorClassMetadata extends InferMetadata<ErrorClass>,
  T extends ErrorClassMetadata,
>(
  defaultMetadata: Getter<Partial<T>>,
  mergingBehavior?: MergingBehavior,
) {
  return (
    target: { new (...args: any[]): ErrorClass },
  ) => {
    Reflect.defineMetadata("defaults:metadata", defaultMetadata, target.prototype);
    Reflect.defineMetadata("defaults:metadata", mergingBehavior, target.prototype, "mergingBehavior");
  };
}
