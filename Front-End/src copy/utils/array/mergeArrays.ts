/**
 * Merge an array with the given arrays
 * @param array The original array to be sorted
 * @param compareValueGetter How the array elements will be evaluated
 * @param ascending The sort order
 * Usage Example:
 * mergeArrays([{name:"A",age:23}, {name:"B",age:20}, {name:"C",age:21}], entry=>entry.age, true)
 */
const mergeArrays = (arr1: any = [], arr2: any = [], prop: any): [] => {
  let res = [];
  res = arr1?.map((obj: any) => {
    const index = arr2.findIndex((el: any) => el[prop] == obj[prop]);
    const remProps = index !== -1 ? arr2[index] : {};
    return {
      ...obj,
      ...remProps,
    };
  });
  return res;
};

export default mergeArrays;
