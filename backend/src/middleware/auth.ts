import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Implement actual JWT verification
  // For now, just pass through
  next();
}; 