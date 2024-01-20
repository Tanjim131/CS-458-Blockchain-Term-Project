import moment from "moment";

/**
 * Util function to count the number of days from today
 * @param email - {string}
 */
const daysCount = (date: string) => {
  const today = moment();
  // return (today.diff(date, "days"));
  return (today.diff(date));  // to be removed after testing
};

export default daysCount;
