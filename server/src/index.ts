import { Move } from "./board"
import { newGame, move, Game } from "./game"

const printGame = (game: Game) => {
  console.log("Status:", game.status)
  console.log("Score:", game.score)
  console.table(game.board)
}

let game = newGame(4)
printGame(game)

process.stdin.on("readable", () => {
  const key = Buffer.from(process.stdin.read(), "utf-8").toString().trim()
  let nextMove = null
  switch (key) {
    case "w":
      nextMove = Move.UP
      break
    case "s":
      nextMove = Move.DOWN
      break
    case "a":
      nextMove = Move.LEFT
      break
    case "d":
      nextMove = Move.RIGHT
      break
    default:
      nextMove = null
      break
  }
  if (nextMove !== null) {
    game = move(game, nextMove)
    printGame(game)
  }
})
