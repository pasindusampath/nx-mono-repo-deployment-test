import { Request, Response } from 'express';

export interface Item {
  id: number;
  name: string;
  description: string;
}

// Sample in-memory data store
let items: Item[] = [
  { id: 1, name: 'Sample Item 1', description: 'This is a sample item' },
  { id: 2, name: 'Sample Item 2', description: 'Another sample item' }
];

export const getItems = (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: items,
    count: items.length
  });
};

export const createItem = (req: Request, res: Response): void => {
  const { name, description } = req.body;
  
  if (!name) {
    res.status(400).json({
      success: false,
      error: 'Name is required'
    });
    return;
  }

  const newItem: Item = {
    id: items.length + 1,
    name,
    description: description || ''
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem
  });
};
