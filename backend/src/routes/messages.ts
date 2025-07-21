import express from 'express';
const router = express.Router();

// Mock messages
const conversations = [
  {
    id: 1,
    participants: [1, 2],
    lastMessage: { text: "Hey! How's the new AI feature coming along?", timestamp: new Date(), sender: 2 },
    unreadCount: 2,
    isTyping: false
  }
];

router.get('/conversations', (req, res) => {
  res.json({ conversations, aiInsights: { responseTime: 'fast', sentiment: 'positive' } });
});

router.post('/send', (req, res) => {
  const { recipientId, message } = req.body;
  res.json({ success: true, messageId: Date.now(), aiModeration: { safe: true, sentiment: 'neutral' } });
});

router.get('/ai-suggestions', (req, res) => {
  res.json({
    suggestions: [
      "That sounds great! 🎉",
      "Thanks for sharing!",
      "I'd love to hear more about this!"
    ],
    smartReply: true
  });
});

export default router;
