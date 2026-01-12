/**
 * Tests for User Domain Entity
 * 
 * These tests demonstrate that domain logic can be tested
 * without any infrastructure dependencies.
 * 
 * Benefits of Clean Architecture:
 * - Fast tests (no database, no network)
 * - Isolated tests (test business logic only)
 * - Easy to write and maintain
 */

import { User, UserStatus } from '../src/domain/entities/User';

describe('User Domain Entity', () => {
  describe('create', () => {
    it('should create a user with valid data', () => {
      const user = User.create('test@example.com', 'Test User');
      
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user.status).toBe(UserStatus.ACTIVE);
      expect(user.id).toBeDefined();
    });

    it('should throw error for invalid email', () => {
      expect(() => {
        User.create('invalid-email', 'Test User');
      }).toThrow('Invalid email address');
    });

    it('should throw error for empty name', () => {
      expect(() => {
        User.create('test@example.com', '');
      }).toThrow('Name is required');
    });

    it('should normalize email to lowercase', () => {
      const user = User.create('TEST@EXAMPLE.COM', 'Test User');
      expect(user.email).toBe('test@example.com');
    });
  });

  describe('activate', () => {
    it('should activate an inactive user', () => {
      const user = User.create('test@example.com', 'Test User');
      user.deactivate();
      user.activate();
      
      expect(user.isActive()).toBe(true);
    });

    it('should throw error if user is already active', () => {
      const user = User.create('test@example.com', 'Test User');
      
      expect(() => {
        user.activate();
      }).toThrow('User is already active');
    });
  });

  describe('deactivate', () => {
    it('should deactivate an active user', () => {
      const user = User.create('test@example.com', 'Test User');
      user.deactivate();
      
      expect(user.isActive()).toBe(false);
    });

    it('should throw error if user is already inactive', () => {
      const user = User.create('test@example.com', 'Test User');
      user.deactivate();
      
      expect(() => {
        user.deactivate();
      }).toThrow('User is already inactive');
    });
  });
});
