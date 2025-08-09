// utils/validateIPv4.ts

/**
 * Validate if a given string is a valid IPv4 address
 * @param ip - The IPv4 address as a string
 * @returns boolean - true if valid IPv4, false otherwise
 */
export function isValidIPv4(ip: string): boolean {
  // Basic regex to check IPv4 format (0-255.0-255.0-255.0-255)
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

  return ipv4Regex.test(ip.trim());
}
