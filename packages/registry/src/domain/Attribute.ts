export class Attribute {
  id: number;
  dropId: number;
  tokenId?: number;
  key: string;
  value: string;
  timestamp: Date;

  constructor(
    id: number,
    dropId: number,
    key: string,
    value: string,
    timestamp: Date,
    tokenId?: number,
  ) {
    this.id = id;
    this.dropId = dropId;
    this.tokenId = tokenId;
    this.key = key;
    this.value = value;
    this.timestamp = timestamp;
  }
}
