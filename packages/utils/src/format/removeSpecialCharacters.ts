/**
 * Removes all special characters from a given string, leaving only alphanumeric
 * characters and spaces.
 *
 * @param {string} str - The string from which to remove special characters.
 * @returns {string} The cleaned string with only alphanumeric characters and spaces.
 */
export function removeSpecialCharacters(str: string): string {
  return str.replace(/[^a-zA-Z0-9 ]/g, '');
}
