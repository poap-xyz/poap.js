export const PAGINATED_DROPS_QUERY = `
  query PaginatedDrops(
    $limit: Int!
    $offset: Int!
    $orderBy: [drops_order_by!]
    $where: drops_bool_exp
  ) {
    drops(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      fancy_id
      name
      description
      city
      country
      channel
      platform
      location_type
      drop_url
      image_url
      animation_url
      year
      start_date
      timezone
      private
      created_date
      stats {
        transfer_count
        poap_count
      }
      email_claims_stats {
        total
      }
    }
  }
`;

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
  stats: {
    transfer_count: number;
    poap_count: number;
  };
  email_claims_stats: {
    total: number;
  };
}

export interface PaginatedDropsResponse {
  data: {
    drops: DropResponse[];
  };
}
