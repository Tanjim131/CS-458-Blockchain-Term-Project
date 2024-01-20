/**
 * Define a dynamic object
 */
interface IFreezableObject {
  [s: string]: any;
}

/**
 * Freezes the passed object, recursing on children if also objects.
 * @param obj
 */
export default function deepFreeze<T extends IFreezableObject>(obj: T): T {
  Object.freeze(obj);

  for (const key in obj) {
    const isFreezable = obj.hasOwnProperty(key)
      && key !== null
      && (typeof obj[key] === "object" || typeof obj[key] === "function")
      && !Object.isFrozen(obj[key]);

    if (isFreezable) {
      deepFreeze(obj[key]);
    }
  }

  return obj;
}
