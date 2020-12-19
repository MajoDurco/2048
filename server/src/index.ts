import * as express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { newGame, mapToMove, move, Game } from "./game/game"
import createMoves, { Moves } from "./repositories/moves"
import gameRepository, { GameRepository } from "./repositories/game"
import { findMostFrequent } from "./game/utils"

enum GameMode {
  DEMOCRACY = "DEMOCRACY",
  ANARCHY = "ANARCHY",
}
const printGame = (game: Game) => {
  console.log("Status:", game.status)
  console.log("Score:", game.score)
  console.table(game.board)
}

const createGameUpdateWorker = (
  io: Server,
  seconds: number,
  moves: Moves,
  gameRepository: GameRepository
): (() => void) => {
  const interval = setInterval(() => {
    const m = moves.get()
    if (m.length > 0) {
      const nextMove = findMostFrequent(m)
      console.log("NEXT MOVE", nextMove)
      moves.clean()
      const updatedGame = gameRepository.upsert(
        move(gameRepository.get(), nextMove)
      )
      printGame(updatedGame)
      io.emit("game_update", updatedGame)
    }
  }, seconds * 1000)
  return () => clearInterval(interval)
}

const main = () => {
  const app = express()
  const server = createServer(app)
  const io = new Server(server)

  const port = 3000
  const game = gameRepository(newGame(4, 0))
  printGame(game.get())
  const movesBuffer = createMoves()

  let gameMode = GameMode.ANARCHY
  let cleanInterval = createGameUpdateWorker(io, 0, movesBuffer, game)

  io.on("connection", (socket) => {
    socket.on("move", (move: string) => {
      const nextMove = mapToMove(move)
      if (nextMove !== null) {
        movesBuffer.append(nextMove)
      }
    })
    socket.on("new game", () => {
      console.log("new game")
      const g = game.upsert(newGame(4, 0))
      io.emit("game_update", g)
    })
    socket.on("get game", (respond: (g: Game) => void) => {
      respond(game.get())
    })
    socket.on("anarchy", () => {
      if (gameMode !== GameMode.ANARCHY) {
        console.log("switching to anarchy")
        gameMode = GameMode.ANARCHY
        cleanInterval()
        cleanInterval = createGameUpdateWorker(io, 0, movesBuffer, game)
      }
    })
    socket.on("democracy", () => {
      if (gameMode !== GameMode.DEMOCRACY) {
        console.log("switching to democracy")
        gameMode = GameMode.DEMOCRACY
        cleanInterval()
        cleanInterval = createGameUpdateWorker(io, 5, movesBuffer, game)
      }
    })
  })

  app.get("/health", (_, res) => {
    res.send("ok")
  })

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
}

main()
