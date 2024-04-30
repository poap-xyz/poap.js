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
   * @param {null | undefined | { readonly [variable: string]: unknown }} [variables] - The variables to pass with the query.
   * @param {AbortSignal} signal - When given, the request can be aborted with its controller.
   * @returns {Promise<{ data: D }>} A Promise that resolves with the result of the query.
   * @template D - The type of the result's data.
   * @template V - The type of the query's variables.
   */
  request<D, V = { readonly [variable: string]: unknown }>(
    query: string,
    variables?: null | undefined | V,
    signal?: AbortSignal,
  ): Promise<{ data: D }>;

  /**
   * Batch fetch data from compass and return the deserialized responses. This
   * is used to make many fetch calls at once, but in batches to avoid
   * overloading the server.
   *
   * @function
   * @name CompassProvider#batch
   * @param {string} query - The query string to execute.
   * @param {{ readonly [variable: string]: unknown }[]} variables - The variables to pass with the each query.
   * @param {AbortSignal} [signal] - When given, the requests can be aborted with its controller.
   * @returns {Promise<{ data: D }[]>} A Promise that resolves with the results of the queries.
   * @template D - The type of the result's data.
   * @template V - The type of the query's variables.
   */
  batch<D, V = { readonly [variable: string]: unknown }>(
    query: string,
    variables: V[],
    signal?: AbortSignal,
  ): Promise<{ data: D }[]>;
}
