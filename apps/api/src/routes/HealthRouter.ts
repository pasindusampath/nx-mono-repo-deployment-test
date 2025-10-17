import { BaseRouter } from './BaseRouter';
import { HealthController } from '../controllers';
import Database from '../database';

/**
 * Class-based router for Health endpoints
 * Handles health check and readiness probe routes
 */
export class HealthRouter extends BaseRouter {
  private healthController!: HealthController;

  constructor() {
    // Call parent constructor first (this will call initializeRoutes)
    super();
  }

  /**
   * Get or create the health controller instance (lazy initialization)
   */
  private getHealthController(): HealthController {
    if (!this.healthController) {
      const database = Database.getInstance();
      this.healthController = new HealthController(database);
    }
    return this.healthController;
  }

  /**
   * Initialize all health routes
   * Called automatically by parent constructor
   */
  protected initializeRoutes(): void {
    const controller = this.getHealthController();

    // GET /health - Basic health check
    this.router.get(
      '/',
      controller.health.bind(controller)
    );

    // GET /health/ready - Readiness probe (checks database connection)
    this.router.get(
      '/ready',
      controller.ready.bind(controller)
    );
  }

  /**
   * Get the base path for this router
   * @returns The base path for health routes
   */
  public getBasePath(): string {
    return '/health';
  }

  /**
   * Get route information for this router
   * @returns Array of route information with full paths
   */
  public getRouteInfo(): Array<{ path: string; methods: string[] }> {
    const basePath = this.getBasePath();
    return [
      { path: basePath, methods: ['GET'] },
      { path: `${basePath}/ready`, methods: ['GET'] }
    ];
  }

  /**
   * Get the health controller instance
   * Useful for testing or accessing controller methods directly
   */
  public getController(): HealthController {
    return this.getHealthController();
  }
}
