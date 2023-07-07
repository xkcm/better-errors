import BetterError from "../core/BetterError.class";
import { defineMetadata } from "../utils/metadata.utils";

import type { Getter, MergingBehavior, SupportedMetadata } from "../types";

export default function withMetadata<
  DefaultMetadata extends SupportedMetadata,
>(
  defaultMetadataObject: Getter<DefaultMetadata>,
  mergingBehavior: MergingBehavior = "submissive",
) {
  return (target: typeof BetterError<DefaultMetadata>) => {
    defineMetadata("defaults:metadata", defaultMetadataObject, target.prototype);
    defineMetadata("defaults:metadata", mergingBehavior, target.prototype, "mergingBehavior");
  };
}
