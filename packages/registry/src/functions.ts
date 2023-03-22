import {
  PAGINATED_METADATA_QUERY,
  METADATA_QUERY,
  VERSION_METADATA_BY_DROP_QUERY,
  PAGINATED_DROPS_QUERY,
} from './queries';
import { graphqlRequest } from './graphql-client';
import {
  FetchMetadataInput,
  FetchVersionPaginatedDropMetadataInput,
  OrderBy,
  PaginatedMetadataInput,
  Where,
  WhereAttribute,
} from './types';

export async function fetchVersionPaginatedDropMetadata({
  limit,
  offset,
  dropId,
}: FetchVersionPaginatedDropMetadataInput): Promise<any> {
  return graphqlRequest(VERSION_METADATA_BY_DROP_QUERY, { limit, offset, dropId });
}

export async function paginatedMetadata({
  limit,
  offset,
  order,
  key,
  value,
}: PaginatedMetadataInput): Promise<any> {
  const where: WhereAttribute = {};

  if (key) {
    where['key'] = { _ilike: `%${key}%` };
  }

  if (value) {
    where['value'] = { _ilike: `%${value}%` };
  }
  return graphqlRequest(PAGINATED_METADATA_QUERY, { limit, offset, order_by: { id: order }, where });
}

export async function fetchMetadata({
  id,
}: FetchMetadataInput): Promise<any> {
  return graphqlRequest(METADATA_QUERY, { attribute: { id: { _eq: id } } });
}

// export async function paginatedDrops({
//   limit,
//   offset,
//   order = 'desc',
//   key,
//   value,
//   name,
//   nameOrder,
//   idOrder,
//   withMetadata,
//   from,
//   to,
// }: PaginatedDropsInput): Promise<any> {
//   const orderBy: OrderBy = { start_date: order };
//   const where: Where = { private: { _eq: false } };

//   if (from || to) {
//     const dateFilter: { _gte?: string; _lte?: string } = {};
//     if (from) {
//       dateFilter._gte = from;
//     }
//     if (to) {
//       dateFilter._lte = to;
//     }
//     where['created_date'] = dateFilter;
//   }

//   if (nameOrder) {
//     orderBy['name'] = nameOrder;
//   }

//   if (idOrder) {
//     orderBy['id'] = idOrder;
//   }

//   if (key || value) {
//     where['attributes'] = {};

//     if (key) {
//       where['attributes']['key'] = { _ilike: `%${key}%` };
//     }

//     if (value) {
//       where['attributes']['value'] = { _ilike: `%${value}%` };
//     }
//   }

//   if (name) {
//     where['name'] = { _ilike: `%${name}%` };
//   }

//   if (withMetadata === 'yes') {
//     where['attributes_aggregate'] = { count: { predicate: { _gt: 0 } } };
//   }

//   if (withMetadata === 'no') {
//     where['attributes_aggregate'] = { count: { predicate: { _eq: 0 } } };
//   }

//   return graphqlRequest(PAGINATED_DROPS_QUERY, { limit, offset, orderBy, where });
// }
