import { OrderByVariables, PaginatedVariables } from '@poap-xyz/utils';
import { DropResponse } from '../types/DropResponse';

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
      expiry_date
      end_date
      stats_by_chain_aggregate {
        aggregate {
          sum {
            transfer_count
            poap_count
          }
        }
      }
      email_claims_stats {
        total
      }
      drop_image {
        gateways {
          type
          url
        }
      }
    }
  }
`;

export interface PaginatedDropsResponse {
  data: {
    drops: DropResponse[];
  };
}

export type PaginatedDropsVariables = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where: Record<string, any>;
} & PaginatedVariables &
  OrderByVariables;
