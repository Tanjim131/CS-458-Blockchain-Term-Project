
/**
 * Util function to check if the given array is valid
 * @param arr
 */
export default function isValidArray(arr: any[]): boolean {
  return null !== arr && Array.isArray(arr) && 0 < arr.length;
}
