# Merchant Acquirer MVP (Morocco)

This repository contains a minimal React Native frontend designed as a merchant "acquiring" UI tailored for the Moroccan market. It uses Expo, React Native, and TypeScript.

## 🛠 Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Start the development server**
   ```sh
   npm start
   ```
   (or `expo start` if you are using the Expo CLI)

3. Open the app in an emulator or on a device using the QR code.

## 📱 App Flow

- **Home**: shows the 5 most recent transactions, a link to view the full list, and a button to initiate a new payment. Settings button in the top-right.
- **Transactions**: full list of transactions with tappable rows.
- **Transaction Detail**: amount (MAD), status badge, method, reference, date/time.
- **Payment Flow**:
  1. Pay Method Select (Carte / Wallet)
  2. Enter amount using a keypad (validated >0)
  3. Confirm details with a simulated loading state (800ms)
  4. Result screen showing success and quick summary
  5. A successful payment is prepended to the transaction list
- **Settings**: placeholder language toggle between Français and العربية (no real translation).

## 📁 Folder Structure

```
src/
  components/           # Reusable widgets (buttons, badges, keypad, etc.)
  context/              # React context for transactions
  data/                 # Mock seed transactions
  models/               # TypeScript data models and enums
  navigation/           # React Navigation stack and types
  screens/              # All screen components
  utils/                # Utility functions (e.g. formatMoney)

App.tsx                # Entry point bootstrapping navigation & context
README.md              # This file
```

## 💡 Assumptions

- **Frontend-only**: all data lives in memory; there is no backend or persistence.
- **Mock data**: seed transactions are defined in `src/data/transactions.ts`.
- **Language**: labels are French by default; the language switcher is decorative.
- **Currency**: all amounts formatted in Moroccan dirham (MAD) using `fr-MA` locale.
- **Payments**: always succeed in this MVP.

## 📌 Market Notes

- Currency should always be displayed as **MAD**.
- Default UI copy is in **Français**; Arabic is not implemented but placeholder toggle exists.

---

This project aims to provide a clean, minimal, production‑style merchant acquiring interface focused on core functionality with simple navigation and well-structured code.
