import {
  CreateAttributeInput,
  CreateAttributeResponse,
  CreateAttributesBulkInput,
  CreateAttributesBulkResponse,
} from './Types';

/**
 * Provides methods for interacting with a registry API.
 *
 * @interface RegistryApiProvider
 */
export interface RegistryApiProvider {
  /**
   * Creates multiple attributes on the API.
   *
   * @async
   * @function
   * @name RegistryApiProvider#createAttributesBulk
   * @param {CreateAttributesBulkInput} input - The input data for creating the attributes.
   * @returns {Promise<CreateAttributesBulkResponse>} A Promise that resolves with the response from the API.
   */
  createAttributesBulk(
    input: CreateAttributesBulkInput,
  ): Promise<CreateAttributesBulkResponse>;

  /**
   * Creates a single attribute on the API.
   *
   * @async
   * @function
   * @name RegistryApiProvider#createAttribute
   * @param {CreateAttributeInput} input - The input data for creating the attribute.
   * @returns {Promise<CreateAttributeResponse>} A Promise that resolves with the response from the API.
   */
  createAttribute(
    input: CreateAttributeInput,
  ): Promise<CreateAttributeResponse>;
}

