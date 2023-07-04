import BetterError from "../BetterError.class";
import type {
  Constructor,
  SupportedCode,
} from "../types";

export default function withCode<DefaultCode extends SupportedCode>(defaultCode: DefaultCode) {
  return (target: Constructor<BetterError<DefaultCode>>) => {
    Reflect.defineMetadata(
      "defaults:code",
      defaultCode,
      target.prototype,
    );
  };
}
