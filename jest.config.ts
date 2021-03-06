import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    reporters: ["default"],
    moduleDirectories: ["node_modules", "src"],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    setupFilesAfterEnv: ["./src/jest/jest.setup.ts"],
    transformIgnorePatterns: [],
    testRegex: "/__tests__/.*\\.test\\.(jsx?|tsx?)$",
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "<rootDir>/src/jest/__mocks__/styleMock.ts",
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    coverageDirectory: "./dist-test/coverage",
    verbose: true,
  };
};
