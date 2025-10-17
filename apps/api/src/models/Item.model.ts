import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IItem } from '@nx-mono-repo-deployment-test/shared';


export const ITEM_TABLE_NAME = 'items';

export const ItemFields = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;


@Table({
  tableName: ITEM_TABLE_NAME,
  timestamps: true,
  underscored: false,
})
export default class ItemModel extends Model<IItem> implements IItem {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    field: ItemFields.ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    field: ItemFields.NAME,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: ItemFields.DESCRIPTION,
  })
  description?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: ItemFields.CREATED_AT,
  })
  createdAt!: Date;
    @Column({
    type: DataType.DATE,
    field: ItemFields.CREATED_AT,
  })
  updatedAt!: Date;
}
