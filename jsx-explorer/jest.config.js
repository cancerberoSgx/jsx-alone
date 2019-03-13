module.exports = {
  "preset": "jest-puppeteer",
  "globalSetup": "jest-environment-puppeteer/setup",
  "globalTeardown": "jest-environment-puppeteer/teardown",
  "testEnvironment": "jest-environment-puppeteer",
  "testRegex": "__tests__/.*\.*Test\.[t]sx?$",
  // "(/__tests__/.*|\\.(test|Editor))\\.(ts|tsx|js)$"

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