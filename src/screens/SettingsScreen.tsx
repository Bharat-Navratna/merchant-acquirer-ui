import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLanguage, AppLanguage } from '../context/LanguageContext';
import { colors, spacing, radii, shadow, typography } from '../theme';

const LANGUAGES: { key: AppLanguage; labelKey: string }[] = [
  { key: 'fr', labelKey: 'settings.french' },
  { key: 'ar', labelKey: 'settings.arabic' },
  { key: 'en', labelKey: 'settings.english' },
];

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
      {LANGUAGES.map(lang => (
        <TouchableOpacity
          key={lang.key}
          onPress={() => setLanguage(lang.key)}
          style={[styles.option, language === lang.key && styles.optionSelected]}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.optionText,
              language === lang.key && styles.optionTextSelected,
            ]}
          >
            {t(lang.labelKey)}
          </Text>
          {language === lang.key && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    ...typography.label,
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadow,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  optionText: {
    ...typography.body,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: colors.accent,
    fontWeight: '600',
  },
  check: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '700',
  },
});

export default SettingsScreen;
