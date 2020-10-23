module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [ "**/*.spec.ts" ],
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig-base.json",
      },
    },
  };
