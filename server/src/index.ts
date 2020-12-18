import { Move } from "./game/board"
import { newGame, move, Game } from "./game/game"

// const setIntervalPromise = util.promisify(setInterval)

const printGame = (game: Game) => {
  console.log("Status:", game.status)
  console.log("Score:", game.score)
  console.table(game.board)
}

const findMostFrequent = (array: any[]): any => {
  if (array.length <= 0) {
    return null
  }
  let hash: { [k: string]: number } = {}

  array.forEach((x) => {
    if (!hash[x]) hash[x] = 0
    hash[x]++
  })

  const hashToArray = Object.entries(hash)
  console.log("h to array", hashToArray)
  const sortedArray = hashToArray.sort((x, y) => y[1] - x[1])
  console.log("sortedArray", sortedArray)
  return sortedArray[0][0]
}

let gameMovesBuffer: Move[] = []
let game = newGame(4)
printGame(game)

process.stdin.on("readable", () => {
  const key = Buffer.from(process.stdin.read(), "utf-8").toString().trim()
  let nextMove: Move | null = null
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
    gameMovesBuffer.push(nextMove)
  }
})

setInterval(() => {
  const nextMove = findMostFrequent(gameMovesBuffer)
  if (nextMove !== null) {
    console.log("buffer", gameMovesBuffer)
    gameMovesBuffer = []
    console.log("nextMove", nextMove)
    game = move(game, nextMove)
    printGame(game)
  }
}, 5 * 1000)
