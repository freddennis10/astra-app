import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';

const router = Router();
router.use(authenticateToken);

router.get('/balance', (req, res) => {
  res.json({
    balance: {
      astra: 1250.50,
      eth: 2.34,
      btc: 0.0012,
      totalUsd: 8945.67
    },
    transactions: [
      { id: 1, type: 'received', amount: 50, currency: 'ASTRA', from: 'neo_silver', timestamp: new Date() }
    ],
    aiInsights: {
      portfolioHealth: 'excellent',
      recommendations: ['Consider staking ASTRA for 12% APY', 'DeFi yield farming opportunity available']
    }
  });
});

router.post('/transfer', (req, res) => {
  res.json({ message: 'Transfer funds endpoint' });
});

router.get('/transactions', (req, res) => {
  res.json({ message: 'Get transaction history endpoint' });
});

export default router;
