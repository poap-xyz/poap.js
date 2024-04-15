export class CompassBadRequestError extends Error {
  constructor() {
    super('Compass malformed request');
  }
}
