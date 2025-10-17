/**
 * Domain-based hierarchical barrel export for all DTOs
 * 
 * Structure:
 * - common/    - Base classes and utilities (BaseDto, ValidationFailedError)
 * - params/    - URL parameter and query validation DTOs (IdParamDto)
 * - item/      - Item domain DTOs
 *   - request/ - Item request DTOs (CreateItemDto, UpdateItemDto)
 *   - response/- Item response DTOs (ItemResponseDto)
 * 
 * Future domains can follow the same pattern:
 * - user/
 *   - request/
 *   - response/
 * - order/
 *   - request/
 *   - response/
 */

// Export all DTOs from their respective categories
export * from './common';
export * from './params';
export * from './item';

// Re-export commonly used types for convenience
export { BaseDto, ValidationFailedError } from './common/base_dto';
export { IdParamDto } from './params';
export { CreateItemDto, UpdateItemDto, ItemResponseDto } from './item';

