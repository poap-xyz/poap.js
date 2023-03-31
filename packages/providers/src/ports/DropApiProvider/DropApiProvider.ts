import { CreateDropInput, DropResponse, UpdateDropInput } from './Types';

export interface DropApiProvider {
  createDrop(input: CreateDropInput): Promise<DropResponse>;
  updateDrop(input: UpdateDropInput): Promise<DropResponse>;
}
