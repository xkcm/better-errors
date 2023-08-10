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

type ErrorDefaults<Metadata> = {
  metadata?: Getter<Metadata>;
  message?: Getter<string>;
  code?: Getter<string>;
  mergingBehavior?: MergingBehavior;
};

export function extractErrorDefaults<T extends SupportedMetadata>(
  errorInstance: BetterError<T>,
): ErrorDefaults<T>;
export function extractErrorDefaults<T extends SupportedMetadata>(
  ErrorClass: typeof BetterError<T>,
): ErrorDefaults<T>;
export function extractErrorDefaults<T extends SupportedMetadata>(
  error: typeof BetterError<T> | BetterError<T>,
): ErrorDefaults<T> {
  const target = error instanceof BetterError ? error : error.prototype;

  const message = Reflect.getMetadata("defaults:message", target) as Getter<string>;
  const code = Reflect.getMetadata("defaults:code", target) as Getter<string>;
  const metadata = Reflect.getMetadata("defaults:metadata", target) as Getter<T>;
  const mergingBehavior = Reflect.getMetadata("defaults:metadata", target, "mergingBehavior") as MergingBehavior;

  return {
    message,
    code,
    metadata,
    mergingBehavior,
  };
}

function resolveMetadata<Metadata>(
  mergingBehavior: MergingBehavior,
  constructorMetadata?: Metadata,
  defaultMetadata?: Metadata,
): Metadata {
  switch (mergingBehavior) {
    case "firm":
      return defaultMetadata ?? constructorMetadata as Metadata;
    case "compromise:firm":
      return objectUtils.mergeRecursively(
        constructorMetadata ?? {},
        defaultMetadata ?? {},
      ) as Metadata;
    case "compromise:submissive":
      return objectUtils.mergeRecursively(
        defaultMetadata ?? {},
        constructorMetadata ?? {},
      ) as Metadata;
    case "submissive":
    default:
      return constructorMetadata ?? defaultMetadata as Metadata;
  }
}

export class BetterError<
  Metadata extends SupportedMetadata = SupportedMetadata,
> extends Error {
  public static withMetadata<
    ErrorClass extends BetterError,
    ErrorClassMetadata extends InferMetadata<ErrorClass> = InferMetadata<ErrorClass>,
  >(
    this: typeof BetterError<ErrorClassMetadata> & { new (...args: any[]): ErrorClass },
    metadata: Getter<ErrorClassMetadata>,
    mergingBehavior?: MergingBehavior,
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

    const {
      code,
      message,
      metadata,
      mergingBehavior = getDefaultMergingBehavior(),
    } = extractErrorDefaults(this);

    this.metadata = resolveMetadata<Metadata>(
      mergingBehavior,
      options?.metadata,
      resolveGetter(metadata),
    );
    this.code = (
      options?.code
        ?? resolveGetter(code)
        ?? "better_error.unknown_error"
    );
    this.message = (
      options?.message
        ?? resolveGetter(message)
        ?? "Unknown error"
    );
    this.cause = options?.cause;

    this.parseMessageTemplate();
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
