import BetterError from "../BetterError.class";
import type {
  Constructor,
  SupportedCode,
  SupportedMetadata,
} from "../types";

export default function withMetadata<
  DefaultMetadata extends SupportedMetadata,
>(defaultMetadataObject: DefaultMetadata) {
  return (target: Constructor<BetterError<SupportedCode, DefaultMetadata>>) => {
    Reflect.defineMetadata(
      "defaults:metadata",
      defaultMetadataObject,
      target.prototype,
    );
  };
}
