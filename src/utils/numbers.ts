import BigNumber from 'bignumber.js'

export const getTokenAmount = (tokenValue: number | bigint, decimals = 18): number => {
    return new BigNumber(tokenValue as BigNumber.Value).dividedBy(Math.pow(10, decimals)).toNumber()
}