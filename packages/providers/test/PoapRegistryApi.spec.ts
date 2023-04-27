import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PoapRegistryApi } from '../src/core/PoapRegistryApi/PoapRegistryApi';
import {
  CreateAttributeInput,
  CreateAttributeResponse,
  CreateAttributesBulkInput,
  CreateAttributesBulkResponse,
} from '../src/ports/RegistryApiProvider/Types';

const apiKey = 'test-api-key';
const baseUrl = 'https://registry.poap.test';
const api = new PoapRegistryApi(apiKey, baseUrl);

const mock = new MockAdapter(axios);

describe('PoapRegistryApi', () => {
  afterEach(() => {
    mock.reset();
  });

  test('createAttribute', async () => {
    const input: CreateAttributeInput = {
      attribute: {
        dropId: 1,
        tokenId: 1,
        key: 'Test key',
        value: 'Test Value',
      },
    };
    const mockResponse: CreateAttributeResponse = {
      id: 1,
      dropId: 100,
      tokenId: input.attribute.tokenId,
      key: input.attribute.key,
      value: input.attribute.value,
      timestamp: '2023-01-01T00:00:00.000Z',
    };

    mock.onPost(`${baseUrl}/attributes`).reply(200, mockResponse);

    const result = await api.createAttribute(input);
    expect(result).toEqual(mockResponse);
  });

  test('createAttributesBulk', async () => {
    const input: CreateAttributesBulkInput = {
      attributes: [
        {
          dropId: 1,
          tokenId: 1,
          key: 'Test',
          value: 'Test Value',
        },
        {
          dropId: 2,
          key: 'Test',
          value: 'Test Value',
        },
      ],
    };
    const mockResponse: CreateAttributesBulkResponse = [
      {
        id: 1,
        dropId: 1,
        tokenId: 1,
        key: 'Test',
        value: 'Test Value',
        timestamp: '2023-01-01T00:00:00.000Z',
      },
      {
        id: 1,
        dropId: 2,
        key: 'Test',
        value: 'Test Value',
        tokenId: 0,
        timestamp: '2023-01-01T00:00:00.000Z',
      },
    ];

    mock.onPost(`${baseUrl}/attributes/bulk`).reply(200, mockResponse);

    const result = await api.createAttributesBulk(input);
    expect(result).toEqual(mockResponse);
  });
});
