import {
  CodeAlreadyClaimedError,
  CodeExpiredError,
  FinishedWithError,
} from '@poap-xyz/poaps';

/**
 * Handles specific POAP-related errors by logging them.
 *
 * Errors handled:
 * - CodeAlreadyClaimedError: Thrown when a POAP mint code has already been minted.
 * - CodeExpiredError: Thrown when a POAP mint code has expired and is no longer valid for minting.
 * - FinishedWithError: Thrown when the POAP mint process completes but encounters an error.
 *
 * @param {unknown} error - The error object to be checked and handled.
 */
export const handleError = (error: unknown): void => {
  if (
    // Checks if the error is an instance of CodeAlreadyClaimedError.
    // This error occurs when a user attempts to mint a POAP that has already been minted by someone else.
    error instanceof CodeAlreadyClaimedError ||
    // Checks if the error is an instance of CodeExpiredError.
    // This error is thrown when the mint code for a POAP has expired.
    error instanceof CodeExpiredError ||
    // Checks if the error is an instance of FinishedWithError.
    // This error indicates that the POAP mint process finished but encountered an unexpected error.
    error instanceof FinishedWithError
  ) {
    // Logs the specific error message.
    console.error(error);
  }
};
