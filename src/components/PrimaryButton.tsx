import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, radii, spacing, shadowMd } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<Props> = ({ title, onPress, disabled, style }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.75}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: spacing.xxxl,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xxl,
    ...shadowMd,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  disabled: {
    opacity: 0.45,
  },
});
