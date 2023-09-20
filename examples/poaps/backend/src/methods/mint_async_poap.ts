import { PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

/**
 * Attempts to mint a POAP (Proof of Attendance Protocol) token asynchronously based on a predefined QR hash and address.
 * After successfully minting, the function fetches and logs the details of the minted POAP.
 * In the event of an error during the process, the error is captured and managed by a separate utility function.
 *
 * Note: Replace 'your_mint_code' and 'your_address' placeholders with appropriate values.
 *
 * @async
 * @function
 * @param {PoapsClient} client - An instance of the PoapsClient to interface with the POAP service.
 * @returns {Promise<void>} Resolves when the operation completes, either with a minted POAP or an error.
 */
export const mint_async_poap = async (client: PoapsClient): Promise<void> => {
  try {
    // Initiate the asynchronous mint process
    const queueUid: string = await client.mintAsync({
      mintCode: '4y453b',
      address: '0xa5a8ac4127946293f5b2e8471db43ebbd21e7428',
    });

    // Wait for the mint's status to transition from 'IN_PROCESS' or 'PENDING' states
    await client.waitMintStatus(queueUid, '4y453b');

    // Wait for the minted POAP to be indexed and fetch the mint code information related to the QR hash
    const getmintCodeResponse = await client.waitPoapIndexed('4y453b');

    // Retrieve and log the specifics of the minted POAP
    console.log(
      (
        await client.fetch({
          limit: 1,
          offset: 0,
          ids: [getmintCodeResponse.result.token],
        })
      ).items[0],
    );
  } catch (error) {
    // Address any errors using the designated utility function
    handleError(error);
  }
};
