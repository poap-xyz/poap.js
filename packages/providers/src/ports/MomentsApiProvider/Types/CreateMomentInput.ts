/**
 * Object describing the input required to create a Moment
 * @typedef {Object} CreateMomentInput
 * @property {number} dropId - The ID of the Drop associated with the Moment
 * @property {string} author - The author of the Moment. An Ethereum address.
 * @property {string} mediaKey - The key of the media file to be uploaded.
 * @property {number} [tokenId] - The ID of the Token associated with the Moment (optional)
 * @property {string} [description] - The description of the Moment (optional)
 */
export interface CreateMomentInput {
  dropId: number;
  author: string;
  mediaKey: string;
  tokenId?: number;
  description?: string;
}
