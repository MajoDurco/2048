import * as express from "express"
import { createServer } from "http"
import * as Server from "socket.io"
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
  io: Server.Server,
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
      io.emit("game updated", updatedGame)
    }
  }, seconds * 1000)
  return () => clearInterval(interval)
}

const main = () => {
  const app = express()

  const CORSOptions = {
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: "http://localhost:3000",
    credentials: true,
  }

  const httpServer = createServer(app)
  // @ts-ignore
  const io = new Server(httpServer, {
    cors: CORSOptions,
  })

  const port = 3001
  const game = gameRepository(newGame(6, 0))
  printGame(game.get())
  const movesBuffer = createMoves()

  let gameMode = GameMode.ANARCHY
  let cleanInterval = createGameUpdateWorker(io, 0, movesBuffer, game)

  io.on("connection", (socket) => {
    io.emit("game updated", game.get())
    socket.on("move", (move: string) => {
      const nextMove = mapToMove(move)
      if (nextMove !== null) {
        movesBuffer.append(nextMove)
      }
    })
    socket.on("new game", (stones: string) => {
      const g = game.upsert(newGame(6, parseInt(stones) || 0))
      io.emit("game updated", g)
    })
    socket.on("new message", (message: string) => {
      io.emit("new message", message)
    })
    socket.on("get game", (respond: (g: Game) => void) => {
      respond(game.get())
    })
    socket.on("get game mode", (respond: (mode: GameMode) => void) => {
      respond(gameMode)
    })
    socket.on("game mode change", (newMode: string) => {
      console.log("newMOde", newMode)
      if (newMode === GameMode.ANARCHY && gameMode !== GameMode.ANARCHY) {
        console.log("switching to anarchy")
        gameMode = GameMode.ANARCHY
        cleanInterval()
        cleanInterval = createGameUpdateWorker(io, 0, movesBuffer, game)
        io.emit("game mode change", gameMode)
      }
      if (newMode === GameMode.DEMOCRACY && gameMode !== GameMode.DEMOCRACY) {
        console.log("switching to democracy")
        gameMode = GameMode.DEMOCRACY
        cleanInterval()
        cleanInterval = createGameUpdateWorker(io, 5, movesBuffer, game)
        io.emit("game mode change", gameMode)
      }
    })
  })

  app.get("/health", (_, res) => {
    res.send("ok")
  })

  httpServer.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
}

main()
