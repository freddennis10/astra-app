"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
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
exports.default = router;
//# sourceMappingURL=chat.js.map