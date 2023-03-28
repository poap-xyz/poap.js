import { Attribute, VersionAttribute } from './../../../types/attribute';

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
