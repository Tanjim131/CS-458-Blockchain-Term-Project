import moment from "moment";

/**
 * Util function to check dl token valid or not
 * Allowed 45 minutes valid token
 */
export default function dlTokenValidate(): boolean {
  let valid: boolean = false;
  if (localStorage.getItem("dlTokenTime")) {
    valid = true;
    const currentDateTime = moment();
    const LastDLTokenTime = JSON.parse(localStorage.getItem("dlTokenTime") || "");

    if (currentDateTime.diff(LastDLTokenTime, "minutes") > 45) {
      localStorage.removeItem("dlToken");
      localStorage.removeItem("dlTokenTime");
      valid = false;
    }
  } else {
    localStorage.removeItem("dlToken");
    valid = false;
  }
  return valid;
}
