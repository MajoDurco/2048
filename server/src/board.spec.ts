import {
  randomBoardPosition,
  placeValueOnBoard,
  isBoardFull,
  boardHas2048,
  makeMove,
  boardCanMove,
  Move,
} from "./board"
import { newEmptyMatrix } from "./matrix"

describe("randomBoardPosition", () => {
  it("returns random position in 2x2 board", () => {
    const randomPosition = randomBoardPosition(newEmptyMatrix(2))
    expect(randomPosition[0] >= 0 && randomPosition[0] < 2).toBeTruthy()
    expect(randomPosition[1] >= 0 && randomPosition[1] < 2).toBeTruthy()
  })
  it("returns random position in 4x4 board", () => {
    const randomPosition = randomBoardPosition(newEmptyMatrix(4))
    expect(randomPosition[0] >= 0 && randomPosition[0] < 4).toBeTruthy()
    expect(randomPosition[1] >= 0 && randomPosition[1] < 4).toBeTruthy()
  })
})

describe("placeValueOnBoard", () => {
  it("correcly places value to [0, 0]", () => {
    expect(placeValueOnBoard(2, [0, 0], newEmptyMatrix(2))).toEqual([
      [2, 0],
      [0, 0],
    ])
  })
  it("correcly places value to [1, 0]", () => {
    expect(placeValueOnBoard(2, [1, 0], newEmptyMatrix(2))).toEqual([
      [0, 0],
      [2, 0],
    ])
  })
  it("correcly places value to [0, 1]", () => {
    expect(placeValueOnBoard(2, [0, 1], newEmptyMatrix(2))).toEqual([
      [0, 2],
      [0, 0],
    ])
  })
})

describe("isBoardFull", () => {
  it("returns true when board is full", () => {
    expect(
      isBoardFull([
        [2, 2],
        [4, 8],
      ])
    ).toBeTruthy()
  })
  it("returns false when board empty", () => {
    expect(
      isBoardFull([
        [0, 0],
        [0, 0],
      ])
    ).toBeFalsy()
  })
  it("returns false when board has one empty cell", () => {
    expect(
      isBoardFull([
        [8, 4],
        [0, 4],
      ])
    ).toBeFalsy()
  })
})

describe("boardHas2048", () => {
  it("returns true when board has cell 2048", () => {
    expect(
      boardHas2048([
        [0, 4],
        [2048, 4],
      ])
    ).toBeTruthy()
  })
  it("returns false when board does not have cell 2048", () => {
    expect(
      boardHas2048([
        [0, 8],
        [1024, 4],
      ])
    ).toBeFalsy()
  })
})

describe("boardCanMove", () => {
  it("returns true when board is not full", () => {
    expect(
      boardCanMove([
        [0, 4],
        [2048, 4],
      ])
    ).toBeTruthy()
  })
  it("returns true when we can move the board up", () => {
    expect(
      boardCanMove([
        [2, 0, 16],
        [8, 4, 0],
        [16, 4, 8],
      ])
    ).toBeTruthy()
  })
  it("returns true when we can move the board left", () => {
    expect(
      boardCanMove([
        [0, 0, 16],
        [0, 0, 4],
        [0, 4, 8],
      ])
    ).toBeTruthy()
  })
  it("returns true when we can move the board right", () => {
    expect(
      boardCanMove([
        [16, 2, 2],
        [2, 8, 4],
        [8, 4, 8],
      ])
    ).toBeTruthy()
  })
  it("returns true when we can move the board down", () => {
    expect(
      boardCanMove([
        [16, 32, 2],
        [2, 8, 2],
        [8, 4, 8],
      ])
    ).toBeTruthy()
  })
  it("returns false when we cannot move the board in any way", () => {
    expect(
      boardCanMove([
        [2, 8],
        [16, 4],
      ])
    ).toBeFalsy()
  })
})

describe("makeMove", () => {
  it("does not generate new random value on board when board does not change", () => {
    expect(
      makeMove(Move.UP, [
        [0, 2],
        [0, 4],
      ])
    ).toEqual({
      matrix: [
        [0, 2],
        [0, 4],
      ],
      scoreUpdate: 0,
    })
  })
  it("does not generate new random value on board when board does not change by right move", () => {
    expect(
      makeMove(Move.RIGHT, [
        [0, 2],
        [0, 4],
      ])
    ).toEqual({
      matrix: [
        [0, 2],
        [0, 4],
      ],
      scoreUpdate: 0,
    })
  })
})
