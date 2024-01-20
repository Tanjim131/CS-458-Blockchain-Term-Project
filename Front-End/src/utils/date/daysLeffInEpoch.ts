import moment from "moment";

/**
 * Util function to count the number of days from today
 * @param date - {number}
 */
const daysLeftFromEpoch = (date: number) => {
    var timeLeft = date - (new Date()).getTime();
    var days = Math.ceil((((timeLeft / 1000) / 60) / 60) / 24)
    return days;
};

export default daysLeftFromEpoch;
