# Architecture Examples

This directory contains **minimal and clean** reference implementations that demonstrate the architectural principles and patterns documented in this repository.

## Purpose

These examples serve as:
- **Reference implementations** – Concrete examples of architectural patterns
- **Learning resources** – Help teams understand how to apply principles
- **Starting points** – Templates for new projects
- **Validation** – Proof that patterns work in practice

## Principles

All examples follow these principles:
- **Minimal** – Show only essential concepts, not full applications
- **Clean** – Well-structured, readable, and maintainable
- **Practical** – Real-world applicable patterns
- **Documented** – Clear explanations and comments

## Examples

### Clean Architecture
- **[clean-architecture-typescript](./clean-architecture-typescript/)** – TypeScript implementation of Clean Architecture
- **Demonstrates:** Domain, Application, Infrastructure, and Presentation layers
- **Shows:** Dependency inversion, separation of concerns, testability
- **Includes:** Complete example with User entity, use cases, repository, and controller
- **Tests:** Unit tests for domain and application layers

### Modular Monolith
- **[modular-monolith-nodejs](./modular-monolith-nodejs/)** – Node.js modular monolith structure
- **Demonstrates:** Module boundaries, in-process communication, event bus
- **Shows:** Evolution path from monolith to microservices
- **Includes:** User and Order modules with interface-based communication

### Cloud-Agnostic Abstractions
- **[cloud-agnostic-storage](./cloud-agnostic-storage/)** – Storage abstraction examples
- **Demonstrates:** Repository pattern for cloud storage
- **Shows:** AWS S3, Azure Blob, and GCP Cloud Storage implementations
- **Includes:** Interface definition and provider-specific implementations
- **Usage:** Configuration-based provider selection

### Security by Design
- **[security-authentication](./security-authentication/)** – Authentication and authorization examples
- **Demonstrates:** JWT authentication, RBAC, secure defaults
- **Shows:** Security best practices, password hashing, token management
- **Includes:** Authentication service, authorization middleware, secure defaults

### Observability
- **[observability-logging](./observability-logging/)** – Structured logging examples
- **Demonstrates:** Correlation IDs, structured logs, request context
- **Shows:** Observability patterns, log formatting, context propagation
- **Includes:** Structured logger, request context, usage examples

### Architecture Decision Records
- **[adr-template](./adr-template.md)** – ADR template with examples
- **Demonstrates:** How to document architectural decisions
- **Shows:** ADR structure and best practices
- **Includes:** Complete template and guidelines

## Usage

### For Learning
1. Read the example code
2. Review the comments and documentation
3. Understand the patterns and principles
4. Apply to your own projects

### For Starting New Projects
1. Copy the relevant example
2. Adapt to your specific needs
3. Extend with your business logic
4. Maintain architectural principles

### For Reference
- Use examples as reference when making architectural decisions
- Compare your implementation with examples
- Validate that you're following principles correctly

## Structure

Each example includes:
- **README.md** – Explanation of the example
- **Source code** – Minimal but complete implementation
- **Comments** – Inline documentation
- **Tests** – Example tests (where applicable)
- **Documentation** – Additional explanations

## Contributing

When adding new examples:
1. Keep them **minimal** – Show only essential concepts
2. Keep them **clean** – Well-structured and readable
3. Keep them **documented** – Clear explanations
4. Align with **architectural principles** – Follow documented patterns

## Related Documents

- **[Architecture Vision](../docs/architecture-vision.md)** – Overall architectural principles
- **[Solution Architecture Template](../docs/solution-architecture-template.md)** – Architecture documentation
- **[Architecture Decision Records](../adr/)** – Architectural decisions

---

**Last Updated:** 2026-01-15  
**Maintained by:** Icarus Nova IT Architecture Team
