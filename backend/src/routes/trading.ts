import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/portfolio', (req, res) => {
  res.json({ message: 'Get portfolio endpoint' });
});

router.post('/buy', (req, res) => {
  res.json({ message: 'Buy asset endpoint' });
});

router.post('/sell', (req, res) => {
  res.json({ message: 'Sell asset endpoint' });
});

export default router;
