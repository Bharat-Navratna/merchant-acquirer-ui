module.exports = {
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  })),
};
