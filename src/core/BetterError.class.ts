import { defineMetadata, getMetadata } from "../utils/metadata.utils";
import { cloneClass } from "../utils/clone.util";

import type {
  Options,
  InferMetadata,
  SupportedMetadata,
} from "../types";

export default class BetterError<
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public static withMetadata<
    ErrorClass extends BetterError,
    ErrorClassMetadata extends InferMetadata<ErrorClass> = InferMetadata<ErrorClass>,
  >(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this: typeof BetterError<ErrorClassMetadata> & { new (...args: any[]): ErrorClass },
    metadata: ErrorClassMetadata,
  ) {
    const newClass = cloneClass(this);
    defineMetadata("defaults:metadata", metadata, newClass.prototype);
    return newClass;
  }

  public static withMessage(message: string) {
    const newClass = cloneClass(this);
    defineMetadata("defaults:message", message, newClass.prototype);
    return newClass;
  }

  public static withCode(code: string) {
    const newClass = cloneClass(this);
    defineMetadata("defaults:code", code, newClass.prototype);
    return newClass;
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
