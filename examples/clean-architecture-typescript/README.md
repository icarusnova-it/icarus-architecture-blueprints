# Clean Architecture Example – TypeScript

This example demonstrates **Clean Architecture** principles using TypeScript, showing how to structure code with clear separation of concerns and dependency inversion.

## Structure

```
clean-architecture-typescript/
├── src/
│   ├── domain/           # Domain layer (no dependencies)
│   │   ├── entities/
│   │   ├── value-objects/
│   │   └── services/
│   ├── application/      # Application layer (depends on domain)
│   │   ├── use-cases/
│   │   ├── interfaces/
│   │   └── dtos/
│   ├── infrastructure/   # Infrastructure layer (depends on application & domain)
│   │   ├── persistence/
│   │   ├── external-apis/
│   │   └── messaging/
│   └── presentation/      # Presentation layer (depends on application & domain)
│       ├── controllers/
│       └── api/
├── tests/
└── README.md
```

## Key Principles Demonstrated

1. **Dependency Rule** – Dependencies point inward
2. **Separation of Concerns** – Each layer has a clear responsibility
3. **Dependency Inversion** – Application defines interfaces, infrastructure implements them
4. **Testability** – Domain and application logic can be tested without infrastructure

## Example: User Management

This example shows a simple user management system with:
- **Domain:** User entity and business rules
- **Application:** Create user use case
- **Infrastructure:** Database repository implementation
- **Presentation:** REST API controller

## Running the Example

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run application
npm start
```

## Related Documents

- **[ADR 0001 – Why Clean Architecture](../adr/0001-why-clean-architecture.md)**
- **[Architecture Vision](../docs/architecture-vision.md)**
