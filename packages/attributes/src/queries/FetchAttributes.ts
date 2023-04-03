import { Attribute } from "../types";
import { CORE_ATTRIBUTE_FIELDS_FRAGMENT } from "./base";

export const PAGINATED_ATTRIBUTES_QUERY = `
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

export type AttributesQueryResponse = {
  attributes_aggregate: {
    aggregate: { count: number };
    nodes: Attribute[];
  };
};