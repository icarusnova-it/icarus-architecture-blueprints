/**
 * Domain Entity: User
 * 
 * This is a domain entity representing a user in the system.
 * Domain entities contain business logic and are independent of infrastructure.
 * 
 * Principles:
 * - No dependencies on other layers
 * - Contains business rules and validation
 * - Rich domain model (not anemic)
 */

export class User {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    private _status: UserStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  /**
   * Factory method to create a new user
   * Enforces business rules at creation time
   */
  static create(email: string, name: string): User {
    // Business rule: Email must be valid
    if (!User.isValidEmail(email)) {
      throw new Error('Invalid email address');
    }

    // Business rule: Name must not be empty
    if (!name || name.trim().length === 0) {
      throw new Error('Name is required');
    }

    const now = new Date();
    return new User(
      User.generateId(),
      email.toLowerCase().trim(),
      name.trim(),
      UserStatus.ACTIVE,
      now,
      now
    );
  }

  /**
   * Business rule: Activate user
   */
  activate(): void {
    if (this._status === UserStatus.ACTIVE) {
      throw new Error('User is already active');
    }
    this._status = UserStatus.ACTIVE;
  }

  /**
   * Business rule: Deactivate user
   */
  deactivate(): void {
    if (this._status === UserStatus.INACTIVE) {
      throw new Error('User is already inactive');
    }
    this._status = UserStatus.INACTIVE;
  }

  /**
   * Business rule: Check if user is active
   */
  isActive(): boolean {
    return this._status === UserStatus.ACTIVE;
  }

  /**
   * Business rule: Validate email format
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate unique ID (in real implementation, use UUID library)
   */
  private static generateId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  get status(): UserStatus {
    return this._status;
  }
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}
