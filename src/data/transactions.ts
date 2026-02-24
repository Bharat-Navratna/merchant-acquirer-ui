import { Transaction } from '../models/Transaction';

// seed data for mock transactions
// Helper to generate YQN-style reference for seed data
function seedRef(hoursAgo: number, seq: number): string {
  const d = new Date(Date.now() - 3600 * 1000 * hoursAgo);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `YQN-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${seq}`;
}

export const seedTransactions: Transaction[] = [
  {
    id: '1',
    amount: 120.5,
    method: 'card',
    status: 'success',
    reference: seedRef(1, 1042),
    date: new Date(Date.now() - 3600 * 1000 * 1).toISOString(),
  },
  {
    id: '2',
    amount: 250,
    method: 'wallet',
    status: 'success',
    reference: seedRef(3, 1038),
    date: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
  },
  {
    id: '3',
    amount: 75.25,
    method: 'card',
    status: 'failed',
    reference: seedRef(5, 1035),
    date: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
  },
  {
    id: '4',
    amount: 500,
    method: 'wallet',
    status: 'success',
    reference: seedRef(10, 1027),
    date: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
  },
  {
    id: '5',
    amount: 16.75,
    method: 'card',
    status: 'success',
    reference: seedRef(24, 1014),
    date: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
  },
  {
    id: '6',
    amount: 300,
    method: 'wallet',
    status: 'success',
    reference: seedRef(48, 1003),
    date: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
];
