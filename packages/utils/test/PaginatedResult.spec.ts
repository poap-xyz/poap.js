import { PaginatedResult } from './../src/types/pagination';

describe('PaginatedResult', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  const nextCursor = 'next-page-cursor';

  it('should initialize with the provided items and nextCursor', () => {
    const paginatedResult = new PaginatedResult(items, nextCursor);

    expect(paginatedResult.items).toEqual(items);
    expect(paginatedResult.nextCursor).toBe(nextCursor);
  });

  it('should initialize with an empty array and null cursor when not provided', () => {
    const paginatedResult = new PaginatedResult([], null);

    expect(paginatedResult.items).toEqual([]);
    expect(paginatedResult.nextCursor).toBeNull();
  });

  it('should handle different item types', () => {
    const numberItems = [1, 2, 3];
    const stringItems = ['a', 'b', 'c'];
    const numberPaginatedResult = new PaginatedResult(numberItems, nextCursor);
    const stringPaginatedResult = new PaginatedResult(stringItems, nextCursor);

    expect(numberPaginatedResult.items).toEqual(numberItems);
    expect(stringPaginatedResult.items).toEqual(stringItems);
  });
});
