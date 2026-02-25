import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TransactionStatus } from '../models/Transaction';
import { colors, radii, spacing } from '../theme';

interface Props {
  status: TransactionStatus;
}

const statusStyles: Record<TransactionStatus, { bg: string; text: string }> = {
  success: { bg: colors.successLight, text: colors.success },
  failed: { bg: colors.errorLight, text: colors.error },
  refunded: { bg: colors.warningLight, text: colors.warning },
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const { t } = useTranslation();
  const s = statusStyles[status];

  return (
    <View style={[styles.container, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.text }]}>{t(`status.${status}`)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: radii.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
