export const RegexNotAllowFirstLetterAsNumberOrSpecialCharacter: string = "^[!^a-zA-Z][a-zA-Z0-9\\s_@&#!$]{1,49}$";

export const RegexOnlyAlphabetsAndSpace: string = "^[a-zA-Z_ ]*$";

/**
 * Util function to check if number or special character is not present on first digit
 * @param text
 */
 export default function isValidInput(text: string): boolean {
    if (!text) {
      return true;
    }
    return new RegExp(RegexNotAllowFirstLetterAsNumberOrSpecialCharacter).test(text);
  }
  