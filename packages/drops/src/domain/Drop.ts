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
  timezone: string;
  private: boolean;
  start_date: Date;
  created_date: Date;
  expiry_date: Date;
  end_date: Date;
  poap_count: number;
  transfer_count: number;
  email_claim: number;

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
    this.email_claim = properties.email_claim;
    this.expiry_date = properties.expiry_date;
    this.end_date = properties.end_date;
  }

  public getTotalMinted(): number {
    return this.poap_count + this.email_claim;
  }

  public toSerializableObject(): any {
    return {
      id: this.id,
      fancy_id: this.fancy_id,
      name: this.name,
      description: this.description,
      city: this.city,
      country: this.country,
      channel: this.channel,
      platform: this.platform,
      location_type: this.location_type,
      drop_url: this.drop_url,
      image_url: this.image_url,
      animation_url: this.animation_url,
      year: this.year,
      timezone: this.timezone,
      private: this.private,
      start_date: this.start_date.toISOString(),
      created_date: this.created_date.toISOString(),
      poap_count: this.poap_count,
      transfer_count: this.transfer_count,
      email_claim: this.email_claim,
      expiry_date: this.expiry_date.toISOString(),
      end_date: this.end_date.toISOString()
    };
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
  timezone: string;
  private: boolean;
  created_date: Date;
  start_date: Date;
  expiry_date: Date;
  end_date: Date;
  poap_count: number;
  transfer_count: number;
  email_claim: number;
}