import { Router } from 'express';
import { HealthController } from '../controllers';
import Database from '../database';

const router = Router();

// Initialize controller with database dependency
const database = Database.getInstance();
const healthController = new HealthController(database);

// Bind methods to preserve 'this' context
router.get('/', healthController.health.bind(healthController));
router.get('/ready', healthController.ready.bind(healthController));

export default router;

