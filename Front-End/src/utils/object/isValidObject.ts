
/**
 * Util function to check if the given string is valid
 * @param obj
 */
export default function isValidObject(obj: any): boolean {
  return null !== obj && "object" === typeof obj && 0 < Object.keys(obj).length;
}
