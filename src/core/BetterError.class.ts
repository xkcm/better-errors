import { cloneClass } from "../utils/clone.utils";
import { resolveGetter } from "../utils/getter.utils";
import * as objectUtils from "../utils/object.utils";

import { withCode, withMessage, withMetadata } from "../decorators";
import { getDefaultMergingBehavior } from "./default-merging-behavior";

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
    mergingBehavior: MergingBehavior = getDefaultMergingBehavior(),
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
      Reflect.getMetadata("defaults:code", this) as Getter<string>,
    );
    this.message = options?.message ?? resolveGetter(
      Reflect.getMetadata("defaults:message", this) as Getter<string>,
    );
    this.cause = options?.cause;

    this.parseMessageTemplate();
  }

  private resolveMetadata(constructorMetadata?: Metadata): Metadata {
    const defaultMetadata = resolveGetter(Reflect.getMetadata("defaults:metadata", this) as Getter<Metadata>);
    const mergingBehavior = Reflect.getMetadata("defaults:metadata", this, "mergingBehavior") as MergingBehavior;

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
