export interface ProfileResponse {
  address: string;
  ens: string;
  records: Record<string, string>;
  fresh: number;
}
