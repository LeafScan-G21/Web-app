module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/test"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.cjs"],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$":
      "<rootDir>/test/__mocks__/fileMock.cjs",
  },
  reporters: ["default", "jest-html-reporter"],
};
