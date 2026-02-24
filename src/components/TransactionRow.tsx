import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from '../models/Transaction';
import { formatMoney } from '../utils/formatMoney';
import { StatusBadge } from './StatusBadge';
import { PaymentMethodLabels } from '../models/PaymentMethod';

interface Props {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionRow: React.FC<Props> = ({ transaction, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View>
          <Text style={styles.amount}>{formatMoney(transaction.amount)}</Text>
          <Text style={styles.method}>{PaymentMethodLabels[transaction.method]}</Text>
        </View>
        <StatusBadge status={transaction.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  method: {
    fontSize: 12,
    color: '#666',
  },
});
