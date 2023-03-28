export type CreateAttribute = {
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
};

export type Attribute = {
  id: number;
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
  timestamp: string;
};

export type VersionAttribute = {
  id: number;
  tokenId?: number;
  value: string;
  timestamp: string;
};

export type VersionedAttribute = {
  dropId: number;
  key: string;
  versions: VersionAttribute[];
};

export type VersionedAttributeQueryResponse = {
  attributes: [
    {
      dropId: number;
      key: string;
      versions: VersionAttribute[];
      versions_aggregate: {
        aggregate: {
          count: number;
        };
      };
      same_attributes_aggregate: {
        aggregate: {
          count: number;
        };
      };
    },
  ];
};

export type AttributesQueryResponse = {
  attributes_aggregate: {
    aggregate: { count: number };
    nodes: Attribute[];
  };
};

export type AttributeQueryResponse = {
  attributes: Attribute[];
};
