export function calcGame(comparison: number, falseComparison: number, allGameTimeSec:number): number {
  let res = (comparison - falseComparison) * 100 - allGameTimeSec * 10;
  if (res < 0) res = 0;
  return res;
}
