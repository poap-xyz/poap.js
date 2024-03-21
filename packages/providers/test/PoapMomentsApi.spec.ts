import { AuthenticationProvider } from '../src/ports/AuthenticationProvider/AuthenticationProvider';
import { PoapMomentsApi } from '../src/core/PoapMomentsApi/PoapMomentsApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { InvalidMediaError } from '../src/ports/MomentsApiProvider/errors/InvalidMediaError';
import { mock, MockProxy } from 'jest-mock-extended';
import { MediaStatus } from '../src/ports/MomentsApiProvider/types/MediaStatus';
import { CreateMomentInput } from '../src/ports/MomentsApiProvider/types/CreateMomentInput';

describe('PoapMomentsApi', () => {
  const BASE_URL = 'https://moments.test';

  let api: PoapMomentsApi;
  let authenticationProviderMocked: MockProxy<AuthenticationProvider>;
  let axiosMocked;

  beforeEach(() => {
    authenticationProviderMocked = mock();
    axiosMocked = new MockAdapter(axios);
    api = new PoapMomentsApi({
      baseUrl: BASE_URL,
      authenticationProvider: authenticationProviderMocked,
    });
  });

  afterEach(() => {
    axiosMocked.reset();
  });

  describe('getSignedUrl', () => {
    it('should fetch a signed URL', async () => {
      const mockResponse = { url: 'mock-signed-url', key: 'mock-key' };

      axiosMocked
        .onPost(`${BASE_URL}/moments/media-upload-url`)
        .reply(200, mockResponse);

      const result = await api.getSignedUrl();
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when AuthenticationProvider is not provided', async () => {
      api = new PoapMomentsApi({});
      await expect(api.getSignedUrl()).rejects.toThrow();
    });
  });

  describe('uploadFile', () => {
    it('should upload a file to the signed URL', async () => {
      const file = Buffer.from('test-file');
      const signedUrl = 'https://mock-signed-url';
      const fileType = 'image/png';

      axiosMocked.onPut(signedUrl).reply(200);

      await expect(
        api.uploadFile(file, signedUrl, fileType),
      ).resolves.not.toThrow();
    });
  });

  describe('fetchMediaStatus', () => {
    it('should fetch the media status', async () => {
      const mediaKey = 'mock-media-key';
      const mockResponse = { status: MediaStatus.PROCESSED };

      axiosMocked
        .onGet(`${BASE_URL}/media/${mediaKey}`)
        .reply(200, mockResponse);

      const result = await api.fetchMediaStatus(mediaKey);
      expect(result).toEqual(mockResponse.status);
    });
  });

  describe('waitForMediaProcessing', () => {
    it('should wait for media processing without throwing an error', async () => {
      const mediaKey = 'mock-media-key';
      const mockResponse = { status: MediaStatus.PROCESSED };

      axiosMocked
        .onGet(`${BASE_URL}/media/${mediaKey}`)
        .reply(200, mockResponse);

      await expect(
        api.waitForMediaProcessing(mediaKey, 5000),
      ).resolves.not.toThrow();
    });

    it('should throw InvalidMediaFileError when media status is INVALID', async () => {
      const mediaKey = 'mock-media-key';
      const invalidMediaResponse = { status: MediaStatus.INVALID };

      axiosMocked
        .onGet(`${BASE_URL}/media/${mediaKey}`)
        .reply(200, invalidMediaResponse);

      await expect(
        api.waitForMediaProcessing(mediaKey, 5000),
      ).rejects.toThrowError(InvalidMediaError);
    });
  });

  describe('createMoment', () => {
    const createMomentInput: CreateMomentInput = {
      dropId: 1,
      author: '0x1234',
      mediaKeys: ['mock-media-key'],
      tokenId: 1000,
      description: 'This is a test description',
    };

    it('should create a moment successfully', async () => {
      const mockResponse = {
        id: '1',
        author: '0x1234',
        createdOn: '2023-01-01T00:00:00.000Z',
        dropId: 1,
        tokenId: 1000,
        description: 'This is a test description',
      };

      axiosMocked.onPost(`${BASE_URL}/moments`).reply(200, mockResponse);

      const result = await api.createMoment(createMomentInput);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error when AuthenticationProvider is not provided', async () => {
      api = new PoapMomentsApi({});
      await expect(api.createMoment(createMomentInput)).rejects.toThrow();
    });
  });
});
