/**
 * Presentation Layer: User Controller
 * 
 * Controllers handle HTTP requests and responses.
 * They are thin - they just delegate to use cases.
 * 
 * Principles:
 * - Depends on Application layer (use cases)
 * - Handles HTTP concerns (request/response, status codes, etc.)
 * - No business logic here
 * - Can be swapped (REST, GraphQL, gRPC, etc.)
 */

import { Request, Response } from 'express';
import { CreateUserUseCase, CreateUserRequest } from '../../application/use-cases/CreateUserUseCase';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  /**
   * Handle POST /users request
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Extract request data (presentation concern)
      const request: CreateUserRequest = {
        email: req.body.email,
        name: req.body.name,
      };

      // Validate request (presentation concern)
      if (!request.email || !request.name) {
        res.status(400).json({ error: 'Email and name are required' });
        return;
      }

      // Delegate to use case (application logic)
      const response = await this.createUserUseCase.execute(request);

      // Return response (presentation concern)
      res.status(201).json(response);
    } catch (error) {
      // Handle errors (presentation concern)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
