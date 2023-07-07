import "reflect-metadata";

type MetadataKey = "defaults:metadata" | "defaults:code" | "defaults:message";

export function defineMetadata(
  key: MetadataKey,
  value: Parameters<typeof Reflect["defineMetadata"]>[1],
  target: Parameters<typeof Reflect["defineMetadata"]>[2],
  propertyKey?: Parameters<typeof Reflect["defineMetadata"]>[3],
) {
  if (!propertyKey) {
    return Reflect.defineMetadata(key, value, target);
  }
  return Reflect.defineMetadata(key, value, target, propertyKey);
}

export function getMetadata<T = any>(
  key: MetadataKey,
  target: Parameters<typeof Reflect["getMetadata"]>[1],
  propertyKey?: Parameters<typeof Reflect["getMetadata"]>[2],
): T {
  if (!propertyKey) {
    return Reflect.getMetadata(key, target);
  }
  return Reflect.getMetadata(key, target, propertyKey);
}
