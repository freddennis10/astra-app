"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToChannel = exports.publishToChannel = exports.incrementRateLimit = exports.deleteSession = exports.getSession = exports.setSession = exports.setCacheWithTTL = exports.deleteCache = exports.getCache = exports.setCache = exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    password: process.env.REDIS_PASSWORD || undefined,
});
const connectRedis = async () => {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('🔧 Redis connection skipped in development mode');
            return;
        }
        await exports.redisClient.connect();
        console.log('✅ Connected to Redis');
    }
    catch (error) {
        console.error('❌ Redis connection failed:', error);
        if (process.env.NODE_ENV === 'production') {
            throw error;
        }
        console.log('⚠️ Continuing without Redis in development mode');
    }
};
exports.connectRedis = connectRedis;
const setCache = async (key, value, expiration) => {
    try {
        const stringValue = JSON.stringify(value);
        if (expiration) {
            await exports.redisClient.setEx(key, expiration, stringValue);
        }
        else {
            await exports.redisClient.set(key, stringValue);
        }
    }
    catch (error) {
        console.error('Error setting cache:', error);
    }
};
exports.setCache = setCache;
const getCache = async (key) => {
    try {
        const value = await exports.redisClient.get(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        console.error('Error getting cache:', error);
        return null;
    }
};
exports.getCache = getCache;
const deleteCache = async (key) => {
    try {
        await exports.redisClient.del(key);
    }
    catch (error) {
        console.error('Error deleting cache:', error);
    }
};
exports.deleteCache = deleteCache;
const setCacheWithTTL = async (key, value, ttl) => {
    try {
        await exports.redisClient.setEx(key, ttl, JSON.stringify(value));
    }
    catch (error) {
        console.error('Error setting cache with TTL:', error);
    }
};
exports.setCacheWithTTL = setCacheWithTTL;
const setSession = async (sessionId, userId, data) => {
    try {
        const sessionData = {
            userId,
            ...data,
            createdAt: new Date().toISOString()
        };
        await exports.redisClient.setEx(`session:${sessionId}`, 3600, JSON.stringify(sessionData));
    }
    catch (error) {
        console.error('Error setting session:', error);
    }
};
exports.setSession = setSession;
const getSession = async (sessionId) => {
    try {
        const session = await exports.redisClient.get(`session:${sessionId}`);
        return session ? JSON.parse(session) : null;
    }
    catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
};
exports.getSession = getSession;
const deleteSession = async (sessionId) => {
    try {
        await exports.redisClient.del(`session:${sessionId}`);
    }
    catch (error) {
        console.error('Error deleting session:', error);
    }
};
exports.deleteSession = deleteSession;
const incrementRateLimit = async (identifier, windowMs) => {
    try {
        const key = `rate_limit:${identifier}`;
        const current = await exports.redisClient.incr(key);
        if (current === 1) {
            await exports.redisClient.expire(key, Math.ceil(windowMs / 1000));
        }
        return current;
    }
    catch (error) {
        console.error('Error incrementing rate limit:', error);
        return 0;
    }
};
exports.incrementRateLimit = incrementRateLimit;
const publishToChannel = async (channel, message) => {
    try {
        await exports.redisClient.publish(channel, JSON.stringify(message));
    }
    catch (error) {
        console.error('Error publishing to channel:', error);
    }
};
exports.publishToChannel = publishToChannel;
const subscribeToChannel = async (channel, callback) => {
    try {
        const subscriber = exports.redisClient.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel, (message) => {
            try {
                const parsedMessage = JSON.parse(message);
                callback(parsedMessage);
            }
            catch (error) {
                console.error('Error parsing subscribed message:', error);
            }
        });
    }
    catch (error) {
        console.error('Error subscribing to channel:', error);
    }
};
exports.subscribeToChannel = subscribeToChannel;
exports.redisClient.on('error', (error) => {
    console.error('Redis error:', error);
});
exports.redisClient.on('connect', () => {
    console.log('✅ Redis connected');
});
exports.redisClient.on('reconnecting', () => {
    console.log('🔄 Redis reconnecting...');
});
exports.redisClient.on('ready', () => {
    console.log('✅ Redis ready');
});
process.on('SIGINT', async () => {
    try {
        await exports.redisClient.disconnect();
        console.log('✅ Redis connection closed');
    }
    catch (error) {
        console.error('❌ Error closing Redis connection:', error);
    }
});
exports.default = exports.redisClient;
//# sourceMappingURL=redis.js.map