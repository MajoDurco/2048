import {
  boardCanMove,
  boardHas2048,
  initializeBoard,
  makeMove,
  Move,
} from "./board"
import { Matrix } from "./matrix"

export enum GameStatus {
  LOSS = "LOSS",
  WIN = "WIN",
  ACTIVE = "ACTIVE",
}

export type Game = {
  score: number
  status: GameStatus
  stones: number
  board: Matrix
}

export const newGame = (boardSize: number = 4, stones: number = 0): Game => {
  const board = initializeBoard(boardSize, stones)

  const newGame = {
    board,
    stones,
    score: 0,
    status: GameStatus.ACTIVE,
  }

  // in case of large number of stones game can be unplayable
  if (!boardCanMove(board)) {
    newGame.status = GameStatus.LOSS
  }

  return newGame
}

export const move = (game: Game, move: Move): Game => {
  if (game.status !== GameStatus.ACTIVE) {
    return game
  }

  const newGameUpdate = { ...game }
  const { matrix, scoreUpdate } = makeMove(move, game.board)
  newGameUpdate.board = matrix
  newGameUpdate.score += scoreUpdate

  if (boardHas2048(matrix)) {
    newGameUpdate.status = GameStatus.WIN
    return newGameUpdate
  }

  if (!boardCanMove(matrix)) {
    newGameUpdate.status = GameStatus.LOSS
    return newGameUpdate
  }

  return newGameUpdate
}

export const mapToMove = (move: string): Move | null => {
  let nextMove: Move | null = null
  switch (move) {
    case "up":
      nextMove = Move.UP
      break
    case "down":
      nextMove = Move.DOWN
      break
    case "left":
      nextMove = Move.LEFT
      break
    case "right":
      nextMove = Move.RIGHT
      break
    default:
      nextMove = null
      break
  }
  return nextMove
}
