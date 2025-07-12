import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware to handle 404 Not Found errors
 * This should be placed after all other routes
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.name = 'NotFoundError';
  
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
      path: req.originalUrl,
      method: req.method
    }
  });
}; 