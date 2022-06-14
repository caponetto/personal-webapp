module.exports = {
  reporters: ["default"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["./src/__tests__/jest.setup.ts"],
  transformIgnorePatterns: [],
  testRegex: "/__tests__/.*\\.test\\.(jsx?|tsx?)$",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__tests__/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  collectCoverage: true,
  coverageDirectory: "./dist-test/coverage",
  verbose: true,
};
