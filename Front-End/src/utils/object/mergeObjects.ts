/**
 * Takes a list of objects and shallowly merges them. Right-most objects take precedence.
 * @param objs
 */
export default function mergeObjects<T>(objs: T[]): T {
  return objs.reduce((merged: T, obj: T) => ({ ...merged, ...obj }), {} as T);
}
