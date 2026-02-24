import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { PaymentMethod, PaymentMethodLabels } from '../models/PaymentMethod';

interface Props {
  method: PaymentMethod;
  selected?: boolean;
  onPress: () => void;
}

export const PaymentMethodCard: React.FC<Props> = ({ method, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.label}>{PaymentMethodLabels[method]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: '#007aff',
    backgroundColor: '#e6f0ff',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
});
