/**
 * Sorts an array and move 'Others' at end
 */
export default function sortArrayByOthers(array: any) {
  const newArray = array.filter((value: string, index: number, list: any) => list.indexOf(value) === index).sort();
  const str: string = "Others";
  const index: number = newArray.indexOf(str);
  if (index > -1) {
    newArray.splice(index, 1);
    newArray.push(str);
  }
  return newArray;
}
