import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: 'ad-revenue' | 'merchandise' | 'affiliate' | 'donation' | 'crypto' | 'other';
  date: Date;
  status: 'pending' | 'completed' | 'failed';
}

interface WalletData {
  balance: number;
  totalEarnings: number;
  pendingBalance: number;
  transactions: Transaction[];
  linkedAccounts: {
    paypal: boolean;
    bank: boolean;
    crypto: boolean;
  };
}

interface WalletContextType {
  wallet: WalletData;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  withdrawFunds: (amount: number, method: 'paypal' | 'bank' | 'crypto') => void;
  linkAccount: (type: 'paypal' | 'bank' | 'crypto') => void;
  unlinkAccount: (type: 'paypal' | 'bank' | 'crypto') => void;
}

const defaultWalletData: WalletData = {
  balance: 0,
  totalEarnings: 0,
  pendingBalance: 0,
  transactions: [],
  linkedAccounts: {
    paypal: false,
    bank: false,
    crypto: false,
  },
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletData>(defaultWalletData);

  useEffect(() => {
    // Load wallet data from localStorage on mount
    const savedWalletData = localStorage.getItem('astra-wallet');
    if (savedWalletData) {
      const parsedData = JSON.parse(savedWalletData);
      // Convert date strings back to Date objects
      parsedData.transactions = parsedData.transactions.map((t: any) => ({
        ...t,
        date: new Date(t.date),
      }));
      setWallet(parsedData);
    }
  }, []);

  useEffect(() => {
    // Save wallet data to localStorage whenever it changes
    localStorage.setItem('astra-wallet', JSON.stringify(wallet));
  }, [wallet]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setWallet(prev => {
      const newBalance = transaction.type === 'income' 
        ? prev.balance + transaction.amount
        : prev.balance - transaction.amount;

      const newTotalEarnings = transaction.type === 'income'
        ? prev.totalEarnings + transaction.amount
        : prev.totalEarnings;

      return {
        ...prev,
        balance: newBalance,
        totalEarnings: newTotalEarnings,
        transactions: [newTransaction, ...prev.transactions],
      };
    });
  };

  const withdrawFunds = (amount: number, method: 'paypal' | 'bank' | 'crypto') => {
    if (wallet.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const withdrawalTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'expense',
      amount,
      description: `Withdrawal to ${method}`,
      category: 'other',
      date: new Date(),
      status: 'pending',
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - amount,
      pendingBalance: prev.pendingBalance + amount,
      transactions: [withdrawalTransaction, ...prev.transactions],
    }));

    // Simulate processing time
    setTimeout(() => {
      setWallet(prev => ({
        ...prev,
        pendingBalance: prev.pendingBalance - amount,
        transactions: prev.transactions.map(t => 
          t.id === withdrawalTransaction.id 
            ? { ...t, status: 'completed' as const }
            : t
        ),
      }));
    }, 3000);
  };

  const linkAccount = (type: 'paypal' | 'bank' | 'crypto') => {
    setWallet(prev => ({
      ...prev,
      linkedAccounts: {
        ...prev.linkedAccounts,
        [type]: true,
      },
    }));
  };

  const unlinkAccount = (type: 'paypal' | 'bank' | 'crypto') => {
    setWallet(prev => ({
      ...prev,
      linkedAccounts: {
        ...prev.linkedAccounts,
        [type]: false,
      },
    }));
  };

  return (
    <WalletContext.Provider value={{
      wallet,
      addTransaction,
      withdrawFunds,
      linkAccount,
      unlinkAccount,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider, useWallet, type Transaction, type WalletData };
