import { PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

/**
 * Attempts to claim a POAP (Proof of Attendance Protocol) token asynchronously based on a predefined QR hash and address.
 * After successfully claiming, the function fetches and logs the details of the claimed POAP.
 * In the event of an error during the process, the error is captured and managed by a separate utility function.
 *
 * Note: Replace 'your_poap_code' and 'your_address' placeholders with appropriate values.
 *
 * @async
 * @function
 * @param {PoapsClient} client - An instance of the PoapsClient to interface with the POAP service.
 * @returns {Promise<void>} Resolves when the operation completes, either with a claimed POAP or an error.
 */
export const claim_async_poap = async (client: PoapsClient): Promise<void> => {
  try {
    // Initiate the asynchronous claim process
    const queue_uid: string = await client.claimAsync({
      poapCode: 'your_poap_code',
      address: 'your_address',
    });

    // Wait for the claim's status to transition from 'IN_PROCESS' or 'PENDING' states
    await client.waitClaimStatus(queue_uid, 'your_poap_code');

    // Wait for the claimed POAP to be indexed and fetch the claim code information related to the QR hash
    const getClaimCodeResponse = await client.waitPoapIndexed('your_poap_code');

    // Retrieve and log the specifics of the claimed POAP
    console.log(
      (
        await client.fetch({
          limit: 1,
          offset: 0,
          ids: [getClaimCodeResponse.result.token],
        })
      ).items[0],
    );
  } catch (error) {
    // Address any errors using the designated utility function
    handleError(error);
  }
};
