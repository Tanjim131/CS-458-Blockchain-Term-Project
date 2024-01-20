import moment from "moment";

/**
 * Util function to format the date.
 * @param date - {number}
 */
export default function formatDate(date: number, format: string): string {
  return moment(date).format(format);
}
