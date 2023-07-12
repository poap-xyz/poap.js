/* eslint-disable max-statements */
import { MomentsClient, CreateMomentInput } from '@poap-xyz/moments';
import fs from 'fs';
import mime from 'mime';

export const create_moment = async (client: MomentsClient): Promise<void> => {
  const fileBuffer = await fs.promises.readFile('src/assets/poap.png');
  const mimeType = mime.getType('src/assets/poap.png');

  if (!mimeType) {
    console.log('Could not determine file type.');
    return;
  }

  const input: CreateMomentInput = {
    dropId: 110148,
    /**
     * The Token ID related to the moment (Optional)
     */
    tokenId: 6568008,
    fileBinary: fileBuffer,
    author: '0x82AB2941Cf555CED5ad7Ed232a5B5f6083815FBC',
    fileType: mimeType,
  };

  try {
    const response = await client.createMoment(input);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
