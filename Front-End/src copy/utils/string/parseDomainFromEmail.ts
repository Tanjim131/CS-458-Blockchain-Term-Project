/**
 * Util function to parse the domain name from email address.
 * @param email - {string}
 */
export default function parseDomainFromEmail(email: string): string {
  if (!email) {
    return "";
  }
  return email.replace(/.*@/, "");
}
