/* eslint-disable @typescript-eslint/no-explicit-any */
import { MomentsClient } from '@poap-xyz/moments';
import { PoapMomentsApi } from '@poap-xyz/providers';

async function main(): Promise<void> {
  // Use your library here
  const client = new MomentsClient(new PoapMomentsApi('your_api_key'));
  // Create Moment
  await client.createMoment({
    dropId: 10,
    /**
     * The Token ID related to the moment (Optional)
     */
    tokenId: 10,
    file: Buffer.from('string'),
    author: 'string',
    mediaKey: 'string',
    mimeType: 'string',
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
