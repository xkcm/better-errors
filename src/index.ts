import "reflect-metadata";

export * from "./decorators";
export {
  SupportedMetadata,
  Options,
  InferMetadata,
} from "./types";
export { setDefaultMergingBehavior } from "./core/default-merging-behavior";
export { BetterError } from "./core/BetterError.class";
