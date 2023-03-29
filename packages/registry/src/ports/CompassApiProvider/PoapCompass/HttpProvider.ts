/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpProvider {
  request<R = any>(requestInput: {
    endpoint: string;
    method: string;
    body: any;
    headers: any;
  }): Promise<R>;
}
