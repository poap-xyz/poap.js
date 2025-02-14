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
      return true;
    case 'number':
      return isNumberDefined(value);
    case 'object':
      return isObjectDefined(value);
    default:
      return !!value;
  }
}

function isNumberDefined(value: number): value is NonNullable<number> {
  return !isNaN(value) && value !== 0;
}

function isObjectDefined<V>(value: V & object): boolean {
  return Object.keys(value).length > 0;
}
