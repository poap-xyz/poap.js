import { MomentsClient, createMomentInput } from '@poap-xyz/moments';
import fs from 'fs';

export const create_moment = async (client: MomentsClient): Promise<void> => {
  const input: createMomentInput = {
    dropId: 110148,
    /**
     * The Token ID related to the moment (Optional)
     */
    tokenId: 6568008,
    file: await fs.promises.readFile('src/assets/poap.png'),
    author: '0x82AB2941Cf555CED5ad7Ed232a5B5f6083815FBC',
    mimeType: 'image/png',
  };
  const response = await client.createMoment(input);
  console.log(response);
};
