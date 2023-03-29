import { DropsProvider } from './Drop/DropsProvider';
import { Drop, FetchDropsInput } from './types';
import { PaginatedResult } from './utils/types';

export class Drops {
  constructor(private DropsProvider: DropsProvider) {}

  async fetchDrops(input: FetchDropsInput): Promise<PaginatedResult<Drop>> {
    return this.DropsProvider.fetchDrops(input);
  }
}
