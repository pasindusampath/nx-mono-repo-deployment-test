import { BaseRouter } from './BaseRouter';
import { Request, Response } from 'express';

/**
 * Example router demonstrating the class-based pattern
 * This shows how to create a new router following the established pattern
 */
export class ExampleRouter extends BaseRouter {
  constructor() {
    // Initialize any dependencies here
    // const service = SomeService.getInstance();
    // const controller = new SomeController(service);
    
    // Call parent constructor which will call initializeRoutes()
    super();
  }

  /**
   * Initialize all routes for this resource
   * Called automatically by parent constructor
   */
  protected initializeRoutes(): void {
    // Example routes - replace with actual implementation
    
    // GET /example
    this.router.get('/', this.handleGetExample.bind(this));
    
    // POST /example
    this.router.post('/', this.handlePostExample.bind(this));
    
    // GET /example/:id
    this.router.get('/:id', this.handleGetExampleById.bind(this));
  }

  /**
   * Example route handlers
   * In a real implementation, these would be in a controller class
   */
  private async handleGetExample(req: Request, res: Response): Promise<void> {
    res.json({
      success: true,
      message: 'Example GET endpoint',
      data: []
    });
  }

  private async handlePostExample(req: Request, res: Response): Promise<void> {
    res.status(201).json({
      success: true,
      message: 'Example POST endpoint',
      data: { id: 1, ...req.body }
    });
  }

  private async handleGetExampleById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    res.json({
      success: true,
      message: `Example GET by ID endpoint`,
      data: { id, name: `Example ${id}` }
    });
  }

  /**
   * Get the base path for this router
   * @returns The base path for example routes
   */
  public getBasePath(): string {
    return '/api/example';
  }

  /**
   * Get route information for this router
   * @returns Array of route information with full paths
   */
  public getRouteInfo(): Array<{ path: string; methods: string[] }> {
    const basePath = this.getBasePath();
    return [
      { path: basePath, methods: ['GET', 'POST'] },
      { path: `${basePath}/:id`, methods: ['GET'] }
    ];
  }
}

// To use this router:
// 1. Add it to RouterManager.initializeRouters():
//    this.exampleRouter = new ExampleRouter();
//
// 2. Add it to RouterManager.configureRoutes():
//    this.mainRouter.use(this.exampleRouter.getBasePath(), this.exampleRouter.getRouter());
//
// 3. Add getter method to RouterManager:
//    public getExampleRouter(): ExampleRouter { return this.exampleRouter; }
//
// 4. Update getRouteInfo() to include this router:
//    routes.push(...this.exampleRouter.getRouteInfo());
