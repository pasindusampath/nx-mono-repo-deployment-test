import { Router, Request, Response } from 'express';
import { healthRoutes, itemsRoutes } from './';

const router = Router();

/**
 * Central router aggregator
 * Combines all route modules
 */

// Health check routes
router.use('/health', healthRoutes);

// API routes
router.use('/api/items', itemsRoutes);

// Root API endpoint
router.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: [
      'GET /api/items',
      'GET /api/items/:id',
      'POST /api/items',
      'PUT /api/items/:id',
      'DELETE /api/items/:id',
      'GET /health',
      'GET /health/ready',
    ],
  });
});

export default router;

