import "reflect-metadata";

import type {
  SupportedCode,
  SupportedMetadata,
  BetterErrorOptions,
} from "./types";

export default class BetterError<
  Code extends SupportedCode = SupportedCode,
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public code: Code;

  public metadata: Metadata;

  public constructor(
    message?: string,
    options?: BetterErrorOptions<Code, Metadata>,
  ) {
    super();

    this.metadata = Reflect.getMetadata("defaults:metadata", this);
    this.code = Reflect.getMetadata("defaults:code", this);
    this.message = message ?? Reflect.getMetadata("defaults:message", this);
    this.cause = options?.cause;
  }
}
