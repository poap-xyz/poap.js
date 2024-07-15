export interface DropResponse {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  location_type: string;
  drop_url: string;
  image_url: string;
  animation_url: string;
  year: number;
  start_date: string;
  timezone: string;
  private: boolean;
  created_date: string;
  expiry_date: string;
  end_date: string;
  stats_by_chain_aggregate: {
    aggregate: {
      sum: {
        transfer_count: number;
        poap_count: number;
      };
    };
  };
  email_claims_stats: {
    reserved: number;
  };
  drop_image: {
    gateways: Array<{
      type: 'CROP' | 'ORIGINAL';
      url: string;
    }>;
  };
}
