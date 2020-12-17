import {
  mergeValuesLeft,
  shiftValuesLeft,
  moveLeft,
  moveRight,
  transpose,
  reverse,
  moveUp,
  moveDown,
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
      output: [[0, 0, 0, 0]],
    },
    {
      input: [[0, 2, 0, 2]],
      output: [[0, 2, 0, 2]],
    },
    {
      input: [[2, 0, 2, 0]],
      output: [[2, 0, 2, 0]],
    },
    {
      input: [[2, 2, 2, 2]],
      output: [[4, 0, 4, 0]],
    },
    {
      input: [[0, 2, 2, 2]],
      output: [[0, 4, 0, 2]],
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: [[4, 0, 4, 0, 8, 0]],
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: [[4, 0, 2, 0, 0, 4]],
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: [[0, 4, 0, 0, 0, 4]],
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: [
        [0, 2, 0, 2],
        [0, 4, 0, 2],
      ],
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
      output: [[0, 0, 0, 0]],
    },
    {
      input: [[0, 2, 0, 2]],
      output: [[4, 0, 0, 0]],
    },
    {
      input: [[2, 0, 2, 0]],
      output: [[4, 0, 0, 0]],
    },
    {
      input: [[2, 2, 2, 2]],
      output: [[4, 4, 0, 0]],
    },
    {
      input: [[0, 2, 2, 2]],
      output: [[4, 2, 0, 0]],
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: [[4, 4, 8, 0, 0, 0]],
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: [[4, 2, 4, 0, 0, 0]],
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: [[4, 4, 0, 0, 0, 0]],
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: [
        [4, 0, 0, 0],
        [4, 2, 0, 0],
      ],
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
      output: [[0, 0, 0, 0]],
    },
    {
      input: [[0, 2, 0, 2]],
      output: [[0, 0, 0, 4]],
    },
    {
      input: [[2, 0, 2, 0]],
      output: [[0, 0, 0, 4]],
    },
    {
      input: [[2, 2, 2, 2]],
      output: [[0, 0, 4, 4]],
    },
    {
      input: [[0, 2, 2, 2]],
      output: [[0, 0, 2, 4]],
    },
    {
      input: [[2, 2, 2, 2, 4, 4]],
      output: [[0, 0, 0, 4, 4, 8]],
    },
    {
      input: [[2, 2, 2, 0, 0, 4]],
      output: [[0, 0, 0, 2, 4, 4]],
    },
    {
      input: [[0, 2, 2, 0, 0, 4]],
      output: [[0, 0, 0, 0, 4, 4]],
    },
    {
      input: [
        [0, 2, 0, 2],
        [0, 2, 2, 2],
      ],
      output: [
        [0, 0, 0, 4],
        [0, 0, 2, 4],
      ],
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
      output: [
        [4, 4],
        [4, 0],
        [0, 0],
        [0, 0],
      ],
    },
    {
      input: [
        [0, 2, 0],
        [0, 0, 0],
        [0, 0, 2],
        [0, 2, 0],
      ],
      output: [
        [0, 4, 2],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      input: [
        [8, 8, 2],
        [8, 8, 8],
        [16, 2, 4],
        [2, 2, 4],
      ],
      output: [
        [16, 16, 2],
        [16, 4, 8],
        [2, 0, 8],
        [0, 0, 0],
      ],
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
      output: [
        [0, 0],
        [0, 0],
        [4, 0],
        [4, 4],
      ],
    },
    {
      input: [
        [0, 2, 0],
        [0, 0, 0],
        [0, 0, 2],
        [0, 2, 0],
      ],
      output: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 4, 2],
      ],
    },
    {
      input: [
        [8, 8, 2],
        [8, 8, 8],
        [16, 2, 4],
        [2, 2, 4],
      ],
      output: [
        [0, 0, 0],
        [16, 0, 2],
        [16, 16, 8],
        [2, 4, 8],
      ],
    },
  ]
  testCases.forEach((testCase, index) => {
    it(`Test ${index}`, () => {
      expect(moveDown(testCase.input)).toEqual(testCase.output)
    })
  })
})
