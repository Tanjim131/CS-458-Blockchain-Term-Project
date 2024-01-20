// Regexp pattern for validations.
export const RegExpEmailValidation: string = "^[a-zA-Z0-9!#\\$%&'\\*\\+\\/=\\?\\^_\\{\\|}~-]+(\\.[a-zA-Z0-9!#\\$%&'\\*\\+\\/=\\?\\^_\\{\\|}~-]+)*" +
  "@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.([a-zA-Z]{2,4})$";

  /** Minimum 8 character, 1 uppercase, 1 lowercase, 1 number, 1 special character */
export const RegExpPasswordStrengthValidation: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$";

/**
 * Util function to check if email address is valid or invalid
 * @param email
 */
export default function isValidEmail(email: string): boolean {
  if (!email) {
    return true;
  }
  return new RegExp(RegExpEmailValidation).test(email);
}

/**
 * Check the password strength.
 * @param password
 */
export function checkPasswordStrength(password: string): boolean {
  if (!password) {
    return true;
  }
  return new RegExp(RegExpPasswordStrengthValidation).test(password);
}
