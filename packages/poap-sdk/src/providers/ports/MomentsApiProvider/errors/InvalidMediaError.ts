export class InvalidMediaError extends Error {
  constructor(reason: string) {
    super(
      `There was an while creating Moment. Invalid media file. Reason: ${reason}`,
    );
    this.name = InvalidMediaError.name;
  }
}
