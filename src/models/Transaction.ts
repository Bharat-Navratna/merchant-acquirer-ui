import { PaymentMethod } from './PaymentMethod';

export type TransactionStatus = 'success' | 'failed' | 'refunded';

export interface Transaction {
  id: string;
  amount: number; // in MAD cents or units? we'll use units (float)
  method: PaymentMethod;
  status: TransactionStatus;
  reference: string;
  date: string; // ISO string
}
