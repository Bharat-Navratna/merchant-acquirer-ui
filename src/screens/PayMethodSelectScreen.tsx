import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PaymentMethod, PAYMENT_METHODS } from '../models/PaymentMethod';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, typography } from '../theme';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'PayMethodSelect'>;

const PayMethodSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('payMethod.choose')}</Text>
      <View style={styles.grid}>
        {PAYMENT_METHODS.map(m => (
          <PaymentMethodCard
            key={m}
            method={m}
            selected={selected === m}
            onPress={() => setSelected(m)}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          title={t('payMethod.continue')}
          onPress={() => selected && navigation.navigate('PayAmount', { method: selected })}
          disabled={!selected}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: spacing.lg,
  },
});

export default PayMethodSelectScreen;
