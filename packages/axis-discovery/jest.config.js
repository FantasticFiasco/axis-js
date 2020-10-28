module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: ["./src/**/*.ts", "!./src/index.ts", "!./src/server.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig-base.json",
    },
  },
};
