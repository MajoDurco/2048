export enum GameMode {
  DEMOCRACY = 'DEMOCRACY',
  ANARCHY = 'ANARCHY',
}

export enum ServerStatus {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}

export enum GameStatus {
  LOSS = 'LOSS',
  WIN = 'WIN',
  ACTIVE = 'ACTIVE',
}

export type Board = number[][]

export type Game = {
  score: number
  status: GameStatus
  stones: number
  board: Board
}
