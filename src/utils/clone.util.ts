// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-explicit-any
export function cloneClass<C extends { new (...args: any[]): any }>(OriginalClass: C): C {
  class ClonedClass extends OriginalClass {}

  Reflect.defineProperty(ClonedClass, "name", {
    value: OriginalClass.name,
  });

  return ClonedClass;
}
