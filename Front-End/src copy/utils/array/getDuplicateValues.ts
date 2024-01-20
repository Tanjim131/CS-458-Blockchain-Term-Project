
/**
 * Util function to check if the given array contains duplicate values
 * @param arr
 */
export default function getDuplicateValues(arr: any[]): any[] {
  const items = new Set<any>();
  return arr.filter(item => {
    if (items.has(item)) {
      return true;
    }
    items.add(item);
    return false;
  });
}
