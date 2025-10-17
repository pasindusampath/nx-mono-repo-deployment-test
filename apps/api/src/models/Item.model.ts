import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IItem } from '@nx-mono-repo-deployment-test/shared';

/**
 * Table name constant
 */
export const ITEM_TABLE_NAME = 'items';

/**
 * Field name constants
 */
export const ItemFields = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;

/**
 * Item Model with decorator-based configuration
 * Clean, simple, and beginner-friendly!
 */
@Table({
  tableName: ITEM_TABLE_NAME,
  timestamps: true,
  underscored: false,
})
export default class ItemModel extends Model<IItem> implements IItem {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}

