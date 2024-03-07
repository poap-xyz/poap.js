import { DropsClient } from '@poap-xyz/drops';
import { DropImage } from '@poap-xyz/drops/dist/cjs/types';

export const fetch_drop_image = async (client: DropsClient): Promise<void> => {
  try {
    const data: DropImage = await client.fetchDropImage(36900);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
