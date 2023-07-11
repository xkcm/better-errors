import { cloneClass } from "../utils/clone.utils";
import { resolveGetter } from "../utils/getter.utils";
import { getMetadata } from "../utils/metadata.utils";
import * as objectUtils from "../utils/object.utils";

import { withCode, withMessage, withMetadata } from "../decorators";

import type {
  InferMetadata,
  MergingBehavior,
  Options,
  SupportedMetadata,
} from "../types";
import type { Getter } from "../utils/types.utils.ts";

export class BetterError<
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public static withMetadata<
    ErrorClass extends BetterError,
    ErrorClassMetadata extends InferMetadata<ErrorClass> = InferMetadata<ErrorClass>,
  >(
    this: typeof BetterError<ErrorClassMetadata> & { new (...args: any[]): ErrorClass },
    metadata: Getter<ErrorClassMetadata>,
    mergingBehavior: MergingBehavior = "submissive",
  ) {
    const clonedClass = cloneClass(this);
    withMetadata(metadata, mergingBehavior)(clonedClass);
    return clonedClass;
  }

  public static withMessage(message: Getter<string>) {
    const clonedClass = cloneClass(this);
    withMessage(message)(clonedClass);
    return clonedClass;
  }

  public static withCode(code: Getter<string>) {
    const clonedClass = cloneClass(this);
    withCode(code)(clonedClass);
    return clonedClass;
  }

  public code: string;

  public metadata: Metadata;

  public constructor(
    options?: Options<Metadata>,
  ) {
    super();

    this.metadata = this.resolveMetadata(options?.metadata);
    this.code = options?.code ?? resolveGetter(
      getMetadata<Getter<string>>("defaults:code", this),
    );
    this.message = options?.message ?? resolveGetter(
      getMetadata<Getter<string>>("defaults:message", this),
    );
    this.cause = options?.cause;

    this.parseMessageTemplate();
  }

  private resolveMetadata(constructorMetadata?: Metadata): Metadata {
    const defaultMetadata = resolveGetter(getMetadata<Getter<Metadata>>("defaults:metadata", this));
    const mergingBehavior = getMetadata<MergingBehavior>("defaults:metadata", this, "mergingBehavior");

    switch (mergingBehavior) {
      case "firm":
        return defaultMetadata ?? constructorMetadata;
      case "compromise:firm":
        return objectUtils.mergeRecursively(constructorMetadata ?? {}, defaultMetadata);
      case "compromise:submissive":
        return objectUtils.mergeRecursively(defaultMetadata, constructorMetadata ?? {});
      case "submissive":
      default:
        return constructorMetadata ?? defaultMetadata;
    }
  }

  private parseMessageTemplate() {
    this.message = this.message?.replace(
      /%\{(.+?)\}/g,
      (placeholder: string) => {
        const dataPath = placeholder.slice(2, -1);
        const targetObject = objectUtils.pick(this, ["code", "metadata", "cause"]);

        const value = objectUtils.get(targetObject, dataPath);
        return String(value);
      },
    );
  }
}
