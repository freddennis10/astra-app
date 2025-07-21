"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const initializeSocket = (io, redisClient) => {
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Authentication error'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            socket.username = decoded.username;
            logger_1.logger.info(`User ${decoded.username} connected`);
            next();
        }
        catch (error) {
            logger_1.logger.error('Socket authentication error:', error);
            next(new Error('Authentication error'));
        }
    });
    io.on('connection', (socket) => {
        logger_1.logger.info(`Socket connected: ${socket.id} - User: ${socket.username}`);
        socket.join(`user:${socket.userId}`);
        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            logger_1.logger.info(`User ${socket.username} joined room ${roomId}`);
        });
        socket.on('leave-room', (roomId) => {
            socket.leave(roomId);
            logger_1.logger.info(`User ${socket.username} left room ${roomId}`);
        });
        socket.on('send-message', async (data) => {
            try {
                const messageData = {
                    senderId: socket.userId,
                    recipientId: data.recipientId,
                    message: data.message,
                    messageType: data.messageType,
                    metadata: data.metadata,
                    timestamp: new Date(),
                    read: false
                };
                io.to(`user:${data.recipientId}`).emit('new-message', messageData);
                socket.emit('message-sent', messageData);
                logger_1.logger.info(`Message sent from ${socket.username} to ${data.recipientId}`);
            }
            catch (error) {
                logger_1.logger.error('Error sending message:', error);
                socket.emit('error', 'Failed to send message');
            }
        });
        socket.on('typing-start', (recipientId) => {
            io.to(`user:${recipientId}`).emit('user-typing', {
                userId: socket.userId,
                username: socket.username
            });
        });
        socket.on('typing-stop', (recipientId) => {
            io.to(`user:${recipientId}`).emit('user-stopped-typing', {
                userId: socket.userId,
                username: socket.username
            });
        });
        socket.on('post-like', (data) => {
            socket.broadcast.emit('post-liked', {
                postId: data.postId,
                userId: data.userId,
                username: socket.username
            });
        });
        socket.on('post-comment', (data) => {
            socket.broadcast.emit('post-commented', {
                postId: data.postId,
                comment: data.comment,
                userId: socket.userId,
                username: socket.username
            });
        });
        socket.on('start-live-stream', (data) => {
            socket.join(`stream:${data.streamId}`);
            io.emit('live-stream-started', {
                streamId: data.streamId,
                title: data.title,
                streamer: socket.username,
                streamerId: socket.userId
            });
        });
        socket.on('join-live-stream', (streamId) => {
            socket.join(`stream:${streamId}`);
            socket.to(`stream:${streamId}`).emit('viewer-joined', {
                userId: socket.userId,
                username: socket.username
            });
        });
        socket.on('leave-live-stream', (streamId) => {
            socket.leave(`stream:${streamId}`);
            socket.to(`stream:${streamId}`).emit('viewer-left', {
                userId: socket.userId,
                username: socket.username
            });
        });
        socket.on('game-invite', (data) => {
            io.to(`user:${data.inviteeId}`).emit('game-invitation', {
                gameId: data.gameId,
                inviter: socket.username,
                inviterId: socket.userId
            });
        });
        socket.on('game-move', (data) => {
            socket.to(`game:${data.gameId}`).emit('game-move-made', {
                gameId: data.gameId,
                move: data.move,
                player: socket.username,
                playerId: socket.userId
            });
        });
        socket.on('business-notification', (data) => {
            data.targetUsers.forEach(userId => {
                io.to(`user:${userId}`).emit('business-alert', {
                    type: data.type,
                    message: data.message,
                    from: socket.username,
                    timestamp: new Date()
                });
            });
        });
        socket.on('transaction-update', (data) => {
            io.to(`user:${data.userId}`).emit('wallet-updated', {
                amount: data.amount,
                type: data.type,
                timestamp: new Date()
            });
        });
        socket.on('send-notification', (data) => {
            io.to(`user:${data.userId}`).emit('notification', {
                title: data.title,
                message: data.message,
                type: data.type,
                from: socket.username,
                timestamp: new Date()
            });
        });
        socket.on('product-update', (data) => {
            io.emit('marketplace-update', {
                productId: data.productId,
                update: data.update,
                updatedBy: socket.username,
                timestamp: new Date()
            });
        });
        socket.on('user-status-update', (status) => {
            redisClient.set(`user:${socket.userId}:status`, status);
            socket.broadcast.emit('user-status-changed', {
                userId: socket.userId,
                username: socket.username,
                status: status
            });
        });
        socket.on('disconnect', () => {
            logger_1.logger.info(`User ${socket.username} disconnected`);
            redisClient.set(`user:${socket.userId}:status`, 'offline');
            socket.broadcast.emit('user-status-changed', {
                userId: socket.userId,
                username: socket.username,
                status: 'offline'
            });
        });
        socket.on('error', (error) => {
            logger_1.logger.error(`Socket error for user ${socket.username}:`, error);
        });
    });
    io.on('connect_error', (error) => {
        logger_1.logger.error('Socket.IO connection error:', error);
    });
    logger_1.logger.info('Socket.IO server initialized successfully');
};
exports.initializeSocket = initializeSocket;
//# sourceMappingURL=socketHandler.js.map