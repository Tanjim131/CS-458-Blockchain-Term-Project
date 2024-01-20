import moment from "moment";

/**
 * Util function to count the number of days from today
 * @param date - date
 */

export const getDaysLeft = (futureDate: any) => {
  const today = moment().format("L")
  const newFormatObject = moment(futureDate,'MM-DD-YYYY')
  const difference = newFormatObject?.diff(today, 'days');
  return difference
};

export default getDaysLeft;
