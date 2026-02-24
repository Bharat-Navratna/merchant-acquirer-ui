module.exports = {
  NavigationContainer: ({ children }) => children,
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
};
