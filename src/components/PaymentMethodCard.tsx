import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { PaymentMethod, PaymentMethodIcons } from '../models/PaymentMethod';
import { colors, spacing, radii, shadowMd } from '../theme';

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
      activeOpacity={0.6}
    >
      <View style={[styles.iconWrap, selected && styles.iconWrapSelected]}>
        <Text style={styles.icon}>{PaymentMethodIcons[method]}</Text>
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {t(`payMethod.${method}`)}
      </Text>
      {selected && (
        <View style={styles.checkBadge}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radii.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowMd,
  },
  selected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  iconWrap: {
    width: 85,
    height: 85,
    borderRadius: 28,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconWrapSelected: {
    backgroundColor: colors.surface,
  },
  icon: {
    fontSize: 45,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  labelSelected: {
    color: colors.accent,
  },
  checkBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
