/**
 * Util function to remove special char from string.
 * @param value - {string}
 */
export default function specialCharDiscard(value: any): any {
  return value.replace(/[^a-zA-Z0-9_ ]/g, "");
}
