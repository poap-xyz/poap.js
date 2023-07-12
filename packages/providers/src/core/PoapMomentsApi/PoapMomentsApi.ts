import { InvalidMediaFileError } from './errors/InvalidMediaFileError';
import { CreateMomentResponse } from '../../ports/MomentsApiProvider';
import { CreateMomentInput } from '../../ports/MomentsApiProvider';
import { MomentsApiProvider } from '../../ports';
import { AuthenticationProvider } from '../../ports';
import axios, { AxiosError } from 'axios';
import { MediaStatus } from './Types/MediaStatus';

const MOMENTS_BASE_URL = 'https://moments.poap.tech';

/**
 * PoapMomentsApi class provides methods to interact with the POAP Moments API
 * @class
 */
export class PoapMomentsApi implements MomentsApiProvider {
  private readonly baseUrl: string;
  private readonly authenticationProvider?: AuthenticationProvider;

  /**
   * @constructor
   * * @param {Object} params - Object containing constructor parameters.
   *  * @param {string} [params.baseUrl='https://moments.poap.xyz'] - The base URL for the POAP Moments API.
   *  * @param {AuthenticationProvider} [params.authenticationProvider] - Optional authentication provider only used for write operations.ication provider only used for write operations
   */
  constructor(params: {
    baseUrl?: string;
    authenticationProvider?: AuthenticationProvider;
  }) {
    this.baseUrl = params.baseUrl ?? MOMENTS_BASE_URL;
    this.authenticationProvider = params.authenticationProvider;
  }

  /**
   * Fetch a signed URL for uploading a file
   * @returns {Promise<{ url: string; key: string }>} - A Promise that resolves to an object containing the signed URL and the media key
   */
  public async getSignedUrl(): Promise<{ url: string; key: string }> {
    const response = await axios.post(
      `${this.baseUrl}/moments/media-upload-url`,
      undefined,
      {
        headers: {
          Authorization: await this.getAuthorizationToken(),
        },
      },
    );

    return response.data;
  }

  /**
   * Upload a file using the signed URL
   * @param {Uint8Array} fileBinary - The file to be uploaded as a binary array
   * @param {string} fileType - The file type
   * @param {string} signedUrl - The signed URL for uploading the file
   * @param {(progress: number) => void} [onProgress] - Optional callback function to be called when the upload progress changes - progress is a number between 0 and 1
   * @returns {Promise<void>} - A Promise that resolves when the file has been uploaded
   */
  public async uploadFile(
    fileBinary: Uint8Array,
    signedUrl: string,
    fileType: string,
    onProgress?: (progress: number) => void,
  ): Promise<void> {
    await axios.put(signedUrl, fileBinary, {
      headers: {
        'Content-Type': fileType,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress(progressEvent.progress || 0);
        }
      },
    });
  }

  /**
   * Fetches the media processing status.
   * @param {string} mediaKey - The key for the media file
   * @returns {Promise<MediaStatus>} - A Promise that resolves with the media processing status
   */
  public async fetchMediaStatus(mediaKey: string): Promise<MediaStatus> {
    try {
      const response = await axios.get(`${this.baseUrl}/media/${mediaKey}`);
      return response.data.status;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        return MediaStatus.IN_PROCESS;
      }

      throw error;
    }
  }

  /**
   * Waits for the media to finish processing, checking its status at regular intervals.
   * If the media processing status is not MediaStatus.PROCESSED after a maximum number of tries,
   * an error is thrown. If the media status is MediaStatus.INVALID, an InvalidMediaFileError is thrown.
   *
   * @param {string} mediaKey - The key for the media file
   * @param {number} timeOut - The amount of time to wait until media is processed
   * @returns {Promise<void>} - A Promise that resolves when the media processing is complete
   */
  public async waitForMediaProcessing(
    mediaKey: string,
    timeOut = 60000,
  ): Promise<void> {
    const delay = 2000;
    const maxTries = timeOut / delay;

    const checkStatus = async (tries: number): Promise<void> => {
      if (tries >= maxTries) {
        throw new Error(
          'Exceeded maximum number of tries to check media processing status.',
        );
      }
      const status = await this.fetchMediaStatus(mediaKey);

      if (status === MediaStatus.PROCESSED) {
        return;
      }

      if (status === MediaStatus.INVALID) {
        throw new InvalidMediaFileError();
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
      return checkStatus(tries + 1);
    };

    await new Promise((resolve) => setTimeout(resolve, delay));
    return checkStatus(0);
  }

  /**
   * Create a moment using the provided input
   * @param {CreateMomentInput} input - The input for creating a moment
   * @returns {Promise<CreateMomentResponse>} - A Promise that resolves to the created moment
   */
  public async createMoment(
    input: CreateMomentInput,
  ): Promise<CreateMomentResponse> {
    const response = await axios.post(`${this.baseUrl}/moments`, input, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: await this.getAuthorizationToken(),
      },
    });

    return response.data;
  }

  private async getAuthorizationToken(): Promise<string> {
    if (!this.authenticationProvider) {
      throw new Error(
        'An AuthenticationProvider is required for write operations',
      );
    }

    return `Bearer ${await this.authenticationProvider.getJWT(this.baseUrl)}`;
  }
}
