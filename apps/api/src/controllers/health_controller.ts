import { Request, Response } from 'express';
import Database from '../database';
import { IHealthResponse, IReadyResponse } from '@nx-mono-repo-deployment-test/shared';

/**
 * Controller for Health Check endpoints
 */
class HealthController {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  /**
   * GET /health
   * Health check endpoint with database status
   */
  public async health(req: Request, res: Response): Promise<void> {
    try {
      const isDbConnected = await this.database.testConnection();

      const response: IHealthResponse = {
        status: isDbConnected ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: {
          connected: isDbConnected,
          type: 'PostgreSQL',
        },
      };

      const statusCode = isDbConnected ? 200 : 503;
      res.status(statusCode).json(response);
    } catch (error) {
      console.error('Error in HealthController.health:', error);
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: {
          connected: false,
        },
      });
    }
  }

  /**
   * GET /health/ready
   * Readiness check endpoint
   */
  public async ready(req: Request, res: Response): Promise<void> {
    try {
      const isDbConnected = await this.database.testConnection();

      if (!isDbConnected) {
        res.status(503).json({
          status: 'not ready',
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const response: IReadyResponse = {
        status: 'ready',
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error in HealthController.ready:', error);
      res.status(503).json({
        status: 'not ready',
        timestamp: new Date().toISOString(),
      });
    }
  }
}

export default HealthController;

