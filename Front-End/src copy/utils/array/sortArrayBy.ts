/**
 * Sorts an array with the given options
 * @param array The original array to be sorted
 * @param compareValueGetter How the array elements will be evaluated
 * @param ascending The sort order
 * Usage Example:
 * sortArrayBy([{name:"A",age:23}, {name:"B",age:20}, {name:"C",age:21}], entry=>entry.age, true)
 */
export default function sortArrayBy<T>(
  array: T[],
  compareValueGetter: (entry: T) => number | string,
  ascending: boolean = true,
) {
  return array.sort((entryA, entryB) => {
    const valA = compareValueGetter(entryA);
    const valB = compareValueGetter(entryB);
    const sortOrder = valA > valB ? 1 : -1;
    return ascending ? sortOrder : sortOrder * -1;
  });
}
