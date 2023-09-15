/* eslint-disable max-statements */
export class Drop {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  startDate: Date;
  createdDate: Date;
  expiryDate: Date;
  endDate: Date;
  poapCount: number;
  transferCount: number;
  emailClaim: number;

  constructor(properties: DropProperties) {
    this.id = properties.id;
    this.fancyId = properties.fancyId;
    this.name = properties.name;
    this.description = properties.description;
    this.city = properties.city;
    this.country = properties.country;
    this.channel = properties.channel;
    this.platform = properties.platform;
    this.locationType = properties.locationType;
    this.dropUrl = properties.dropUrl;
    this.imageUrl = properties.imageUrl;
    this.animationUrl = properties.animationUrl;
    this.year = properties.year;
    this.startDate = properties.startDate;
    this.timezone = properties.timezone;
    this.private = properties.private;
    this.createdDate = properties.createdDate;
    this.poapCount = properties.poapCount;
    this.transferCount = properties.transferCount;
    this.emailClaim = properties.emailClaim;
    this.expiryDate = properties.expiryDate;
    this.endDate = properties.endDate;
  }

  public getTotalMinted(): number {
    return this.poapCount + this.emailClaim;
  }

  public toSerializableObject(): SerializableDrop {
    return {
      id: this.id,
      fancyId: this.fancyId,
      name: this.name,
      description: this.description,
      city: this.city,
      country: this.country,
      channel: this.channel,
      platform: this.platform,
      locationType: this.locationType,
      dropUrl: this.dropUrl,
      imageUrl: this.imageUrl,
      animationUrl: this.animationUrl,
      year: this.year,
      timezone: this.timezone,
      private: this.private,
      startDate: this.startDate.toISOString(),
      createdDate: this.createdDate.toISOString(),
      poapCount: this.poapCount,
      transferCount: this.transferCount,
      emailClaim: this.emailClaim,
      expiryDate: this.expiryDate.toISOString(),
      endDate: this.endDate.toISOString(),
    };
  }
}

export interface SerializableDrop {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  startDate: string; // ISO String representation of Date
  createdDate: string; // ISO String representation of Date
  poapCount: number;
  transferCount: number;
  emailClaim: number;
  expiryDate: string; // ISO String representation of Date
  endDate: string; // ISO String representation of Date
}

export interface DropProperties {
  id: number;
  fancyId: string;
  name: string;
  description: string;
  city: string;
  country: string;
  channel: string;
  platform: string;
  locationType: string;
  dropUrl: string;
  imageUrl: string;
  animationUrl: string;
  year: number;
  timezone: string;
  private: boolean;
  createdDate: Date;
  startDate: Date;
  expiryDate: Date;
  endDate: Date;
  poapCount: number;
  transferCount: number;
  emailClaim: number;
}
