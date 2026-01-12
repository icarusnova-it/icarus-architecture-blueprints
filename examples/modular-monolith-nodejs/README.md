# Modular Monolith Example – Node.js

This example demonstrates a **Modular Monolith** structure using Node.js, showing how to organize code into modules with clear boundaries that can evolve to microservices when needed.

## Structure

```
modular-monolith-nodejs/
├── src/
│   ├── modules/
│   │   ├── user/          # User module
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   └── presentation/
│   │   ├── order/          # Order module
│   │   │   ├── domain/
│   │   │   ├── application/
│   │   │   ├── infrastructure/
│   │   │   └── presentation/
│   │   └── payment/        # Payment module
│   │       ├── domain/
│   │       ├── application/
│   │       ├── infrastructure/
│   │       └── presentation/
│   ├── shared/             # Shared code
│   │   ├── common/
│   │   └── infrastructure/
│   └── app.ts              # Application entry point
├── tests/
└── README.md
```

## Key Principles Demonstrated

1. **Module Boundaries** – Clear boundaries between modules
2. **In-Process Communication** – Modules communicate via interfaces, not network
3. **Shared Kernel** – Minimal shared code
4. **Evolution Path** – Can extract modules to services when needed

## Module Communication

### Synchronous (In-Process)
- Modules communicate via interfaces
- Fast, no network overhead
- Simple error handling

### Asynchronous (Events)
- Modules publish and subscribe to events
- Decoupled communication
- Can become message queue later

## Evolution Path

1. **Start:** Modular monolith with in-process communication
2. **Identify:** Module with different scaling needs
3. **Extract:** Extract module to separate service
4. **Communicate:** Change to network communication
5. **Deploy:** Deploy service independently

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

- **[ADR 0003 – When Not to Use Microservices](../adr/0003-when-not-to-use-microservices.md)**
- **[Architecture Vision](../docs/architecture-vision.md)**
