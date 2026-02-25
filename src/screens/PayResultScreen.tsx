import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../navigation/types';
import { formatMoney } from '../utils/formatMoney';
import { StatusBadge } from '../components/StatusBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing, radii, shadowMd, typography } from '../theme';

type ResultRouteProp = RouteProp<RootStackParamList, 'PayResult'>;

const PayResultScreen: React.FC = () => {
  const route = useRoute<ResultRouteProp>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { success, transaction } = route.params;

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, !success && styles.iconCircleFailed]}>
        <Text style={[styles.icon, !success && styles.iconFailed]}>
          {success ? '✓' : '✗'}
        </Text>
      </View>
      <Text style={styles.title}>
        {success ? t('payResult.success') : t('payResult.failed')}
      </Text>
      {transaction && (
        <View style={styles.card}>
          <Text style={styles.receiptLabel}>{t('payResult.amount')}</Text>
          <Text style={styles.amount}>{formatMoney(transaction.amount)}</Text>

          <Text style={styles.receiptLabel}>{t('payResult.status')}</Text>
          <StatusBadge status={transaction.status} />

          <Text style={styles.receiptLabel}>{t('payResult.method')}</Text>
          <Text style={styles.receiptValue}>{t(`payMethod.${transaction.method}`)}</Text>

          <Text style={styles.receiptLabel}>{t('payResult.reference')}</Text>
          <Text style={styles.receiptValue}>{transaction.reference}</Text>

          <Text style={styles.receiptLabel}>{t('payResult.dateTime')}</Text>
          <Text style={styles.receiptValue}>
            {new Date(transaction.date).toLocaleString('fr-MA')}
          </Text>
        </View>
      )}
      <PrimaryButton title={t('payResult.backHome')} onPress={goHome} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  iconCircleFailed: {
    backgroundColor: colors.errorLight,
  },
  icon: {
    fontSize: 40,
    color: colors.success,
  },
  iconFailed: {
    color: colors.error,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xxl,
    borderRadius: radii.xxl,
    width: '100%',
    ...shadowMd,
    marginBottom: spacing.xxl,
  },
  receiptLabel: {
    ...typography.label,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  amount: {
    ...typography.amountLg,
    color: colors.accent,
  },
  receiptValue: {
    ...typography.body,
    fontWeight: '500',
  },
  button: { width: '100%' },
});

export default PayResultScreen;
