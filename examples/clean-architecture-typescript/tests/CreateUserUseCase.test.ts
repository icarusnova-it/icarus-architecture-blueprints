/**
 * Tests for CreateUserUseCase
 * 
 * These tests demonstrate that use cases can be tested
 * with mock repositories (no real database needed).
 * 
 * Benefits:
 * - Fast tests (no database)
 * - Isolated tests (test application logic)
 * - Easy to test edge cases
 */

import { CreateUserUseCase, CreateUserRequest } from '../src/application/use-cases/CreateUserUseCase';
import { IUserRepository } from '../src/application/interfaces/IUserRepository';
import { User } from '../src/domain/entities/User';

// Mock repository for testing
class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
    useCase = new CreateUserUseCase(repository);
  });

  it('should create a user successfully', async () => {
    const request: CreateUserRequest = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const response = await useCase.execute(request);

    expect(response.user.email).toBe('test@example.com');
    expect(response.user.name).toBe('Test User');
    expect(response.user.id).toBeDefined();

    // Verify user was saved
    const savedUser = await repository.findByEmail('test@example.com');
    expect(savedUser).not.toBeNull();
  });

  it('should throw error if user already exists', async () => {
    const request: CreateUserRequest = {
      email: 'test@example.com',
      name: 'Test User',
    };

    // Create first user
    await useCase.execute(request);

    // Try to create duplicate
    await expect(useCase.execute(request)).rejects.toThrow(
      'User with this email already exists'
    );
  });
});
