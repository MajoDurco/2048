import {
  boardCanMove,
  boardHas2048,
  initializeBoard,
  makeMove,
  Move,
} from "./board"
import { Matrix } from "./matrix"

export enum GameStatus {
  LOSS,
  WIN,
  ACTIVE,
}

export type Game = {
  score: number
  status: GameStatus
  board: Matrix
}

export const newGame = (boardSize: number = 4): Game => {
  return {
    board: initializeBoard(boardSize),
    score: 0,
    status: GameStatus.ACTIVE,
  }
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
  }

  if (!boardCanMove(matrix)) {
    newGameUpdate.status = GameStatus.LOSS
  }

  return newGameUpdate
}
