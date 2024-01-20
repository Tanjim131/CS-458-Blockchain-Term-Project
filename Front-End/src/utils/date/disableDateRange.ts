import moment from "moment";

/**
 * Util function to disable the date.
 * @param startDate: string
 * @param endDate: string
 */
export function disableDateRange(startDate: string, endDate: string) {
  if (!startDate || !endDate) {
    return false;
  }
  return moment(startDate).endOf("day") < moment(endDate).endOf("day");
}
/**
 * Disable to enter future date
 * @param date string
 */
export function disableFutureDateRange(date: string) {
  return moment(date).endOf("day") > moment();
}

/**
 * Disable to enter past date
 * @param date string
 */
export function disablePastDateRange(date: string) {
  return moment(date).endOf("day") < moment();
}

/**
 * start date validation
 * @param date string
 * @param dateEnd string
 */
export function disableStartDateRange(date: string, dateEnd?: string, issueDate?: string) {
  if (dateEnd && issueDate) {
    return moment(date).endOf("day") > moment() || moment(date).endOf("day") > moment(dateEnd).endOf("day") || moment(date).endOf("day") > moment(issueDate).endOf("day");
  }
  if (dateEnd || issueDate) {
    return moment(date).endOf("day") > moment() || moment(date).endOf("day") > moment(dateEnd ? dateEnd : issueDate).endOf("day");
  }
  return moment(date).endOf("day") > moment();
}
/**
 * end date validation
 * @param date string
 * @param startDate string
 */
export function disableEndDateRange(date: string, startDate?: string, issueDate?: string) {
  if (startDate && issueDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).add(1, 'days').endOf("day") || moment(date).endOf("day") > moment(issueDate).endOf("day");
  }
  if (startDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).add(1, 'days').endOf("day");
  }
  if (issueDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") > moment(issueDate).endOf("day");
  }
  return moment(date).endOf("day") > moment().endOf("day");
}

export function disableCompletionDateRange(date: string, startDate?: string, issueDate?: string) {
  if (startDate && issueDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).endOf("day") || moment(date).endOf("day") > moment(issueDate).endOf("day");
  }
  if (startDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).endOf("day");
  }
  if (issueDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") > moment(issueDate).endOf("day");
  }
  return moment(date).endOf("day") > moment().endOf("day");
}

/**
 * program completion date validation
 * @param date string
 * @param startDate string
 * @param dateEnd string
 */
export function disableProgmDateRange(date: string, startDate?: string, dateEnd?: string) {
  if (startDate && dateEnd) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).endOf("day") || moment(date).endOf("day") < moment(dateEnd).endOf("day");
  }
  if (startDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(startDate).endOf("day");
  }
  if (dateEnd) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(dateEnd).endOf("day");
  }
  return moment(date).endOf("day") > moment().endOf("day");
}
/**
 * valid from date validation
 * @param date string
 * @param validTo string
 */
export function disableValidFromDateRange(date: string, validTo?: string, issueDate?: string) {
  if (validTo && issueDate) {
    return moment(date).endOf("day") > moment() || moment(date).endOf("day") > moment(validTo).endOf("day") || moment(date).endOf("day") < moment(issueDate).endOf("day");
  }
  if (validTo) {
    return moment(date).endOf("day") > moment() || moment(date).endOf("day") > moment(validTo).endOf("day");
  }
  if (issueDate) {
    return moment(date).endOf("day") > moment() || moment(date).endOf("day") < moment(issueDate).endOf("day");
  }
  return moment(date).endOf("day") > moment();
}
/**
 * valid to date validation
 * @param date string
 * @param startDate string
 */
export function disableValidToDateRange(date: string, startDate?: string, issueDate?: string) {
  if (startDate) {
    return moment(date).endOf("day") < moment().endOf("day") || moment(date).endOf("day") < moment(startDate).endOf("day");
  }
  return moment(date).endOf("day") < moment().endOf("day");
}
/**
 * Issuer date validation
 * @param date string
 * @param validFrom string
 * @param endDate string
 */
export function disableIssuerDateRange(date: string, validFrom?: string, endDate?: string) {
  if (validFrom) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") > moment(validFrom).endOf("day");
  }
  if (endDate) {
    return moment(date).endOf("day") > moment().endOf("day") || moment(date).endOf("day") < moment(endDate).endOf("day");
  }
  return moment(date).endOf("day") > moment().endOf("day");
}
