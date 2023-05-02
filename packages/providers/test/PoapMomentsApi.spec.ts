import { PoapMomentsApi } from '../src/core/PoapMomentsApi/PoapMomentsApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MediaStatus } from '../src/core/PoapMomentsApi/constants';
import { InvalidMediaFileError } from '../src/core/PoapMomentsApi/errors/InvalidMediaFileError';

describe('PoapMomentsApi', () => {
  let mock;
  let apiKey;
  let baseUrl;
  let api;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    apiKey = 'test-api-key';
    baseUrl = 'https://moments.poap.tech';
    api = new PoapMomentsApi(apiKey, baseUrl);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getSignedUrl', () => {
    it('should fetch a signed URL', async () => {
      const mockResponse = { url: 'mock-signed-url', key: 'mock-key' };

      mock
        .onPost(`${baseUrl}/moments/media-upload-url`)
        .reply(200, mockResponse);

      const result = await api.getSignedUrl();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('uploadFile', () => {
    it('should upload a file to the signed URL', async () => {
      const file = Buffer.from('test-file');
      const signedUrl = 'https://mock-signed-url';
      const fileType = 'image/png';

      mock.onPut(signedUrl).reply(200);

      await expect(
        api.uploadFile(file, signedUrl, fileType),
      ).resolves.not.toThrow();
    });
  });

  describe('fetchMediaStatus', () => {
    it('should fetch the media status', async () => {
      const mediaKey = 'mock-media-key';
      const mockResponse = { status: MediaStatus.PROCESSED };

      mock.onGet(`${baseUrl}/media/${mediaKey}`).reply(200, mockResponse);

      const result = await api.fetchMediaStatus(mediaKey);
      expect(result).toEqual(mockResponse.status);
    });
  });

  describe('waitForMediaProcessing', () => {
    it('should wait for media processing without throwing an error', async () => {
      const mediaKey = 'mock-media-key';
      const mockResponse = { status: MediaStatus.PROCESSED };

      mock.onGet(`${baseUrl}/media/${mediaKey}`).reply(200, mockResponse);

      await expect(
        api.waitForMediaProcessing(mediaKey, 5000),
      ).resolves.not.toThrow();
    });

    it('should throw InvalidMediaFileError when media status is INVALID', async () => {
      const mediaKey = 'mock-media-key';
      const invalidMediaResponse = { status: MediaStatus.INVALID };

      mock
        .onGet(`${baseUrl}/media/${mediaKey}`)
        .reply(200, invalidMediaResponse);

      await expect(
        api.waitForMediaProcessing(mediaKey, 5000),
      ).rejects.toThrowError(new InvalidMediaFileError());
    });
  });

  describe('createMoment', () => {
    it('should create a moment successfully', async () => {
      const mockResponse = {
        id: '1',
        author: '0x1234',
        createdOn: '2023-01-01T00:00:00.000Z',
        media: {
          location: 'https://example.com/media/1',
          key: 'mock-media-key',
          mimeType: 'image/png',
          status: MediaStatus.PROCESSED,
          hash: 'mock-hash',
        },
        dropId: 1,
        tokenId: 1000,
      };

      const createMomentInput = {
        dropId: 1,
        author: '0x1234',
        mediaKey: 'mock-media-key',
        tokenId: 1000,
      };

      mock.onPost(`${baseUrl}/moments`).reply(200, mockResponse);

      const result = await api.createMoment(createMomentInput);
      expect(result).toEqual(mockResponse);
    });
  });
});
