/** Object describing the input required to create a Moment */
export interface CreateMomentInput {
  dropId: number;
  /** The author of the Moment. An Ethereum address. */
  author: string;
  /** The media keys associated with the Moment */
  mediaKeys: string[];
  /** The description of the Moment (optional) */
  description?: string;
}
