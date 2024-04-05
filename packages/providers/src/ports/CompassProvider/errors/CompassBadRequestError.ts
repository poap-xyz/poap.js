export class CompassBadRequestError extends Error {
  constructor(message: string = 'Bad request') {
    super(message);
    this.name = 'CompassBadRequestError';
  }
}
