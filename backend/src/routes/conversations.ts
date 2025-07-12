import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Conversations service is running' });
});

// Placeholder routes - implement actual conversations logic later
router.get('/', (req, res) => {
  res.json({ message: 'Get conversations endpoint - implement later' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create conversation endpoint - implement later' });
});

export default router; 