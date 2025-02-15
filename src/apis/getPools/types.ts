export interface IPoolDetail {
  tokenPoolID: number
  contractAddress: string
  tokenAddress: string
  decimals: number
  blockchain: string
  assetName: string
  assetSymbol: string
  assetLogo: string
  tvl: number
  apy: number
  depositedAmount: number
  depositedValue: number
  usdRate: number
  tokenPrice: number
  points: {
    name: string
    symbol: string
    points: number
    pointsPerDay: number
    calculatedAt: Date
  }[]
}
