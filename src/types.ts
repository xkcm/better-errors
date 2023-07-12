import type { BetterError } from "./core/BetterError.class";

export type SupportedMetadata = Record<string, any>;
export interface Options<Metadata> {
  cause?: any;
  code?: string;
  message?: string;
  metadata?: Metadata;
}

export type InferMetadata<ErrClass> = (
  ErrClass extends BetterError<SupportedMetadata> ? (
    ErrClass extends BetterError<infer M> ? M : SupportedMetadata
  ) : never
);

export type MergingBehavior = "firm" | "submissive" | "compromise:firm" | "compromise:submissive";
