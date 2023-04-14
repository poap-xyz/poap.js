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
