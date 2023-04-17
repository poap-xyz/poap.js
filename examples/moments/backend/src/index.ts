/* eslint-disable @typescript-eslint/no-explicit-any */
import { MomentsClient } from '@poap-xyz/moments';
import { PoapMomentsApi } from '@poap-xyz/providers';
import fs from 'fs';

async function main(): Promise<void> {
  // Use your library here
  const client = new MomentsClient(new PoapMomentsApi('your_api_key'));
  // Create Moment
  const response = await client.createMoment({
    dropId: 110148,
    /**
     * The Token ID related to the moment (Optional)
     */
    // tokenId: 10,
    file: await fs.promises.readFile('src/assets/poap.png'),
    author: 'poap.js',
    mediaKey: 'poap.png',
    mimeType: 'image/png',
  });
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
