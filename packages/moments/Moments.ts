import { Moment } from './domain/Moment';
import { MomentsApiProvider } from './ports/MomentsApiProvider';
import { createMomentInput } from './types';

export class Moments {
  constructor(private MomentsApiProvider: MomentsApiProvider) {}

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
