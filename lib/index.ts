export function decodeAndClean(str: string): string {
  // Step 1: Decode URL-encoded string (e.g., %20 → space)
  let decoded = decodeURIComponent(str);

  // Step 2: Replace multiple spaces with a single space
  let cleaned = decoded.replace(/\s+/g, ' ');

  // Step 3: Trim leading/trailing spaces
  return cleaned.trim();
}
