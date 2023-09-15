import { Order, Chain, PaginationInput } from '@poap-xyz/utils';

/**
 * Enum to define available fields for sorting Poaps.
 *
 * @export
 * @enum {string}
 */
export enum PoapsSortFields {
  /** Represents sorting by the date when a Poap was minted. */
  MintedOn = 'minted_on',
  /** Represents sorting by the ID of a Poap. */
  Id = 'id',
}

/**
 * Represents the input fields for fetching Poaps.
 * This interface extends `PaginationInput` to provide pagination capability.
 *
 * @export
 * @interface FetchPoapsInput
 * @extends {PaginationInput}
 */
export interface FetchPoapsInput extends PaginationInput {
  /** Optional filter for the name of a Poap. */
  name?: string;
  /** Optional filter for the blockchain chain of a Poap. */
  chain?: Chain;
  /** Optional filter for the start date when a Poap was minted. */
  mintedDateFrom?: string;
  /** Optional filter for the end date when a Poap was minted. */
  mintedDateTo?: string;
  /** Optional filter for specific Poap IDs. */
  ids?: number[];
  /** Optional filter for the collector's address. */
  collectorAddress?: string;
  /** Optional filter for a specific drop ID. */
  dropId?: number;
  /** Field by which to sort the results. */
  sortField?: PoapsSortFields;
  /** Direction in which to sort the results. */
  sortDir?: Order;
  /** Filter to include/exclude Poaps with zero addresses. */
  filterByZeroAddress?: boolean;
}

/**
 * Represents the input fields required to claim a Poap for a wallet.
 *
 * @export
 * @interface WalletClaimInput
 */
export interface WalletClaimInput {
  qrHash: string;
  address: string;
}

/**
 * Represents the input fields required to claim a Poap via email.
 *
 * @export
 * @interface EmailClaimInput
 */
export interface EmailClaimInput {
  qrHash: string;
  email: string;
  sendEmail?: boolean;
}
