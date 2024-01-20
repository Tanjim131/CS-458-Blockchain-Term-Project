export function getMimeType(ext) {
  if (ext.includes("pdf")) {
    return "application/pdf";
  }
  if (ext.includes("png")) {
    return "image/png";
  }
  if (ext.includes("jpg") || ext.includes("jpeg")) {
    return "image/jpeg";
  }
  return "";
}

export function downloadFileFromUrl(url, ext, name) {
  const oReq = new XMLHttpRequest();
  // The Endpoint of your server
  const URLToPDF = url;

  // Configure XMLHttpRequest
  oReq.open("GET", URLToPDF, true);

  // Important to use the blob response type
  oReq.responseType = "blob";

  // When the file request finishes
  // Is up to you, the configuration for error events etc.
  oReq.onload = function () {
    // Once the file is downloaded, open a new window with the PDF
    // Remember to allow the POP-UPS in your browser
    const file = new Blob([oReq.response], {
      type: getMimeType(ext.toLowerCase()),
    });
    const a = document.createElement("a");
    // Generate file download directly in the browser !
    const url = window.URL.createObjectURL(file);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  oReq.send();
}
/**
 * This is used for file size to mb
 * @param size
 */
export function getFileSizeInMB(size) {
  return (size / 1024 / 1024).toFixed(3);
}
/**
 * This is used for allowed file type check
 * @param type
 */
export function getAllowedFileFormat(type) {
  const allowedType = ["application/pdf", "image/png", "image/jpeg"];
  if (allowedType.includes(type)) {
    return true;
  }
  return false;
}
