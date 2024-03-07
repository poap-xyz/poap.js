export enum DropImageGatewayType {
  CROP = 'CROP',
  ORIGINAL = 'ORIGINAL',
}

export interface DropImage {
  original?: string;
  crop?: string;
}
