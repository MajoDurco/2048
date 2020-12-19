import { Game } from "../game/game"

export interface GameRepository {
  init(g: Game): Game
  get(): Game
  upsert(g: Game): Game
}

const gameRepository = (initialGame: Game) => {
  let game = initialGame
  return {
    init(g: Game): Game {
      game = { ...g }
      return game
    },
    get(): Game {
      return game
    },
    upsert(g: Game): Game {
      game = { ...game, ...g }
      return game
    },
  }
}

export default gameRepository
