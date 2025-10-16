// Shared utilities and constants

export const API_VERSION = '1.0.0';

export interface Item {
  id?: number;
  name: string;
  description?: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateItem = (item: unknown): ValidationResult => {
  if (!item || typeof item !== 'object') {
    return { valid: false, error: 'Item must be an object' };
  }
  
  const itemObj = item as Partial<Item>;
  
  if (!itemObj.name || typeof itemObj.name !== 'string' || itemObj.name.trim() === '') {
    return { valid: false, error: 'Item name is required and must be a non-empty string' };
  }
  
  return { valid: true };
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));
