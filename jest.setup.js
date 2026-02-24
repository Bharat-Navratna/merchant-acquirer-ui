// Mock React Navigation modules before any imports
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }) => children,
    Screen: () => null,
  })),
}));
