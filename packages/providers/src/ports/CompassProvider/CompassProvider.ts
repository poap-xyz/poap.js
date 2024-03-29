/**
 * Provides a request method for executing GraphQL queries.
 *
 * @interface CompassProvider
 */
export interface CompassProvider {
  /**
   * Executes a GraphQL query with the provided query string and variables.
   *
   * @function
   * @name CompassProvider#request
   * @param {string} query - The query string to execute.
   * @param {Record<string, unknown>} [variables] - The variables to pass with the query.
   * @param {AbortSignal} [signal] - When given, the request can be aborted with its controller.
   * @returns {Promise<T>} A Promise that resolves with the result of the query.
   * @template T - The type of the result.
   */
  request<T>(
    query: string,
    variables?: Record<string, unknown>,
    signal?: AbortSignal,
  ): Promise<T>;

  /**
   * Batch fetch data from compass and return the deserialized responses. This
   * is used to make many fetch calls at once, but in batches to avoid
   * overloading the server.
   *
   * @function
   * @name CompassProvider#batch
   * @param {string} query - The query string to execute.
   * @param {Record<string, unknown>[]} variables - The variables to pass with the each query.
   * @param {AbortSignal} [signal] - When given, the requests can be aborted with its controller.
   * @returns {Promise<T[]>} A Promise that resolves with the results of the queries.
   * @template T - The type of one result.
   */
  batch<T>(
    query: string,
    variables: Record<string, unknown>[],
    signal?: AbortSignal,
  ): Promise<T[]>;
}
