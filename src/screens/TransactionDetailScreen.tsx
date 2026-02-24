import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { useTransactions } from '../context/TransactionsContext';
import { formatMoney } from '../utils/formatMoney';
import { StatusBadge } from '../components/StatusBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, radii, shadow, typography } from '../theme';

type DetailRouteProp = RouteProp<RootStackParamList, 'TransactionDetail'>;

const TransactionDetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const { transactionId } = route.params;
  const { t } = useTranslation();
  const { transactions, refundTransaction } = useTransactions();
  const tx = transactions.find(item => item.id === transactionId);

  if (!tx) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>{t('detail.notFound')}</Text>
      </View>
    );
  }

  const handleRefund = () => {
    Alert.alert(
      t('detail.refundConfirm'),
      t('detail.refundMessage'),
      [
        { text: t('detail.cancel'), style: 'cancel' },
        {
          text: t('detail.confirm'),
          style: 'destructive',
          onPress: () => refundTransaction(tx.id),
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>{t('detail.amount')}</Text>
        <Text style={styles.amount}>{formatMoney(tx.amount)}</Text>

        <Text style={styles.label}>{t('detail.status')}</Text>
        <StatusBadge status={tx.status} />

        <Text style={styles.label}>{t('detail.method')}</Text>
        <Text style={styles.value}>{t(`payMethod.${tx.method}`)}</Text>

        <Text style={styles.label}>{t('detail.reference')}</Text>
        <Text style={styles.value}>{tx.reference}</Text>

        <Text style={styles.label}>{t('detail.dateTime')}</Text>
        <Text style={styles.value}>{new Date(tx.date).toLocaleString('fr-MA')}</Text>
      </View>

      {tx.status === 'success' && (
        <PrimaryButton
          title={t('detail.refund')}
          onPress={handleRefund}
          style={styles.refundButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  notFound: {
    ...typography.bodySmall,
    textAlign: 'center',
    marginTop: spacing.xxxl,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: radii.lg,
    ...shadow,
  },
  label: {
    ...typography.label,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.h1,
    color: colors.accent,
  },
  value: {
    ...typography.h3,
  },
  refundButton: {
    marginTop: spacing.xxl,
    backgroundColor: colors.error,
  },
});

export default TransactionDetailScreen;
