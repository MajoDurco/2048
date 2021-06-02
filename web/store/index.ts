import { Game, Board, GameStatus, ServerStatus, GameMode } from '~/types'

type State = {
  board: Board | []
  gameMode: GameMode
  messages: string[]
  score: number
  serverStatus: ServerStatus
  status: GameStatus
}

export const state = (): State => ({
  board: [],
  gameMode: GameMode.ANARCHY,
  messages: [],
  score: 0,
  serverStatus: ServerStatus.DISCONNECTED,
  status: GameStatus.ACTIVE,
})

export const mutations = {
  updateGame(state: State, game: Game) {
    state.board = [...game.board]
    state.score = game.score
    state.status = game.status
  },
  serverDisconnected(state: State) {
    state.serverStatus = ServerStatus.DISCONNECTED
  },
  serverConnected(state: State) {
    state.serverStatus = ServerStatus.CONNECTED
  },
  newMessage(state: State, message: string) {
    state.messages = [...state.messages, message]
  },
  gameModeChange(state: State, mode: GameMode) {
    state.gameMode = mode
  },
}
