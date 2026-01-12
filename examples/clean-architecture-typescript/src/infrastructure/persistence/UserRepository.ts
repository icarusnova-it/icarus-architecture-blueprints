/**
 * Infrastructure Layer: User Repository Implementation
 * 
 * This is the concrete implementation of IUserRepository.
 * It handles database operations.
 * 
 * Principles:
 * - Implements interface defined in Application layer
 * - Contains infrastructure concerns (database, SQL, etc.)
 * - Can be swapped with other implementations (in-memory, different database, etc.)
 */

import { User, UserStatus } from '../../domain/entities/User';
import { IUserRepository } from '../../application/interfaces/IUserRepository';

/**
 * In-memory implementation for demonstration
 * In production, this would use a real database (PostgreSQL, MongoDB, etc.)
 */
export class InMemoryUserRepository implements IUserRepository {
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

/**
 * Example: PostgreSQL implementation (commented out)
 * This shows how you would implement with a real database
 */
/*
import { Pool } from 'pg';

export class PostgreSQLUserRepository implements IUserRepository {
  constructor(private db: Pool) {}

  async save(user: User): Promise<void> {
    await this.db.query(
      'INSERT INTO users (id, email, name, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
      [user.id, user.email, user.name, user.status, user.createdAt, user.updatedAt]
    );
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    return this.mapRowToUser(result.rows[0]);
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.query('SELECT * FROM users');
    return result.rows.map(row => this.mapRowToUser(row));
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }

  private mapRowToUser(row: any): User {
    // Map database row to domain entity
    // This is infrastructure concern - mapping between database and domain
  }
}
*/
