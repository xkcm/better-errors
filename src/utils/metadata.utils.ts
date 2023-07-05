import "reflect-metadata";

type MetadataKey = "defaults:metadata" | "defaults:code" | "defaults:message";

export function defineMetadata(
  key: MetadataKey,
  value: Parameters<typeof Reflect["defineMetadata"]>[1],
  target: Parameters<typeof Reflect["defineMetadata"]>[2],
) {
  return Reflect.defineMetadata(key, value, target);
}

export function getMetadata(
  key: MetadataKey,
  target: Parameters<typeof Reflect["getMetadata"]>[1],
) {
  return Reflect.getMetadata(key, target);
}
