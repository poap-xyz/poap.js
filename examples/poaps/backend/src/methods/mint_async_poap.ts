import { PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

/**
 * Attempts to mint a POAP  token asynchronously based on a predefined Mint Code and address.
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
    await client.mintAsync({
      mintCode: 'your_mint_code',
      address: 'your_address',
    });

    // Wait for the mint's status to transition from 'IN_PROCESS' or 'PENDING' states
    await client.waitMintStatus('your_mint_code');

    // Wait for the minted POAP to be indexed and fetch the mint code information related to the Mint Code
    const getMintCodeResponse = await client.waitPoapIndexed('your_mint_code');

    // Retrieve and log the specifics of the minted POAP
    console.log(
      (
        await client.fetch({
          limit: 1,
          offset: 0,
          ids: [getMintCodeResponse.poapId],
        })
      ).items[0],
    );
  } catch (error) {
    // Address any errors using the designated utility function
    handleError(error);
  }
};
