import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { AmountKeypad } from '../components/AmountKeypad';
import { PrimaryButton } from '../components/PrimaryButton';

type AmountRouteProp = RouteProp<RootStackParamList, 'PayAmount'>;

type NavProp = any; // simple

const PayAmountScreen: React.FC = () => {
  const route = useRoute<AmountRouteProp>();
  const { method } = route.params;
  const navigation = useNavigation<NavProp>();

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onNext = () => {
    const amount = parseFloat(value);
    if (!amount || amount <= 0) {
      setError('Entrez un montant supérieur à 0');
      return;
    }
    navigation.navigate('PayConfirm', { amount, method });
  };

  return (
    <View style={styles.container}>
      <AmountKeypad value={value} onChange={v => { setValue(v); setError(''); }} />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <PrimaryButton title="Suivant" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  error: { color: '#f44336', marginTop: 8 },
});

export default PayAmountScreen;
