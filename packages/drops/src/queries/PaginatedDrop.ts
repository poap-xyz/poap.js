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
      event_url
      image_url
      animation_url
      year
      start_date
      end_date
      expiry_date
      from_admin
      virtual_event
      supply
      event_template_id
      private_event
      location_type
      channel
      platform
      timezone
      created_date
      attributes_aggregate {
        aggregate {
          count
        }
      }
    }
    drops_aggregate(where: $where) {
      aggregate {
        count
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
  event_url: string;
  image_url: string;
  animation_url?: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin: boolean;
  virtual_event: boolean;
  supply?: number | null;
  event_template_id?: number | null;
  private_event?: boolean;
  location_type?: string;
  channel?: string;
  platform?: string;
  timezone?: string;
  created_date: string;
  attributes_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

export interface PaginatedDropsResponse {
  drops: DropResponse[];
  drops_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
