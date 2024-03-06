export enum DropImageGatewayType {
  CROP = 'CROP',
  ORIGINAL = 'ORIGINAL',
}

export interface DropImageGateway {
  id: number;
  imageId: string;
  url: string;
  filename: string;
  mimeType: string;
}

export interface DropImage {
  id: number;
  publicId: string;
  mimeType: string;
  original?: DropImageGateway;
  crop?: DropImageGateway;
}
