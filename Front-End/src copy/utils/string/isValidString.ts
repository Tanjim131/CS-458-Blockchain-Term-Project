
/**
 * Util function to check if the given string is valid
 * @param email
 */
export default function isValidString(str: string): boolean {
  return "string" === typeof str && 0 < str.length;
}
