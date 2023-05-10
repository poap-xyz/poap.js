export interface FetchDropsInput {
  limit: number;
  offset: number;
  order?: string;
  name?: string;
  nameOrder?: string;
  idOrder?: string;
  from?: string;
  to?: string;
  id?: number;
}

export interface CreateDropsInput {
  name: string;
  description: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  expiry_date: string;
  event_url: string;
  virtual_event: boolean;
  image: Buffer;
  filename: string;
  contentType: string;
  secret_code: string;
  event_template_id?: number | null;
  email: string;
  requested_codes?: number;
  private_event?: boolean;
}

export type UpdateDropsInput = CreateDropsInput;
