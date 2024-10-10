module.exports = {
    testEnvironment: "jsdom", // Ensures Jest uses jsdom environment suitable for React
    coverageThreshold: {
      global: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
      },
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], // Optional for extended Jest DOM matchers
  };
  