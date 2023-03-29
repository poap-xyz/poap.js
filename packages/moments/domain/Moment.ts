export class Moment {
  /**
   * A UUID
   */
  id: string;
  /**
   * The Author of the moment (For now only ETH Accounts)
   */
  author: string;
  /**
   * When the moment was received on the API
   */
  createdOn: Date;
  /**
   * Specifies the media key
   */
  mediaKey: string;
  /**
   * Specifies where the Moment media is located
   */
  mediaLocation: string;
  /**
   * Specifies the MIME Type of the Moment file
   */
  mimeType: string;
  /**
   * The Drop ID related to the moment
   */
  dropId: number;
  /**
   * The Token ID related to the moment (Optional)
   */
  tokenId?: number;

  constructor(
    id: string,
    author: string,
    createdOn: Date,
    mediaKey: string,
    mediaLocation: string,
    mimeType: string,
    dropId: number,
    tokenId?: number,
  ) {
    this.id = id;
    this.author = author;
    this.createdOn = createdOn;
    this.mediaKey = mediaKey;
    this.mediaLocation = mediaLocation;
    this.mimeType = mimeType;
    this.dropId = dropId;
    this.tokenId = tokenId;
  }
}
