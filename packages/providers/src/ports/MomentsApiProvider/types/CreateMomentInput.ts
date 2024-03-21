/**
 * Object describing the input required to create a Moment
 * @typedef {Object} CreateMomentInput
 * @property {number} dropId - The ID of the Drop associated with the Moment
 * @property {string} author - The author of the Moment. An Ethereum address.
 * @property {string[]} mediaKeys - The media keys associated with the Moment
 * @property {number} [tokenId] - The ID of the Token associated with the Moment (optional)
 * @property {string} [description] - The description of the Moment (optional)
 */
export interface CreateMomentInput {
  dropId: number;
  author: string;
  mediaKeys: string[];
  tokenId?: number;
  description?: string;
}
