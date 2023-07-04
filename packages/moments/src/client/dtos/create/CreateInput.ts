import { CreateSteps } from './CreateSteps';

/**
 * Interface representing the input needed to create a moment.
 * @interface
 * @property {number} dropId - The ID of the drop related to the moment.
 * @property {number} [tokenId] - The ID of the token related to the moment (optional).
 * @property {Buffer} file - The buffer containing the file data.
 * @property {string} author - The author of the moment.
 * @property {string} timeOut - The amount of time to wait until media is processed.
 * @property {string} fileType - The type of the file.
 */
export interface CreateMomentInput {
  dropId: number;
  tokenId?: number;
  file: Buffer;
  author: string;
  timeOut?: number;
  fileType: string;
  onStepUpdate?: (step: CreateSteps) => void | Promise<void>;
}
