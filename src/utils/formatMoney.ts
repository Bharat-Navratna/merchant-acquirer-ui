import i18n from '../i18n';

export function formatMoney(value: number): string {
  const lang = i18n.language;
  // French & Arabic-Morocco use period for thousands, comma for decimal
  // English uses comma for thousands, period for decimal
  const locale = lang === 'fr' ? 'fr-MA' : lang === 'ar' ? 'ar-MA' : 'en';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${formatted} MAD`;
}
