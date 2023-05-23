export const PAGINATED_MOMENTS_QUERY = `
  query PaginatedMoments(
    $limit: Int!
    $offset: Int!
    $orderBy: [moments_order_by!]
    $where: moments_bool_exp
  ) {
    moments(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      author
      created_on
      drop_id
      id
      gateways
      media_key
      token_id
    }
  }
`;

export interface MomentResponse {
  author: string;
  created_on: string;
  drop_id: number;
  id: string;
  gateways: string[];
  media_key: string;
  token_id: number;
}

export type MomentsQueryResponse = {
  data: {
    moments: MomentResponse[];
  };
};
