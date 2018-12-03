module.exports = {
  moduleFileExtensions: [
    "js",
    "vue"
  ],
  transform: {
    "^.+\.js$": "babel-jest",
    "^.+\.vue$": "vue-jest"
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue",
    "jest-serializer-vue"
  ],

  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],

  testURL: "http://localhost/"
}
