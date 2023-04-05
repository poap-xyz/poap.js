/**
 * Represents a Moment in the POAP system.
 * @class
 **/
export class Moment {
  /**
   * A UUID
   * @type {string}
   */
  id: string;
  /**
   * The Author of the moment (For now only ETH Accounts)
   * @type {string}
   */
  author: string;
  /**
   * When the moment was received on the API
   * @type {Date}
   */
  createdOn: Date;
  /**
   * Specifies the media key
   * @type {string}
   */
  mediaKey: string;
  /**
   * Specifies where the Moment media is located
   * @type {string}
   */
  mediaLocation: string;
  /**
   * Specifies the MIME Type of the Moment file
   * @type {string}
   */
  mimeType: string;
  /**
   * The Drop ID related to the moment
   * @type {number}
   */
  dropId: number;
  /**
   * The Token ID related to the moment (Optional)
   * @type {number}
   */
  tokenId?: number;
  /**
   * Creates a new instance of the Moment class.
   * @param {string} id - The ID of the moment.
   * @param {string} author - The address of the author of the moment.
   * @param {Date} createdOn - The date and time when the moment was received by the API.
   * @param {string} mediaKey - The media key of the moment.
   * @param {string} mediaLocation - The location of the media associated with the moment.
   * @param {string} mimeType - The MIME type of the media file associated with the moment.
   * @param {number} dropId - The ID of the drop that this moment is associated with.
   * @param {number |undefined} tokenId - The ID of the token associated with this moment. This parameter is optional.
   */
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
