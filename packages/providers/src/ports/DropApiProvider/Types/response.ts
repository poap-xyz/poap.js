/**
 * The response data from a drop API.
 *
 * @interface DropResponse
 */
export interface DropResponse {
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
  start_date: string;
  end_date: string;
  expiry_date: string;
  from_admin: boolean;
  virtual_event: boolean;
  event_template_id?: number | null;
  private_event: boolean;
  channel: string;
  platform: string;
  location_type: string;
  timezone: string;
  created_date: string;
}
