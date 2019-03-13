module.exports = {
  "preset": "jest-puppeteer",
  "globalSetup": "jest-environment-puppeteer/setup",
  "globalTeardown": "jest-environment-puppeteer/teardown",
  "testEnvironment": "jest-environment-puppeteer",
  "testRegex": "/src/__tests__/functional/.*[^d]\.tsx?$",
  "runInBand": true,

  // "(/__tests__/.*|\\.(test|Editor))\\.(ts|tsx|js)$"
  // /src/__tests__/functional/.*\\.tsx?$
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  // "testRegex": "(/__tests__/.*|\\.(test|Editor))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]

}