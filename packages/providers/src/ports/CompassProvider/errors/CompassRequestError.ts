import { CompassErrors } from '../types/CompassErrors';
import { CompassError } from '../types/CompassError';

export class CompassRequestError extends Error {
  public errors: CompassError[];

  constructor(compassErrors: CompassErrors) {
    super(
      `Error fetching Compass data: ${compassErrors.errors.map((error) => error.message).join(', ')}`,
    );
    this.errors = compassErrors.errors;
  }
}
