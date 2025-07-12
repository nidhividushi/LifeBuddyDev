import Redis from 'redis';
import { logger } from '../utils/logger';

let redisClient: Redis.RedisClientType | null = null;

export const connectRedis = async (): Promise<void> => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    redisClient = Redis.createClient({ url: redisUrl });
    
    await redisClient.connect();
    logger.info('✅ Connected to Redis');
  } catch (error) {
    logger.error('❌ Failed to connect to Redis:', error);
    // Don't exit process, Redis is optional for development
  }
};

export const getRedisClient = (): Redis.RedisClientType | null => {
  return redisClient;
}; 