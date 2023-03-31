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
