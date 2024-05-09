import { MomentsClient, PatchMomentInput } from '@poap-xyz/moments';

export const patch_moment = async (client: MomentsClient): Promise<void> => {
  const momentId = "b08fad41-7154-499f-88f9-abea66ceab48"
  const input: PatchMomentInput = {
    cid: "0001-7ce5368171cc3d988157d7dab3d313d7bd43de3e-365e5b83699adce0825021d011f1bf73bd5ef9369d06e49645afbea2ef34f54e0557c1d4742c8bd6d1f7a02be4aa483c03888af0aa143d5aa7351e2baaf931231c.moment",
  };

  try {
    await client.patchMoment(momentId, input);
    console.log('Patch successful');
  } catch (error) {
    console.log(error);
  }
};
