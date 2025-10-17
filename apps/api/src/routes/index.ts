/**
 * Domain-based hierarchical barrel export for all routes
 * 
 * Structure:
 * - common/    - Base classes and utilities (BaseRouter)
 * - item/      - Item domain routes (ItemRouter)
 * - health/    - Health domain routes (HealthRouter)
 * 
 * Future domains can follow the same pattern:
 * - user/      - User domain routes
 * - order/     - Order domain routes
 */

// Export all routes from their respective domains
export * from './common';
export * from './item';
export * from './health';

// Export RouterManager
export { RouterManager } from './RouterManager';

// Re-export commonly used classes for convenience
export { BaseRouter } from './common/BaseRouter';
export { ItemRouter } from './item/ItemRouter';
export { HealthRouter } from './health/HealthRouter';

