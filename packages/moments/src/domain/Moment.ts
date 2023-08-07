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
   * The drop ID related to the moment.
   */
  public readonly dropId: number;

  /**
   * The token ID related to the moment (optional).
   */
  public readonly tokenId?: number;

  /**
   * Indicates an array of gateways that the media file is stored on.
   */
  public readonly gateways: string[];

  /**
   * The description of the moment.
   */
  public readonly description?: string;

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    dropId: number,
    gateways: string[],
    tokenId?: number,
    description?: string,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.dropId = dropId;
    this.tokenId = tokenId;
    this.gateways = gateways;
    this.description = description;
  }
}
