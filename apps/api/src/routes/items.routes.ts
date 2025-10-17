import { Router } from 'express';
import { ItemController } from '../controllers';
import { ItemService } from '../services';

const router = Router();

// Initialize controller with service dependency
const itemService = ItemService.getInstance();
const itemController = new ItemController(itemService);

// Bind methods to preserve 'this' context
router.get('/', itemController.getItems.bind(itemController));
router.get('/:id', itemController.getItemById.bind(itemController));
router.post('/', itemController.createItem.bind(itemController));
router.put('/:id', itemController.updateItem.bind(itemController));
router.delete('/:id', itemController.deleteItem.bind(itemController));

export default router;

