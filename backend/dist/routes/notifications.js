"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/', (req, res) => {
    res.json({ message: 'Get notifications endpoint' });
});
router.post('/mark-read', (req, res) => {
    res.json({ message: 'Mark notifications as read endpoint' });
});
router.post('/settings', (req, res) => {
    res.json({ message: 'Update notification settings endpoint' });
});
exports.default = router;
//# sourceMappingURL=notifications.js.map