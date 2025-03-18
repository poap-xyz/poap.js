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

  it('should accept all numbers except NaN', () => {
    expect(isFilterValueDefined(NaN)).toBe(false);
    expect(isFilterValueDefined(0)).toBe(true);
    expect(isFilterValueDefined(1)).toBe(true);
    expect(isFilterValueDefined(-1)).toBe(true);
  });

  it('should accept all objects', () => {
    expect(isFilterValueDefined({})).toBe(true);
    expect(isFilterValueDefined({ a: 1 })).toBe(true);
  });

  it('should accept all arrays', () => {
    expect(isFilterValueDefined([])).toBe(true);
    expect(isFilterValueDefined([1])).toBe(true);
  });

  it('should reject null and undefined values', () => {
    expect(isFilterValueDefined(null)).toBe(false);
    expect(isFilterValueDefined(undefined)).toBe(false);
  });
});
