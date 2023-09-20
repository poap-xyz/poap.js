export interface GetMintCodeResponse {
  id: number;
  qrHash: string;
  txHash: string;
  eventId: number;
  beneficiary: string;
  userInput: string;
  signer: string;
  claimed: boolean;
  claimedDate: string;
  createdDate: string;
  isActive: boolean;
  secret: string;
  txStatus: string;
  result: {
    token: number;
  };
}
