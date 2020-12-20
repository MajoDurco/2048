import {
  Matrix,
  MoveResponse,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  newEmptyMatrix,
  isEqual,
} from "./matrix"
import { deepArrayCopy, getRandomInt } from "./utils"

export enum Move {
  UP = "UP",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
  LEFT = "LEFT",
}

const mapMoveToMoveFunction = {
  [Move.UP]: moveUp,
  [Move.DOWN]: moveDown,
  [Move.RIGHT]: moveRight,
  [Move.LEFT]: moveLeft,
}

// 90% number 2
// 10% number 4
export const newRandomBoardValue = (): number => {
  return Math.random() < 0.9 ? 2 : 4
}

// we expect board to have row === columns
export const randomBoardPosition = (board: Matrix): [number, number] => {
  const boardLength = board[0].length
  const randomRow = getRandomInt(boardLength)
  const randomColumn = getRandomInt(boardLength)
  return [randomRow, randomColumn]
}

export const placeValueRandomlyOnBoard = (
  value: number,
  board: Matrix
): Matrix => {
  let randomPosition = randomBoardPosition(board)
  while (board[randomPosition[0]][randomPosition[1]] !== 0) {
    randomPosition = randomBoardPosition(board)
  }
  return placeValueOnBoard(value, randomPosition, board)
}

export const placeValueOnBoard = (
  value: number,
  position: [number, number],
  board: Matrix
): Matrix => {
  const newBoard = deepArrayCopy(board)
  newBoard[position[0]][position[1]] = value
  return newBoard
}

export const initializeBoard = (
  size: number = 4,
  numberOfStones: number = 0
): Matrix => {
  let board = newEmptyMatrix(size)
  Array(numberOfStones)
    .fill(0)
    .forEach(() => {
      board = placeValueRandomlyOnBoard(-1, board)
    })
  Array(2)
    .fill(0)
    .forEach(() => {
      board = placeValueRandomlyOnBoard(newRandomBoardValue(), board)
    })
  return board
}

export const isBoardFull = (board: Matrix): Boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) {
        return false
      }
    }
  }
  return true
}

export const boardHas2048 = (board: Matrix): Boolean => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 2048) {
        return true
      }
    }
  }
  return false
}

export const boardCanMove = (board: Matrix): Boolean => {
  if (!isBoardFull(board)) {
    return true
  }
  // check equal values in rows
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const nextJ = j + 1
      if (nextJ < board[0].length) {
        if (board[i][j] === board[i][nextJ]) {
          return true
        }
      }
    }
  }
  // check equal values in columns
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const nextJ = j + 1
      if (nextJ < board[0].length) {
        if (board[j][i] === board[nextJ][i]) {
          return true
        }
      }
    }
  }
  return false
}

export const makeMove = (move: Move, board: Matrix): MoveResponse => {
  const moveFunction = mapMoveToMoveFunction[move]
  let { matrix, scoreUpdate } = moveFunction(board)
  // if the matrix has not changed we do not generate random value on board
  if (!isEqual(matrix, board)) {
    matrix = placeValueRandomlyOnBoard(newRandomBoardValue(), matrix)
  }
  return {
    matrix,
    scoreUpdate,
  }
}
