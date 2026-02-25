import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTransactions } from '../context/TransactionsContext';
import { TransactionRow } from '../components/TransactionRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/types';
import { formatMoney } from '../utils/formatMoney';
import { colors, spacing, radii, shadowMd, typography } from '../theme';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const { t } = useTranslation();
  const { transactions } = useTransactions();
  const insets = useSafeAreaInsets();

  const recent = transactions.slice(0, 5);

  const todayTotal = useMemo(() => {
    const today = new Date().toDateString();
    return transactions
      .filter(tx => new Date(tx.date).toDateString() === today && tx.status === 'success')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }, [transactions]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.header}>
        <Text style={styles.appName}>{t('appName')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsLink}>⚙</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsRow}>
        <View style={[styles.card, styles.salesCard]}>
          <Text style={styles.cardLabel}>{t('home.todaySales')}</Text>
          <Text style={styles.cardValue}>{formatMoney(todayTotal)}</Text>
        </View>
        <View style={[styles.card, styles.countCard]}>
          <Text style={styles.cardLabel}>{t('home.todayCount')}</Text>
          <Text style={styles.cardValue}>{transactions.length}</Text>
        </View>
      </View>

      <PrimaryButton
        title={t('home.newPayment')}
        onPress={() => navigation.navigate('PayMethodSelect')}
        style={styles.cta}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('home.recentTransactions')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.viewAll}>{t('home.viewAll')}</Text>
        </TouchableOpacity>
      </View>

      {recent.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t('home.noTransactions')}</Text>
        </View>
      ) : (
        <FlatList
          data={recent}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionRow
              transaction={item}
              onPress={() => navigation.navigate('TransactionDetail', { transactionId: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    ...typography.h1,
  },
  settingsLink: {
    fontSize: 24,
  },
  cardsRow: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  card: {
    flex: 1,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xxl,
    ...shadowMd,
  },
  salesCard: {
    backgroundColor: colors.primary,
    marginRight: spacing.md,
  },
  countCard: {
    backgroundColor: colors.accent,
    marginLeft: spacing.md,
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  cardValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.3,
  },
  cta: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
  },
  viewAll: {
    ...typography.bodySmall,
    color: colors.accent,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxxl,
  },
  emptyText: {
    ...typography.bodySmall,
  },
});

export default HomeScreen;
