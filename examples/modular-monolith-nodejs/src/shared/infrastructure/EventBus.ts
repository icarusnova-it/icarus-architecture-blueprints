/**
 * Shared Infrastructure: Event Bus
 * 
 * This is a simple in-process event bus for module communication.
 * 
 * In a modular monolith:
 * - Events are published and consumed in-process
 * - Fast, no network overhead
 * 
 * When evolving to microservices:
 * - Replace with message queue (RabbitMQ, Kafka, etc.)
 * - Events published to queue
 * - Services consume from queue
 * 
 * The interface stays the same, only implementation changes.
 */

export interface DomainEvent {
  type: string;
  payload: any;
  timestamp: Date;
}

export type EventHandler = (event: DomainEvent) => Promise<void> | void;

export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  /**
   * Publish an event
   * In monolith: calls handlers synchronously
   * In microservices: publishes to message queue
   */
  publish(event: DomainEvent): void {
    const handlers = this.handlers.get(event.type) || [];
    handlers.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error handling event ${event.type}:`, error);
      }
    });
  }

  /**
   * Subscribe to events
   * In monolith: stores handler in memory
   * In microservices: subscribes to message queue
   */
  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
  }

  /**
   * Unsubscribe from events
   */
  unsubscribe(eventType: string, handler: EventHandler): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }
}

// Singleton instance (in real app, use dependency injection)
export const eventBus = new EventBus();
