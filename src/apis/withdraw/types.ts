export interface WithdrawRequestBody {
  TokenPoolID: number | string;
  WalletAddress: string;
  TransactionHash: string;
  Quantity: number;
}
