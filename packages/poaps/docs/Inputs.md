# Input Types Documentation

This section documents the input types defined for fetching and managing POAPs (Proof of Attendance Protocol tokens).

## PoapsSortFields

The `PoapsSortFields` enumeration defines the available fields by which POAPs can be sorted.

```typescript
export enum PoapsSortFields {
  MintedOn = 'minted_on',  // Represents sorting by the date when a Poap was minted.
  Id = 'id',  // Represents sorting by the ID of a Poap.
}
```

## FetchPoapsInput

The `FetchPoapsInput` interface represents the input fields for fetching POAPs and extends `PaginationInput` to provide pagination capability.

```typescript
export interface FetchPoapsInput extends PaginationInput {
  name?: string;  // Optional filter for the name of a Poap.
  chain?: Chain;  // Optional filter for the blockchain chain of a Poap.
  mintedDateFrom?: string;  // Optional filter for the start date when a Poap was minted.
  mintedDateTo?: string;  // Optional filter for the end date when a Poap was minted.
  ids?: number[];  // Optional filter for specific Poap IDs.
  collectorAddress?: string;  // Optional filter for the collector's address.
  dropId?: number;  // Optional filter for a specific drop ID.
  sortField?: PoapsSortFields;  // Field by which to sort the results.
  sortDir?: Order;  // Direction in which to sort the results.
  filterByZeroAddress?: boolean;  // Filter to include/exclude Poaps with zero addresses.
}
```

## WalletMintInput

The `WalletMintInput` interface represents the input fields required to mint a POAP for a wallet.

```typescript
export interface WalletMintInput {
  mintCode: string;  // The mint code for the Poap.
  address: string;  // The address of the wallet to mint the Poap to.
}
```

## EmailReservationInput

The `EmailReservationInput` interface represents the input fields required to reserve a POAP via email.

```typescript
export interface EmailReservationInput {
  mintCode: string;  // The mint code for the Poap.
  email: string;  // The email address to reserve the Poap to.
  sendEmail?: boolean;  // Optional field to specify whether to send an email notification.
}
```