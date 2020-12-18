export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const deepArrayCopy = (arr: Array<any>): Array<any> =>
  JSON.parse(JSON.stringify(arr))
