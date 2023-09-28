# PoapsClient

## Description

`PoapsClient` is a class representing a client for interacting with POAPs (Proof of Attendance Protocol tokens).

## Constructor

```typescript
constructor(
  private compassProvider: CompassProvider,
  private tokensApiProvider: TokensApiProvider
)
```

- `compassProvider` (`CompassProvider`): The provider for the POAP compass API.
- `tokensApiProvider` (`TokensApiProvider`): The provider for the Tokens API.

## Methods

### `fetch`

```typescript
async fetch(input: FetchPoapsInput): Promise<PaginatedResult<POAP>>
```

Fetches a list of POAP tokens based on the given input criteria.

#### Parameters

- `input` (`FetchPoapsInput`): Criteria for fetching POAP tokens.

#### Returns

A promise that resolves to a paginated list of POAP tokens.

### `getSecretCode`

```typescript
private async getSecretCode(mintCode: string): Promise<string>
```

Retrieves the secret code associated with a POAP code.

#### Parameters

- `mintCode` (`string`): The POAP code for which to get the secret.

#### Returns

A promise that resolves to the associated secret code.

#### Throws

- `CodeAlreadyMintedError`: Thrown when the POAP code has already been minted.
- `CodeExpiredError`: Thrown when the POAP code is expired.

### `getMintCode`

```typescript
async getMintCode(mintCode: string): Promise<PoapMintStatus>
```

Retrieves mint code details for a specific QR hash.

#### Parameters

- `mintCode` (`string`): The QR hash for which to get the mint code.

#### Returns

A promise that resolves to the mint code details.

### `getMintStatus`

```typescript
async getMintStatus(queueUid: string): Promise<MintingStatus>
```

Fetches the current status of a mint based on its unique ID.

#### Parameters

- `queueUid` (`string`): The unique ID of the mint.

#### Returns

A promise that resolves to the current status of the mint.

### `waitMintStatus`

```typescript
async waitMintStatus(queueUid: string, mintCode: string): Promise<void>
```

Awaits until the mint's status changes from 'IN_PROCESS' or 'PENDING'.

#### Parameters

- `queueUid` (`string`): The unique ID of the mint.
- `mintCode` (`string`): The QR hash for the mint.

#### Returns

A promise that resolves when the mint's status changes.

### `waitPoapIndexed`

```typescript
async waitPoapIndexed(mintCode: string): Promise<PoapMintStatus>
```

Awaits until a specific POAP, identified by its QR hash, is indexed.

#### Parameters

- `mintCode` (`string`): The QR hash identifying the POAP to be indexed.

#### Returns

A promise that resolves to details of the indexed POAP.

### `mintAsync`

```typescript
async mintAsync(input: WalletMintInput): Promise<string>
```

Begins an asynchronous mint process and provides a unique queue ID in return.

#### Parameters

- `input` (`WalletMintInput`): Details required for the mint.

#### Returns

A promise that resolves to a unique queue ID for the initiated mint.

### `mintSync`

```typescript
async mintSync(input: WalletMintInput): Promise<POAP>
```

Starts a synchronous mint process.

#### Parameters

- `input` (`WalletMintInput`): Details needed for the mint.

#### Returns

A promise that resolves to the associated POAP upon successful mint completion.

### `emailReservation`

```typescript
async emailReservation(
  input: EmailReservationInput
): Promise<POAPReservation>
```

Reserves a POAP against an email address and provides reservation details.

#### Parameters

- `input` (`EmailReservationInput`): Information for the reservation.

#### Returns

A promise that resolves to the reservation details of the POAP.

## Related Types

- [`PoapsClient`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/PoapsClient.md)
- [`POAP`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/POAP.md)
- [`POAPReservation`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/POAPReservation.md)
- [`FetchPoapsInput`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/inputs.md/FetchPoapsInput)
- [`PoapMintStatus`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/responses.md/PoapMintStatus)
- [`PoapsSortFields`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/inputs.md/PoapsSortFields)
- [`CodeAlreadyMintedError`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/CodeAlreadyMintedError)
- [`CodeExpiredError`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/CodeExpiredError)
- [`FinishedWithError`](https://github.com/poap-xyz/poap.js/tree/main/packages/poaps/docs/errors.md/FinishedWithError)
