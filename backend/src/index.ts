import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import middleware and routes
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { requestLogger } from './middleware/requestLogger';
import { authMiddleware } from './middleware/auth';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import goalRoutes from './routes/goals';
import chatRoutes from './routes/chat';
import communityRoutes from './routes/community';
import journalRoutes from './routes/journal';
import analyticsRoutes from './routes/analytics';
import notificationRoutes from './routes/notifications';

// Import services
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';
import { setupSocketIO } from './config/socket';
import { logger } from './utils/logger';
import { setupCronJobs } from './services/cron';

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Environment variables
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3001',
    process.env.MOBILE_URL || 'http://localhost:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/goals', authMiddleware, goalRoutes);
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/community', authMiddleware, communityRoutes);
app.use('/api/journal', authMiddleware, journalRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);

// API documentation
app.get('/api', (req, res) => {
  res.json({
    message: 'LifeBuddy API v1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      goals: '/api/goals',
      chat: '/api/chat',
      community: '/api/community',
      journal: '/api/journal',
      analytics: '/api/analytics',
      notifications: '/api/notifications'
    }
  });
});

// Setup Socket.IO
setupSocketIO(server);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    // Skip database and Redis in development if not available
    if (NODE_ENV === 'development') {
      logger.info('🛠️  Development mode - skipping database connections');
    } else {
      // Connect to database (required in production)
      const dbConnected = await connectDatabase();
      if (dbConnected) {
        logger.info('✅ Database connected successfully');
      } else {
        throw new Error('Database connection failed');
      }

      // Connect to Redis (required in production)
      try {
        await connectRedis();
        logger.info('✅ Redis connected successfully');
      } catch (redisError) {
        throw redisError; // Re-throw in production
      }
    }

    // Setup cron jobs
    setupCronJobs();
    logger.info('✅ Cron jobs setup successfully');

    // Start server
    server.listen(PORT, () => {
      logger.info(`🚀 LifeBuddy API Server running on port ${PORT}`);
      logger.info(`📊 Environment: ${NODE_ENV}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
      logger.info(`📚 API docs: http://localhost:${PORT}/api`);
      
      if (NODE_ENV === 'development') {
        logger.info(`🛠️  Development mode enabled`);
        logger.info(`🔍 Debug logging enabled`);
      }
    });

  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app; 