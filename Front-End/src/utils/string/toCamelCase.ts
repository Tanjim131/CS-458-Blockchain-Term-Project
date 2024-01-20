import isValidArray from "../array/isValidArray";

/**
 * Util function to convert a given string to camel case
 * @param email
 */
export default function toCamelCase(str: string): string {
  const words = str.split(" ");
  if (!isValidArray(words)) {
    return str;
  }
  return words.map(word => {
    return word.replace(/(?:^\w|[A-Z]|\b\w)/g, (wordStr, idx) => 0 === idx ? wordStr.toUpperCase() : wordStr.toLowerCase()).replace(/\s+/g, "");
  }).join(" ");
}
