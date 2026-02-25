import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AmountKeypad } from '../components/AmountKeypad';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing } from '../theme';

type AmountRouteProp = RouteProp<RootStackParamList, 'PayAmount'>;
type NavProp = NativeStackNavigationProp<RootStackParamList, 'PayAmount'>;

const PayAmountScreen: React.FC = () => {
  const route = useRoute<AmountRouteProp>();
  const { method } = route.params;
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onNext = () => {
    const amount = parseFloat(value);
    if (!amount || amount <= 0) {
      setError(t('payAmount.errorAmount'));
      return;
    }
    navigation.navigate('PayConfirm', { amount, method });
  };

  return (
    <View style={styles.container}>
      <AmountKeypad value={value} onChange={v => { setValue(v); setError(''); }} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <PrimaryButton title={t('payAmount.next')} onPress={onNext} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  error: { color: colors.error, marginTop: spacing.md, fontSize: 14 },
  button: { width: '100%', marginTop: spacing.xxs },
});

export default PayAmountScreen;
