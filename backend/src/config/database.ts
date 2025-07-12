import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<boolean> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lifebuddy';
    await mongoose.connect(mongoUri);
    logger.info('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // In development, just return false without logging errors
      return false;
    } else {
      logger.error('❌ Failed to connect to MongoDB:', error);
      process.exit(1);
      return false;
    }
  }
}; 