import { PaginatedResult } from '@poap-xyz/utils';
import { AttributesClient } from '../src/AttributesClient';
import { Attribute } from '../src/domain/Attribute';
import { inputMultipleFetch, mockMultipleFetch } from './contants';

// mock dependencies
const mockRegistryApiProvider = {
  createAttribute: jest.fn(),
  createAttributesBulk: jest.fn(),
};

const mockCompassProvider = {
  request: jest.fn(),
};

describe('AttributesClient', () => {
  let attributesClient;

  beforeEach(() => {
    // create AttributesClient instance with mock dependencies
    attributesClient = new AttributesClient(
      mockRegistryApiProvider,
      mockCompassProvider,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetch', () => {
    test('should fetch a paginated list of attributes', async () => {
      // arrange
      const input = inputMultipleFetch;
      const mockResponse = mockMultipleFetch;
      mockCompassProvider.request.mockResolvedValue(mockResponse);

      // act
      const result = await attributesClient.fetch(input);

      // assert
      expect(mockCompassProvider.request).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
      );
      expect(result).toEqual(expect.any(PaginatedResult));
      expect(result.items).toEqual(
        expect.arrayContaining([expect.any(Attribute)]),
      );
      // add more assertions based on the expected behavior of the fetch method
    });
  });
});
