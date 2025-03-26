import { enableFetchMocks } from 'jest-fetch-mock';
import { PoapCompass } from '../src/core/PoapCompass/PoapCompass';
import { CompassRequestError } from '../src/ports/CompassProvider/errors/CompassRequestError';
import { CompassMissingDataError } from '../src/ports/CompassProvider/errors/CompassMissingDataError';
import { CompassBadRequestError } from '../src/ports/CompassProvider/errors/CompassBadRequestError';
import { CompassUnauthorizedError } from '../src/ports/CompassProvider/errors/CompassUnauthorizedError';

enableFetchMocks();

describe('PoapCompass', () => {
  let poapCompass: PoapCompass;

  beforeEach(() => {
    poapCompass = new PoapCompass({
      apiKey: 'test',
    });
  });

  describe('request', () => {
    it('should execute a GraphQL query successfully', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = { data: { test: 'result' } };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData),
        }),
      );

      const result = await poapCompass.request(query, variables);

      expect(result).toEqual(responseData);
    });

    it('should allow changing the base url', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = { data: { test: 'result' } };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData),
        }),
      );

      poapCompass = new PoapCompass({
        baseUrl: 'another-compass.poap.tech',
        apiKey: 'test',
      });

      const result = await poapCompass.request(query, variables);

      expect(result).toEqual(responseData);
    });

    it('should allow passing no variables', async () => {
      const query = 'query { test }';
      const responseData = { data: { test: 'result' } };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData),
        }),
      );

      const result = await poapCompass.request(query);

      expect(result).toEqual(responseData);
    });

    it('should throw an error when the API returns no data', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = {};

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData),
        }),
      );

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassMissingDataError,
      );
    });

    it('should throw an error when the API returns an error', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = { errors: [{ message: 'Error message' }] };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData),
        }),
      );

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassRequestError,
      );
    });

    it('should throw a bad request error when the query is invalid', async () => {
      const query = 'query { invalid_query }';
      const variables = { key: 'value' };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 400,
        }),
      );

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassBadRequestError,
      );
    });

    it('should throw an unauthorized error when the api key is invalid', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 401,
        }),
      );

      poapCompass = new PoapCompass({
        apiKey: 'invalid',
      });

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassUnauthorizedError,
      );
    });

    it('should throw an unknown error when the response is from an unknown status code', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 100,
        }),
      );

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        /Response error/,
      );
    });

    it('should throw a network error when the request fails', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };

      fetchMock.mockOnce(() => Promise.reject(new Error('Network error')));

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        /Network error/,
      );
    });
  });

  describe('batch', () => {
    it('should execute many GraphQL requests', async () => {
      const query = 'query { test }';
      const variables = [{ key: 'value-0' }, { key: 'value-1' }];
      const responseData0 = { data: { test: 'result-0' } };
      const responseData1 = { data: { test: 'result-1' } };

      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData0),
        }),
      );
      fetchMock.mockOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          body: JSON.stringify(responseData1),
        }),
      );

      const result = await poapCompass.batch(query, variables);

      expect(result).toEqual([responseData0, responseData1]);
    });
  });
});
