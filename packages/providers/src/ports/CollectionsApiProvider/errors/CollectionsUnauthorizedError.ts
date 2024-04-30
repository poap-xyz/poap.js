export class CollectionsUnauthorizedError extends Error {
  constructor() {
    super('Unauthorized access, Authorization token may be invalid or expired');
  }
}
