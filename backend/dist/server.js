"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const messages_1 = __importDefault(require("./routes/messages"));
const wallet_1 = __importDefault(require("./routes/wallet"));
const groups_1 = __importDefault(require("./routes/groups"));
const business_1 = __importDefault(require("./routes/business"));
const stories_1 = __importDefault(require("./routes/stories"));
const notifications_1 = __importDefault(require("./routes/notifications"));
const media_1 = __importDefault(require("./routes/media"));
const settings_1 = __importDefault(require("./routes/settings"));
const contact_1 = __importDefault(require("./routes/contact"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const auth_2 = require("./middleware/auth");
const database_1 = require("./config/database");
const redis_1 = require("./config/redis");
const handlers_1 = require("./socket/handlers");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 5000;
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
});
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Astra Social Media API',
            version: '1.0.0',
            description: 'API documentation for Astra Social Media App',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
}));
app.use((0, compression_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
app.use('/api/auth', auth_1.default);
app.use('/api/users', auth_2.authenticateToken, users_1.default);
app.use('/api/posts', auth_2.authenticateToken, posts_1.default);
app.use('/api/messages', auth_2.authenticateToken, messages_1.default);
app.use('/api/wallet', auth_2.authenticateToken, wallet_1.default);
app.use('/api/groups', auth_2.authenticateToken, groups_1.default);
app.use('/api/business', auth_2.authenticateToken, business_1.default);
app.use('/api/stories', auth_2.authenticateToken, stories_1.default);
app.use('/api/notifications', auth_2.authenticateToken, notifications_1.default);
app.use('/api/media', auth_2.authenticateToken, media_1.default);
app.use('/api/settings', auth_2.authenticateToken, settings_1.default);
app.use('/api/contact', contact_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
(0, handlers_1.setupSocketHandlers)(io);
app.set('io', io);
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        await (0, redis_1.connectRedis)();
        server.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
            console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map