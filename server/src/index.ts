import { makeMove, initializeBoard, Move } from "./game"

process.stdin.on("readable", () => {
  const k = Buffer.from(process.stdin.read(), "utf-8").toString("ascii").trim()
  console.log("k", k)
  console.log(k === "w")
  let nextMove = null
  switch (k) {
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
    board = makeMove(nextMove, board)
    console.table(board)
  }
})

let board = initializeBoard(4)
console.table(board)
