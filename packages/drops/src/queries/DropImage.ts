import { DropImageGatewayType } from '../types/dropImage';

export const DROP_IMAGE_QUERY = `
  query DropImage($id: Int!) {
    drops(where: { id: { _eq: $id } }) {
      image_url
      drop_image {
        gateways {
          type
          url
        }
      }
    }
  }
`;

export interface DropImageGatewayResponse {
  type: DropImageGatewayType;
  url: string;
}

export interface DropImageGatewaysResponse {
  gateways?: Array<DropImageGatewayResponse>;
}

export interface DropImageResponse {
  image_url: string;
  drop_image?: DropImageGatewaysResponse;
}

export interface DropImageQueryResponse {
  data: { drops: Array<DropImageResponse> };
}
