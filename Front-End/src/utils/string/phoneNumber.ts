export const RegExpForIndiaPhoneNumber:string = "(\\+91[ -])?(\\d{7})[ -]?(\\d{5})";

export const RegExpForChinaPhoneNumber:string = "(\\+86[ -])?(\\d{4})[ -]?(\\d{9})";

/**
 * Util function to check if phone number is valid or invalid
 * @param email
 */
export default function checkPhoneNumber(phoneNumber: string, countryCode: string): boolean {
  if (!phoneNumber) {
    return true;
  }
  if (countryCode === "in") {
    return new RegExp(RegExpForIndiaPhoneNumber).test(phoneNumber);
  }
  return new RegExp(RegExpForChinaPhoneNumber).test(phoneNumber);

}
