import { Router, Request, Response } from 'express';
import { getItems, createItem } from '../controllers/itemController';

const router = Router();

router.get('/items', getItems);
router.post('/items', createItem);

router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: [
      'GET /api/items',
      'POST /api/items',
      'GET /health',
      'GET /health/ready'
    ]
  });
});

export default router;
