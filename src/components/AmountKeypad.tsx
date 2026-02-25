import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatMoney } from '../utils/formatMoney';
import { colors, spacing, radii, shadow } from '../theme';

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
  const numericPart = displayAmount.replace(/\s*MAD$/, '');

  return (
    <View style={styles.container}>
      <View style={styles.displayWrap}>
        <Text style={styles.display}>{numericPart}</Text>
        <Text style={styles.currency}>MAD</Text>
      </View>
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
  displayWrap: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xxxl,
  },
  display: {
    fontSize: 60,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: -1,
  },
  currency: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.textTertiary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: spacing.xs,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
  key: {
    width: '29%',
    margin: '2%',
    aspectRatio: 1.1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl,
    ...shadow,
  },
  keyText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  deleteKey: {
    backgroundColor: colors.errorLight,
    elevation: 0,
    shadowOpacity: 0,
  },
  deleteKeyText: {
    color: colors.error,
  },
});
