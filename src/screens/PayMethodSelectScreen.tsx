import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaymentMethod } from '../models/PaymentMethod';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'PayMethodSelect'>;

const PayMethodSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [selected, setSelected] = useState<PaymentMethod | null>(null);

  const continuePressed = () => {
    if (selected) {
      navigation.navigate('PayAmount', { method: selected });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez la méthode</Text>
      <View style={styles.cardsRow}>
        <PaymentMethodCard
          method="card"
          selected={selected === 'card'}
          onPress={() => setSelected('card')}
        />
        <PaymentMethodCard
          method="wallet"
          selected={selected === 'wallet'}
          onPress={() => setSelected('wallet')}
        />
      </View>
      <View style={styles.footer}>
        <Text
          onPress={continuePressed}
          style={[styles.continue, !selected && styles.disabled]}
        >
          Continuer
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },
  continue: {
    fontSize: 18,
    color: '#007aff',
    fontWeight: '600',
  },
  disabled: {
    color: '#ccc',
  },
});

export default PayMethodSelectScreen;
