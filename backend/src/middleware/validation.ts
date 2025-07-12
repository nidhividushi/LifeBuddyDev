import { Request, Response, NextFunction } from 'express';

export const validateGoal = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Implement actual validation logic
  // For now, just pass through
  next();
}; 