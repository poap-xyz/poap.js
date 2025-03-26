export class CollectionsBadRequestError extends Error {
  constructor() {
    super('Collections malformed request');
  }
}
