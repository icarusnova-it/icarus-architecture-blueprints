# ADR 0001 – Why Clean Architecture

## Status
Accepted

## Context

### The Problem

Systems tend to accumulate technical debt when business logic is tightly coupled to frameworks and infrastructure. This coupling creates several problems:

- **Framework lock-in** – Business logic becomes dependent on specific frameworks (Spring, Django, Express, etc.), making it difficult to change frameworks or upgrade versions
- **Testing challenges** – Business logic cannot be tested without starting up databases, web servers, and other infrastructure components
- **Technology constraints** – Business requirements are constrained by technology choices made early in the project
- **High coupling** – Changes to infrastructure or frameworks require changes to business logic
- **Low cohesion** – Business rules are scattered across infrastructure and framework code
- **Difficult evolution** – Adding new features or changing existing ones requires understanding and modifying multiple layers simultaneously

### Historical Context

In many legacy systems at Icarus Nova, we observed:
- Business logic embedded in controller classes or framework-specific code
- Database schemas dictating business model design
- Inability to test business rules without running the entire application stack
- Significant refactoring effort required when upgrading frameworks or changing infrastructure
- New team members struggling to understand where business logic resides

### Business Drivers

This decision supports our core architectural drivers:
- **Business continuity** – Systems that are easier to test and evolve reduce risk during changes
- **Scalability** – Clean separation allows independent scaling of different concerns
- **Operational resilience** – Isolated business logic is easier to reason about and debug

## Decision

Adopt **Clean Architecture** principles to separate domain logic from technical concerns.

### What is Clean Architecture?

Clean Architecture, as defined by Robert C. Martin (Uncle Bob), organizes code into concentric layers with dependencies pointing inward. The core principle is that **dependencies point inward** – outer layers depend on inner layers, but inner layers never depend on outer layers.

### Architectural Layers

We structure systems in the following layers:

#### 1. Domain Layer (Innermost)
- **Purpose** – Contains core business logic and domain entities
- **Dependencies** – None (no dependencies on other layers)
- **Contains** – Domain entities, value objects, domain services, business rules
- **Technology** – Pure business logic, no framework dependencies

#### 2. Application Layer
- **Purpose** – Contains use cases and application-specific business logic
- **Dependencies** – Domain layer only
- **Contains** – Use cases, application services, DTOs, interfaces for infrastructure
- **Technology** – Application logic, but defines interfaces for infrastructure

#### 3. Infrastructure Layer
- **Purpose** – Implements technical concerns and external integrations
- **Dependencies** – Application and Domain layers
- **Contains** – Database implementations, external API clients, messaging, file system access
- **Technology** – Framework-specific code, database drivers, HTTP clients

#### 4. Presentation Layer (Outermost)
- **Purpose** – Handles user interaction and input/output
- **Dependencies** – Application and Domain layers
- **Contains** – Controllers, API endpoints, UI components, request/response models
- **Technology** – Web frameworks, UI frameworks, serialization

### Dependency Rule

**The Dependency Rule:** Source code dependencies can only point inward. Nothing in an inner circle can know anything at all about something in an outer circle.

This means:
- Domain entities don't know about databases
- Use cases don't know about web frameworks
- Business logic doesn't know about HTTP requests
- Infrastructure implements interfaces defined by application layer

### Implementation Approach

- **Dependency Inversion** – Application layer defines interfaces; infrastructure layer implements them
- **Ports and Adapters** – Application layer defines ports (interfaces); infrastructure provides adapters (implementations)
- **Hexagonal Architecture** – Alternative name for the same pattern, emphasizing the "ports and adapters" metaphor

## Consequences

### Positive Consequences

#### Improved Testability

- **Unit testing** – Business logic can be tested in isolation without databases, web servers, or external services
- **Fast tests** – Tests run quickly because they don't require infrastructure setup
- **Test coverage** – Easier to achieve high test coverage for business logic
- **Test independence** – Tests don't break when infrastructure changes

**Example:**
```typescript
// Domain logic can be tested without any infrastructure
describe('PaymentService', () => {
  it('should calculate discount correctly', () => {
    const service = new PaymentService();
    const result = service.calculateDiscount(100, 0.1);
    expect(result).toBe(10);
  });
});
```

#### Easier Evolution

- **Framework independence** – Can change web frameworks without affecting business logic
- **Database independence** – Can switch databases or add new data stores without changing business rules
- **Technology upgrades** – Upgrade frameworks and libraries without touching business logic
- **Feature additions** – Add new features by adding new use cases without modifying existing code

**Example:**
- Switch from REST to GraphQL without changing business logic
- Add a new database (e.g., Redis for caching) without modifying domain entities
- Upgrade Spring Boot version without changing use cases

#### Clear Dependency Direction

- **Explicit dependencies** – Dependencies are explicit and visible in code structure
- **Reduced coupling** – Layers are loosely coupled through interfaces
- **Better organization** – Code organization reflects business structure, not technical structure
- **Easier onboarding** – New team members can understand the system structure quickly

#### Additional Benefits

- **Business focus** – Development teams focus on business logic, not infrastructure concerns
- **Parallel development** – Teams can work on different layers independently
- **Reusability** – Business logic can be reused across different interfaces (REST API, GraphQL, CLI, etc.)
- **Maintainability** – Changes are localized to specific layers
- **Compliance** – Business rules are explicit and auditable

### Negative Consequences

#### Initial Learning Curve

- **Team education** – Teams need to learn Clean Architecture concepts and patterns
- **Pattern recognition** – Developers need to understand where code belongs
- **Abstraction overhead** – More interfaces and abstractions to understand
- **Onboarding time** – New team members need time to understand the architecture

**Mitigation:**
- Provide training and documentation
- Create reference implementations
- Code reviews to reinforce patterns
- Pair programming for knowledge sharing

#### Requires Discipline from Teams

- **Architectural discipline** – Teams must resist shortcuts that violate layer boundaries
- **Code reviews** – Need vigilant code reviews to maintain architecture
- **Refactoring** – May require refactoring existing code to fit the architecture
- **Tooling** – May need tools or linting rules to enforce layer boundaries

**Mitigation:**
- Establish clear architectural guidelines
- Use automated checks (linting, architecture tests)
- Regular architecture reviews
- Lead by example in code reviews

#### Additional Complexity

- **More files** – More files and directories to navigate
- **Indirection** – More layers of indirection (interfaces, adapters)
- **Boilerplate** – More boilerplate code (interfaces, DTOs, mappers)
- **Initial setup** – More initial setup required for new projects

**Mitigation:**
- Use code generators or templates where appropriate
- Create project templates with Clean Architecture structure
- Document common patterns and shortcuts
- Balance complexity with benefits

#### Performance Considerations

- **Mapping overhead** – May need to map between domain entities and DTOs
- **Additional layers** – More layers can add slight performance overhead
- **Abstraction cost** – Interface calls may have slight performance cost

**Note:** In practice, these performance impacts are negligible compared to network I/O and database queries. The benefits of maintainability and testability far outweigh minimal performance costs.

## Trade-offs

### Considered Alternatives

#### 1. Traditional Layered Architecture
- **Description** – Simple layers (Controller → Service → Repository → Database)
- **Pros** – Simpler, easier to understand initially
- **Cons** – Business logic often leaks into controllers or repositories, tight coupling to frameworks
- **Decision** – Rejected due to coupling issues

#### 2. Anemic Domain Model
- **Description** – Domain objects are data containers; business logic in services
- **Pros** – Simple, familiar to many developers
- **Cons** – Business logic scattered, harder to maintain, violates encapsulation
- **Decision** – Rejected in favor of rich domain models

#### 3. Framework-Driven Development
- **Description** – Let the framework (Spring, Django, etc.) dictate structure
- **Pros** – Fast initial development, framework conventions
- **Cons** – Framework lock-in, difficult to test, business logic coupled to framework
- **Decision** – Rejected due to coupling and testability issues

### Trade-off Analysis

| Aspect | Clean Architecture | Traditional Approach |
|--------|-------------------|---------------------|
| **Initial Development** | Slower (more setup) | Faster (framework conventions) |
| **Long-term Maintenance** | Easier (clear structure) | Harder (coupling issues) |
| **Testability** | Excellent (isolated logic) | Poor (requires infrastructure) |
| **Framework Independence** | High | Low |
| **Learning Curve** | Steeper | Gentler |
| **Code Volume** | More (interfaces, mappers) | Less (direct usage) |
| **Team Discipline** | Required | Less critical |

### Decision Rationale

We chose Clean Architecture because:
1. **Long-term value** – The initial investment pays off in maintainability and evolution
2. **Business alignment** – Architecture Vision emphasizes "Architecture follows business drivers" – Clean Architecture keeps business logic independent
3. **Regulatory compliance** – Clear separation makes it easier to audit business rules
4. **Team scalability** – Clear structure helps teams work independently
5. **Technology evolution** – We operate in a changing technology landscape; independence from frameworks is valuable

## Implementation Guidelines

### Layer Boundaries

- **Domain Layer** – Pure business logic, no dependencies
- **Application Layer** – Use cases, defines interfaces for infrastructure
- **Infrastructure Layer** – Implements interfaces, handles technical concerns
- **Presentation Layer** – Handles I/O, delegates to application layer

### Dependency Injection

- Use dependency injection to provide infrastructure implementations to application layer
- Application layer depends on interfaces, not concrete implementations
- Infrastructure implementations are injected at runtime

### Testing Strategy

- **Domain Layer** – Pure unit tests, no mocks needed
- **Application Layer** – Unit tests with mocked infrastructure interfaces
- **Infrastructure Layer** – Integration tests with real infrastructure
- **Presentation Layer** – Integration tests or end-to-end tests

### Code Organization

```
src/
  domain/
    entities/
    value-objects/
    services/
  application/
    use-cases/
    interfaces/
    dtos/
  infrastructure/
    persistence/
    external-apis/
    messaging/
  presentation/
    controllers/
    api/
    ui/
```

## Examples

### Before (Tightly Coupled)

```typescript
// Controller directly uses database
@Controller('/users')
class UserController {
  @Autowired
  private userRepository: UserRepository;
  
  @Post('/')
  async createUser(@Body() data: any) {
    // Business logic in controller
    if (data.email.includes('@company.com')) {
      data.role = 'employee';
    }
    return await this.userRepository.save(data);
  }
}
```

**Problems:**
- Business logic in controller
- Cannot test without database
- Coupled to framework (@Controller, @Autowired)
- Cannot reuse logic in other contexts

### After (Clean Architecture)

```typescript
// Domain Entity
class User {
  constructor(
    public email: string,
    public role: string
  ) {}
  
  static create(email: string): User {
    const role = email.includes('@company.com') ? 'employee' : 'customer';
    return new User(email, role);
  }
}

// Use Case
class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(email: string): Promise<User> {
    const user = User.create(email);
    return await this.userRepository.save(user);
  }
}

// Controller
@Controller('/users')
class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  
  @Post('/')
  async createUser(@Body() data: { email: string }) {
    return await this.createUserUseCase.execute(data.email);
  }
}
```

**Benefits:**
- Business logic in domain entity
- Can test User.create() without any infrastructure
- Controller is thin, just delegates to use case
- Can reuse CreateUserUseCase in CLI, GraphQL, etc.

## Compliance

This ADR aligns with the [Architecture Vision](../docs/architecture-vision.md):
- ✅ **Architecture follows business drivers** – Business logic is independent
- ✅ **Explicit trade-offs** – This ADR documents trade-offs explicitly
- ✅ **Evolutionary design** – Clean Architecture supports incremental evolution
- ✅ **Simplicity before sophistication** – While more complex initially, it simplifies long-term maintenance

## Related ADRs

- (Future) ADR on dependency injection framework choice
- (Future) ADR on testing strategy
- (Future) ADR on API design patterns

## References

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Architecture Vision](../docs/architecture-vision.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-15 | Architecture Team | Initial ADR |

---

**Decision Date:** 2026-01-15  
**Decision Makers:** Icarus Nova Architecture Team  
**Status:** Accepted  
**Next Review:** 2026-07-15 (6 months)
