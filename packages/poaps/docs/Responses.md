# Responses Documentation

This section documents the response types defined for managing and interacting with POAPs (Proof of Attendance Protocol tokens).

## PoapMintStatus

The `PoapMintStatus` interface represents the status of a minting operation for a POAP token.

```typescript
export interface PoapMintStatus {
  minted: boolean;
  isActive: boolean;
  secretCode: string;
  poapId: number;
}
```

### Properties

| Property    | Type      | Description                                                                                      |
|-------------|-----------|--------------------------------------------------------------------------------------------------|
| `minted`    | `boolean` | Indicates whether the POAP token has been minted.                                                |
| `isActive`  | `boolean` | Indicates whether the mint code is active.                                                       |
| `secretCode`| `string`  | The secret code associated with the minting operation. This code is required to mint a POAP token to a wallet. |
| `poapId`    | `number`  | The identifier of the minted POAP token. This ID is unique to each POAP token and can be used to fetch further details about the token. |

The `PoapMintStatus` interface is crucial for understanding the result of a minting operation, providing essential information about the mint status, and the details of the minted POAP token.
