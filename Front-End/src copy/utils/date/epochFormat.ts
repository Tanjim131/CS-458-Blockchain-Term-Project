import moment from "moment";

/**
 * Util function to format the date to epoch.
 * @param date - {string}
 */
export default function epochFormat(date: string|Date): number {
  return moment(date).valueOf();
}
export const epochFormatTenDigit = (date: any): number => {
  return Math.floor(date?.getTime()/1000.0);
}
