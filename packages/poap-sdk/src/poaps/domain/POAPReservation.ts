export class POAPReservation {
  email: string;
  dropId: number;
  imageUrl: string;
  city: string;
  country: string;
  description: string;
  startDate: Date;
  endDate: Date;
  name: string;

  constructor(properties: POAPReservationProperties) {
    this.email = properties.email;
    this.dropId = properties.dropId;
    this.imageUrl = properties.imageUrl;
    this.city = properties.city;
    this.country = properties.country;
    this.description = properties.description;
    this.startDate = properties.startDate;
    this.endDate = properties.endDate;
    this.name = properties.name;
  }
}

interface POAPReservationProperties {
  email: string;
  dropId: number;
  imageUrl: string;
  city: string;
  country: string;
  description: string;
  startDate: Date;
  name: string;
  endDate: Date;
}
