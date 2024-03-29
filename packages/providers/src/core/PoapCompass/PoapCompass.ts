import { CompassProvider } from '../../ports/CompassProvider/CompassProvider';
import { CompassErrors } from '../../ports/CompassProvider/types/CompassErrors';
import { CompassError } from '../../ports/CompassProvider/types/CompassError';
import { CompassRequestError } from '../../ports/CompassProvider/errors/CompassRequestError';
import { CompassMissingDataError } from '../../ports/CompassProvider/errors/CompassMissingDataError';

const DEFAULT_COMPASS_BASE_URL = 'https://public.compass.poap.tech/v1/graphql';

/**
 * A class that implements the `CompassProvider` interface for fetching data from the POAP API.
 * @class
 * @implements {CompassProvider}
 */
export class PoapCompass implements CompassProvider {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Creates a new instance of the `PoapCompass` class.
   * @constructor
   * @param {PoapCompassConfig} config - Configuration object containing the API key and optional base URL.
   */
  constructor(config: PoapCompassConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? DEFAULT_COMPASS_BASE_URL;
  }

  /**
   * Fetches data from the POAP GraphQL API.
   *
   * @async
   * @private
   * @function
   * @name PoapCompass#fetchGraphQL
   * @param {string} query - The GraphQL query to fetch.
   * @param {Record<string, unknown>} variables - The variables to include with the query.
   * @param {AbortSignal} signal - When given, the request can be aborted with its controller.
   * @returns {Promise<R>} A Promise that resolves with the result of the query.
   * @template R - The type of the result.
   */
  private async fetchGraphQL<R>(
    query: string,
    variables: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<R> {
    let response: Response;

    try {
      response = await fetch(this.baseUrl, {
        signal,
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
      });
    } catch (error: unknown) {
      throw new Error(`Network error, received error ${error}`);
    }

    if (response.status !== 200) {
      throw new Error(
        `Response error, received status code ${response.status}`,
      );
    }

    const body = await response.json();

    this.handleResponseErrors(body);

    return body;
  }

  /**
   * Throws error when the response contains error or does not contain any data.
   *
   * @private
   * @function
   * @name PoapCompass#handleResponseErrors
   * @param {unknown} response - Some response from the GraphQL server.
   * @throws {CompassRequestError} when the response contains errors.
   * @throws {CompassMissingDataError} when the response doesn't contain any data.
   */
  private handleResponseErrors(response: unknown): void {
    if (this.isError(response)) {
      throw new CompassRequestError(response);
    }

    if (!this.hasData(response)) {
      throw new CompassMissingDataError();
    }
  }

  /**
   * Returns true when the given response is a GraphQL error response.
   *
   * @private
   * @function
   * @name PoapCompass#isError
   * @param {unknown} response - Some response from the GraphQL server.
   * @returns {boolean}
   */
  private isError(response: unknown): response is CompassErrors {
    return (
      response != null &&
      typeof response === 'object' &&
      'errors' in response &&
      Array.isArray(response.errors) &&
      response.errors.every(
        (error: unknown): error is CompassError =>
          error != null &&
          typeof error === 'object' &&
          'message' in error &&
          typeof error.message === 'string',
      )
    );
  }

  /**
   * Returns true when the given response is a GraphQL data response.
   *
   * @private
   * @function
   * @name PoapCompass#hasData
   * @param {unknown} response - Some response from the GraphQL server.
   * @returns {boolean}
   */
  private hasData(response: unknown): response is { data: unknown } {
    return (
      response != null &&
      typeof response === 'object' &&
      'data' in response &&
      response.data != null &&
      typeof response.data === 'object'
    );
  }

  /**
   * Executes a GraphQL query using the `fetchGraphQL` method.
   *
   * @async
   * @function
   * @name PoapCompass#request
   * @param {string} query - The GraphQL query to execute.
   * @param {Record<string, unknown>} [variables] - The variables to include with the query.
   * @param {AbortSignal} signal - When given, the request can be aborted with its controller.
   * @returns {Promise<T>} A Promise that resolves with the result of the query.
   * @template T - The type of the result.
   */
  async request<T>(
    query: string,
    variables?: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<T> {
    return await this.fetchGraphQL<T>(query, variables ?? {}, signal);
  }
}

/**
 * Configuration interface for the PoapCompass class.
 * @interface
 * @property {string} apiKey - The API key to use for requests to the POAP API.
 * @property {string} [baseUrl] - Optional base URL for the POAP API. If not provided, a default will be used.
 */
export interface PoapCompassConfig {
  apiKey: string;
  baseUrl?: string;
}
