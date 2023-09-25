import { PoapCompass } from '../src/core/PoapCompass/PoapCompass';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('PoapCompass', () => {
  let apiKey;
  let mockAxios;

  beforeEach(() => {
    apiKey = 'test-api-key';
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should execute a GraphQL query successfully', async () => {
    const query = 'query { test }';
    const variables = { key: 'value' };
    const responseData = { data: { test: 'result' } };

    mockAxios.onPost().reply(200, responseData);

    const poapCompass = new PoapCompass({ apiKey });
    const result = await poapCompass.request(query, variables);

    expect(result).toEqual(responseData);
  });

  it('should throw an error when the API returns an error', async () => {
    const query = 'query { test }';
    const variables = { key: 'value' };
    const responseData = { errors: [{ message: 'Error message' }] };

    mockAxios.onPost().reply(200, responseData);

    const poapCompass = new PoapCompass(apiKey);

    await expect(poapCompass.request(query, variables)).rejects.toThrowError(
      /Error fetching GraphQL data/,
    );
  });

  it('should throw a network error when the request fails', async () => {
    const query = 'query { test }';
    const variables = { key: 'value' };

    mockAxios.onPost().networkError();

    const poapCompass = new PoapCompass(apiKey);

    await expect(poapCompass.request(query, variables)).rejects.toThrowError(
      /Network error/,
    );
  });
});
