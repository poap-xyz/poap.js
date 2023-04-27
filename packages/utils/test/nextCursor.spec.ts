import { nextCursor } from '../src/functions/nextCursor';

describe('nextCursor', () => {
  it('should return null when endIndex is less than the sum of offset and limit', () => {
    const length = 5;
    const limit = 10;
    const offset = 0;

    const result = nextCursor(length, limit, offset);
    expect(result).toBeNull();
  });

  it('should return the correct endIndex when endIndex is greater or equal to the sum of offset and limit', () => {
    const length = 10;
    const limit = 10;
    const offset = 10;

    const result = nextCursor(length, limit, offset);
    expect(result).toBe(20);
  });

  it('should handle different values of length, limit, and offset', () => {
    const testCases = [
      { length: 7, limit: 10, offset: 5, expected: null },
      { length: 10, limit: 5, offset: 5, expected: 15 },
      { length: 5, limit: 5, offset: 5, expected: 10 },
      { length: 0, limit: 10, offset: 10, expected: null },
    ];

    testCases.forEach(({ length, limit, offset, expected }) => {
      const result = nextCursor(length, limit, offset);
      expect(result).toBe(expected);
    });
  });
});
