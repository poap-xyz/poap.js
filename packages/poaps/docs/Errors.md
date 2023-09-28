# Error Handling Documentation

This section documents the custom error classes defined for handling specific error scenarios while interacting with POAP (Proof of Attendance Protocol) tokens.

## CodeAlreadyMintedError

The `CodeAlreadyMintedError` class is thrown when an attempt is made to mint a POAP token using a mint code that has already been used.

```typescript
export class CodeAlreadyMintedError extends Error {
  constructor(code: string) {
    super(`Code: '${code}' already minted `);
  }
}
```

## CodeExpiredError

The `CodeExpiredError` class is thrown when an attempt is made to use a mint code that has expired.

```typescript
export class CodeExpiredError extends Error {
  constructor(code: string) {
    super(`Code: '${code}', has been expired`);
  }
}
```

## FinishedWithError

The `FinishedWithError` class is thrown when a minting operation encounters an error.

```typescript
export class FinishedWithError extends Error {
  constructor(error: string, code: string) {
    super(
      `Code: '${code}', finished with error: '${error}', please try again later `,
    );
  }
}
```

### Usage

These custom error classes allow for more precise error handling and better debugging, by providing specific error messages based on the type of error encountered. They extend the native JavaScript `Error` class and can be used in a similar manner, with the added benefit of POAP-specific error messages.