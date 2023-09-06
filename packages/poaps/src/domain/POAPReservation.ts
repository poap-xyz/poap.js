/* eslint-disable max-statements */
export class POAPReservation {
  email: string;
  drop_id: number;
  image_url: string;
  city: string;
  country: string;
  description: string;
  start_date: Date;
  end_date: Date;
  name: string;

  constructor(properties: POAPReservationProperties) {
    this.email = properties.email;
    this.drop_id = properties.drop_id;
    this.image_url = properties.image_url;
    this.city = properties.city;
    this.country = properties.country;
    this.description = properties.description;
    this.start_date = properties.start_date;
    this.end_date = properties.end_date;
    this.name = properties.name;
  }
}

export interface POAPReservationProperties {
  email: string;
  drop_id: number;
  image_url: string;
  city: string;
  country: string;
  description: string;
  start_date: Date;
  name: string;
  end_date: Date;
}
