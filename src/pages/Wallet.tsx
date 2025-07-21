import React, { useState } from 'react';
import styled from 'styled-components';
import { CreditCard, DollarSign, Send, TrendingUp, Download, Upload, BarChart3, Settings } from 'lucide-react';

const WalletContainer = styled.div`
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes.heading};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;


const WalletCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 30px;
  color: white;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const WalletTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const WalletBalance = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const WalletSubtitle = styled.p`
  opacity: 0.8;
  margin: 0;
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

const StatContent = styled.div`
  flex: 1;
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 4px 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
    font-size: 0.9rem;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`;

const TransactionsSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
`;

const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

const TransactionIcon = styled.div<{ type: 'income' | 'expense' }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ type }) => type === 'income' ? '#10b981' : '#ef4444'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

const TransactionDetails = styled.div`
  flex: 1;
  
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 4px 0;
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
    font-size: 0.9rem;
  }
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ type }) => type === 'income' ? '#10b981' : '#ef4444'};
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Wallet = () => {
  const [walletData] = useState({
    balance: 2847.50,
    totalEarnings: 12450.75,
    pendingBalance: 125.00,
    linkedAccounts: {
      paypal: true,
      bank: true,
      crypto: false
    }
  });

  const [transactions] = useState([
    {
      id: 1,
      type: 'income' as const,
      amount: 450.00,
      description: 'Content monetization',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'expense' as const,
      amount: 200.00,
      description: 'Withdrawal to PayPal',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'income' as const,
      amount: 78.50,
      description: 'Reel monetization',
      date: '2024-01-13',
      status: 'completed'
    },
    {
      id: 4,
      type: 'income' as const,
      amount: 125.00,
      description: 'Group subscription',
      date: '2024-01-12',
      status: 'pending'
    }
  ]);

  const handleAction = (action: string) => {
    switch (action) {
      case 'send':
        alert('Send money feature coming soon!');
        break;
      case 'receive':
        alert('Receive money feature coming soon!');
        break;
      case 'withdraw':
        alert('Withdraw funds feature coming soon!');
        break;
      case 'deposit':
        alert('Deposit funds feature coming soon!');
        break;
      case 'history':
        alert('Transaction history feature coming soon!');
        break;
      case 'settings':
        alert('Wallet settings feature coming soon!');
        break;
      default:
        break;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <WalletContainer>
      <Title>Wallet</Title>
      
      <WalletCard>
        <WalletHeader>
          <WalletTitle>Total Balance</WalletTitle>
          <CreditCard size={24} />
        </WalletHeader>
        <WalletBalance>${walletData.balance.toFixed(2)}</WalletBalance>
        <WalletSubtitle>Available for withdrawal</WalletSubtitle>
      </WalletCard>

      <StatsGrid>
        <StatCard>
          <StatIcon>
            <TrendingUp />
          </StatIcon>
          <StatContent>
            <h3>${walletData.totalEarnings.toFixed(2)}</h3>
            <p>Total Earnings</p>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <DollarSign />
          </StatIcon>
          <StatContent>
            <h3>${walletData.pendingBalance.toFixed(2)}</h3>
            <p>Pending Balance</p>
          </StatContent>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <CreditCard />
          </StatIcon>
          <StatContent>
            <h3>{Object.values(walletData.linkedAccounts).filter(Boolean).length}</h3>
            <p>Linked Accounts</p>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <ActionsGrid>
        <ActionButton onClick={() => handleAction('send')}>
          <Send />
          <span>Send Money</span>
        </ActionButton>
        
        <ActionButton onClick={() => handleAction('receive')}>
          <Download />
          <span>Receive</span>
        </ActionButton>
        
        <ActionButton onClick={() => handleAction('withdraw')}>
          <Upload />
          <span>Withdraw</span>
        </ActionButton>
        
        <ActionButton onClick={() => handleAction('deposit')}>
          <DollarSign />
          <span>Deposit</span>
        </ActionButton>
        
        <ActionButton onClick={() => handleAction('history')}>
          <BarChart3 />
          <span>History</span>
        </ActionButton>
        
        <ActionButton onClick={() => handleAction('settings')}>
          <Settings />
          <span>Settings</span>
        </ActionButton>
      </ActionsGrid>

      <TransactionsSection>
        <SectionHeader>
          <h3>Recent Transactions</h3>
          <ViewAllButton onClick={() => handleAction('history')}>
            View All
          </ViewAllButton>
        </SectionHeader>
        
        <TransactionsList>
          {transactions.slice(0, 4).map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionIcon type={transaction.type}>
                {transaction.type === 'income' ? (
                  <TrendingUp />
                ) : (
                  <Send />
                )}
              </TransactionIcon>
              
              <TransactionDetails>
                <h4>{transaction.description}</h4>
                <p>{formatDate(transaction.date)} • {transaction.status}</p>
              </TransactionDetails>
              
              <TransactionAmount type={transaction.type}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionsList>
      </TransactionsSection>
    </WalletContainer>
  );
};
