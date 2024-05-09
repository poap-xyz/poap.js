import { AuthenticationProvider } from '../src/ports/AuthenticationProvider/AuthenticationProvider';
import { PoapMomentsApi } from '../src/core/PoapMomentsApi/PoapMomentsApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { InvalidMediaError } from '../src/ports/MomentsApiProvider/errors/InvalidMediaError';
import { mock, MockProxy } from 'jest-mock-extended';
import { MediaStatus } from '../src/ports/MomentsApiProvider/types/MediaStatus';
import { CreateMomentInput } from '../src/ports/MomentsApiProvider/types/CreateMomentInput';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();

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

  describe('patchMoment', () => {
    const id = '1';
    const patchMomentInput = {
      cid: '0001-7ce5368171cc3d988157d7dab3d313d7bd43de3e-365e5b83699adce0825021d011f1bf73bd5ef9369d06e49645afbea2ef34f54e0557c1d4742c8bd6d1f7a02be4aa483c03888af0aa143d5aa7351e2baaf931231c.moment',
    };
  
    it('should call fetch with correct parameters for PATCH request', async () => {
      fetchMock.mockOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        body: JSON.stringify({}),
      }),
    );
  
      const result = await api.patchMoment(id, patchMomentInput);
  
      expect(result).toBe(undefined);
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/moments/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(patchMomentInput),
          headers: {
            'Content-Type': 'application/json',
            Authorization: expect.any(String),
          },
        }
      );
    });
  
    it('should throw error when AuthenticationProvider is not provided', async () => {
      api = new PoapMomentsApi({});
      await expect(api.patchMoment(id, patchMomentInput)).rejects.toThrow();
    });
  });
});
