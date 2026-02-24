import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from './types';
import { colors } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import PayMethodSelectScreen from '../screens/PayMethodSelectScreen';
import PayAmountScreen from '../screens/PayAmountScreen';
import PayConfirmScreen from '../screens/PayConfirmScreen';
import PayResultScreen from '../screens/PayResultScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: t('home.title'), headerShown: false }} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: t('transactions.title') }} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} options={{ title: t('detail.title') }} />
        <Stack.Screen name="PayMethodSelect" component={PayMethodSelectScreen} options={{ title: t('payMethod.title') }} />
        <Stack.Screen name="PayAmount" component={PayAmountScreen} options={{ title: t('payAmount.title') }} />
        <Stack.Screen name="PayConfirm" component={PayConfirmScreen} options={{ title: t('payConfirm.title') }} />
        <Stack.Screen name="PayResult" component={PayResultScreen} options={{ title: t('payResult.title'), headerBackVisible: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings.title') }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
