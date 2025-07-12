import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware to log incoming requests
 * Logs request method, URL, IP, user agent, and response time
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Log request details
  logger.info(`Incoming ${req.method} request to ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Override res.end to log response details
  const originalEnd = res.end;
  (res as any).end = function(chunk?: any, encoding?: any) {
    const duration = Date.now() - start;
    
    logger.info(`Response ${res.statusCode} for ${req.method} ${req.originalUrl}`, {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });

    originalEnd.call(this, chunk, encoding);
  };

  next();
}; 