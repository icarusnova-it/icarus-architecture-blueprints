# Observability Example – Structured Logging

This example demonstrates **Observability First** principles with structured logging, correlation IDs, and proper log formatting.

## Purpose

Show how to:
- Implement structured logging
- Use correlation IDs
- Format logs consistently
- Integrate with log aggregation systems

## Structure

```
observability-logging/
├── src/
│   ├── shared/
│   │   ├── logging/
│   │   │   ├── Logger.ts
│   │   │   ├── StructuredLogger.ts
│   │   │   └── CorrelationMiddleware.ts
│   │   └── context/
│   │       └── RequestContext.ts
│   └── examples/
│       └── usage.ts
└── README.md
```

## Key Principles Demonstrated

1. **Structured Logging** – JSON format for easy parsing
2. **Correlation IDs** – Track requests across services
3. **Context** – Include relevant context in logs
4. **Log Levels** – Appropriate use of log levels

## Features

- Structured JSON logging
- Correlation ID propagation
- Request context tracking
- Log levels (DEBUG, INFO, WARN, ERROR, FATAL)
- Integration with log aggregation tools

## Usage

```typescript
import { logger } from './shared/logging/StructuredLogger';

logger.info('User created', {
  userId: 'user-123',
  email: 'user@example.com',
  traceId: context.traceId,
});
```

## Related Documents

- **[Observability Strategy](../docs/observability-strategy.md)**
- **[Architecture Vision](../docs/architecture-vision.md)**
