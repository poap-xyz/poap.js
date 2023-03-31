/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Change variable type any to a more specific type
export interface HttpProvider {
  request<R>(requestInput: {
    endpoint: string;
    method: string;
    body: any;
    headers: any;
  }): Promise<R>;
}
