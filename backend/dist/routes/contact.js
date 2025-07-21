"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/submit', (req, res) => {
    const { subject, message, priority } = req.body;
    res.json({
        ticketId: Date.now(),
        aiResponse: 'We\'ll respond within 24 hours',
        suggestedResources: ['Help Center', 'Community Forum'],
        estimatedResolution: '2 hours'
    });
});
router.get('/faq', (req, res) => {
    res.json({
        faqs: [
            { question: 'How do I enable AI features?', answer: 'Go to Settings > AI & Personalization' }
        ],
        aiSuggestions: ['Most relevant to your recent activity']
    });
});
exports.default = router;
//# sourceMappingURL=contact.js.map