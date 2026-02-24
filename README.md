# YQN Pay — Merchant Acquiring MVP

A modern React Native merchant-acquiring app targeting the **Moroccan market**. Built with React Native 0.84 (New Architecture), TypeScript, and i18next for full FR / AR / EN localization.

## Getting Started

```sh
# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android (emulator or device)
npx react-native run-android
```

## App Flow (Square-inspired POS)

1. **Home** — Dashboard with today's sales total, transaction count, recent transactions list, and a prominent "New Payment" CTA.
2. **Pay Method Select** — 2×2 grid: Card, Wallet, QR Code, Cash.
3. **Amount Entry** — Custom numeric keypad, MAD-formatted display with 2-decimal limit.
4. **Confirm** — Summary card + animated processing spinner (simulated 800 ms).
5. **Result** — Success/failure screen with reference, then reset navigation back to Home.
6. **Transactions** — Full history list with empty-state message.
7. **Transaction Detail** — Card layout showing amount, status, method, reference, date. Refund button for successful transactions.
8. **Settings** — Language picker (Français / العربية / English) with persistence.

## Internationalization (i18n)

- **Supported languages**: French (default), Arabic, English.
- All UI strings use `react-i18next` with JSON locale files in `src/i18n/locales/`.
- Language selection is persisted to AsyncStorage.
- Arabic triggers RTL layout via `I18nManager.forceRTL()` with a restart prompt.

## Folder Structure

```
src/
  components/       # AmountKeypad, PaymentMethodCard, PrimaryButton, StatusBadge, TransactionRow
  context/          # TransactionsContext (state + refund), LanguageContext (i18n + RTL)
  data/             # Seed mock transactions
  i18n/             # i18next setup + locales/ (fr.json, en.json, ar.json)
  models/           # PaymentMethod (card/wallet/qr/cash), Transaction (with refunded status)
  navigation/       # AppNavigator + RootStackParamList types
  screens/          # Home, PayMethodSelect, PayAmount, PayConfirm, PayResult, Transactions, TransactionDetail, Settings
  utils/            # formatMoney (MAD, fr-MA locale)
  theme.ts          # Colors, spacing, radii, shadows, typography (Revolut/Monzo-inspired)
App.tsx             # Entry point — I18n + LanguageProvider + TransactionsProvider + Navigation
```

## Key Design Decisions

- **No backend** — all data is in-memory with mock seed transactions.
- **Currency** — Moroccan Dirham (MAD), formatted with `fr-MA` locale.
- **UI** — Revolut/Monzo-inspired clean card-based design with subtle shadows.
- **Architecture** — React Native 0.84, New Arch enabled, Hermes JS engine.
- **Payments** — always succeed in this MVP (simulated processing delay).
