export interface CreateDropsInput {
  name: string;
  description: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
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
