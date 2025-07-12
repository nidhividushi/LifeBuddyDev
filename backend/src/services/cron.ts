import cron from 'node-cron';
import { logger } from '../utils/logger';

export const setupCronJobs = (): void => {
  // Example: Run every day at 2 AM
  cron.schedule('0 2 * * *', () => {
    logger.info('🕐 Running daily maintenance task');
    // Add your daily tasks here
  });

  // Example: Run every hour
  cron.schedule('0 * * * *', () => {
    logger.info('🕐 Running hourly task');
    // Add your hourly tasks here
  });

  logger.info('✅ Cron jobs setup complete');
}; 