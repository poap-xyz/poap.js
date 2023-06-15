/* eslint-disable max-statements */
export class POAP {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: Date;
  drop_id: number;
  image_url: string;
  city: string;
  country: string;
  description: string;
  start_date: Date;
  end_date: Date;
  name: string;

  constructor(properties: PoapProperties) {
    this.id = properties.id;
    this.collector_address = properties.collector_address;
    this.minted_on = properties.minted_on;
    this.drop_id = properties.drop_id;
    this.transfer_count = properties.transfer_count;
    this.image_url = properties.image_url;
    this.city = properties.city;
    this.country = properties.country;
    this.description = properties.description;
    this.start_date = properties.start_date;
    this.end_date = properties.end_date;
    this.name = properties.name;
  }
}

export interface PoapProperties {
  id: number;
  collector_address: string;
  transfer_count: number;
  minted_on: Date;
  drop_id: number;
  image_url: string;
  city: string;
  country: string;
  description: string;
  start_date: Date;
  name: string;
  end_date: Date;
}
