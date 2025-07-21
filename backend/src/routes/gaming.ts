import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/games', (req, res) => {
  res.json({ message: 'Get games endpoint' });
});

router.post('/games/:id/join', (req, res) => {
  res.json({ message: 'Join game endpoint' });
});

router.get('/leaderboard', (req, res) => {
  res.json({ message: 'Get leaderboard endpoint' });
});

export default router;
