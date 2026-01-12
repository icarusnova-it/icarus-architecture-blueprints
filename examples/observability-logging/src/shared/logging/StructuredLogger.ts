/**
 * Structured Logger
 * 
 * Implements structured logging with JSON format.
 * All logs include correlation IDs and context.
 * 
 * Principles:
 * - Structured format (JSON) for easy parsing
 * - Correlation IDs for request tracking
 * - Context included in every log
 * - No sensitive data in logs
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export interface LogContext {
  traceId?: string;
  userId?: string;
  requestId?: string;
  service?: string;
  environment?: string;
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  error?: {
    type: string;
    message: string;
    stack?: string;
  };
}

export class StructuredLogger {
  private service: string;
  private environment: string;

  constructor(service: string, environment: string = 'development') {
    this.service = service;
    this.environment = environment;
  }

  /**
   * Log debug message
   */
  debug(message: string, context: LogContext = {}): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log info message
   */
  info(message: string, context: LogContext = {}): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context: LogContext = {}): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, context: LogContext = {}): void {
    const errorContext = error
      ? {
          ...context,
          error: {
            type: error.constructor.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : context;
    this.log(LogLevel.ERROR, message, errorContext);
  }

  /**
   * Log fatal message
   */
  fatal(message: string, error?: Error, context: LogContext = {}): void {
    const errorContext = error
      ? {
          ...context,
          error: {
            type: error.constructor.name,
            message: error.message,
            stack: error.stack,
          },
        }
      : context;
    this.log(LogLevel.FATAL, message, errorContext);
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, context: LogContext): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        ...context,
        service: this.service,
        environment: this.environment,
      },
    };

    // In production, send to log aggregation system
    // For now, output as JSON
    console.log(JSON.stringify(logEntry));
  }
}

// Singleton instance (in real app, use dependency injection)
export const logger = new StructuredLogger(
  process.env.SERVICE_NAME || 'icarus-platform',
  process.env.NODE_ENV || 'development'
);
