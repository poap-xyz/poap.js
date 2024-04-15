import { DropImageGatewayType } from './dropImage';

interface DropImageGatewayResponse {
  type: DropImageGatewayType;
  url: string;
}

export interface DropImageResponse {
  gateways: Array<DropImageGatewayResponse>;
}
