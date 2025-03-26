/**
 * Checks if a value is numeric.
 *
 * @param {unknown} value The value to check.
 * @param {boolean} allowNegative Whether to allow negative numbers.
 * @returns {boolean} True if the value is numeric, false otherwise.
 */
export function isNumeric(value: unknown, allowNegative = false): boolean {
  if (typeof value === 'string') {
    return (allowNegative ? /^-?\d+$/ : /^\d+$/).test(value);
  }

  if (typeof value === 'number') {
    return true;
  }

  return false;
}
