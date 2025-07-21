"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.post('/upload', (req, res) => {
    res.json({ message: 'Upload media endpoint' });
});
router.get('/gallery', (req, res) => {
    res.json({ message: 'Get media gallery endpoint' });
});
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete media endpoint' });
});
exports.default = router;
//# sourceMappingURL=media.js.map