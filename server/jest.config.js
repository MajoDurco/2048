module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  setupFilesAfterEnv: [],
};