import { MediaStatus } from './MediaStatus';

/**
 * Represents a media file for a moment.
 */
export class Media {
  /**
   * The location of the media file.
   */
  public readonly location?: string;

  /**
   * Creates a new instance of the `Media` class.
   * @param key The unique key for the media file.
   * @param mimeType The MIME type of the media file.
   * @param status The status of the media file.
   * @param hash The SHA-256 hash of the media file.
   */
  constructor(
    public readonly key: string,
    public readonly mimeType: string,
    public readonly status: MediaStatus,
    public readonly hash?: string,
  ) {
    if (hash && status === MediaStatus.PROCESSED) {
      this.location = `poap://${hash}`;
    }
  }
}
