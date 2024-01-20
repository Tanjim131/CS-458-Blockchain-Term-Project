import moment from "moment";

/**
 * Util function to convert epoch to date format.
 * @param date - {number}
 */
export default function epochToDateFormat(date: number): any {
  return moment(date);
}
