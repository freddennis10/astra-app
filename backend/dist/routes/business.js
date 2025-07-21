"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/analytics', (req, res) => {
    res.json({ message: 'Get business analytics endpoint' });
});
router.post('/verify', (req, res) => {
    res.json({ message: 'Verify business endpoint' });
});
router.get('/ads', (req, res) => {
    res.json({ message: 'Get ads endpoint' });
});
exports.default = router;
//# sourceMappingURL=business.js.map