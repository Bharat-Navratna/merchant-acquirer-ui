import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useTransactions } from '../context/TransactionsContext';
import { formatMoney } from '../utils/formatMoney';
import { StatusBadge } from '../components/StatusBadge';
import { PaymentMethodLabels } from '../models/PaymentMethod';

type DetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const { transactionId } = route.params;
  const { transactions } = useTransactions();
  const tx = transactions.find(t => t.id === transactionId);

  if (!tx) {
    return (
      <View style={styles.container}>
        <Text>Transaction introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Montant</Text>
      <Text style={styles.value}>{formatMoney(tx.amount)}</Text>

      <Text style={styles.label}>Statut</Text>
      <StatusBadge status={tx.status} />

      <Text style={styles.label}>Méthode</Text>
      <Text style={styles.value}>{PaymentMethodLabels[tx.method]}</Text>

      <Text style={styles.label}>Référence</Text>
      <Text style={styles.value}>{tx.reference}</Text>

      <Text style={styles.label}>Date / heure</Text>
      <Text style={styles.value}>{new Date(tx.date).toLocaleString('fr-MA')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TransactionDetailScreen;
