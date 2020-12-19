import { Move } from "../game/board"

export interface Moves {
  get(): Move[]
  append(move: Move): Move[]
  clean(): Move[]
}

const createMoves = (initialMoves: Move[] = []) => {
  let moves: Move[] = initialMoves
  return {
    get(): Move[] {
      return moves
    },
    append(move: Move): Move[] {
      moves = [...moves, move]
      return moves
    },
    clean(): Move[] {
      moves = []
      return moves
    },
  }
}

export default createMoves
