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
  minted_date_from?: string;
  /** Optional filter for the end date when a Poap was minted. */
  minted_date_to?: string;
  /** Optional filter for specific Poap IDs. */
  ids?: number[];
  /** Optional filter for the collector's address. */
  collector_address?: string;
  /** Optional filter for a specific drop ID. */
  drop_id?: number;
  /** Field by which to sort the results. */
  sort_field?: PoapsSortFields;
  /** Direction in which to sort the results. */
  sort_dir?: Order;
  /** Filter to include/exclude Poaps with zero addresses. */
  filter_by_zero_address?: boolean;
}

/**
 * Represents the input fields required to claim a Poap for a wallet.
 *
 * @export
 * @interface WalletClaimInput
 */
export interface WalletClaimInput {
  qr_hash: string;
  address: string;
}

/**
 * Represents the input fields required to claim a Poap via email.
 *
 * @export
 * @interface EmailClaimtInput
 */
export interface EmailClaimtInput {
  qr_hash: string;
  email: string;
  sendEmail?: boolean;
}
