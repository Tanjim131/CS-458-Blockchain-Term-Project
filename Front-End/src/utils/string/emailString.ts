/**
 * Util function to remove special char from string.
 * @param value - {string}
 */
 export default function emailString(value: any): any {
    return value.replace(/[^a-zA-Z0-9@.!#$%&'*+-/=?^_`{|}~"(),:;<>[\]]/g, "");
  }
  