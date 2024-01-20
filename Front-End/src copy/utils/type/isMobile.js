/**
 * Util function to check device type Mobile/Desktop
 *
 */
export default function isMobile() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    return true;
  }
  return false;
}
