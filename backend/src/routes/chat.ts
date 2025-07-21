import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/conversations', (req, res) => {
  res.json({ message: 'Get conversations endpoint' });
});

router.post('/conversations', (req, res) => {
  res.json({ message: 'Create conversation endpoint' });
});

router.get('/conversations/:id/messages', (req, res) => {
  res.json({ message: 'Get messages endpoint' });
});

router.post('/conversations/:id/messages', (req, res) => {
  res.json({ message: 'Send message endpoint' });
});

export default router;
