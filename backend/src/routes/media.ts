import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.post('/upload', (req, res) => {
  res.json({ message: 'Upload media endpoint' });
});

router.get('/gallery', (req, res) => {
  res.json({ message: 'Get media gallery endpoint' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete media endpoint' });
});

export default router;
