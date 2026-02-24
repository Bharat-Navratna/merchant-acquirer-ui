import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PaymentMethod, PaymentMethodIcons } from '../models/PaymentMethod';
import { colors, spacing, radii, shadow, typography } from '../theme';

interface Props {
  method: PaymentMethod;
  selected?: boolean;
  onPress: () => void;
}

export const PaymentMethodCard: React.FC<Props> = ({ method, selected, onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
        <Text style={styles.icon}>{PaymentMethodIcons[method]}</Text>
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {t(`payMethod.${method}`)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  selected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconWrapSelected: {
    backgroundColor: colors.surface,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  labelSelected: {
    color: colors.accent,
  },
});
