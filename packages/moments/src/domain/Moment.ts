import { Media } from './Media';

/**
 * Represents a moment.
 */
export class Moment {
  /**
   * A UUID.
   */
  public readonly id: string;

  /**
   * The author of the moment (for now only ETH accounts).
   */
  public readonly author: string;

  /**
   * When the moment was received on the API.
   */
  public readonly createdOn: Date;

  /**
   * The media file associated with the moment.
   * @type {Media}
   */
  public readonly media: Media;

  /**
   * The drop ID related to the moment.
   */
  public readonly dropId: number;

  /**
   * The token ID related to the moment (optional).
   */
  public readonly tokenId?: number;

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    dropId: number,
    media: Media,
    tokenId?: number,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.dropId = dropId;
    this.tokenId = tokenId;
    this.media = media;
  }
}
