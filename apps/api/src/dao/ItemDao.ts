import ItemModel, { ItemFields } from '../models/Item.model';
import { IItem, CreateItemDto, UpdateItemDto } from '@nx-mono-repo-deployment-test/shared';

/**
 * Data Access Object for Item entity
 * Handles all database operations for items
 */
class ItemDao {
  private static instance: ItemDao;

  private constructor() {}

  /**
   * Get ItemDao singleton instance
   */
  public static getInstance(): ItemDao {
    if (!ItemDao.instance) {
      ItemDao.instance = new ItemDao();
    }
    return ItemDao.instance;
  }

  /**
   * Find all items
   */
  public async findAll(): Promise<IItem[]> {
    try {
      const items = await ItemModel.findAll({
        order: [[ItemFields.CREATED_AT, 'DESC']],
      });
      return items.map(item => item.toJSON() as IItem);
    } catch (error) {
      console.error('Error in ItemDao.findAll:', error);
      throw error;
    }
  }

  /**
   * Find item by ID
   */
  public async findById(id: number): Promise<IItem | null> {
    try {
      const item = await ItemModel.findByPk(id);
      return item ? (item.toJSON() as IItem) : null;
    } catch (error) {
      console.error(`Error in ItemDao.findById (${id}):`, error);
      throw error;
    }
  }

  /**
   * Create a new item
   */
  public async create(createItemDto: CreateItemDto): Promise<IItem> {
    try {
      const item = await ItemModel.create({
        [ItemFields.NAME]: createItemDto.name,
        [ItemFields.DESCRIPTION]: createItemDto.description,
      });
      return item.toJSON() as IItem;
    } catch (error) {
      console.error('Error in ItemDao.create:', error);
      throw error;
    }
  }

  /**
   * Update an item
   */
  public async update(id: number, updateItemDto: UpdateItemDto): Promise<IItem | null> {
    try {
      const item = await ItemModel.findByPk(id);
      if (!item) {
        return null;
      }

      // Update only provided fields
      if (updateItemDto.name !== undefined) {
        item[ItemFields.NAME] = updateItemDto.name;
      }
      if (updateItemDto.description !== undefined) {
        item[ItemFields.DESCRIPTION] = updateItemDto.description;
      }

      await item.save();
      return item.toJSON() as IItem;
    } catch (error) {
      console.error(`Error in ItemDao.update (${id}):`, error);
      throw error;
    }
  }

  /**
   * Delete an item
   */
  public async delete(id: number): Promise<boolean> {
    try {
      const item = await ItemModel.findByPk(id);
      if (!item) {
        return false;
      }

      await item.destroy();
      return true;
    } catch (error) {
      console.error(`Error in ItemDao.delete (${id}):`, error);
      throw error;
    }
  }

  /**
   * Count all items
   */
  public async count(): Promise<number> {
    try {
      return await ItemModel.count();
    } catch (error) {
      console.error('Error in ItemDao.count:', error);
      throw error;
    }
  }
}

export default ItemDao;

