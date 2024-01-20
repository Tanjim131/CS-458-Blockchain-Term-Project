const equal = require("deep-equal");
/**
 * Function to compare old and new objects
 * @param oldObj
 * @param newObj
 */
export default function deepComparison(oldObj, newObj):boolean {
  return equal(oldObj, newObj);
}
