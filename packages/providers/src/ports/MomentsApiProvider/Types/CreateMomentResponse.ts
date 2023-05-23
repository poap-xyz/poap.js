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
   */
  media: {
    gateways: string[];
  };

  /**
   * The drop ID related to the moment.
   */
  dropId: number;

  /**
   * The token ID related to the moment (optional).
   */
  tokenId?: number;
}
