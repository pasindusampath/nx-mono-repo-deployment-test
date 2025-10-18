/**
 * Barrel export for all middleware
 */
export { 
  validateBody, 
  validateParams, 
  validateQuery,
  ValidationMiddleware,
  ValidatedRequest 
} from './validation';
export { normalizeResponse } from './responseHandler';
export { errorHandler, AppError } from './errorHandler';

