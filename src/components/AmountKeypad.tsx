import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatMoney } from '../utils/formatMoney';
import { colors, spacing, radii, typography } from '../theme';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const buttons = ['1','2','3','4','5','6','7','8','9','.','0','←'];

export const AmountKeypad: React.FC<Props> = ({ value, onChange }) => {
  const handlePress = (btn: string) => {
    if (btn === '←') {
      onChange(value.slice(0, -1));
    } else if (btn === '.') {
      if (!value.includes('.')) {
        onChange(value + '.');
      }
    } else {
      // Limit to 2 decimal places
      const parts = value.split('.');
      if (parts.length === 2 && parts[1].length >= 2) { return; }
      onChange(value + btn);
    }
  };

  const displayAmount = value ? formatMoney(parseFloat(value) || 0) : formatMoney(0);

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayAmount}</Text>
      <View style={styles.grid}>
        {buttons.map(b => (
          <TouchableOpacity
            key={b}
            style={[styles.key, b === '←' && styles.deleteKey]}
            onPress={() => handlePress(b)}
            activeOpacity={0.6}
          >
            <Text style={[styles.keyText, b === '←' && styles.deleteKeyText]}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  display: {
    ...typography.h1,
    fontSize: 36,
    marginVertical: spacing.xxl,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    margin: '1.5%',
    aspectRatio: 1.6,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
  },
  keyText: {
    fontSize: 24,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  deleteKey: {
    backgroundColor: colors.errorLight,
  },
  deleteKeyText: {
    color: colors.error,
  },
});
