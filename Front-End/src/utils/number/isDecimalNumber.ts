export const RegExpToCheckForDecimalNumber: string = "^[\\d]*$";

/**
 * Util function to check if number is a decimal number or not
 * @param number
 */
export default function noDecimalNumber(number: any): boolean {

    if (new RegExp(RegExpToCheckForDecimalNumber).test(number)) {
        return true
    }
    else {
        return false
    }

}

