import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

export const claim_sync_poap = async (client: PoapsClient): Promise<void> => {
  try {
    const data: POAP = await client.claimSync({
      qrHash: 'your_qr_hash',
      address: 'your_address',
    });
    console.log(data);
  } catch (error) {
    handleError(error);
  }
};
