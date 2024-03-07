export enum DropImageGatewayType {
  CROP = 'CROP',
  ORIGINAL = 'ORIGINAL',
}

export interface DropImage {
  imageUrl: string;
  originalImageUrl: string;
}
