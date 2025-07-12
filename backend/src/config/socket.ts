import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { logger } from '../utils/logger';

export const setupSocketIO = (server: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 Client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      logger.info(`🔌 Client disconnected: ${socket.id}`);
    });
  });

  logger.info('✅ Socket.IO server setup complete');
  return io;
}; 