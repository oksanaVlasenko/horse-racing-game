module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|ts)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!vue-router)']
}