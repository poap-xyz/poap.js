/* eslint-disable max-statements */
export class Drop {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  location_type: string;
  drop_url: string;
  image_url: string;
  animation_url: string;
  year: number;
  start_date: string;
  timezone: string;
  private: boolean;
  created_date: string;
  poap_count: number;
  transfer_count: number;

  constructor(properties: DropProperties) {
    this.id = properties.id;
    this.fancy_id = properties.fancy_id;
    this.name = properties.name;
    this.description = properties.description;
    this.city = properties.city;
    this.country = properties.country;
    this.channel = properties.channel;
    this.platform = properties.platform;
    this.location_type = properties.location_type;
    this.drop_url = properties.drop_url;
    this.image_url = properties.image_url;
    this.animation_url = properties.animation_url;
    this.year = properties.year;
    this.start_date = properties.start_date;
    this.timezone = properties.timezone;
    this.private = properties.private;
    this.created_date = properties.created_date;
    this.poap_count = properties.poap_count;
    this.transfer_count = properties.transfer_count;
    Object.assign(this, properties);
  }
}

export interface DropProperties {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  location_type: string;
  drop_url: string;
  image_url: string;
  animation_url: string;
  year: number;
  start_date: string;
  timezone: string;
  private: boolean;
  created_date: string;
  poap_count: number;
  transfer_count: number;
}
