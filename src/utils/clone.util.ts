export function cloneClass<C extends { new (...args: any[]): any }>(OriginalClass: C): C {
  class ClonedClass extends OriginalClass {}

  Reflect.defineProperty(ClonedClass, "name", {
    value: Reflect.get(OriginalClass, "name"),
  });

  return ClonedClass;
}
