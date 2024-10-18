export interface CreateMomentResponse {
  /** The Moment ID. */
  id: string;

  /** The author of the moment (for now only ETH accounts). */
  author: string;

  /**
   * When the moment was received on the API.
   */
  createdOn: Date;

  /**
   * The drop ID related to the moment.
   */
  dropId: number;

  /** The description of the moment. */
  description?: string;

  /** The cid of the moment in Registry. */
  cid?: string;
}
