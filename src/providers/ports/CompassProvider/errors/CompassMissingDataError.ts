export class CompassMissingDataError extends Error {
  constructor() {
    super('Compass response is missing data');
  }
}
