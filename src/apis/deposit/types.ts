export interface DepositRequestBody {
  TokenPoolID: number | string;
  WalletAddress: string;
  TransactionHash: string;
  Quantity: number;
}
