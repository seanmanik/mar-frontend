export interface IEstimateInput {
  tokenPoolID: number
  quantity: number
}

export interface IEstimateOutput {
  quantity: number
  pointsInfo:  {
    name: string
    symbol: string
    pointsPerDay: number
    changeInPointsPerDay: number
  }[]
}
