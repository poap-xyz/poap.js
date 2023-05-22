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

/**
 * Represents a media file for a moment.
 */
export interface Media {
  key: string;
  mimeType: string;
  status: MediaStatus;
  hash?: string;
  gateways?: string[];
}

export interface CreateMomentResponse {
  id: string;

  /**
   * The author of the moment (for now only ETH accounts).
   */
  author: string;

  /**
   * When the moment was received on the API.
   */
  createdOn: Date;

  /**
   * The media file associated with the moment.
   * @type {Media}
   */
  media: Media;

  /**
   * The drop ID related to the moment.
   */
  dropId: number;

  /**
   * The token ID related to the moment (optional).
   */
  tokenId?: number;
}
