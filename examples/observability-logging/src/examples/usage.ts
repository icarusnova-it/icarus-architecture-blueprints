/**
 * Usage Example: Structured Logging
 * 
 * Demonstrates how to use structured logging with correlation IDs.
 */

import { logger } from '../shared/logging/StructuredLogger';
import { RequestContext } from '../shared/context/RequestContext';

// Example: Request handler with logging
async function handleRequest(request: any) {
  // Generate correlation ID at request entry
  const traceId = RequestContext.generateTraceId();
  RequestContext.setTraceId(traceId);
  RequestContext.setRequestId(request.id);
  RequestContext.setUserId(request.userId);

  logger.info('Request received', {
    traceId: RequestContext.getTraceId(),
    method: request.method,
    path: request.path,
    userId: RequestContext.getUserId(),
  });

  try {
    // Business logic
    const result = await processRequest(request);

    logger.info('Request processed successfully', {
      traceId: RequestContext.getTraceId(),
      requestId: RequestContext.getRequestId(),
      duration: result.duration,
    });

    return result;
  } catch (error) {
    logger.error('Request processing failed', error as Error, {
      traceId: RequestContext.getTraceId(),
      requestId: RequestContext.getRequestId(),
    });

    throw error;
  } finally {
    // Cleanup context
    RequestContext.clear();
  }
}

// Example: Service method with logging
async function createUser(email: string, name: string) {
  logger.info('Creating user', {
    traceId: RequestContext.getTraceId(),
    email, // Note: In production, be careful with PII
    name,
  });

  try {
    // Validation
    if (!email || !name) {
      logger.warn('Invalid user data', {
        traceId: RequestContext.getTraceId(),
        email: !!email,
        name: !!name,
      });
      throw new Error('Email and name are required');
    }

    // Create user logic
    const user = {
      id: 'user-123',
      email,
      name,
    };

    logger.info('User created successfully', {
      traceId: RequestContext.getTraceId(),
      userId: user.id,
    });

    return user;
  } catch (error) {
    logger.error('Failed to create user', error as Error, {
      traceId: RequestContext.getTraceId(),
    });
    throw error;
  }
}

// Simulated request processing
async function processRequest(request: any): Promise<any> {
  return {
    success: true,
    duration: 100,
  };
}

// Run example
if (require.main === module) {
  const request = {
    id: 'req-123',
    method: 'POST',
    path: '/users',
    userId: 'user-456',
  };

  handleRequest(request)
    .then(() => {
      console.log('Request handled successfully');
    })
    .catch((error) => {
      console.error('Request handling failed:', error);
    });
}
