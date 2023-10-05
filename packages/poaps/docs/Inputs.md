# Input Types Documentation

This section documents the input types used to fetch and manage POAPs .

## PoapsSortFields

The `PoapsSortFields` enumeration defines the available fields by which POAPs can be sorted.

| Property   | Value       | Description                                            |
| ---------- | ----------- | ------------------------------------------------------ |
| `MintedOn` | `minted_on` | Represents sorting by the date when a POAP was minted. |
| `Id`       | `id`        | Represents sorting by the ID of a POAP.                |

```typescript
export enum PoapsSortFields {
  MintedOn = 'minted_on',
  Id = 'id',
}
```

## FetchPoapsInput

The `FetchPoapsInput` interface represents the input fields for fetching POAPs and extends `PaginationInput` to provide pagination capability.

| Property              | Type               | Description                                                |
| --------------------- | ------------------ | ---------------------------------------------------------- |
| `name`                | `string?`          | Optional filter for the name of a POAP.                    |
| `chain`               | `Chain?`           | Optional filter for the blockchain chain of a POAP.        |
| `mintedDateFrom`      | `string?`          | Optional filter for the start date when a POAP was minted. |
| `mintedDateTo`        | `string?`          | Optional filter for the end date when a POAP was minted.   |
| `ids`                 | `number[]?`        | Optional filter for specific POAP IDs.                     |
| `collectorAddress`    | `string?`          | Optional filter for the collector's address.               |
| `dropId`              | `number?`          | Optional filter for a specific drop ID.                    |
| `sortField`           | `PoapsSortFields?` | Field by which to sort the results.                        |
| `sortDir`             | `Order?`           | Direction in which to sort the results.                    |
| `filterByZeroAddress` | `boolean?`         | Filter to include/exclude POAPs with zero addresses.       |

```typescript
export interface FetchPoapsInput extends PaginationInput {
  name?: string;
  chain?: Chain;
  mintedDateFrom?: string;
  mintedDateTo?: string;
  ids?: number[];
  collectorAddress?: string;
  dropId?: number;
  sortField?: PoapsSortFields;
  sortDir?: Order;
  filterByZeroAddress?: boolean;
}
```

## WalletMintInput

The `WalletMintInput` interface represents the input fields required to mint a POAP for an Ethereum wallet address.

| Property   | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| `mintCode` | `string` | The mint code for the POAP.                    |
| `address`  | `string` | The address of the wallet to mint the POAP to. |

```typescript
export interface WalletMintInput {
  mintCode: string;
  address: string;
```

## EmailReservationInput

The `EmailReservationInput` interface represents the input fields required to reserve a POAP via email.

| Property    | Type       | Description                                                                                                                                                                                                                                             |
| ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mintCode`  | `string`   | The mint code for the POAP, essential for identifying the specific POAP being reserved.                                                                                                                                                                 |
| `email`     | `string`   | The email address for reserving the POAP, where the reservation confirmation and next steps will be sent.                                                                                                                                               |
| `sendEmail` | `boolean?` | Optional field to specify whether to send an email notification. If set to true or omitted, an email containing the next steps will be sent to the provided email address. If set to false, no email will be sent, although the POAP is still reserved. |

```typescript
export interface EmailReservationInput {
  mintCode: string;
  email: string;
  sendEmail?: boolean;
}
```
