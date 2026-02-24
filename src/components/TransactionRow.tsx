import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../models/Transaction';
import { formatMoney } from '../utils/formatMoney';
import { StatusBadge } from './StatusBadge';
import { PaymentMethodIcons } from '../models/PaymentMethod';
import { colors, spacing, radii, shadow, typography } from '../theme';

interface Props {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionRow: React.FC<Props> = ({ transaction, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{PaymentMethodIcons[transaction.method]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.amount}>{formatMoney(transaction.amount)}</Text>
          <Text style={styles.method}>{t(`payMethod.${transaction.method}`)}</Text>
        </View>
        <StatusBadge status={transaction.status} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radii.md,
    marginBottom: spacing.sm,
    ...shadow,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  amount: {
    ...typography.body,
    fontWeight: '600',
  },
  method: {
    ...typography.caption,
    marginTop: 2,
  },
});
