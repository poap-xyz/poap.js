export type CreateAttribute = {
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
};

export type CreateAttributesBulkInput = {
  attributes: CreateAttribute[];
};

export type CreateAttributeInput = {
  attribute: CreateAttribute;
};
