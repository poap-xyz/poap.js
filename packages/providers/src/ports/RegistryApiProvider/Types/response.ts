export type AttributeResponse = {
  id: number;
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
  timestamp: string;
};
export type CreateAttributeResponse = AttributeResponse;
export type CreateAttributesBulkResponse = AttributeResponse[];
