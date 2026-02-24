import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Transactions' }} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} options={{ title: 'Détails' }} />
        <Stack.Screen name="PayMethodSelect" component={PayMethodSelectScreen} options={{ title: 'Méthode de paiement' }} />
        <Stack.Screen name="PayAmount" component={PayAmountScreen} options={{ title: 'Montant' }} />
        <Stack.Screen name="PayConfirm" component={PayConfirmScreen} options={{ title: 'Confirmer' }} />
        <Stack.Screen name="PayResult" component={PayResultScreen} options={{ title: 'Résultat' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
