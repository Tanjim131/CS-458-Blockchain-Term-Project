import moment from "moment";

/**
 * Util function to count the number of days from today
 * @param date - date
 */
const coinDetailsDaysCountFromEpoch = (date: any) => {
  const today = moment();
  const futureDate = moment([date])
  return (futureDate?.diff(today, "days"));
};

export const daysCountFromEpoch = (date: any) => {
  const today = moment();
  return (today.diff(date, "days"));
};

export default coinDetailsDaysCountFromEpoch;
