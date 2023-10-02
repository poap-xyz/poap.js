# Error Handling Documentation

This section documents the custom error classes defined for handling specific error scenarios while interacting with POAP tokens.

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

### Example Usage

Below are examples demonstrating how one might use the `PoapsClient` class along with the custom error handling.

```typescript
// Importing necessary classes and error types
import { PoapsClient, WalletMintInput, EmailReservationInput } from '@poap-xyz/poap-client';
import {
  CodeAlreadyMintedError,
  CodeExpiredError,
  FinishedWithError
} from '@poap-xyz/poap-errors';

// Initializing the PoapsClient with providers
const poapsClient = new PoapsClient(compassProvider, tokensApiProvider);

// Defining the WalletMintInput
const walletMintInput: WalletMintInput = {
  mintCode: 'some-mint-code',
  address: '0x1234567890abcdef1234567890abcdef12345678'
};

// Defining the EmailReservationInput
const emailReservationInput: EmailReservationInput = {
  mintCode: 'some-other-mint-code',
  email: 'example@example.com'
};

// Attempting to mint a POAP token synchronously
async function mintPoap() {
  try {
    const poap = await poapsClient.mintSync(walletMintInput);
    console.log('POAP minted successfully:', poap);
  } catch (error) {
    if (error instanceof FinishedWithError) {
      console.error('Error concluding the mint process:', error.message);
      // Action: Notify the user about the error and suggest retrying later.
    } else {
      console.error('An unknown error occurred:', error.message);
      // Action: Log the error and notify the user of a general error.
    }
  }
}

// Attempting to get the secret code for a mint code
async function getSecret() {
  try {
    const secretCode = await poapsClient.getSecretCode(walletMintInput.mintCode);
    console.log('Secret code retrieved:', secretCode);
  } catch (error) {
    if (error instanceof CodeAlreadyMintedError) {
      console.error('This mint code has already been used:', error.message);
      // Action: Notify the user that the mint code has already been used.
    } else if (error instanceof CodeExpiredError) {
      console.error('This mint code has expired:', error.message);
      // Action: Notify the user that the mint code has expired.
    } else {
      console.error('An unknown error occurred:', error.message);
      // Action: Log the error and notify the user of a general error.
    }
  }
}

// Attempting to reserve a POAP via email
async function reservePoap() {
  try {
    const reservation = await poapsClient.emailReservation(emailReservationInput);
    console.log('POAP reserved successfully:', reservation);
  } catch (error) {
    if (error instanceof CodeAlreadyMintedError) {
      console.error('This mint code has already been used:', error.message);
      // Action: Notify the user that the mint code has already been used.
    } else if (error instanceof CodeExpiredError) {
      console.error('This mint code has expired:', error.message);
      // Action: Notify the user that the mint code has expired.
    } else {
      console.error('An unknown error occurred:', error.message);
      // Action: Log the error and notify the user of a general error.
    }
  }
}

// Executing the mintPoap, getSecret, and reservePoap functions
mintPoap();
getSecret();
reservePoap();
```
