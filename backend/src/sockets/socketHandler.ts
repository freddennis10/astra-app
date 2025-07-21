import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

export const initializeSocket = (io: Server, redisClient: any) => {
  // Authentication middleware
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.id;
      socket.username = decoded.username;
      
      logger.info(`User ${decoded.username} connected`);
      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`Socket connected: ${socket.id} - User: ${socket.username}`);
    
    // Join user to their personal room
    socket.join(`user:${socket.userId}`);
    
    // Handle joining rooms
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
      logger.info(`User ${socket.username} joined room ${roomId}`);
    });

    // Handle leaving rooms
    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      logger.info(`User ${socket.username} left room ${roomId}`);
    });

    // Handle chat messages
    socket.on('send-message', async (data: {
      recipientId: string;
      message: string;
      messageType: 'text' | 'image' | 'video' | 'file';
      metadata?: any;
    }) => {
      try {
        // Store message in database
        const messageData = {
          senderId: socket.userId,
          recipientId: data.recipientId,
          message: data.message,
          messageType: data.messageType,
          metadata: data.metadata,
          timestamp: new Date(),
          read: false
        };

        // Send to recipient
        io.to(`user:${data.recipientId}`).emit('new-message', messageData);
        
        // Send back to sender for confirmation
        socket.emit('message-sent', messageData);
        
        logger.info(`Message sent from ${socket.username} to ${data.recipientId}`);
      } catch (error) {
        logger.error('Error sending message:', error);
        socket.emit('error', 'Failed to send message');
      }
    });

    // Handle typing indicators
    socket.on('typing-start', (recipientId: string) => {
      io.to(`user:${recipientId}`).emit('user-typing', {
        userId: socket.userId,
        username: socket.username
      });
    });

    socket.on('typing-stop', (recipientId: string) => {
      io.to(`user:${recipientId}`).emit('user-stopped-typing', {
        userId: socket.userId,
        username: socket.username
      });
    });

    // Handle post interactions
    socket.on('post-like', (data: { postId: string; userId: string }) => {
      // Broadcast to all users following this post
      socket.broadcast.emit('post-liked', {
        postId: data.postId,
        userId: data.userId,
        username: socket.username
      });
    });

    socket.on('post-comment', (data: { postId: string; comment: string }) => {
      // Broadcast to all users following this post
      socket.broadcast.emit('post-commented', {
        postId: data.postId,
        comment: data.comment,
        userId: socket.userId,
        username: socket.username
      });
    });

    // Handle live streaming
    socket.on('start-live-stream', (data: { streamId: string; title: string }) => {
      socket.join(`stream:${data.streamId}`);
      io.emit('live-stream-started', {
        streamId: data.streamId,
        title: data.title,
        streamer: socket.username,
        streamerId: socket.userId
      });
    });

    socket.on('join-live-stream', (streamId: string) => {
      socket.join(`stream:${streamId}`);
      socket.to(`stream:${streamId}`).emit('viewer-joined', {
        userId: socket.userId,
        username: socket.username
      });
    });

    socket.on('leave-live-stream', (streamId: string) => {
      socket.leave(`stream:${streamId}`);
      socket.to(`stream:${streamId}`).emit('viewer-left', {
        userId: socket.userId,
        username: socket.username
      });
    });

    // Handle gaming events
    socket.on('game-invite', (data: { gameId: string; inviteeId: string }) => {
      io.to(`user:${data.inviteeId}`).emit('game-invitation', {
        gameId: data.gameId,
        inviter: socket.username,
        inviterId: socket.userId
      });
    });

    socket.on('game-move', (data: { gameId: string; move: any }) => {
      socket.to(`game:${data.gameId}`).emit('game-move-made', {
        gameId: data.gameId,
        move: data.move,
        player: socket.username,
        playerId: socket.userId
      });
    });

    // Handle business features
    socket.on('business-notification', (data: { type: string; message: string; targetUsers: string[] }) => {
      data.targetUsers.forEach(userId => {
        io.to(`user:${userId}`).emit('business-alert', {
          type: data.type,
          message: data.message,
          from: socket.username,
          timestamp: new Date()
        });
      });
    });

    // Handle wallet transactions
    socket.on('transaction-update', (data: { userId: string; amount: number; type: string }) => {
      io.to(`user:${data.userId}`).emit('wallet-updated', {
        amount: data.amount,
        type: data.type,
        timestamp: new Date()
      });
    });

    // Handle notifications
    socket.on('send-notification', (data: { userId: string; title: string; message: string; type: string }) => {
      io.to(`user:${data.userId}`).emit('notification', {
        title: data.title,
        message: data.message,
        type: data.type,
        from: socket.username,
        timestamp: new Date()
      });
    });

    // Handle marketplace events
    socket.on('product-update', (data: { productId: string; update: any }) => {
      io.emit('marketplace-update', {
        productId: data.productId,
        update: data.update,
        updatedBy: socket.username,
        timestamp: new Date()
      });
    });

    // Handle user presence
    socket.on('user-status-update', (status: 'online' | 'away' | 'busy' | 'offline') => {
      // Update user status in Redis
      redisClient.set(`user:${socket.userId}:status`, status);
      
      // Broadcast to friends
      socket.broadcast.emit('user-status-changed', {
        userId: socket.userId,
        username: socket.username,
        status: status
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User ${socket.username} disconnected`);
      
      // Update user status to offline
      redisClient.set(`user:${socket.userId}:status`, 'offline');
      
      // Broadcast offline status
      socket.broadcast.emit('user-status-changed', {
        userId: socket.userId,
        username: socket.username,
        status: 'offline'
      });
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error(`Socket error for user ${socket.username}:`, error);
    });
  });

  // Handle connection errors
  io.on('connect_error', (error) => {
    logger.error('Socket.IO connection error:', error);
  });

  logger.info('Socket.IO server initialized successfully');
};
