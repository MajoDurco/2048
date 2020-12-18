import {
  isEqual,
  mergeValuesLeft,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  newEmptyMatrix,
  reverse,
  shiftValuesLeft,
  transpose,
} from "./matrix"

describe("shiftValuesLeft", () => {
  const testCases = [
    {
      input: [[0, 0, 0, 0]],
      output: [[0, 0, 0, 0]],
    },
    {
      input: [[0, 2, 0, 2]],
      output: [[2, 2, 0, 0]],
    },
    {
      input: [[2, 0, 2, 0]],
      output: [[2, 2, 0, 0]],
    },
    {
      input: [[2, 2, 2, 2]],
      output: [[2, 2, 2, 2]],
    },
    {
      input: [
        [0, 2, 2, 2],
        [0, 0, 2, 2],
      ],
      output: [
        [2, 2, 2, 0],
        [2, 2, 0, 0],
      ],
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: [[2, 2, 2, 2, 4, 4]],
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: [[2, 2, 2, 4, 0, 0]],
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: [[2, 2, 4, 0, 0, 0]],
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(shiftValuesLeft(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("mergeValuesLeft", () => {
  const testCases = [
    {
      input: [[0, 0, 0, 0]],
      output: {
        matrix: [[0, 0, 0, 0]],
        scoreUpdate: 0,
      },
    },
    {
      input: [[0, 2, 0, 2]],
      output: {
        matrix: [[0, 2, 0, 2]],
        scoreUpdate: 0,
      },
    },
    {
      input: [[2, 0, 2, 0]],
      output: {
        matrix: [[2, 0, 2, 0]],
        scoreUpdate: 0,
      },
    },
    {
      input: [[2, 2, 2, 2]],
      output: {
        matrix: [[4, 0, 4, 0]],
        scoreUpdate: 4 + 4,
      },
    },
    {
      input: [[0, 2, 2, 2]],
      output: {
        matrix: [[0, 4, 0, 2]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: {
        matrix: [[4, 0, 4, 0, 8, 0]],
        scoreUpdate: 4 + 4 + 8,
      },
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[4, 0, 2, 0, 0, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[0, 4, 0, 0, 0, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [
        [2, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: {
        matrix: [
          [4, 0, 0, 2],
          [0, 4, 0, 2],
        ],
        scoreUpdate: 4 + 4,
      },
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(mergeValuesLeft(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("transpose", () => {
  const testCases = [
    {
      input: [[1, 2]],
      output: [[1], [2]],
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: [
        [0, 0],
        [2, 2],
        [0, 2],
        [2, 2],
      ],
    },
    {
      input: [
        [1, 0],
        [1, 0],
      ],
      output: [
        [1, 1],
        [0, 0],
      ],
    },
    {
      input: [
        [1, 2, 3],
        [4, 5, 6],
      ],
      output: [
        [1, 4],
        [2, 5],
        [3, 6],
      ],
    },
    {
      input: [
        [1, 4],
        [2, 5],
        [3, 6],
      ],
      output: [
        [1, 2, 3],
        [4, 5, 6],
      ],
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(transpose(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("reverse", () => {
  const testCases = [
    {
      input: [[0, 0]],
      output: [[0, 0]],
    },
    {
      input: [[0, 2, 0, 2]],
      output: [[2, 0, 2, 0]],
    },
    {
      input: [[4, 2, 0, 2]],
      output: [[2, 0, 2, 4]],
    },
    {
      input: [
        [4, 2, 0, 2],
        [4, 0, 0, 2],
      ],
      output: [
        [2, 0, 2, 4],
        [2, 0, 0, 4],
      ],
    },
    {
      input: [
        [2, 0, 2, 4],
        [2, 0, 0, 4],
      ],
      output: [
        [4, 2, 0, 2],
        [4, 0, 0, 2],
      ],
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(reverse(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("moveLeft", () => {
  const testCases = [
    {
      input: [[0, 0, 0, 0]],
      output: {
        matrix: [[0, 0, 0, 0]],
        scoreUpdate: 0,
      },
    },
    {
      input: [[0, 2, 0, 2]],
      output: {
        matrix: [[4, 0, 0, 0]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 0, 2, 0]],
      output: {
        matrix: [[4, 0, 0, 0]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 2, 2, 2]],
      output: {
        matrix: [[4, 4, 0, 0]],
        scoreUpdate: 8,
      },
    },
    {
      input: [[0, 2, 2, 2]],
      output: {
        matrix: [[4, 2, 0, 0]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: {
        matrix: [[4, 4, 8, 0, 0, 0]],
        scoreUpdate: 4 + 4 + 8,
      },
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[4, 2, 4, 0, 0, 0]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[4, 4, 0, 0, 0, 0]],
        scoreUpdate: 4,
      },
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: {
        matrix: [
          [4, 0, 0, 0],
          [4, 2, 0, 0],
        ],
        scoreUpdate: 4 + 4,
      },
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(moveLeft(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("moveRight", () => {
  const testCases = [
    {
      input: [[0, 0, 0, 0]],
      output: {
        matrix: [[0, 0, 0, 0]],
        scoreUpdate: 0,
      },
    },
    {
      input: [[0, 2, 0, 2]],
      output: {
        matrix: [[0, 0, 0, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 0, 2, 0]],
      output: {
        matrix: [[0, 0, 0, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 2, 2, 2]],
      output: {
        matrix: [[0, 0, 4, 4]],
        scoreUpdate: 8,
      },
    },
    {
      input: [[0, 2, 2, 2]],
      output: {
        matrix: [[0, 0, 2, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: {
        matrix: [[0, 0, 0, 4, 4, 8]],
        scoreUpdate: 8 + 4 + 4,
      },
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[0, 0, 0, 2, 4, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: {
        matrix: [[0, 0, 0, 0, 4, 4]],
        scoreUpdate: 4,
      },
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: {
        matrix: [
          [0, 0, 0, 4],
          [0, 0, 2, 4],
        ],
        scoreUpdate: 4 + 4,
      },
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(moveRight(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("moveUp", () => {
  const testCases = [
    {
      input: [
        [4, 0],
        [2, 0],
        [2, 2],
        [0, 2],
      ],
      output: {
        matrix: [
          [4, 4],
          [4, 0],
          [0, 0],
          [0, 0],
        ],
        scoreUpdate: 4 + 4,
      },
    },
    {
      input: [
        [0, 2, 0],
        [0, 0, 0],
        [0, 0, 2],
        [0, 2, 0],
      ],
      output: {
        matrix: [
          [0, 4, 2],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        scoreUpdate: 4,
      },
    },
    {
      input: [
        [8, 8, 2],
        [8, 8, 8],
        [16, 2, 4],
        [2, 2, 4],
      ],
      output: {
        matrix: [
          [16, 16, 2],
          [16, 4, 8],
          [2, 0, 8],
          [0, 0, 0],
        ],
        scoreUpdate: 16 + 16 + 4 + 8,
      },
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(moveUp(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("moveDown", () => {
  const testCases = [
    {
      input: [
        [4, 0],
        [2, 0],
        [2, 2],
        [0, 2],
      ],
      output: {
        matrix: [
          [0, 0],
          [0, 0],
          [4, 0],
          [4, 4],
        ],
        scoreUpdate: 4 + 4,
      },
    },
    {
      input: [
        [0, 2, 0],
        [0, 0, 0],
        [0, 0, 2],
        [0, 2, 0],
      ],
      output: {
        matrix: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 4, 2],
        ],
        scoreUpdate: 4,
      },
    },
    {
      input: [
        [8, 8, 2],
        [8, 8, 8],
        [16, 2, 4],
        [2, 2, 4],
      ],
      output: {
        matrix: [
          [0, 0, 0],
          [16, 0, 2],
          [16, 16, 8],
          [2, 4, 8],
        ],
        scoreUpdate: 16 + 4 + 16 + 8,
      },
    },
  ]
  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(moveDown(testCase.input)).toEqual(testCase.output)
    })
  })
})

describe("isEqual", () => {
  const testCases = [
    {
      m1: [
        [4, 0],
        [2, 0],
      ],
      m2: [
        [0, 0],
        [0, 0],
      ],
      output: false,
    },
    {
      m1: [
        [0, 0],
        [0, 0],
      ],
      m2: [
        [0, 0],
        [0, 0],
      ],
      output: true,
    },
    {
      m1: [
        [2, 16],
        [8, 1024],
      ],
      m2: [
        [2, 16],
        [8, 64],
      ],
      output: false,
    },
    {
      m1: [
        [2, 16],
        [8, 1024],
      ],
      m2: [
        [2, 16],
        [8, 1024],
      ],
      output: true,
    },
  ]

  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(isEqual(testCase.m1, testCase.m2)).toEqual(testCase.output)
    })
  })
})

describe("newEmptyMatrix", () => {
  it("creates new 4x4 board", () => {
    expect(newEmptyMatrix(4)).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })
  it("creates new 3x3 board", () => {
    expect(newEmptyMatrix(3)).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  })
})
