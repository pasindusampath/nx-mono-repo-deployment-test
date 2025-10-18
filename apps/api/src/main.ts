import 'reflect-metadata'; // Required for decorators - MUST BE FIRST!
import dotenv from 'dotenv';
import Server from './server';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const port = parseInt(process.env.PORT || '3000', 10);

// Get server instance
const server = Server.getInstance();

/**
 * Graceful shutdown handler
 */
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    await server.stop();
    console.log('✓ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

/**
 * Force cleanup on process exit
 */
const forceCleanup = () => {
  console.log('\n⚠️  Force cleanup on process exit');
  // Don't await here as process is already exiting
  server.stop().catch(() => {
    // Ignore errors during force cleanup
  });
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle ts-node-dev restart signal
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2 (restart)'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

// Force cleanup on process exit (last resort)
process.on('exit', forceCleanup);
process.on('beforeExit', forceCleanup);

// Start the server
server.start(port).catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

// Export for testing
export default server;
