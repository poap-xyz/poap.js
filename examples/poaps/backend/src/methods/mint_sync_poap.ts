import { POAP, PoapsClient } from '@poap-xyz/poaps';
import { handleError } from '../utils/handleError';

export const mint_sync_poap = async (client: PoapsClient): Promise<void> => {
  try {
    const data: POAP = await client.mintSync({
      mintCode: '8bl4jw',
      address: '0x7895bbcd458d1d0a86f7bf7608c26ebd4420333e',
    });
    console.log(data);
  } catch (error) {
    handleError(error);
  }
};
