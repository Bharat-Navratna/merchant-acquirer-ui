/**
 * YQN Pay — Merchant Acquiring MVP
 * @format
 */

import './src/i18n';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { TransactionsProvider } from './src/context/TransactionsContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { colors } from './src/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <LanguageProvider>
        <TransactionsProvider>
          <AppNavigator />
        </TransactionsProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default App;
