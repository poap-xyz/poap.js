import { mock } from 'node:test';
import { PoapCompass } from '../src/core/PoapCompass/PoapCompass';
import { CompassRequestError } from '../src/ports/CompassProvider/errors/CompassRequestError';
import { CompassMissingDataError } from '../src/ports/CompassProvider/errors/CompassMissingDataError';

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

      mock.method(global, 'fetch', () => {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(responseData),
        });
      });

      const result = await poapCompass.request(query, variables);

      expect(result).toEqual(responseData);
    });

    it('should throw an error when the API returns no data', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = {};

      mock.method(global, 'fetch', () => {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(responseData),
        });
      });

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassMissingDataError,
      );
    });

    it('should throw an error when the API returns an error', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };
      const responseData = { errors: [{ message: 'Error message' }] };

      mock.method(global, 'fetch', () => {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(responseData),
        });
      });

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        CompassRequestError,
      );
    });

    it('should throw a network error when the request fails', async () => {
      const query = 'query { test }';
      const variables = { key: 'value' };

      mock.method(global, 'fetch', () => {
        return Promise.reject(new Error('Network error'));
      });

      await expect(poapCompass.request(query, variables)).rejects.toThrow(
        /Network error/,
      );
    });
  });
});
