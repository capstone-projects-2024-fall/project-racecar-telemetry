module.exports = {
    reporters: [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Test Suite Report",
          outputPath: "./test-report.html",
          includeFailureMsg: true,
          includeConsoleLog: true,
        },
      ],
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@components/(.*)$": "<rootDir>/src/components/$1",
        "^@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@api/(.*)$": "<rootDir>/src/pages/api/$1",
        "^@services/(.*)$": "<rootDir>/src/services/$1",
        "^@styles/(.*)$": "<rootDir>/src/styles/$1",
        "^@firebaseConfig$": "<rootDir>/src/firebase/firebaseConfig.js",
        "^@app/(.*)$": "<rootDir>/src/app/$1",
        "^@global.css$": "<rootDir>/src/app/global.css",
        "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
        "^@theme$": "<rootDir>/src/app/theme.jsx"
      },
      testEnvironment: "jsdom",
  };
  