export class InvalidMediaFileError extends Error {
  constructor() {
    super(
      `InvalidMediaFile error: This media file is invalid or cannot be processed.`,
    );
  }
}
