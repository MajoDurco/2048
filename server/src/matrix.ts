type Matrix = number[][]

export const shiftValuesLeft = (m: Matrix): Matrix => {
  const newMatrix = JSON.parse(JSON.stringify(m))
  for (let i = 0; i < newMatrix.length; i++) {
    let lastNotEmptyIndex = 0
    for (let j = 0; j < newMatrix[0].length; j++) {
      if (m[i][j] !== 0) {
        newMatrix[i][lastNotEmptyIndex] = m[i][j]
        // only replace with zero when we moved the value
        if (j !== lastNotEmptyIndex) {
          newMatrix[i][j] = 0
        }
        lastNotEmptyIndex += 1
      }
    }
  }
  return newMatrix
}

export const mergeValuesLeft = (m: Matrix): Matrix => {
  const newMatrix = JSON.parse(JSON.stringify(m))
  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[0].length; j++) {
      if (newMatrix[i][j] == m[i][j + 1] && m[i][j] !== 0) {
        newMatrix[i][j] *= 2
        newMatrix[i][j + 1] = 0
      }
    }
  }
  return newMatrix
}

export const transpose = (m: Matrix): Matrix =>
  m[0].map((_, index) => m.map((row) => row[index]))

export const reverse = (m: Matrix): Matrix => m.map((r) => [...r].reverse())

export const moveLeft = (m: Matrix): Matrix => {
  return shiftValuesLeft(mergeValuesLeft(shiftValuesLeft(m)))
}

export const moveRight = (m: Matrix): Matrix => {
  return reverse(moveLeft(reverse(m)))
}

export const moveUp = (m: Matrix): Matrix => {
  return transpose(moveLeft(transpose(m)))
}

export const moveDown = (m: Matrix): Matrix => {
  return transpose(reverse(moveLeft(reverse(transpose(m)))))
}
