import "reflect-metadata";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<K> = new (...args: any[]) => K;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupportedMetadata = Record<string, any>;
type SupportedCode = string | number;

export type BetterErrorSupportedCode = SupportedCode;
export type BetterErrorSupportedMetadata = SupportedMetadata;
export interface BetterErrorOptions<Code, Metadata> extends ErrorOptions {
  code: Code,
  metadata: Metadata,
}

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

export function withMetadata<
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

export function withCode<DefaultCode extends SupportedCode>(defaultCode: DefaultCode) {
  return (target: Constructor<BetterError<DefaultCode, SupportedMetadata>>) => {
    Reflect.defineMetadata(
      "defaults:code",
      defaultCode,
      target.prototype,
    );
  };
}

export function withMessage(defaultMessage: string) {
  return (target: Constructor<BetterError>) => {
    Reflect.defineMetadata(
      "defaults:message",
      defaultMessage,
      target.prototype,
    );
  };
}
