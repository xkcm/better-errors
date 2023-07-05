import BetterError from "./core/BetterError.class";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SupportedMetadata = Record<string, any>;
export interface Options<Metadata> extends ErrorOptions {
  code?: string,
  message?: string,
  metadata?: Metadata,
}

export type InferMetadata<ErrClass> = (
  ErrClass extends BetterError<SupportedMetadata> ? (
    ErrClass extends BetterError<infer M> ? M : SupportedMetadata
  ) : never
);
