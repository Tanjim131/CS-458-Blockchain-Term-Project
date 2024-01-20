
/**
 * Util function to change the file size of the document
 * @param size - {number}
 */
export default function convertFileSize(size: number) {

  if (size > 1000000) {
    const fileSizeInMB = (size / 1024 / 1024).toFixed(3);
    return "file_size_mb"+fileSizeInMB ;
  }
  const fileSizeInKB = (size / 1024).toFixed(3);
  return "file_size_kb"+fileSizeInKB ;
}
