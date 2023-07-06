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
