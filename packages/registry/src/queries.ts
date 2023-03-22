import { gql } from 'graphql-request';

const CORE_ATTRIBUTE_FIELDS_FRAGMENT = gql`
  fragment CoreAttributeFields on attributes {
    drop_id
    id
    key
    timestamp
    token_id
    value
  }
`;

export const METADATA_QUERY = gql`
  ${CORE_ATTRIBUTE_FIELDS_FRAGMENT}
  query getMetadataQuery($attribute: attributes_bool_exp) {
    attributes(where: $attribute) {
      ...CoreAttributeFields
    }
  }
`;
export const PAGINATED_METADATA_QUERY = gql`
  ${CORE_ATTRIBUTE_FIELDS_FRAGMENT}
  query PaginatedMetadata(
    $limit: Int!
    $offset: Int!
    $order_by: [attributes_order_by!]
    $where: attributes_bool_exp
  ) {
    attributes_aggregate(
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      aggregate {
        count
      }
      nodes {
        ...CoreAttributeFields
      }
    }
  }
`;

export const VERSION_METADATA_BY_DROP_QUERY = gql`
  query PaginatedVersionMetadataByDropQuery(
    $limit: Int!
    $offset: Int!
    $dropId: bigint!
  ) {
    attributes(
      limit: $limit
      offset: $offset
      where: { drop_id: { _eq: $dropId } }
      distinct_on: key
    ) {
      drop_id
      key
      versions(order_by: { timestamp: desc }, limit: 5) {
        id
        timestamp
        value
        token_id
      }
      versions_aggregate {
        aggregate {
          count
        }
      }
      same_attributes_aggregate(
        distinct_on: drop_id
        where: { drop_id: { _neq: $dropId } }
      ) {
        aggregate {
          count
        }
      }
    }
    attributes_aggregate(
      where: { drop_id: { _eq: $dropId } }
      distinct_on: key
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const PAGINATED_DROPS_QUERY = gql`
  query PaginatedDrops(
    $limit: Int!
    $offset: Int!
    $orderBy: [drops_order_by!]
    $where: drops_bool_exp
  ) {
    drops(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      name
      image_url
      id
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
