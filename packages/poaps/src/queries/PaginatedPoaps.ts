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
    }
  }
`;

export interface PoapsResponse {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: number;
  drop_id: number;
}

export interface PaginatedPoapsResponse {
  data: {
    poaps: PoapsResponse[];
  };
}
