import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', (req, res) => {
  res.json({ message: 'Get notifications endpoint' });
});

router.post('/mark-read', (req, res) => {
  res.json({ message: 'Mark notifications as read endpoint' });
});

router.post('/settings', (req, res) => {
  res.json({ message: 'Update notification settings endpoint' });
});

export default router;
