import { PaginatedResult } from '@poap-xyz/utils';
import { AttributesClient } from '../../src/AttributesClient';
import { Attribute } from '../../src/domain/Attribute';
import { inputMultipleFetch, mockMultipleFetch } from './contants';

// mock dependencies
const mockRegistryApiProvider = {
  createAttribute: jest.fn(),
  createAttributesBulk: jest.fn(),
};

const mockCompassProvider = {
  request: jest.fn(),
};

// create AttributesClient instance with mock dependencies
const attributesClient = new AttributesClient(
  mockRegistryApiProvider,
  mockCompassProvider,
);

describe('AttributesClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('create', () => {
  //   test('should create a single attribute', async () => {
  //     // arrange
  //     const input = {
  //       /* input data */
  //     };
  //     const mockResponse = {
  //       /* mock response from API */
  //     };
  //     mockRegistryApiProvider.createAttribute.mockResolvedValue(mockResponse);

  //     // act
  //     const result = await attributesClient.create(input);

  //     // assert
  //     expect(mockRegistryApiProvider.createAttribute).toHaveBeenCalledWith(
  //       input,
  //     );
  //     expect(result).toEqual(expect.any(Attribute));
  //     // add more assertions based on the expected behavior of the create method
  //   });
  // });

  // describe('createBulk', () => {
  //   test('should create multiple attributes', async () => {
  //     // arrange
  //     const input = {
  //       /* input data */
  //     };
  //     const mockResponse = [
  //       /* mock response from API */
  //     ];
  //     mockRegistryApiProvider.createAttributesBulk.mockResolvedValue(
  //       mockResponse,
  //     );

  //     // act
  //     const result = await attributesClient.createBulk(input);

  //     // assert
  //     expect(mockRegistryApiProvider.createAttributesBulk).toHaveBeenCalledWith(
  //       input,
  //     );
  //     expect(result).toEqual(expect.arrayContaining([expect.any(Attribute)]));
  //     // add more assertions based on the expected behavior of the createBulk method
  //   });
  // });

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
