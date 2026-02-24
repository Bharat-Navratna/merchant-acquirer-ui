import { Transaction } from '../models/Transaction';

// seed data for mock transactions
export const seedTransactions: Transaction[] = [
  {
    id: '1',
    amount: 120.5,
    method: 'card',
    status: 'success',
    reference: 'REF123456',
    date: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
  },
  {
    id: '2',
    amount: 250,
    method: 'wallet',
    status: 'success',
    reference: 'REF234567',
    date: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
  },
  {
    id: '3',
    amount: 75.25,
    method: 'card',
    status: 'failed',
    reference: 'REF345678',
    date: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
  },
  {
    id: '4',
    amount: 500,
    method: 'wallet',
    status: 'success',
    reference: 'REF456789',
    date: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
  },
  {
    id: '5',
    amount: 16.75,
    method: 'card',
    status: 'success',
    reference: 'REF567890',
    date: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
  {
    id: '6',
    amount: 300,
    method: 'wallet',
    status: 'success',
    reference: 'REF678901',
    date: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
];
