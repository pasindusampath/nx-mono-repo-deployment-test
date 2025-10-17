import { Router } from 'express';

/**
 * Abstract base class for all route classes
 * Provides common functionality and enforces route initialization pattern
 */
export abstract class BaseRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  /**
   * Abstract method that must be implemented by all route classes
   * This method should define all routes for the specific resource
   */
  protected abstract initializeRoutes(): void;

  /**
   * Abstract method that must be implemented by all route classes
   * This method should return the base path for this router
   * @returns The base path for this router (e.g., '/api/items', '/health')
   */
  public abstract getBasePath(): string;

  /**
   * Get the configured router instance
   * @returns Express Router instance
   */
  public getRouter(): Router {
    return this.router;
  }

  /**
   * Get route information for this router
   * @returns Array of route information with full paths
   */
  public abstract getRouteInfo(): Array<{ path: string; methods: string[] }>;

  /**
   * Helper method to bind controller methods to preserve 'this' context
   * @param controllerMethod - The controller method to bind
   * @returns Bound method that preserves 'this' context
   */
  protected bindMethod<T extends (...args: any[]) => any>(controllerMethod: T): T {
    return controllerMethod.bind(controllerMethod) as T;
  }
}
