import type { Getter } from "../types";

export function resolveGetter<T>(value: Getter<T>): T {
  if (value instanceof Function) {
    return value.call({});
  }
  return value;
}
