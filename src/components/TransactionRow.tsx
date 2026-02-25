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
    <TouchableOpacity onPress={onPress} activeOpacity={0.65}>
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
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    marginBottom: spacing.md,
    ...shadow,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.lg,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  icon: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  method: {
    ...typography.caption,
    marginTop: 4,
  },
});
