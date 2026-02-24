import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Transaction } from '../models/Transaction';
import { seedTransactions } from '../data/transactions';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  refundTransaction: (id: string) => void;
}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([...seedTransactions]);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  const refundTransaction = (id: string) => {
    setTransactions(prev =>
      prev.map(tx => (tx.id === id ? { ...tx, status: 'refunded' as const } : tx)),
    );
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, refundTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = (): TransactionsContextValue => {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return ctx;
};
