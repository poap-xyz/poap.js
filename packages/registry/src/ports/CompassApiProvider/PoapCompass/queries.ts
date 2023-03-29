const CORE_ATTRIBUTE_FIELDS_FRAGMENT = `
  fragment CoreAttributeFields on attributes {
    drop_id
    id
    key
    timestamp
    token_id
    value
  }
`;

export const Attribute_QUERY = `
  ${CORE_ATTRIBUTE_FIELDS_FRAGMENT}
  query getAttributeQuery($attribute: attributes_bool_exp) {
    attributes(where: $attribute) {
      ...CoreAttributeFields
    }
  }
`;

export const PAGINATED_Attribute_QUERY = `
  ${CORE_ATTRIBUTE_FIELDS_FRAGMENT}
  query PaginatedAttribute(
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
      nodes {
        ...CoreAttributeFields
      }
    }
  }
`;

export const VERSION_Attribute_BY_DROP_QUERY = `
  query PaginatedVersionAttributeByDropQuery(
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
