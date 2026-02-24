import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

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
    activeOpacity={0.7}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#99cfff',
  },
});
