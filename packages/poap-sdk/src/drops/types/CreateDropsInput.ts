export interface CreateDropsInput {
  name: string;
  description: string;
  city: string;
  country: string;
  startDate: string | Date;
  endDate: string | Date;
  expiryDate: string | Date;
  eventUrl: string;
  virtualEvent: boolean;
  image: Blob;
  filename: string;
  contentType: string;
  secretCode: string;
  eventTemplateId?: number | null;
  email: string;
  requestedCodes?: number;
  privateEvent?: boolean;
}
