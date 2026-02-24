/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { TransactionsProvider } from './src/context/TransactionsContext';

function App() {
  // safe area provider and navigation setup
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <TransactionsProvider>
        <AppNavigator />
      </TransactionsProvider>
    </SafeAreaProvider>
  );
}


export default App;
