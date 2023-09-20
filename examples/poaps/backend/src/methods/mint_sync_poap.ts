import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

export const mint_sync_poap = async (client: PoapsClient): Promise<void> => {
  try {
    const data: POAP = await client.mintSync({
      mintCode: 'your_poap_code',
      address: 'your_address',
    });
    console.log(data);
  } catch (error) {
    handleError(error);
    console.error(error);
  }
};
