import { Drop, FetchDropsInput } from '../types';
import { PaginatedResult } from '../utils/types';

export interface DropsProvider {
  fetchDrops(input: FetchDropsInput): Promise<PaginatedResult<Drop>>;
}
