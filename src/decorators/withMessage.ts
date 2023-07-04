import BetterError from "../BetterError.class";
import type { Constructor } from "../types";

export default function withMessage(defaultMessage: string) {
  return (target: Constructor<BetterError>) => {
    Reflect.defineMetadata(
      "defaults:message",
      defaultMessage,
      target.prototype,
    );
  };
}
