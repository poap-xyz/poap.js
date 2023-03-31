import { CreateMomentInput, CreateMomentResponse } from './Types';

export interface MomentsApiProvider {
  getFileUrl(): Promise<string>;
  createMoment(input: CreateMomentInput): Promise<CreateMomentResponse>;
}
