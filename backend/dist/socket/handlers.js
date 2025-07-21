"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketHandlers = void 0;
const setupSocketHandlers = (io) => {
    io.on('connection', (socket) => {
        console.log('👤 User connected:', socket.id);
        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });
        socket.on('send-message', (data) => {
            socket.to(data.roomId).emit('receive-message', {
                ...data,
                timestamp: new Date(),
                aiModeration: { safe: true, sentiment: 'positive' }
            });
        });
        socket.on('disconnect', () => {
            console.log('👤 User disconnected:', socket.id);
        });
    });
};
exports.setupSocketHandlers = setupSocketHandlers;
//# sourceMappingURL=handlers.js.map