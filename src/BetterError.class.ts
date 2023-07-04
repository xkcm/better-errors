import { defineMetadata, getMetadata } from "./metadata.utils";
import type {
  Options,
  InferMetadata,
  SupportedMetadata,
} from "./types";

export default class BetterError<
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public static withMetadata<ErrorClass extends BetterError>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: new (...args: any[]) => ErrorClass,
    metadata: InferMetadata<ErrorClass>,
  ) {
    defineMetadata("defaults:metadata", metadata, this.prototype);
    return this;
  }

  public static withMessage(message: string) {
    defineMetadata("defaults:message", message, this.prototype);
    return this;
  }

  public static withCode(code: string) {
    defineMetadata("defaults:code", code, this.prototype);
    return this;
  }

  public readonly code: string;

  public readonly metadata: Metadata;

  public constructor(
    options?: Options<Metadata>,
  ) {
    super();

    this.metadata = options?.metadata ?? getMetadata("defaults:metadata", this);
    this.code = options?.code ?? getMetadata("defaults:code", this);
    this.message = options?.message ?? getMetadata("defaults:message", this);
    this.cause = options?.cause;
  }
}
