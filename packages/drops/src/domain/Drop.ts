export class Drop {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  event_url: string;
  image_url: string;
  animation_url?: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin: boolean;
  virtual_event: boolean;
  supply?: number | null;
  event_template_id?: number | null;
  private_event?: boolean;
  location_type?: string;
  channel?: string;
  platform?: string;
  timezone?: string;
  created_date: string;

  constructor(properties: DropProperties) {
    this.id = properties.id;
    this.fancy_id = properties.fancy_id;
    this.name = properties.name;
    this.description = properties.description;
    this.city = properties.city;
    this.country = properties.country;
    this.event_url = properties.event_url;
    this.image_url = properties.image_url;
    this.year = properties.year;
    this.start_date = properties.start_date;
    this.end_date = properties.end_date;
    this.expiry_date = properties.expiry_date;
    this.from_admin = properties.from_admin;
    this.virtual_event = properties.virtual_event;
    this.created_date = properties.created_date;
    Object.assign(this, properties);
  }
}

export interface DropProperties {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  created_date: string;
  city: string;
  country: string;
  event_url: string;
  image_url: string;
  animation_url?: string;
  year: number;
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin: boolean;
  virtual_event: boolean;
  supply?: number | null;
  event_template_id?: number | null;
  private_event?: boolean;
  location_type?: string;
  channel?: string;
  platform?: string;
  timezone?: string;
}
