export interface createMomentInput {
  /**
   * The Drop ID related to the moment
   */
  dropId: number;
  /**
   * The Token ID related to the moment (Optional)
   */
  tokenId?: number;
  file: Buffer;
  author: string;
  mediaKey: string;
  mimeType: string;
}

export interface FetchMomentsInput {
  limit: number;
  offset: number;
  createdOrder?: string;
  tokenIdOrder?: string;
  dropIdOrder?: string;
  idOrder?: string;
  author?: string;
  from?: string;
  to?: string;
  id?: string;
  token_id?: number;
  drop_id?: number;
}
