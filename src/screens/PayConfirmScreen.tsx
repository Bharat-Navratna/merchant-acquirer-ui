import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { formatMoney } from '../utils/formatMoney';
import { PrimaryButton } from '../components/PrimaryButton';
import { PaymentMethodLabels } from '../models/PaymentMethod';
import { Transaction } from '../models/Transaction';
import { useTransactions } from '../context/TransactionsContext';

type ConfirmRouteProp = RouteProp<RootStackParamList, 'PayConfirm'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'PayConfirm'>;

const PayConfirmScreen: React.FC = () => {
  const route = useRoute<ConfirmRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { amount, method } = route.params;
  const { addTransaction } = useTransactions();

  const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const newTx: Transaction = {
        id: Date.now().toString(),
        amount,
        method,
        status: 'success',
        reference: 'REF' + Math.floor(Math.random() * 1000000),
        date: new Date().toISOString(),
      };
      addTransaction(newTx);
      setLoading(false);
      navigation.replace('PayResult', { success: true, transaction: newTx });
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Montant</Text>
      <Text style={styles.value}>{formatMoney(amount)}</Text>

      <Text style={styles.label}>Méthode</Text>
      <Text style={styles.value}>{PaymentMethodLabels[method as keyof typeof PaymentMethodLabels]}</Text>

      <PrimaryButton title={loading ? 'Traitement...' : 'Confirmer'} onPress={onConfirm} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, color: '#666', marginTop: 12 },
  value: { fontSize: 18, fontWeight: '600' },
});

export default PayConfirmScreen;
