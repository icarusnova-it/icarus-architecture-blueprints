/**
 * Application Layer: User Repository Interface
 * 
 * This interface is defined in the Application layer.
 * Infrastructure layer will implement this interface.
 * 
 * This follows the Dependency Inversion Principle:
 * - Application layer defines the interface (abstraction)
 * - Infrastructure layer implements the interface (concrete implementation)
 * 
 * Benefits:
 * - Application layer doesn't depend on infrastructure
 * - Can swap implementations (database, in-memory, etc.)
 * - Easy to test (can use mock implementations)
 */

import { User } from '../../domain/entities/User';

export interface IUserRepository {
  /**
   * Save a user
   */
  save(user: User): Promise<void>;

  /**
   * Find user by ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find all users
   */
  findAll(): Promise<User[]>;

  /**
   * Delete user by ID
   */
  delete(id: string): Promise<void>;
}
