export type PaymentMethod = 'card' | 'wallet' | 'qr' | 'cash';

// i18n keys for each method — used with t(`payMethod.${method}`)
export const PAYMENT_METHODS: PaymentMethod[] = ['card', 'wallet', 'qr', 'cash'];

// Icon labels (emoji placeholders — can be replaced with icons later)
export const PaymentMethodIcons: Record<PaymentMethod, string> = {
  card: '💳',
  wallet: '📱',
  qr: '📷',
  cash: '💵',
};
