import type { Getter } from "./types.utils.ts.js";

export function resolveGetter<T>(value: Getter<T>): T {
  if (value instanceof Function) {
    return value.call({});
  }
  return value;
}
