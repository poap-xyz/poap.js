export type Attribute = {
  id: number;
  drop_id: number;
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
