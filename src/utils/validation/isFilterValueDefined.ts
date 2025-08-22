/**
 * Checks if a value given to a query filter is defined.
 *
 * @param {V} value The value to check.
 * @returns {boolean} True if the value is defined, false otherwise.
 */
export function isFilterValueDefined<V>(value?: V): value is NonNullable<V> {
  if (value == null) {
    return false;
  }

  switch (typeof value) {
    case 'boolean':
    case 'object':
      return true;
    case 'number':
      return !isNaN(value);
    default:
      return !!value;
  }
}
