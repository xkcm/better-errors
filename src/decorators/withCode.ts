import BetterError from "../BetterError.class";
import { defineMetadata } from "../metadata.util";

import type {
  Constructor,
  SupportedCode,
} from "../types";

export default function withCode<DefaultCode extends SupportedCode>(defaultCode: DefaultCode) {
  return (target: Constructor<BetterError<DefaultCode>>) => {
    defineMetadata("defaults:code", defaultCode, target.prototype);
  };
}
