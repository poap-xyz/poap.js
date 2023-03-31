/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Change variable type any to a more specific type
export interface CompassProvider {
  request<T>(query: string, variables: Record<string, any>): Promise<T>;
}
