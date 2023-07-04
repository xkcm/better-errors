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
