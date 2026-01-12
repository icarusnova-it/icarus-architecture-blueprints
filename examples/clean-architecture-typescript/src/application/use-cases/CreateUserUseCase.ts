/**
 * Application Layer: Create User Use Case
 * 
 * Use cases contain application-specific business logic.
 * They orchestrate domain entities and coordinate with infrastructure.
 * 
 * Principles:
 * - Depends on domain entities (User)
 * - Depends on repository interface (IUserRepository), not implementation
 * - Contains application logic (not domain logic)
 * - Can be tested without infrastructure (use mock repository)
 */

import { User } from '../../domain/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

export interface CreateUserRequest {
  email: string;
  name: string;
}

export interface CreateUserResponse {
  user: {
    id: string;
    email: string;
    name: string;
    status: string;
  };
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Execute the create user use case
   * 
   * Application logic:
   * 1. Check if user already exists (application concern)
   * 2. Create user (domain logic)
   * 3. Save user (infrastructure concern, via interface)
   */
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Application rule: Check if user already exists
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Domain logic: Create user (business rules enforced in User.create)
    const user = User.create(request.email, request.name);

    // Infrastructure: Save user (via interface, not direct database call)
    await this.userRepository.save(user);

    // Return DTO (Data Transfer Object) - not domain entity
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        status: user.status,
      },
    };
  }
}
