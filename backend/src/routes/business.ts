import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/analytics', (req, res) => {
  res.json({ message: 'Get business analytics endpoint' });
});

router.post('/verify', (req, res) => {
  res.json({ message: 'Verify business endpoint' });
});

router.get('/ads', (req, res) => {
  res.json({ message: 'Get ads endpoint' });
});

export default router;
