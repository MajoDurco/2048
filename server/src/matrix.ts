import { deepArrayCopy } from "./utils"

export type Matrix = number[][]
export type MoveResponse = {
  matrix: Matrix
  scoreUpdate: number
}

export const shiftValuesLeft = (m: Matrix): Matrix => {
  const newMatrix = deepArrayCopy(m)
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

export const mergeValuesLeft = (m: Matrix): MoveResponse => {
  const newMatrix = deepArrayCopy(m)
  let scoreUpdate = 0
  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[0].length; j++) {
      if (newMatrix[i][j] == m[i][j + 1] && m[i][j] !== 0) {
        newMatrix[i][j] *= 2
        scoreUpdate += newMatrix[i][j]
        newMatrix[i][j + 1] = 0
      }
    }
  }
  return {
    matrix: newMatrix,
    scoreUpdate,
  }
}

export const newEmptyMatrix = (size: number = 4): Matrix => {
  return Array(size).fill(Array(size).fill(0))
}

export const isEqual = (m1: Matrix, m2: Matrix): Boolean =>
  JSON.stringify(m1) === JSON.stringify(m2)

export const transpose = (m: Matrix): Matrix =>
  m[0].map((_, index) => m.map((row) => row[index]))

export const reverse = (m: Matrix): Matrix => m.map((r) => [...r].reverse())

export const moveLeft = (m: Matrix): MoveResponse => {
  const { matrix, scoreUpdate } = mergeValuesLeft(shiftValuesLeft(m))
  return {
    matrix: shiftValuesLeft(matrix),
    scoreUpdate,
  }
}

export const moveRight = (m: Matrix): MoveResponse => {
  const { matrix, scoreUpdate } = moveLeft(reverse(m))
  return {
    matrix: reverse(matrix),
    scoreUpdate,
  }
}

export const moveUp = (m: Matrix): MoveResponse => {
  const { matrix, scoreUpdate } = moveLeft(transpose(m))
  return {
    matrix: transpose(matrix),
    scoreUpdate,
  }
}

export const moveDown = (m: Matrix): MoveResponse => {
  const { matrix, scoreUpdate } = moveLeft(reverse(transpose(m)))
  return {
    matrix: transpose(reverse(matrix)),
    scoreUpdate,
  }
}
