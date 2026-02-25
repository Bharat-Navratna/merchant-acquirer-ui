# YQN Pay – Merchant Acquirer MVP

## 1. Overview

YQN Pay is a mobile point-of-sale application designed for merchants in Morocco. It simulates the front-end experience of a merchant acquiring system, allowing a merchant to accept payments, view transaction history, issue refunds, and receive on-screen receipts.

This is a **frontend-only MVP**. There is no backend, no payment gateway integration, and no real money movement. All transaction data lives in-memory and resets on app reload. The goal is to demonstrate product thinking, UI/UX design, and mobile engineering quality for the merchant acquiring domain.

## 2. Problem Statement

Small and mid-size merchants in Morocco need a simple, multilingual tool to accept payments across methods (card, wallet, QR, cash), track daily collections, and manage basic post-transaction operations like refunds. Existing POS solutions are either hardware-locked, monolingual, or lack the clean UX that modern merchants expect.

YQN Pay addresses this by providing a lightweight, mobile-first acquiring interface that speaks the merchant's language: French, Arabic, or English — and works within the Moroccan financial context (MAD currency, local number formatting, RTL layout support).

## 3. Product Scope (MVP Boundaries)

**In scope:**
- Charge flow: method selection → amount entry → confirmation → receipt
- Four payment method types (Card, Wallet, QR Code, Cash)
- Transaction history with detail view
- Refund action on captured transactions (status change only)
- Dashboard with today's collections and transaction count
- Trilingual UI (FR / AR / EN) with RTL support for Arabic
- Language preference persisted across sessions
- On-screen receipt after each transaction

**Out of scope:**
- Backend API or payment gateway integration
- Real payment processing or settlement
- Merchant authentication or onboarding
- Push notifications
- Persistent transaction storage (transactions reset on app restart)
- Print or share receipt

## 4. Merchant Acquirer Architecture (Conceptual)

In a production acquiring system, the flow would be: Merchant → POS App → Acquirer Gateway → Card Network / Wallet Provider → Issuer → Settlement. YQN Pay implements only the merchant-facing layer of this chain.

**Transaction lifecycle as implemented:**

```
Select Method → Enter Amount → Confirm Charge → [1.5s simulated processing] → Captured
```

- A new `Transaction` object is created with status `success` (displayed as "Captured" / "Capturé" / "مقبوض").
- The transaction is prepended to the in-memory list via React Context.
- From the detail screen, a captured transaction can be refunded, which flips its status to `refunded`.
- Failed transactions exist only in seed data to demonstrate the status system.

**Data model:**

```
Transaction {
  id: string                    // timestamp-based unique ID
  amount: number                // in MAD (float)
  method: PaymentMethod         // 'card' | 'wallet' | 'qr' | 'cash'
  status: TransactionStatus     // 'success' | 'failed' | 'refunded'
  reference: string             // format: YQN-YYYYMMDD-XXXX
  date: string                  // ISO 8601
}
```

Reference numbers follow the format `YQN-YYYYMMDD-XXXX` where XXXX is a random 4-digit sequence, providing a human-readable identifier suitable for receipt display and merchant records.

## 5. User Flow

```
Home (Dashboard)
├── Charge → PayMethodSelect → PayAmount → PayConfirm → PayResult (Receipt)
├── Recent Transactions → TransactionDetail → [Refund]
├── View All → Transactions (full list) → TransactionDetail
└── Settings (Language selection)
```

1. **Home**: Merchant sees today's collection total, transaction count, a "Charge" CTA, and the 5 most recent transactions.
2. **PayMethodSelect**: Choose one of 4 payment methods (2×2 grid).
3. **PayAmount**: Enter the amount using a numeric keypad. Amount and "MAD" currency label are displayed separately.
4. **PayConfirm**: Review amount and method, then confirm. A 1.5-second processing indicator simulates gateway latency.
5. **PayResult**: Full receipt showing amount, status badge, method, reference, and timestamp. Navigation stack resets to Home on "Done".
6. **TransactionDetail**: View any transaction's full details. If status is "Captured", a refund button is available with a confirmation dialog.
7. **Settings**: Switch between Français, العربية, and English. Arabic triggers an RTL layout restart prompt.

## 6. Key Features

- **Charge flow:** With method selection, amount entry via custom keypad, confirmation, and receipt generation
- **Refund handling:** One-tap refund with confirmation dialog on captured transactions; status transitions from "Captured" to "Refunded"
- **Dashboard:** Reactive today's collections total (filters by date + success status) and full transaction count
- **Transaction history:** Chronological list with payment method icons, amounts, and color-coded status badges
- **Trilingual i18n:** All UI copy is externalized into FR/AR/EN JSON bundles; zero hardcoded strings in components
- **RTL support:** Arabic selection triggers `I18nManager.forceRTL()` with a restart prompt
- **Locale-aware currency:** `Intl.NumberFormat` with `fr-MA`, `ar-MA`, or `en` locale for MAD formatting
- **Merchant-specific copy:** Terminology uses acquiring language throughout: "Encaisser" (FR), "Charge" (EN), "تحصيل" (AR) rather than generic payment terms; statuses use "Captured" rather than "Completed"

## 7. Moroccan Market Considerations

**Currency:** All amounts are denominated in MAD (Moroccan Dirham). The `formatMoney` utility formats numbers using `Intl.NumberFormat` with the `fr-MA` locale by default (period for thousands, comma for decimal), switching to `ar-MA` or `en` based on the active language.

**Language strategy:** French is the default and fallback language, reflecting its prevalence in Moroccan commerce. Arabic is fully supported with RTL layout via `I18nManager`. English is available as a third option. Language preference is persisted to AsyncStorage under the key `@yqn_pay_lang`.

**Terminology:** The app uses merchant acquiring vocabulary rather than consumer payment language. The primary action is "Encaisser" (to collect/charge), not "Payer" (to pay). Transaction statuses use "Capturé/Captured/مقبوض" to reflect acquiring industry conventions.

**Payment methods:** The four methods (Card, Wallet, QR Code, Cash) represent the mix relevant to Moroccan merchants: card terminals, mobile wallets (reflecting growing adoption in Morocco), QR-based payments, and cash which remains dominant in many segments.

## 8. Design System & UI Decisions

The app uses a centralized design system defined in `src/theme.ts`:

- **Color palette:** Dark primary (`#151928`), blue accent (`#1A56DB`), warm background (`#F7F8FA`), semantic colors for success/error/warning with matching light variants for badges
- **Typography scale:** 7 levels from `h1` (30px) down to `caption` (12px), plus `amountLg` (34px) for financial figures and `label` (12px uppercase with letter-spacing) for field labels
- **Spacing:** 10-step scale from `xs` (4) to `xxxxl` (40)
- **Elevation:** Three shadow levels (`shadow`, `shadowMd`, `shadowLg`) with platform-specific iOS shadow / Android elevation
- **Border radii:** 6-step scale from `sm` (8) to `full` (999)

Design references: Revolut, Monzo, Square POS. Cards use generous padding with `xxl` radii. The payment method grid is a 2×2 layout with circular icon containers and accent checkmark badges on selection. The amount keypad uses near-square keys with the amount displayed prominently above in 42px with the currency label below.

## 9. Technical Decisions

- **React Native 0.84.0** (bare, not Expo) with **New Architecture** enabled and **Hermes** JS engine
- **TypeScript:** throughout : strict types for navigation params, transaction models, payment methods, and context values
- **@react-navigation/native-stack v7:** native stack navigator with typed route params via `RootStackParamList`
- **react-i18next v16:** : i18n with JSON resource bundles, integrated via `useTranslation` hook in every screen/component
- **React Context** for state : `TransactionsContext` (transaction list, add, refund) and `LanguageContext` (language selection, persistence, RTL management)
- **AsyncStorage** for language persistence only : transactions are intentionally in-memory given MVP scope
- **No external UI library** : all components (button, keypad, cards, badges, rows) are custom-built with `StyleSheet.create`
- **Platform-aware styling** : `Platform.select` for shadow/elevation differences between iOS and Android

## 10. Tradeoffs & Assumptions

**Frontend-only MVP:** There is no backend. Transaction processing is simulated with a 1.5-second `setTimeout`. All transactions live in React state and are lost on app restart. This is intentional, the goal is to demonstrate product design and mobile engineering, not infrastructure.

**Simulated success:** Every confirmed charge results in a "success" status. There is no failure simulation in the charge flow. Failed transactions exist only in seed data to show how the UI handles them.

**No authentication:** The app assumes a single merchant context. There is no login, no multi-merchant support, and no role-based access.

**No settlement:** There is no settlement, payout, or reconciliation flow. The dashboard shows collection totals but does not distinguish between settled and unsettled funds.

**Refund is a status flip:** Refunding a transaction simply changes its status from `success` to `refunded` in memory. There is no reversal logic, no partial refund support, and no refund amount entry.

**Seed data for demo purposes:** The app ships with 6 pre-populated transactions to ensure the dashboard and transaction list are not empty on first launch.

## 11. Cross-Platform: iOS Expansion Path

A common misconception is that React Native lets you "convert" an Android app to iOS. What actually happens is more powerful: **the same TypeScript codebase already IS the iOS app**, it just hasn't been built and run on iOS yet.

### What's shared with zero changes (~95% of the codebase)

Every `.tsx` file in `src/` — all 8 screens, 5 components, both context providers, navigation, i18n, theme, and utilities — runs on iOS without modification. React Native renders to **native UIKit views** on iOS (not a webview), so the same `<View>`, `<Text>`, and `<TouchableOpacity>` calls produce native `UIView`, `UILabel`, and gesture recognizers.

The design system is already cross-platform aware. `theme.ts` uses `Platform.select()` to apply iOS `shadowColor`/`shadowOffset`/`shadowOpacity` properties versus Android `elevation` — this is already implemented and will work on iOS without changes.

All dependencies used in this project have first-class iOS support:

- `@react-navigation/native-stack` — wraps `UINavigationController` on iOS
- `react-native-safe-area-context` — reads iOS safe area insets (notch, Dynamic Island)
- `react-native-screens` — uses native `UIViewController` lifecycle on iOS
- `@react-native-async-storage/async-storage` — uses iOS `NSUserDefaults` under the hood
- `react-i18next` — pure JS, platform-agnostic
- `I18nManager` for RTL — supported on iOS natively

### What's actually required to ship on iOS

React Native eliminates rebuilding the app, but there is platform-specific **build infrastructure** that Apple mandates:

1. **A Mac with Xcode** — Apple does not allow iOS builds on Windows or Linux. This is an Apple restriction, not a React Native limitation.
2. **CocoaPods install** — iOS native dependencies are linked via CocoaPods. Running `cd ios && pod install` resolves this (equivalent to Gradle on Android).
3. **iOS project configuration** — React Native CLI already scaffolds an `ios/` directory with an Xcode project. It needs minor configuration: bundle identifier, deployment target (e.g., iOS 15+), and App Transport Security settings.
4. **Apple Developer Account** — Required for device testing ($99/year) and App Store distribution. Simulator testing is free.
5. **Code signing & provisioning** — Xcode manages signing certificates and provisioning profiles. This is a one-time setup per project.

### What does NOT need to happen

- No rewriting screens or components
- No separate navigation setup
- No re-implementing i18n or state management
- No redesigning the UI (though minor platform-specific tweaks like font rendering or status bar behavior may be desired)
- No separate data model or business logic layer

### Platform-specific considerations if polishing for iOS

- **Android patches don't apply:** The `c++_shared` linking patches applied to `react-native-safe-area-context` and `react-native-screens` for Android are not needed on iOS, these libraries link cleanly via CocoaPods.
- **Font rendering:** iOS uses San Francisco as the system font; Android uses Roboto. Both render the same `fontWeight` and `fontSize` values but may appear slightly different. No code changes needed, just visual QA.
- **Status bar:** The app already uses `<StatusBar barStyle="dark-content" />` which works on both platforms. iOS-specific status bar behavior (e.g., tap-to-scroll-to-top) comes free with `FlatList`.
- **Haptics and gestures:** iOS native stack navigation includes swipe-back gestures automatically via `@react-navigation/native-stack`.

### Estimated effort

For a developer with a Mac and Xcode set up, going from this Android build to a running iOS build would take **under a day** — primarily CocoaPods setup, Xcode configuration, and device testing. The TypeScript codebase requires no changes.

## 12. Future Improvements

- Backend integration with a real acquiring gateway (e.g., CMI, HPS) for live transaction processing
- Persistent transaction storage (local DB or remote API)
- Merchant authentication and profile management
- Settlement tracking: distinguish captured vs. settled vs. paid-out funds
- Partial refund support with amount entry
- Receipt sharing (PDF generation, SMS, or WhatsApp)
- Transaction search and date-range filtering
- Offline mode with sync queue for intermittent connectivity
- Analytics dashboard with charts (daily/weekly/monthly trends)
- Multi-currency support for tourist-facing merchants

## 13. How to Run

**Prerequisites:** Node.js >= 22.11.0, Java 17, Android SDK (API 36), React Native CLI

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Launch the Android Emulator

On Windows (PowerShell):

```powershell
Start-Process "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -ArgumentList "-avd", "Medium_Phone_API_36.1"
```

Wait ~30 seconds for the emulator to fully boot, then verify it's ready:

```bash
adb devices
```

You should see `emulator-5554  device` in the output.

### Step 3: Start Metro Bundler

Open a terminal in the project root (`C:\src\transaction`) and run:

```bash
npx react-native start
```

Wait until you see the Metro menu (`r - reload`, `d - dev menu`, etc.). **Keep this terminal open** — the app needs Metro running to load the JS bundle.

### Step 4: Build & Install the App

Open a **second terminal** (while Metro is still running in the first) and run:

```bash
npx react-native run-android
```

This compiles the native Android project (~30–60s first build, faster on subsequent runs), installs the APK on the emulator, and launches the app.

### Important notes

- **Always run commands from the project root** (`C:\src\transaction`). Verify with `pwd`.
- **Do not use `&&`** to chain commands in PowerShell 5.1 — it is not supported. Run each command separately.
- **Do not close the Metro terminal** — if Metro stops, the app will show a red error screen ("Unable to load script").
- **Emulator must be booted before building** — if `adb devices` shows no devices, the install step will fail.

### Quick reference (3 terminals)

```
Terminal 1:  Start-Process ... emulator     → launch emulator, then this terminal is free
Terminal 2:  npx react-native start          → keep open (Metro bundler)
Terminal 3:  npx react-native run-android    → build + install
```

### Troubleshooting

- **Red screen "Unable to load script"** → Metro isn't running. Start it with `npx react-native start`.
- **"No connected devices" error** → Emulator isn't ready. Check with `adb devices`.
- **Gradle build fails intermittently** → Run `npx react-native run-android` again. Transient cache issues sometimes resolve on retry.
- **App installs but crashes immediately** → Check the Metro terminal for the JS error message.

The app targets Android with New Architecture enabled. Metro runs on port 8081 by default.

## 14. Folder Structure

```
src/
├── components/
│   ├── AmountKeypad.tsx          # Numeric keypad with split amount/currency display
│   ├── PaymentMethodCard.tsx     # 2×2 grid card with icon, label, checkmark
│   ├── PrimaryButton.tsx         # Shared CTA button
│   ├── StatusBadge.tsx           # Color-coded status pill (Captured/Failed/Refunded)
│   └── TransactionRow.tsx        # Transaction list item with icon, amount, badge
├── context/
│   ├── LanguageContext.tsx        # Language state, AsyncStorage persistence, RTL
│   └── TransactionsContext.tsx    # Transaction list, addTransaction, refundTransaction
├── data/
│   └── transactions.ts           # Seed data (6 mock transactions)
├── i18n/
│   ├── index.ts                  # i18next init (FR default, fallback)
│   └── locales/
│       ├── fr.json               # French translations
│       ├── ar.json               # Arabic translations
│       └── en.json               # English translations
├── models/
│   ├── PaymentMethod.ts          # PaymentMethod type + icons map
│   └── Transaction.ts            # Transaction interface + status type
├── navigation/
│   ├── AppNavigator.tsx          # Stack navigator (8 routes)
│   └── types.ts                  # RootStackParamList type definitions
├── screens/
│   ├── HomeScreen.tsx            # Dashboard: collections, count, recent list
│   ├── PayAmountScreen.tsx       # Amount entry with keypad
│   ├── PayConfirmScreen.tsx      # Review + confirm with processing state
│   ├── PayMethodSelectScreen.tsx # 2×2 method grid
│   ├── PayResultScreen.tsx       # Receipt with full transaction details
│   ├── SettingsScreen.tsx        # Language selector (FR/AR/EN)
│   ├── TransactionDetailScreen.tsx  # Detail view + refund action
│   └── TransactionsScreen.tsx    # Full transaction history list
├── utils/
│   └── formatMoney.ts            # Locale-aware MAD formatting
└── theme.ts                      # Colors, spacing, radii, shadows, typography
```

## 15. Screenshots / Demo

*Screenshots to be added after build verification.*

## 16. Author's Note

YQN Pay was built as a product engineering exercise in the merchant acquiring space, specifically tailored to the Moroccan market. The emphasis was on getting the product framing right, using acquiring terminology, supporting the languages merchants actually use, formatting currency correctly for the locale, and building a UI that feels premium enough for a fintech product.

This is not a production system. It is a demonstration of how a frontend engineer thinks about fintech product design: data modeling for payment lifecycles, i18n as a first-class concern rather than an afterthought, and UI that communicates trust and clarity, qualities that matter when merchants are handling money.

## 17. License

Copyright (c) 2026 Bharat Anil Navratna. All rights reserved.

This code is proprietary and confidential. No part of this repository may be copied, reproduced, modified, published, distributed, or used in any form without explicit written permission from the owner. Unauthorized use is strictly prohibited and may result in legal action.

See [LICENSE.txt](LICENSE.txt) for details.
