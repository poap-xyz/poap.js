import { PoapMomentsApi } from '../src/core/PoapMomentsApi/PoapMomentsApi';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { MediaStatus } from '../src/core/PoapMomentsApi/constants';
import { InvalidMediaFileError } from '../src/core/PoapMomentsApi/errors/InvalidMediaFileError';

describe('PoapMomentsApi', () => {
  const mock = new MockAdapter(axios);
  const apiKey = 'test-api-key';
  const baseUrl = 'https://moments.poap.tech';
  const api = new PoapMomentsApi(apiKey, baseUrl);

  afterEach(() => {
    mock.reset();
  });

  test('getSignedUrl', async () => {
    const mockResponse = { url: 'mock-signed-url', key: 'mock-key' };

    mock.onPost(`${baseUrl}/moments/media-upload-url`).reply(200, mockResponse);

    const result = await api.getSignedUrl();
    expect(result).toEqual(mockResponse);
  });

  test('uploadFile', async () => {
    const file = Buffer.from('test-file');
    const signedUrl = 'https://mock-signed-url';
    const fileType = 'image/png';

    mock.onPut(signedUrl).reply(200);

    await expect(
      api.uploadFile(file, signedUrl, fileType),
    ).resolves.not.toThrow();
  });

  test('fetchMediaStatus', async () => {
    const mediaKey = 'mock-media-key';
    const mockResponse = { status: MediaStatus.PROCESSED };

    mock.onGet(`${baseUrl}/media/${mediaKey}`).reply(200, mockResponse);

    const result = await api.fetchMediaStatus(mediaKey);
    expect(result).toEqual(mockResponse.status);
  });

  test('waitForMediaProcessing', async () => {
    const mediaKey = 'mock-media-key';
    const mockResponse = { status: MediaStatus.PROCESSED };

    mock.onGet(`${baseUrl}/media/${mediaKey}`).reply(200, mockResponse);

    await expect(
      api.waitForMediaProcessing(mediaKey, 5000),
    ).resolves.not.toThrow();
  });

  // Add this test case to the existing test suite
  test('waitForMediaProcessing throws InvalidMediaFileError', async () => {
    const mediaKey = 'mock-media-key';
    const invalidMediaResponse = { status: MediaStatus.INVALID };

    mock.onGet(`${baseUrl}/media/${mediaKey}`).reply(200, invalidMediaResponse);

    await expect(
      api.waitForMediaProcessing(mediaKey, 5000),
    ).rejects.toThrowError(new InvalidMediaFileError());
  });

  test('createMoment', async () => {
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
