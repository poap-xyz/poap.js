import { isFilterValueDefined } from '../../src/validation/isFilterValueDefined';

describe('isFilterValueDefined', () => {
  it('should accept a string if it is not empty', () => {
    expect(isFilterValueDefined('')).toBe(false);
    expect(isFilterValueDefined('a')).toBe(true);
  });

  it('should accept all boolean values', () => {
    expect(isFilterValueDefined(true)).toBe(true);
    expect(isFilterValueDefined(false)).toBe(true);
  });

  it('should accept all numbers except 0 and NaN', () => {
    expect(isFilterValueDefined(0)).toBe(false);
    expect(isFilterValueDefined(NaN)).toBe(false);
    expect(isFilterValueDefined(1)).toBe(true);
    expect(isFilterValueDefined(-1)).toBe(true);
  });

  it('should accept all objects with at least one key', () => {
    expect(isFilterValueDefined({})).toBe(false);
    expect(isFilterValueDefined({ a: 1 })).toBe(true);
  });

  it('should accept arrays with at least one element', () => {
    expect(isFilterValueDefined([])).toBe(false);
    expect(isFilterValueDefined([1])).toBe(true);
  });

  it('should reject null and undefined values', () => {
    expect(isFilterValueDefined(null)).toBe(false);
    expect(isFilterValueDefined(undefined)).toBe(false);
  });
});
