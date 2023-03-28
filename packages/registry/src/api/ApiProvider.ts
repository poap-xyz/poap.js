/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiProvider {
  request(requestInput: {
    endpoint: string;
    method: string;
    body: any;
    headers: any;
  }): Promise<any>;
}
