import { Order, Chain, PaginationInput } from '@poap-xyz/utils';

/**
 * Enum to define available fields for sorting POAPs.
 *
 * @export
 * @enum {string}
 */
export enum PoapsSortFields {
  /** Represents sorting by the date when a POAP was minted. */
  MintedOn = 'minted_on',
  /** Represents sorting by the ID of a POAP. */
  Id = 'id',
}

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
  filterByZeroAddress?: boolean;
}

/**
 * Represents the input fields required to mint a POAP for a wallet.
 *
 * @export
 * @interface WalletMintInput
 */
export interface WalletMintInput {
  mintCode: string;
  address: string;
}

/**
 * Represents the input fields required to reserve a POAP via email.
 *
 * @export
 * @interface EmailReservationInput
 */
export interface EmailReservationInput {
  mintCode: string;
  email: string;
  sendEmail?: boolean;
}
