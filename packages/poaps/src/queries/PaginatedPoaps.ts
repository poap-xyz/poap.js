export const PAGINATED_POAPS_QUERY = `
  query PaginatedPoaps(
    $limit: Int!
    $offset: Int!
    $orderBy: [poaps_order_by!]
    $where: poaps_bool_exp
  ) {
    poaps(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      chain
      collector_address
      drop_id
      id
      minted_on
      transfer_count
      drop {
        image_url
        city
        country
        description
        start_date
        name
      }
    }
  }
`;

export interface PoapsResponse {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: number;
  drop_id: number;
  drop: {
    image_url: string;
    city: string;
    country: string;
    description: string;
    start_date: string;
    name: string;
  };
}

export interface PaginatedPoapsResponse {
  data: {
    poaps: PoapsResponse[];
  };
}
