import { Request, Response } from 'express';
import { ItemService } from '../services';
import { CreateItemDto, UpdateItemDto } from '@nx-mono-repo-deployment-test/shared';

/**
 * Controller for Item endpoints
 * Handles HTTP requests and responses
 */
class ItemController {
  private itemService: ItemService;

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  /**
   * GET /api/items
   * Get all items
   */
  public async getItems(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.itemService.getAllItems();

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error('Error in ItemController.getItems:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * GET /api/items/:id
   * Get item by ID
   */
  public async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid item ID',
        });
        return;
      }

      const result = await this.itemService.getItemById(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in ItemController.getItemById:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * POST /api/items
   * Create a new item
   */
  public async createItem(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      const createItemDto = new CreateItemDto(name, description);
      const result = await this.itemService.createItem(createItemDto);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error in ItemController.createItem:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * PUT /api/items/:id
   * Update an item
   */
  public async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid item ID',
        });
        return;
      }

      const { name, description } = req.body;

      const updateItemDto = new UpdateItemDto({ name, description });
      const result = await this.itemService.updateItem(id, updateItemDto);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in ItemController.updateItem:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  /**
   * DELETE /api/items/:id
   * Delete an item
   */
  public async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid item ID',
        });
        return;
      }

      const result = await this.itemService.deleteItem(id);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in ItemController.deleteItem:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }
}

export default ItemController;
