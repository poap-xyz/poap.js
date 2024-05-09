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
   * The description of the moment.
   */
  public readonly description?: string;

  /**
   * The cid of the moment in Registry
   */
  public readonly cid?: string;

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    dropId: number,
    tokenId?: number,
    description?: string,
    cid?: string,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.dropId = dropId;
    this.tokenId = tokenId;
    this.description = description;
    this.cid = cid;
  }
}
