import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/products', (req, res) => {
  res.json({ message: 'Get products endpoint' });
});

router.post('/products', (req, res) => {
  res.json({ message: 'Create product endpoint' });
});

router.post('/products/:id/purchase', (req, res) => {
  res.json({ message: 'Purchase product endpoint' });
});

export default router;
