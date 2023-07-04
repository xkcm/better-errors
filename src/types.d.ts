import BetterError from "./BetterError.class";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupportedMetadata = Record<string, any>;

export type BetterErrorSupportedMetadata = SupportedMetadata;
export interface BetterErrorOptions<Metadata> extends ErrorOptions {
  code: string,
  metadata: Metadata,
}

export type InferBetterErrorMetadata<ErrClass> = ErrClass extends BetterError<SupportedMetadata> ? (
  ErrClass extends BetterError<infer M> ? M : SupportedMetadata
) : never;
