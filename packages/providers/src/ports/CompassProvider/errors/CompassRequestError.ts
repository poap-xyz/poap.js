import { CompassErrors } from '../types/CompassErrors';

export class CompassRequestError extends Error {
  constructor(compassErrors: CompassErrors) {
    super(
      `Error fetching Compass data: ${compassErrors.errors.map((error) => error.message).join(', ')}`,
    );
  }
}
