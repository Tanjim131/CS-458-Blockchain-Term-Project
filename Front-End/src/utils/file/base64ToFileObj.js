/**
 * This is used for base64 to file obj
 * @param file
 */
export const base64ToFileObj = (file: any, fileName: string, mime: string) => {
  const arr = file.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};
