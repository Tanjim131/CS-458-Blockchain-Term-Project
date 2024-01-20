import isValidObject from "./isValidObject";
import isValidString from "../string/isValidString";
import isValidArray from "../array/isValidArray";

/**
 * A simple form values sanitizer that trims and removes
 * any additional spaces present in the form. We can extend
 * the functionality of this as needed.
 */
const sanitizer = formValues => {
  if (!isValidObject(formValues)) {
    return formValues;
  }

  const newFormValues = {};

  for (const key in formValues) {
    if (!formValues.hasOwnProperty(key) || !formValues[key]) {
      newFormValues[key] = null;
      continue;
    }

    const formValue = formValues[key];

    // If form value is of type string
    if (isValidString(formValue)) {
      newFormValues[key] = formValue.trim();

      // If form value is of type array and contains string values
    } else if (isValidArray(formValue) && isValidString(formValue[0])) {
      newFormValues[key] = formValue.map(value => value.trim());

      // If form value is of type object
    } else if (isValidObject(formValue)) {
      newFormValues[key] = sanitizer(formValue);

      // Any other type of values such as numbers be kept as it is
    } else {
      newFormValues[key] = formValue;
    }
  }

  return newFormValues;
};

export default sanitizer;
