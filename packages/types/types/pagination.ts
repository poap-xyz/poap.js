export class PaginatedResult<T> {
  items: T[];
  nextCursor: string | number | null;

  constructor(items: T[], nextCursor: string | number | null) {
    this.items = items;
    this.nextCursor = nextCursor;
  }
}
