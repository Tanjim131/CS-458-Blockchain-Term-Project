/**
 * This is used for file to base64
 * @param files
 */
export const fileToBase64 = async (files) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (e) => reject(e);
  });
