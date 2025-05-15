import { Order, Chain, PaginationInput } from '@poap-xyz/poap-sdk';
import { PoapsSortFields } from './PoapsSortFields';

/**
 * Represents the input fields for fetching POAPs.
 * This interface extends `PaginationInput` to provide pagination capability.
 *
 * @export
 * @interface FetchPoapsInput
 * @extends {PaginationInput}
 */
export interface FetchPoapsInput extends PaginationInput {
  /** Optional filter for the name of a POAP. */
  name?: string;
  /** Optional filter for the blockchain chain of a POAP. */
  chain?: Chain;
  /** Optional filter for the start date when a POAP was minted. */
  mintedDateFrom?: string;
  /** Optional filter for the end date when a POAP was minted. */
  mintedDateTo?: string;
  /** Optional filter for specific POAP IDs. */
  ids?: number[];
  /** Optional filter for the collector's address. */
  collectorAddress?: string;
  /** Optional filter for a specific drop ID. */
  dropId?: number;
  /** Field by which to sort the results. */
  sortField?: PoapsSortFields;
  /** Direction in which to sort the results. */
  sortDir?: Order;
  /** Filter to include/exclude POAPs with zero addresses. */
  filterZeroAddress?: boolean;
  /** Filter out dead addresses? */
  filterDeadAddress?: boolean;
}
