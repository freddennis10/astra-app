import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Redis client configuration
export const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

// Redis connection function
export const connectRedis = async (): Promise<void> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Redis connection skipped in development mode');
      return;
    }
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
    console.log('⚠️ Continuing without Redis in development mode');
  }
};

// Redis utility functions
export const setCache = async (key: string, value: any, expiration?: number): Promise<void> => {
  try {
    const stringValue = JSON.stringify(value);
    if (expiration) {
      await redisClient.setEx(key, expiration, stringValue);
    } else {
      await redisClient.set(key, stringValue);
    }
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const getCache = async (key: string): Promise<any> => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Error deleting cache:', error);
  }
};

export const setCacheWithTTL = async (key: string, value: any, ttl: number): Promise<void> => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting cache with TTL:', error);
  }
};

// Session management
export const setSession = async (sessionId: string, userId: string, data: any): Promise<void> => {
  try {
    const sessionData = {
      userId,
      ...data,
      createdAt: new Date().toISOString()
    };
    await redisClient.setEx(`session:${sessionId}`, 3600, JSON.stringify(sessionData)); // 1 hour
  } catch (error) {
    console.error('Error setting session:', error);
  }
};

export const getSession = async (sessionId: string): Promise<any> => {
  try {
    const session = await redisClient.get(`session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    await redisClient.del(`session:${sessionId}`);
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

// Rate limiting
export const incrementRateLimit = async (identifier: string, windowMs: number): Promise<number> => {
  try {
    const key = `rate_limit:${identifier}`;
    const current = await redisClient.incr(key);
    
    if (current === 1) {
      await redisClient.expire(key, Math.ceil(windowMs / 1000));
    }
    
    return current;
  } catch (error) {
    console.error('Error incrementing rate limit:', error);
    return 0;
  }
};

// Real-time features
export const publishToChannel = async (channel: string, message: any): Promise<void> => {
  try {
    await redisClient.publish(channel, JSON.stringify(message));
  } catch (error) {
    console.error('Error publishing to channel:', error);
  }
};

export const subscribeToChannel = async (channel: string, callback: (message: any) => void): Promise<void> => {
  try {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
    
    await subscriber.subscribe(channel, (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        callback(parsedMessage);
      } catch (error) {
        console.error('Error parsing subscribed message:', error);
      }
    });
  } catch (error) {
    console.error('Error subscribing to channel:', error);
  }
};

// Error handling
redisClient.on('error', (error) => {
  console.error('Redis error:', error);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

redisClient.on('reconnecting', () => {
  console.log('🔄 Redis reconnecting...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis ready');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await redisClient.disconnect();
    console.log('✅ Redis connection closed');
  } catch (error) {
    console.error('❌ Error closing Redis connection:', error);
  }
});

export default redisClient;
