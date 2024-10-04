import { anyFunction, mock, MockProxy } from 'jest-mock-extended';
import { PoapCompass, PoapMomentsApi } from '@poap-xyz/providers';
import { MomentsClient } from './MomentsClient';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';
import { v4 } from 'uuid';
import { PatchMomentInput } from './dtos/patch/PatchInput';
import { CreateAndUploadMomentInput } from './dtos/create/CreateAndUploadInput';

describe('MomentsClient', () => {
  const MOMENT_ID = 'this-is-a-moment-id';
  const DROP_ID = 420;
  const TOKEN_ID = 69;
  const AUTHOR = '0x7CE5368171cC3D988157d7dab3D313d7bd43de3e';
  const FILE_1 = Buffer.from('This is the file 1');
  const FILE_1_TYPE = 'image/png';
  const FILE_2 = Buffer.from('This is the file 2');
  const FILE_2_TYPE = 'image/jpeg';
  const MEDIA_UPLOAD_URL = 'this-is-a-media-upload-url';
  const DESCRIPTION = 'This is a description';
  const MOMENT_CID =
    '0001-7ce5368171cc3d988157d7dab3d313d7bd43de3e-365e5b83699adce0825021d011f1bf73bd5ef9369d06e49645afbea2ef34f54e0557c1d4742c8bd6d1f7a02be4aa483c03888af0aa143d5aa7351e2baaf931231c.moment';
  const MEDIAS_TO_CREATE = [
    {
      fileBinary: FILE_1,
      fileType: FILE_1_TYPE,
    },
    {
      fileBinary: FILE_2,
      fileType: FILE_2_TYPE,
    },
  ];
  const MEDIA_KEYS = [
    '45201634-1996-4243-9c24-31da706be427',
    'fbc3cf5f-fd65-4d2f-88fa-7025ebc7d631',
  ];

  let poapMomentsAPIMocked: MockProxy<PoapMomentsApi>;
  let compassProviderMocked: MockProxy<PoapCompass>;
  let onStepUpdate: jest.Mock;

  beforeEach(() => {
    poapMomentsAPIMocked = mock<PoapMomentsApi>();
    compassProviderMocked = mock<PoapCompass>();
    onStepUpdate = jest.fn();
  });

  describe('createMomentAndUploadMedia', () => {
    it('should create a moment and upload media', async () => {
      // GIVEN
      const client = new MomentsClient(
        poapMomentsAPIMocked,
        compassProviderMocked,
      );
      const inputs: CreateAndUploadMomentInput = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        media: MEDIAS_TO_CREATE,
        author: AUTHOR,
        onStepUpdate,
        description: DESCRIPTION,
      };
      poapMomentsAPIMocked.createMoment.mockResolvedValue({
        id: MOMENT_ID,
        author: AUTHOR,
        createdOn: new Date(),
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
      });
      const mediaKeys: string[] = [];
      poapMomentsAPIMocked.getSignedUrl.mockImplementation(async () => {
        const key = v4();
        mediaKeys.push(key);
        return {
          url: MEDIA_UPLOAD_URL,
          key,
        };
      });

      const EXPECTED_MOMENT_CREATE_INPUT = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        author: AUTHOR,
        description: DESCRIPTION,
        mediaKeys,
      };

      // WHEN
      const moment = await client.createMomentAndUploadMedia(inputs);

      // THEN
      expect(moment.id).toBe(MOMENT_ID);
      expect(moment.author).toBe(AUTHOR);
      expect(moment.dropId).toBe(DROP_ID);
      expect(moment.tokenId).toBe(TOKEN_ID);
      expect(poapMomentsAPIMocked.createMoment).toHaveBeenCalledWith(
        EXPECTED_MOMENT_CREATE_INPUT,
      );
      expect(poapMomentsAPIMocked.getSignedUrl).toHaveBeenCalledTimes(2);
      expect(poapMomentsAPIMocked.uploadFile).toHaveBeenCalledWith(
        FILE_1,
        MEDIA_UPLOAD_URL,
        FILE_1_TYPE,
        anyFunction(),
      );
      expect(poapMomentsAPIMocked.uploadFile).toHaveBeenCalledWith(
        FILE_2,
        MEDIA_UPLOAD_URL,
        FILE_2_TYPE,
        anyFunction(),
      );
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.PROCESSING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MOMENT);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.FINISHED);
      expect(onStepUpdate).toHaveBeenCalledTimes(4);
    });
  });
  describe('createMoment', () => {
    it('should create a moment and attach media keys', async () => {
      // GIVEN
      const client = new MomentsClient(
        poapMomentsAPIMocked,
        compassProviderMocked,
      );
      const inputs: CreateMomentInput = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        mediaKeys: MEDIA_KEYS,
        author: AUTHOR,
        onStepUpdate,
        description: DESCRIPTION,
      };
      poapMomentsAPIMocked.createMoment.mockResolvedValue({
        id: MOMENT_ID,
        author: AUTHOR,
        createdOn: new Date(),
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
      });

      const EXPECTED_MOMENT_CREATE_INPUT = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        author: AUTHOR,
        description: DESCRIPTION,
        mediaKeys: MEDIA_KEYS,
      };

      // WHEN
      const moment = await client.createMoment(inputs);

      // THEN
      expect(moment.id).toBe(MOMENT_ID);
      expect(moment.author).toBe(AUTHOR);
      expect(moment.dropId).toBe(DROP_ID);
      expect(moment.tokenId).toBe(TOKEN_ID);
      expect(poapMomentsAPIMocked.createMoment).toHaveBeenCalledWith(
        EXPECTED_MOMENT_CREATE_INPUT,
      );
      expect(poapMomentsAPIMocked.uploadFile).not.toHaveBeenCalledWith();
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MOMENT);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.FINISHED);
      expect(onStepUpdate).toHaveBeenCalledTimes(2);
    });
  });
  describe('updateMoment', () => {
    it('should update a moment', async () => {
      // GIVEN
      const client = new MomentsClient(
        poapMomentsAPIMocked,
        compassProviderMocked,
      );
      const input: PatchMomentInput = {
        cid: MOMENT_CID,
      };
      poapMomentsAPIMocked.patchMoment.mockResolvedValue();

      // WHEN
      await client.patchMoment(MOMENT_ID, input);

      // THEN
      expect(poapMomentsAPIMocked.patchMoment).toHaveBeenCalledWith(MOMENT_ID, {
        cid: MOMENT_CID,
      });
    });
  });
});
