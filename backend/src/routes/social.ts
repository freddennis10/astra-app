import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all social routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/social/posts:
 *   get:
 *     summary: Get user feed
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Feed retrieved successfully
 */
router.get('/posts', (req, res) => {
  res.json({ message: 'Social feed endpoint' });
});

/**
 * @swagger
 * /api/social/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/posts', (req, res) => {
  res.json({ message: 'Create post endpoint' });
});

router.post('/posts/:id/like', (req, res) => {
  res.json({ message: 'Like post endpoint' });
});

router.post('/posts/:id/comment', (req, res) => {
  res.json({ message: 'Comment on post endpoint' });
});

router.get('/users/:id/followers', (req, res) => {
  res.json({ message: 'Get followers endpoint' });
});

router.post('/users/:id/follow', (req, res) => {
  res.json({ message: 'Follow user endpoint' });
});

export default router;
