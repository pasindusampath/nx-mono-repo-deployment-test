import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { BaseDto } from '../../common/BaseDto';
import { IBodyDto } from '../../../interfaces';

/**
 * DTO for creating a new item
 */
export class CreateItemDto extends BaseDto implements IBodyDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Length(1, 255, { message: 'Name must be between 1 and 255 characters' })
  name!: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  @Length(0, 1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;

  constructor(data?: { name?: string; description?: string }) {
    super();
    if (data) {
      this.name = data.name || '';
      this.description = data.description;
    }
  }
}

