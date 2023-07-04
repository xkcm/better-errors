import BetterError from "../BetterError.class";
import { defineMetadata } from "../metadata.util";

import type { Constructor } from "../types";

export default function withMessage(defaultMessage: string) {
  return (target: Constructor<BetterError>) => {
    defineMetadata("defaults:message", defaultMessage, target.prototype);
  };
}
