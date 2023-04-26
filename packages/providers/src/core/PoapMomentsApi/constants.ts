/**
 * The status of a media file.
 */
export enum MediaStatus {
  /**
   * The media file has an invalid format, contains malicious content,
   * or some other error has occurred.
   */
  INVALID = 'INVALID',

  /**
   * The validations have passed and the media file has been processed successfully.
   */
  PROCESSED = 'PROCESSED',

  /**
   * The media file is currently being processed.
   */
  IN_PROCESS = 'IN_PROCESS',
}
