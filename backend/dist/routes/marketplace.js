"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/products', (req, res) => {
    res.json({ message: 'Get products endpoint' });
});
router.post('/products', (req, res) => {
    res.json({ message: 'Create product endpoint' });
});
router.post('/products/:id/purchase', (req, res) => {
    res.json({ message: 'Purchase product endpoint' });
});
exports.default = router;
//# sourceMappingURL=marketplace.js.map