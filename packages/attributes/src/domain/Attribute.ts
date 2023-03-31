export class Attribute {
  id: number;
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
  timestamp: Date;

  constructor(properties: AttributeProperties) {
    Object.assign(this, properties);
  }
}

export interface AttributeProperties {
  id: number;
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
  timestamp: Date;
}
