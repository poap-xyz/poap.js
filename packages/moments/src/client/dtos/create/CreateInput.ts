import { CreateSteps } from './CreateSteps';

/**
 * Interface representing the input needed to create a moment.
 * @interface
 * @property {number} dropId - The ID of the drop related to the moment.
 * @property {number} [tokenId] - The ID of the token related to the moment (optional).
 * @property {Uint8Array} fileBinary - The binary of the file to be uploaded.
 * @property {string} author - The author of the moment. An Ethereum address.
 * @property {string} description - The description of the moment (optional).
 * @property {string} timeOut - The amount of time to wait until media is processed.
 * @property {string} fileType - The type of the file.
 * @property {(step: CreateSteps) => void | Promise<void>} [onStepUpdate] - Optional callback function to be called when the step changes.
 * @property {(progress: number) => void | Promise<void>} [onFileProgress] - Optional callback function to be called when the file upload progress change - progress is a number between 0 and 1.
 */
export interface CreateMomentInput {
  fileBinary: Uint8Array;
  fileType: string;
  author: string;
  description?: string;
  dropId: number;
  tokenId?: number;
  timeOut?: number;
  onStepUpdate?: (step: CreateSteps) => void | Promise<void>;
  onFileUploadProgress?: (progress: number) => void | Promise<void>;
}
