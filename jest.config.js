module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@react-navigation/native$': '<rootDir>/__mocks__/@react-navigation/native.js',
    '^@react-navigation/native-stack$': '<rootDir>/__mocks__/@react-navigation/native-stack.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-navigation|@react-native|react-native|react-native-safe-area-context|react-native-screens|react-native-gesture-handler)/)',
  ],
};
