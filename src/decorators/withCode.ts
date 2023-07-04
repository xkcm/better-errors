import BetterError from "../BetterError.class";
import { defineMetadata } from "../metadata.utils";
import { SupportedMetadata } from "../types";

export default function withCode(defaultCode: string) {
  return <
    M extends SupportedMetadata,
    TargetError extends typeof BetterError<M>,
  >(target: TargetError) => {
    defineMetadata("defaults:code", defaultCode, target.prototype);
  };
}
