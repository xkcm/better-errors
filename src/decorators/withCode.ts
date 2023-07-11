import type { BetterError } from "../core/BetterError.class";
import type { Getter } from "../utils/types.utils.ts";

export default function withCode(defaultCode: Getter<string>) {
  return <ErrorClass extends BetterError>(
    target: { new (...args: any[]): ErrorClass },
  ) => {
    Reflect.defineMetadata("defaults:code", defaultCode, target.prototype);
  };
}
