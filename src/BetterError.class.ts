import { defineMetadata, getMetadata } from "./metadata.util";
import type {
  SupportedCode,
  SupportedMetadata,
  BetterErrorOptions,
} from "./types";

export default class BetterError<
  Code extends SupportedCode = SupportedCode,
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public static withMetadata<
    ErrorClass extends BetterError,
    MetadataType extends (
      ErrorClass extends BetterError<SupportedCode, infer M> ? M : SupportedMetadata
    ),
  >(
    metadata: MetadataType,
  ) {
    defineMetadata("defaults:metadata", metadata, this.prototype);
    return this;
  }

  public code: Code;

  public metadata: Metadata;

  public constructor(
    message?: string,
    options?: BetterErrorOptions<Code, Metadata>,
  ) {
    super();

    this.metadata = getMetadata("defaults:metadata", this);
    this.code = getMetadata("defaults:code", this);
    this.message = message ?? getMetadata("defaults:message", this);
    this.cause = options?.cause;
  }
}
