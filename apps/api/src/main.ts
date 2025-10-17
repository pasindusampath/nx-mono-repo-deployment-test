import 'reflect-metadata'; // Required for decorators - must be first!
import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import Database from './database';
import { routes } from './routes';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
const database = Database.getInstance();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Routes
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

/**
 * Initialize database and start server
 */
const startServer = async () => {
  try {
    // Connect to database
    await database.connect();

    // Sync database models
    // Set alter to true for development, false for production
    const shouldAlter = process.env.NODE_ENV === 'development';
    await database.sync(false, shouldAlter);

    // Start server
    app.listen(port, () => {
      console.log(`🚀 API Server is running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

/**
 * Graceful shutdown
 */
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  try {
    await database.disconnect();
    console.log('✓ Server shut down successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
startServer();

export default app;
