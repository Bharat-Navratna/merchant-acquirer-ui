import { Platform, TextStyle, ViewStyle } from 'react-native';

export const colors = {
  primary: '#151928',
  accent: '#1A56DB',
  accentLight: '#EBF0FE',
  success: '#059669',
  successLight: '#ECFDF5',
  error: '#DC2626',
  errorLight: '#FEF2F2',
  warning: '#D97706',
  warningLight: '#FFFBEB',
  background: '#F7F8FA',
  surface: '#FFFFFF',
  textPrimary: '#1A1D2E',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  disabled: '#D1D5DB',
};

export const spacing = {
  xxxs: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const shadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  android: {
    elevation: 1,
  },
}) as ViewStyle;

export const shadowMd: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  android: {
    elevation: 3,
  },
}) as ViewStyle;

export const shadowLg: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  android: {
    elevation: 6,
  },
}) as ViewStyle;

export const typography = {
  h1: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  } as TextStyle,
  h2: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  } as TextStyle,
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  } as TextStyle,
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 22,
  } as TextStyle,
  bodySmall: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textTertiary,
    lineHeight: 16,
  } as TextStyle,
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  } as TextStyle,
  amountLg: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.8,
  } as TextStyle,
};
