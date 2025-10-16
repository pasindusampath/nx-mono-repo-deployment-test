import { Router, Request, Response } from 'express';

const router = Router();

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
}

interface ReadyResponse {
  status: string;
  timestamp: string;
}

router.get('/', (req: Request, res: Response) => {
  const response: HealthResponse = {
    status: 'healthy test 1',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
  res.json(response);
});

router.get('/ready', (req: Request, res: Response) => {
  const response: ReadyResponse = {
    status: 'ready',
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

export default router;
