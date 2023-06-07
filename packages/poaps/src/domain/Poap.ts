/* eslint-disable max-statements */
export class POAP {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: Date;
  drop_id: number;

  constructor(properties: PoapProperties) {
    this.id = properties.id;
    this.collector_address = properties.collector_address;
    this.minted_on = properties.minted_on;
    this.drop_id = properties.drop_id;
    this.transfer_count = properties.transfer_count;
  }
}

export interface PoapProperties {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: Date;
  drop_id: number;
}
