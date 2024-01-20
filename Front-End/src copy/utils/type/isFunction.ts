
/**
 * Util function to check if the given value is a function
 * @param fun
 */
export default function isFunction(fun: Function): boolean {
  return fun && "function" === typeof fun;
}
