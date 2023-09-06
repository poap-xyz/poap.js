import { PoapsClient } from '@poap-xyz/poaps';
import { MintingStatus, sleep } from '@poap-xyz/utils';
import { handleError } from '../utils/handleError';

/**
 * Asynchronously claims a POAP (Proof of Attendance Protocol) token using a QR hash and an address.
 * If the claim is successful, it fetches and logs the details of the claimed POAP.
 * Any errors encountered during the process are handled using a provided utility function.
 *
 * @param {PoapsClient} client - The initialized PoapsClient to make requests.
 * @returns {Promise<void>}
 *
 * Usage:
 * ```typescript
 * const client = new PoapsClient(...);
 * claim_async_poap(client);
 * ```
 */
export const claim_async_poap = async (client: PoapsClient): Promise<void> => {
  try {
    // Initiate the asynchronous claim process
    const queue_uid: string = await client.claimAsync({
      qr_hash: 'your_qr_hash',
      address: 'yuor_address',
    });

    // Wait for the claim's status to move out of the 'IN_PROCESS' or 'PENDING' states
    const status = await client.waitClaimStatus(queue_uid);
    if (status === MintingStatus.FINISH) {
      // Retrieve the claim code information for the QR hash
      let checkCodeResponse = await client.getClaimCode('your_qr_hash');

      // Poll until a result is found for the claim code
      while (checkCodeResponse.result == null) {
        await sleep(1000);
        checkCodeResponse = await client.getClaimCode('your_qr_hash');
      }

      // Fetch the details of the claimed POAP and log it
      console.log(
        (
          await client.fetch({
            limit: 1,
            offset: 0,
            ids: [checkCodeResponse.result.token],
          })
        ).items[0],
      );
    }
  } catch (error) {
    // Handle any errors using the provided utility function
    handleError(error);
  }
};
