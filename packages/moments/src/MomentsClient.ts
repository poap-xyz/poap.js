import { PoapMomentsApi } from '@poap-xyz/providers';
import { Moment } from './domain/Moment';
import { createMomentInput } from './types';

export class MomentsClient {
  constructor(private Poap: PoapMomentsApi) {}

  async createMoment(input: createMomentInput): Promise<Moment> {
    return new Moment(
      'as',
      'as',
      new Date(),
      'as',
      'as',
      'as',
      input.dropId,
      input.tokenId,
    );
  }
}
