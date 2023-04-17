import { CreateMomentInput, CreateMomentResponse } from './Types';

/**
 * Provides methods for interacting with a moments API.
 *
 * @interface MomentsApiProvider
 */
export interface MomentsApiProvider {
  /**
   * Retrieves the file URL for uploading a moment to the API.
   *
   * @async
   * @function
   * @name MomentsApiProvider#getSignedUrl
   * @returns {Promise<string>} A Promise that resolves with the file URL from the API.
   */
  getSignedUrl(): Promise<{ url: string; key: string }>;

  /**
   * Creates a new moment on the API.
   *
   * @async
   * @function
   * @name MomentsApiProvider#createMoment
   * @param {CreateMomentInput} input - The input data for creating the moment.
   * @returns {Promise<CreateMomentResponse>} A Promise that resolves with the response from the API.
   */
  createMoment(input: CreateMomentInput): Promise<CreateMomentResponse>;

  uploadFile(file: Buffer, signedUrl: string): Promise<void>;

  waitForMediaProcessing(mediaKey: string): Promise<void>;
}
