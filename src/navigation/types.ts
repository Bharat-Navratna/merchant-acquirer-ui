import { Transaction } from '../models/Transaction';
import { PaymentMethod } from '../models/PaymentMethod';

export type RootStackParamList = {
  Home: undefined;
  Transactions: undefined;
  TransactionDetail: { transactionId: string };
  PayMethodSelect: undefined;
  PayAmount: { method: PaymentMethod };
  PayConfirm: { amount: number; method: PaymentMethod };
  PayResult: { success: boolean; transaction?: Transaction };
  Settings: undefined;
};
