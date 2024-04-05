export class CompassUnauthorizedError extends Error {
  constructor() {
    super('Unauthorized access, API key may be invalid or expired');
    this.name = 'CompassUnauthorizedError';
  }
}
