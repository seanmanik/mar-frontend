export interface LoginRequestBody {
  WalletAddress: string;
  Signature: string;
  BlockchainType: string;
  Message: string;
}
