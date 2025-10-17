/**
 * DTO for creating a new item
 */
export class CreateItemDto {
  name: string;
  description?: string;

  constructor(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }
}

