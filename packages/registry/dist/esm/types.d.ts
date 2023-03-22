export type CreateAttribute = {
    dropId: number;
    tokenId?: number;
    key: string;
    value: string;
};
export interface FetchVersionPaginatedDropMetadataInput {
    limit: number;
    offset: number;
    dropId: number;
}
export interface PaginatedMetadataInput {
    limit: number;
    offset: number;
    order: string;
    key: string;
    value: string;
}
export interface FetchMetadataInput {
    id: string;
}
export interface PaginatedDropsInput {
    limit: number;
    offset: number;
    order?: string;
    key: string;
    value: string;
    name: string;
    nameOrder: string;
    idOrder: string;
    withMetadata: string;
    from: string;
    to: string;
}
interface DateFilter {
    _gte?: string;
    _lte?: string;
}
interface LikeFilter {
    _ilike: string;
}
interface CountFilter {
    predicate: {
        _gt?: number;
        _eq?: number;
    };
}
export interface Where {
    private?: {
        _eq: boolean;
    };
    created_date?: DateFilter;
    attributes?: {
        key?: LikeFilter;
        value?: LikeFilter;
    };
    name?: LikeFilter;
    attributes_aggregate?: {
        count?: CountFilter;
    };
}
export interface OrderBy {
    start_date?: string;
    name?: string;
    id?: string;
}
export interface WhereAttribute {
    key?: LikeFilter;
    value?: LikeFilter;
}
export {};
