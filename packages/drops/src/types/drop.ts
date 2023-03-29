export type Drop = {
  id: number;
  fancy_id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  event_url: string;
  image_url: string;
  animation_url: string;
  year: number;
  start_date: Date;
  end_date: Date;
  expiry_date: Date;
  from_admin: boolean;
  virtual_event: boolean;
  private_event: boolean;
};
