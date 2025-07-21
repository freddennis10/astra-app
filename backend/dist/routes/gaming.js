"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/games', (req, res) => {
    res.json({ message: 'Get games endpoint' });
});
router.post('/games/:id/join', (req, res) => {
    res.json({ message: 'Join game endpoint' });
});
router.get('/leaderboard', (req, res) => {
    res.json({ message: 'Get leaderboard endpoint' });
});
exports.default = router;
//# sourceMappingURL=gaming.js.map