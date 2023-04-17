export const PAGINATED_MOMENTS_QUERY = `
  query PaginatedMoments(
    $limit: Int!
    $offset: Int!
    $orderBy: [moments_order_by!]
    $where: moments_bool_exp
  ) {
    moments(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      attribute_id
      author
      created_on
      drop_id
      id
      location
      media_gateways
      media_hash
      media_key
      mime_type
      token_id
    }
  }
`;

export interface MomentResponse {
  attribute_id: number;
  author: string;
  created_on: string;
  drop_id: number;
  id: string;
  location: string;
  media_gateways: string[];
  media_hash: string;
  media_key: string;
  mime_type: string;
  token_id: number;
}

export type MomentsQueryResponse = {
  data: {
    moments: MomentResponse[];
  };
};
