import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { formatMoney } from '../utils/formatMoney';
import { PrimaryButton } from '../components/PrimaryButton';
import { Transaction } from '../models/Transaction';
import { useTransactions } from '../context/TransactionsContext';
import { colors, spacing, radii, shadow, typography } from '../theme';

type ConfirmRouteProp = RouteProp<RootStackParamList, 'PayConfirm'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'PayConfirm'>;

const PayConfirmScreen: React.FC = () => {
  const route = useRoute<ConfirmRouteProp>();
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const { amount, method } = route.params;
  const { addTransaction } = useTransactions();

  const [loading, setLoading] = useState(false);

  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const dateTag = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
      const seq = Math.floor(1000 + Math.random() * 9000);
      const newTx: Transaction = {
        id: Date.now().toString(),
        amount,
        method,
        status: 'success',
        reference: `YQN-${dateTag}-${seq}`,
        date: now.toISOString(),
      };
      addTransaction(newTx);
      setLoading(false);
      navigation.replace('PayResult', { success: true, transaction: newTx });
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>{t('payConfirm.amount')}</Text>
        <Text style={styles.amount}>{formatMoney(amount)}</Text>

        <Text style={styles.label}>{t('payConfirm.method')}</Text>
        <Text style={styles.value}>{t(`payMethod.${method}`)}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>{t('payConfirm.processing')}</Text>
        </View>
      ) : (
        <PrimaryButton title={t('payConfirm.confirm')} onPress={onConfirm} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: radii.lg,
    ...shadow,
    marginBottom: spacing.xxl,
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xxxl,
  },
  loadingText: {
    ...typography.bodySmall,
    marginTop: spacing.md,
  },
  button: { width: '100%' },
});

export default PayConfirmScreen;
