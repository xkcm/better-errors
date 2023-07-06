import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { Getter, SupportedMetadata } from "../types";

export default function withMetadata<
  DefaultMetadata extends SupportedMetadata,
>(defaultMetadataObject: Getter<DefaultMetadata>) {
  return (target: typeof BetterError<DefaultMetadata>) => {
    defineMetadata("defaults:metadata", defaultMetadataObject, target.prototype);
  };
}
