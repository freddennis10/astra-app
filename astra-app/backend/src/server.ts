import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Redis from 'redis';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth';
import socialRoutes from './routes/social';
import walletRoutes from './routes/wallet';
import tradingRoutes from './routes/trading';
import gamingRoutes from './routes/gaming';
import businessRoutes from './routes/business';
import marketplaceRoutes from './routes/marketplace';
import notificationRoutes from './routes/notifications';
import mediaRoutes from './routes/media';
import chatRoutes from './routes/chat';

// Import socket handlers
import { initializeSocket } from './sockets/socketHandler';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

dotenv.config();

class AstraServer {
  private app: Application;
  private server: any;
  private io: Server;
  private redisClient: any;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '5000', 10);
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
      }
    });
    
    this.initializeMiddleware();
    this.initializeDatabase();
    this.initializeRedis();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeSocketHandlers();
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true
    }));
    
    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    this.app.use('/api/', limiter);
    
    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    
    // Compression
    this.app.use(compression());
    
    // Logging
    this.app.use(morgan('combined'));
    
    // Health check
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });
  }

  private async initializeDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/astra');
      logger.info('Connected to MongoDB');
    } catch (error) {
      logger.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  private async initializeRedis(): Promise<void> {
    try {
      this.redisClient = Redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });
      await this.redisClient.connect();
      logger.info('Connected to Redis');
    } catch (error) {
      logger.error('Redis connection error:', error);
    }
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/social', socialRoutes);
    this.app.use('/api/wallet', walletRoutes);
    this.app.use('/api/trading', tradingRoutes);
    this.app.use('/api/gaming', gamingRoutes);
    this.app.use('/api/business', businessRoutes);
    this.app.use('/api/marketplace', marketplaceRoutes);
    this.app.use('/api/notifications', notificationRoutes);
    this.app.use('/api/media', mediaRoutes);
    this.app.use('/api/chat', chatRoutes);
  }

  private initializeSwagger(): void {
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Astra API',
          version: '1.0.0',
          description: 'Comprehensive social media platform API'
        },
        servers: [
          {
            url: `http://localhost:${this.port}/api`,
            description: 'Development server'
          }
        ]
      },
      apis: ['./src/routes/*.ts']
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }

  private initializeSocketHandlers(): void {
    initializeSocket(this.io, this.redisClient);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(): void {
    this.server.listen(this.port, () => {
      logger.info(`🚀 Astra server running on port ${this.port}`);
      logger.info(`📚 API Documentation: http://localhost:${this.port}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${this.port}/health`);
    });
  }

  public getApp(): Application {
    return this.app;
  }

  public getIO(): Server {
    return this.io;
  }

  public getRedisClient(): any {
    return this.redisClient;
  }
}

// Initialize and start server
const astraServer = new AstraServer();
astraServer.start();

export default astraServer;
