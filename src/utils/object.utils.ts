export function get(object: Record<string, any>, path: string) {
  const pathArray = path.split(/\.|\[|\]/g).filter(Boolean);

  return pathArray.reduce(
    (acc, cur) => acc?.[cur],
    object,
  );
}

export function pick(object: Record<string, any>, keys: string[]) {
  return Object.fromEntries(
    keys.map((key) => [
      key,
      get(object, key),
    ]),
  );
}

export function mergeRecursively<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  source: S,
): T & S {
  const targetEntries = Object.entries(target);
  const sourceEntries = Object.entries(source);

  const resultEntries: [string, any][] = [];
  targetEntries.forEach(([targetKey, targetValue]) => {
    const sourceEntryIndex = sourceEntries.findIndex(([sourceKey]) => sourceKey === targetKey);
    if (sourceEntryIndex === -1) {
      resultEntries.push([targetKey, targetValue]);
      return;
    }

    const [, sourceValue] = sourceEntries.splice(sourceEntryIndex, 1)[0];
    let mergedValue: any = sourceValue;

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      mergedValue.push(...targetValue);
    } else if (typeof sourceValue === "object" && typeof targetValue === "object") {
      mergedValue = mergeRecursively(targetValue, sourceValue);
    }

    resultEntries.push([targetKey, mergedValue]);
  });
  resultEntries.push(...sourceEntries);

  return Object.fromEntries(resultEntries) as T & S;
}
