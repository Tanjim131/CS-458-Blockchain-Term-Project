export const RegExpForAlphabets:string = "^[a-zA-Z_ ]*$";

/**
 * Util function to check if string have only alphabets
 * @param email
 */
export default function alphabetsOnly(name: string): boolean {
  if (!name) {
    return true;
  }
  return new RegExp(RegExpForAlphabets).test(name);
}
