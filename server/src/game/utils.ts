export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max))
}

export const deepArrayCopy = (arr: Array<any>): Array<any> =>
  JSON.parse(JSON.stringify(arr))

export const findMostFrequent = (array: any[]): any => {
  if (array.length <= 0) {
    return null
  }
  let hash: { [k: string]: number } = {}

  array.forEach((x) => {
    if (!hash[x]) hash[x] = 0
    hash[x]++
  })

  const hashToArray = Object.entries(hash)
  const sortedArray = hashToArray.sort((x, y) => y[1] - x[1])
  return sortedArray[0][0]
}
