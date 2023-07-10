import { mock, MockProxy } from 'jest-mock-extended';
import { PoapCompass, PoapMomentsApi } from '@poap-xyz/providers';
import { MomentsClient } from './MomentsClient';
import { CreateMomentInput } from './dtos/create/CreateInput';
import { CreateSteps } from './dtos/create/CreateSteps';

describe('MomentsClient', () => {
  const MOMENT_ID = 'this-is-a-moment-id';
  const DROP_ID = 420;
  const TOKEN_ID = 69;
  const FILE = Buffer.from('');
  const AUTHOR = '0x7CE5368171cC3D988157d7dab3D313d7bd43de3e';
  const FILE_TYPE = 'image/png';
  const MEDIA_KEY = 'this-is-a-media-key';
  const MEDIA_UPLOAD_URL = 'this-is-a-media-upload-url';

  let poapMomentsAPIMocked: MockProxy<PoapMomentsApi>;
  let compassProviderMocked: MockProxy<PoapCompass>;
  let onStepUpdate: jest.Mock;

  beforeEach(() => {
    poapMomentsAPIMocked = mock<PoapMomentsApi>();
    compassProviderMocked = mock<PoapCompass>();
    onStepUpdate = jest.fn();
  });

  describe('createMoment', () => {
    it('should create a moment', async () => {
      // GIVEN
      const client = new MomentsClient(
        poapMomentsAPIMocked,
        compassProviderMocked,
      );
      const inputs: CreateMomentInput = {
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
        file: FILE,
        fileType: FILE_TYPE,
        author: AUTHOR,
        onStepUpdate,
      };
      poapMomentsAPIMocked.createMoment.mockResolvedValue({
        id: MOMENT_ID,
        author: AUTHOR,
        createdOn: new Date(),
        media: {
          gateways: [''],
        },
        dropId: DROP_ID,
        tokenId: TOKEN_ID,
      });
      poapMomentsAPIMocked.getSignedUrl.mockResolvedValue({
        key: MEDIA_KEY,
        url: MEDIA_UPLOAD_URL,
      });

      // WHEN
      const moment = await client.createMoment(inputs);

      // THEN
      expect(moment.id).toBe(MOMENT_ID);
      expect(moment.author).toBe(AUTHOR);
      expect(moment.dropId).toBe(DROP_ID);
      expect(moment.tokenId).toBe(TOKEN_ID);
      expect(moment.gateways).toEqual(['']);
      expect(onStepUpdate).toHaveBeenCalledWith(
        CreateSteps.REQUESTING_MEDIA_UPLOAD_URL,
      );
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(
        CreateSteps.UPLOADING_MEDIA_METADATA,
      );
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.PROCESSING_MEDIA);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.UPLOADING_MOMENT);
      expect(onStepUpdate).toHaveBeenCalledWith(CreateSteps.FINISHED);
      expect(onStepUpdate).toHaveBeenCalledTimes(6);
    });
  });
});
