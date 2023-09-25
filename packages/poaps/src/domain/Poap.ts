/* eslint-disable max-statements */
export class POAP {
  id: number;
  collectorAddress: string;
  transferCount: number;
  mintedOn: Date;
  dropId: number;
  imageUrl: string;
  city: string;
  country: string;
  description: string;
  startDate: Date;
  endDate: Date;
  name: string;

  constructor(properties: PoapProperties) {
    this.id = properties.id;
    this.collectorAddress = properties.collectorAddress;
    this.mintedOn = properties.mintedOn;
    this.dropId = properties.dropId;
    this.transferCount = properties.transferCount;
    this.imageUrl = properties.imageUrl;
    this.city = properties.city;
    this.country = properties.country;
    this.description = properties.description;
    this.startDate = properties.startDate;
    this.endDate = properties.endDate;
    this.name = properties.name;
  }
}

export interface PoapProperties {
  id: number;
  collectorAddress: string;
  transferCount: number;
  mintedOn: Date;
  dropId: number;
  imageUrl: string;
  city: string;
  country: string;
  description: string;
  startDate: Date;
  name: string;
  endDate: Date;
}
