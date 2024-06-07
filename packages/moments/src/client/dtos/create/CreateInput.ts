import { CreateSteps } from './CreateSteps';
import { CreateMedia } from './CreateMedia';

/**
 * Interface representing the input needed to create a moment.
 * @interface
 * @property {number} dropId - The ID of the drop related to the moment.
 * @property {number} [tokenId] - The ID of the token related to the moment (optional).
 * @property {string} author - The author of the moment. An Ethereum address.
 * @property {string} description - The description of the moment (optional).
 * @property {string} timeOut - The amount of time to wait until media is processed.
 * @property {(step: CreateSteps) => void | Promise<void>} [onStepUpdate] - Optional callback function to be called when the step changes.
 * @property {(progress: number) => void | Promise<void>} [onFileProgress] - Optional callback function to be called when the file upload progress change - progress is a number between 0 and 1.
 * @property {CreateMedia[]} media - The media to be uploaded.
 */
export interface CreateMomentInput {
  author: string;
  description?: string;
  dropId: number;
  tokenId?: number;
  timeOut?: number;
  onStepUpdate?: (step: CreateSteps) => void | Promise<void>;
  onFileUploadProgress?: (progress: number) => void | Promise<void>;
  media?: CreateMedia[];
}
