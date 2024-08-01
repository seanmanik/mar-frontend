export interface IPoolDetail {
  tokenPoolID: number
  contractAddress: string
  tokenAddress: string
  blockchain: string
  assetName: string
  assetSymbol: string
  assetLogo: string
  tvl: number
  apy: number
  depositedAmount: number
  depositedValue: number
  points: {
    name: string
    symbol: string
    points: number
    pointsPerDay: number
    calculatedAt: Date
  }[]
}
