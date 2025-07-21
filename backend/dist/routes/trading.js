"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/portfolio', (req, res) => {
    res.json({ message: 'Get portfolio endpoint' });
});
router.post('/buy', (req, res) => {
    res.json({ message: 'Buy asset endpoint' });
});
router.post('/sell', (req, res) => {
    res.json({ message: 'Sell asset endpoint' });
});
exports.default = router;
//# sourceMappingURL=trading.js.map