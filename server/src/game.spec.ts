import { move, GameStatus } from "./game"
import { Move } from "./board"

describe("move", () => {
  const testCases = [
    {
      game: {
        score: 0,
        status: GameStatus.ACTIVE,
        board: [
          [0, 2],
          [0, 0],
        ],
      },
      move: Move.DOWN,
      result: {
        score: 0,
        status: GameStatus.ACTIVE,
      },
    },
    {
      game: {
        score: 4,
        status: GameStatus.ACTIVE,
        board: [
          [0, 2],
          [0, 2],
        ],
      },
      move: Move.DOWN,
      result: {
        score: 4 + 4,
        status: GameStatus.ACTIVE,
      },
    },
    {
      game: {
        score: 4,
        status: GameStatus.ACTIVE,
        board: [
          [4, 2],
          [8, 4],
        ],
      },
      move: Move.DOWN,
      result: {
        score: 4,
        status: GameStatus.LOSS,
      },
    },
    {
      game: {
        score: 4,
        status: GameStatus.LOSS,
        board: [
          [4, 2],
          [8, 4],
        ],
      },
      move: Move.DOWN,
      result: {
        score: 4,
        status: GameStatus.LOSS,
      },
    },
    {
      game: {
        score: 4,
        status: GameStatus.ACTIVE,
        board: [
          [1024, 1024],
          [8, 4],
        ],
      },
      move: Move.LEFT,
      result: {
        score: 4 + 2048,
        status: GameStatus.WIN,
      },
    },
    {
      game: {
        score: 4,
        status: GameStatus.ACTIVE,
        board: [
          [1024, 1024],
          [8, 4],
        ],
      },
      move: Move.RIGHT,
      result: {
        score: 4 + 2048,
        status: GameStatus.WIN,
      },
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(move(testCase.game, testCase.move)).toMatchObject(testCase.result)
    })
  })
})
