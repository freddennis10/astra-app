"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.get('/posts', (req, res) => {
    res.json({ message: 'Social feed endpoint' });
});
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
exports.default = router;
//# sourceMappingURL=social.js.map