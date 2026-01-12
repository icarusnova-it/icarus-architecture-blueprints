/**
 * Request Context
 * 
 * Manages request context including correlation IDs.
 * Context is propagated across service boundaries.
 * 
 * Principles:
 * - Correlation ID generated at request entry
 * - Context propagated via headers/context
 * - Available throughout request lifecycle
 */

import { v4 as uuidv4 } from 'uuid';

export class RequestContext {
  private static context = new Map<string, any>();

  /**
   * Generate correlation ID (trace ID)
   */
  static generateTraceId(): string {
    return uuidv4();
  }

  /**
   * Set context value
   */
  static set(key: string, value: any): void {
    this.context.set(key, value);
  }

  /**
   * Get context value
   */
  static get(key: string): any {
    return this.context.get(key);
  }

  /**
   * Get trace ID
   */
  static getTraceId(): string {
    return this.get('traceId') || this.generateTraceId();
  }

  /**
   * Set trace ID
   */
  static setTraceId(traceId: string): void {
    this.set('traceId', traceId);
  }

  /**
   * Get user ID
   */
  static getUserId(): string | undefined {
    return this.get('userId');
  }

  /**
   * Set user ID
   */
  static setUserId(userId: string): void {
    this.set('userId', userId);
  }

  /**
   * Get request ID
   */
  static getRequestId(): string | undefined {
    return this.get('requestId');
  }

  /**
   * Set request ID
   */
  static setRequestId(requestId: string): void {
    this.set('requestId', requestId);
  }

  /**
   * Get all context
   */
  static getAll(): Record<string, any> {
    return Object.fromEntries(this.context);
  }

  /**
   * Clear context (for cleanup)
   */
  static clear(): void {
    this.context.clear();
  }
}
