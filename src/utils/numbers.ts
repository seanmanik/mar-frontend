import BigNumber from "bignumber.js";

type Notation = "standard" | "scientific" | "engineering" | "compact";

export const formatNumberNotation = (
  num: number | string,
  notation:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact"
    | undefined = "compact",
  maximumFractionDigits?: number
) => {
  if (!num) {
    return "";
  }
  if (typeof num === "string") {
    num = Number(num);
  }

  if (!maximumFractionDigits) {
    switch (true) {
      case Math.abs(num) < 0.00000001:
        maximumFractionDigits = 11;
        break;

      case Math.abs(num) < 0.000001:
        maximumFractionDigits = 9;
        break;

      case Math.abs(num) < 1:
        maximumFractionDigits = 6;
        break;

      case Math.abs(num) < 10:
        maximumFractionDigits = 4;
        break;

      case Math.abs(num) >= 10:
        maximumFractionDigits = 2;
        break;
    }
  }

  return Intl.NumberFormat('en', {
    notation: notation,
    maximumFractionDigits: maximumFractionDigits,
  }).format(num)
};

export function formatNumber(
    number: any,
    precision?: number,
    isShowZero = false,
  ) {
    if (!number) return 0
  
    if (!precision) {
      switch (true) {
        case Math.abs(number) < 0.00000001:
          precision = 11
          break
  
        case Math.abs(number) < 0.000001:
          precision = 9
          break
  
        case Math.abs(number) < 1:
          precision = 6
          break
  
        case Math.abs(number) < 10:
          precision = 4
          break
  
        case Math.abs(number) >= 10:
          precision = 2
          break
      }
    }
  
    let formated = BigNumber(number).toFormat(precision)
  
    if (!isShowZero) {
      if (formated.match(/\.[0]+$/g)) {
        formated = formated.replace(/\.[0]+$/g, '')
      }
  
      if (formated.match(/\.\d+[0]+$/g)) {
        formated = formated.replace(/[0]+$/g, '')
      }
    }
  
    return formated
  }