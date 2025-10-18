import { Request, Response } from 'express';
import { ItemService } from '../services';
import { CreateItemDto, UpdateItemDto, IdParamDto } from '@nx-mono-repo-deployment-test/shared';

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
   * Note: ID validation is handled by middleware
   */
  public async getItemById(req: Request, res: Response): Promise<void> {
    try {
      // ID is already validated and converted by middleware
      const { id } = req.params as unknown as IdParamDto;
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
   * Note: Body validation is handled by middleware
   */
  public async createItem(req: Request, res: Response): Promise<void> {
    try {
      // Body is already validated and transformed to CreateItemDto by middleware
      const createItemDto = req.body as CreateItemDto;
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
   * Note: ID and body validation is handled by middleware
   */
  public async updateItem(req: Request, res: Response): Promise<void> {
    try {
      // ID and body are already validated by middleware
      const { id } = req.params as unknown as IdParamDto;
      const updateItemDto = req.body as UpdateItemDto;
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
   * Note: ID validation is handled by middleware
   */
  public async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      // ID is already validated and converted by middleware
      const { id } = req.params as unknown as IdParamDto;
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
