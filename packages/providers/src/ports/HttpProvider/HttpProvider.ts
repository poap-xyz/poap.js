/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Change variable type any to a more specific type

/**
 * Provides a `request` method for making HTTP requests.
 *
 * @interface HttpProvider
 */
export interface HttpProvider {
  /**
   * Makes an HTTP request with the provided configuration.
   *
   * @async
   * @function
   * @name HttpProvider#request
   * @param {{ endpoint: string; method: string; body: any; headers: any; }} requestInput - The configuration for the request.
   * @returns {Promise<R>} A Promise that resolves with the response to the request.
   * @template R - The type of the response.
   */
  request<R>(requestInput: {
    endpoint: string;
    method: string;
    body: any;
    headers: any;
  }): Promise<R>;
}
