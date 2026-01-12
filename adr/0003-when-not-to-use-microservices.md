# ADR 0003 – When Not to Use Microservices

## Status
Accepted

## Context

### The Problem

Microservices introduce operational and cognitive complexity that is often unnecessary, especially in early stages of a system's lifecycle. Many organizations adopt microservices prematurely, leading to:

- **Operational overhead** – Need for service discovery, API gateways, distributed tracing, monitoring across services
- **Network complexity** – Network calls replace in-process calls, introducing latency, failure modes, and consistency challenges
- **Data consistency** – Distributed transactions, eventual consistency, and data synchronization become complex
- **Deployment complexity** – Multiple services to deploy, coordinate, and version
- **Testing complexity** – Integration testing across services, contract testing, end-to-end testing
- **Cognitive load** – Developers must understand multiple services, their interactions, and deployment topologies
- **Team coordination** – Requires coordination across teams for changes that span services
- **Debugging difficulty** – Issues span multiple services, making root cause analysis challenging
- **Cost** – More infrastructure, monitoring, and operational tooling required

### Historical Context

At Icarus Nova, we have observed:

- **Premature microservices** – Systems split into microservices before understanding domain boundaries
- **Over-engineering** – Microservices architecture for systems that don't need it
- **Operational struggles** – Teams struggling with operational complexity of microservices
- **Slow development** – Development velocity decreased due to microservices overhead
- **High costs** – Increased infrastructure and operational costs without corresponding benefits
- **Failed migrations** – Attempts to split monoliths into microservices that didn't deliver expected benefits

### The Microservices Hype

Microservices have been heavily promoted as a "best practice," but they are not a silver bullet. They solve specific problems but introduce others. Many organizations adopt microservices because:

- **Industry trend** – "Everyone is doing it"
- **Resume-driven development** – Developers want to work with "modern" architectures
- **Misunderstanding** – Confusing microservices with modular architecture
- **Premature optimization** – Optimizing for scale before it's needed

### Business Drivers

This decision supports our core architectural drivers:

- **Business continuity** – Simpler architectures reduce operational risk
- **Operational resilience** – Monoliths can be more resilient than poorly designed microservices
- **Simplicity before sophistication** – Start simple, add complexity only when justified

### When Microservices Make Sense

Microservices are valuable when:

- **Independent scaling** – Different parts of the system have very different scaling requirements
- **Team autonomy** – Teams need to work independently without coordination
- **Technology diversity** – Different parts need different technology stacks
- **Organizational structure** – Team structure aligns with service boundaries
- **Operational maturity** – Organization has mature DevOps practices
- **Clear domain boundaries** – Well-understood bounded contexts (from DDD)

### When Microservices Don't Make Sense

Microservices are not appropriate when:

- **Small team** – Single team can manage the entire system
- **Unclear boundaries** – Domain boundaries are not well understood
- **Low operational maturity** – Lack of DevOps, monitoring, and operational practices
- **Early stage** – System is still evolving, requirements are unclear
- **Simple system** – System doesn't have complexity that justifies microservices
- **Tight coupling** – Services would be tightly coupled anyway

## Decision

Avoid microservices unless:
1. **Independent scaling is required** – Different parts have significantly different scaling needs
2. **Teams are autonomous** – Teams can work independently on different services
3. **Operational maturity exists** – Organization has mature DevOps, monitoring, and operational practices

### Default: Start with Modular Monolith

**Start with a modular monolith** and evolve to microservices only when there's clear business value.

#### What is a Modular Monolith?

A modular monolith is:
- **Single deployable unit** – One application, one database (initially)
- **Modular structure** – Code organized into modules with clear boundaries
- **Clean architecture** – Domain logic separated from infrastructure
- **Module boundaries** – Clear module boundaries that can become service boundaries later
- **In-process communication** – Modules communicate via interfaces, not network calls

#### Benefits of Modular Monolith

- **Simpler operations** – Single deployment, single database, simpler monitoring
- **Easier development** – In-process calls, simpler debugging, faster feedback loops
- **Lower cost** – Less infrastructure, simpler tooling
- **Faster iteration** – Easier to make changes that span modules
- **Better performance** – No network latency, no serialization overhead
- **Easier testing** – Simpler integration testing, faster test execution

#### Evolution Path

Modular monolith → Microservices (when needed):

1. **Start modular** – Build modular monolith with clear module boundaries
2. **Identify boundaries** – As system evolves, identify natural service boundaries
3. **Extract services** – Extract services when there's clear value (scaling, team autonomy, etc.)
4. **Incremental evolution** – Evolve incrementally, not big-bang rewrite

### Decision Criteria

Use this decision tree:

```
Is independent scaling required?
├─ No → Use modular monolith
└─ Yes → Are teams autonomous?
    ├─ No → Use modular monolith
    └─ Yes → Do we have operational maturity?
        ├─ No → Build operational maturity first, then consider microservices
        └─ Yes → Consider microservices (but still evaluate alternatives)
```

### Alternatives to Microservices

#### 1. Modular Monolith (Recommended Default)

- **Structure** – Single application with clear module boundaries
- **Communication** – In-process calls between modules
- **Deployment** – Single deployable unit
- **Database** – Can start with single database, split later if needed
- **Evolution** – Can extract modules to services when needed

#### 2. Service-Oriented Monolith

- **Structure** – Single application with service-like modules
- **Communication** – In-process calls, but structured like services
- **Deployment** – Single deployable unit
- **Evolution** – Easy to extract services later

#### 3. Modular Monolith with Async Processing

- **Structure** – Monolith for synchronous operations, separate services for async processing
- **Communication** – In-process for sync, messaging for async
- **Use case** – When async processing has different scaling needs

## Consequences

### Positive Consequences

#### Preference for Modular Monoliths Initially

- **Simpler architecture** – Easier to understand, develop, and operate
- **Faster development** – No service coordination overhead
- **Lower operational cost** – Less infrastructure and tooling
- **Better performance** – No network overhead for in-process calls
- **Easier debugging** – Single process, simpler stack traces
- **Faster testing** – Simpler integration tests, faster execution

**Example:**
```typescript
// Modular monolith - in-process communication
// User module
class UserService {
  async getUser(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
}

// Order module
class OrderService {
  constructor(private userService: UserService) {}
  
  async createOrder(userId: string, items: Item[]): Promise<Order> {
    // In-process call - fast, no network
    const user = await this.userService.getUser(userId);
    // Create order logic
  }
}
```

#### Lower Operational Overhead

- **Single deployment** – Deploy one application, not multiple services
- **Simpler monitoring** – Monitor one application
- **Simpler logging** – Logs in one place
- **Simpler debugging** – Single process to debug
- **Lower infrastructure cost** – Less infrastructure needed
- **Simpler CI/CD** – Simpler deployment pipelines

#### Faster Time to Market

- **Less setup** – No need to set up service discovery, API gateways, etc.
- **Faster development** – No service coordination overhead
- **Faster testing** – Simpler test setup
- **Faster deployment** – Single deployment unit

#### Better Developer Experience

- **Simpler development** – Developers work with one codebase
- **Faster feedback** – No need to start multiple services
- **Easier debugging** – Single process, simpler stack traces
- **Better IDE support** – IDEs work better with monoliths

### Negative Consequences

#### Scaling Limits in Early Stages

- **Vertical scaling** – Initially limited to vertical scaling (bigger servers)
- **No independent scaling** – Cannot scale different parts independently
- **Resource sharing** – All modules share same resources
- **Potential bottlenecks** – One slow module can affect entire system

**Mitigation:**
- Modular structure allows extraction to services when needed
- Can use async processing for resource-intensive operations
- Can scale vertically initially (often sufficient)
- Can extract services incrementally when scaling needs arise

#### Potential for Monolithic Thinking

- **Tight coupling risk** – Without discipline, modules can become tightly coupled
- **Shared database** – Shared database can create coupling
- **Code organization** – Requires discipline to maintain module boundaries

**Mitigation:**
- Enforce module boundaries through architecture
- Use dependency inversion (modules depend on interfaces)
- Regular architecture reviews
- Code organization standards

#### Limited Technology Diversity

- **Single technology stack** – All modules use same technology
- **Framework constraints** – All modules constrained by chosen framework

**Mitigation:**
- Most systems don't need technology diversity
- Can extract services when different technology is needed
- Polyglot programming is often overrated

#### Team Coordination

- **Shared codebase** – Teams may need to coordinate on shared code
- **Merge conflicts** – Potential for merge conflicts in shared codebase

**Mitigation:**
- Clear module ownership
- Code review processes
- Feature flags for independent development
- Most coordination is beneficial (prevents silos)

## Trade-offs

### Considered Alternatives

#### 1. Microservices from the Start

- **Description** – Start with microservices architecture
- **Pros** – Independent scaling, team autonomy, technology diversity
- **Cons** – High operational overhead, complexity, cost, slower development
- **Decision** – Rejected for most cases; only when clear requirements exist

#### 2. Big Ball of Mud Monolith

- **Description** – Monolith without modular structure
- **Pros** – Simplest initially
- **Cons** – Becomes unmaintainable, difficult to extract services later
- **Decision** – Rejected; modular monolith is better

#### 3. Modular Monolith (Selected)

- **Description** – Monolith with clear module boundaries
- **Pros** – Simple operations, easy development, can evolve to microservices
- **Cons** – Limited independent scaling initially
- **Decision** – **Accepted** – Default choice

### Trade-off Analysis

| Aspect | Modular Monolith | Microservices |
|--------|-----------------|---------------|
| **Operational Complexity** | Low | High |
| **Development Speed** | Fast | Slower (coordination overhead) |
| **Cost** | Low | High (more infrastructure) |
| **Scaling** | Vertical initially | Independent scaling |
| **Team Autonomy** | Lower | Higher |
| **Technology Diversity** | Limited | High |
| **Testing Complexity** | Low | High |
| **Debugging** | Easy | Difficult |
| **Deployment** | Simple | Complex |
| **Performance** | Better (no network) | Worse (network overhead) |

### Decision Rationale

We chose **modular monolith as default** because:

1. **Simplicity before sophistication** – Architecture Vision emphasizes starting simple
2. **Avoid premature microservices** – Architecture Vision explicitly avoids premature microservices
3. **Evolutionary design** – Can evolve to microservices when needed
4. **Business value** – Most systems don't need microservices complexity
5. **Cost efficiency** – Lower operational costs
6. **Faster delivery** – Faster time to market

## Implementation Guidelines

### Modular Monolith Structure

```
src/
  modules/
    user/
      domain/
      application/
      infrastructure/
      presentation/
    order/
      domain/
      application/
      infrastructure/
      presentation/
    payment/
      domain/
      application/
      infrastructure/
      presentation/
  shared/
    common/
    infrastructure/
```

### Module Boundaries

- **Clear boundaries** – Each module has clear boundaries
- **Interface-based communication** – Modules communicate via interfaces
- **No direct dependencies** – Modules don't directly depend on other modules' internals
- **Shared kernel** – Minimal shared code (utilities, common types)

### Database Strategy

#### Option 1: Single Database (Start Here)

- **Single database** – All modules share one database
- **Schema separation** – Use schemas or prefixes to separate module data
- **Pros** – Simplest, transactions across modules
- **Cons** – Potential coupling through shared database

#### Option 2: Database per Module

- **Separate databases** – Each module has its own database
- **Pros** – Clear boundaries, can extract to services easily
- **Cons** – More complex, no cross-module transactions

**Recommendation:** Start with single database, split when needed.

### Communication Patterns

#### Synchronous (In-Process)

```typescript
// Module A
interface IUserService {
  getUser(id: string): Promise<User>;
}

// Module B
class OrderService {
  constructor(private userService: IUserService) {}
  
  async createOrder(userId: string): Promise<Order> {
    const user = await this.userService.getUser(userId);
    // ...
  }
}
```

#### Asynchronous (Events)

```typescript
// Event bus (in-process initially, can become messaging later)
interface IEventBus {
  publish(event: DomainEvent): void;
  subscribe(eventType: string, handler: EventHandler): void;
}

// Module A publishes event
class UserService {
  constructor(private eventBus: IEventBus) {}
  
  async createUser(user: User): Promise<void> {
    await this.repository.save(user);
    this.eventBus.publish(new UserCreatedEvent(user.id));
  }
}

// Module B subscribes to event
class OrderService {
  constructor(private eventBus: IEventBus) {
    this.eventBus.subscribe('UserCreated', this.onUserCreated.bind(this));
  }
  
  private onUserCreated(event: UserCreatedEvent): void {
    // Handle user created
  }
}
```

### When to Extract to Microservices

Extract a module to a microservice when:

1. **Independent scaling needed** – Module has very different scaling requirements
2. **Team autonomy needed** – Team needs to work independently
3. **Technology diversity needed** – Module needs different technology
4. **Operational maturity exists** – Organization can handle microservices
5. **Clear boundaries** – Module boundaries are well-defined

### Extraction Process

1. **Identify module** – Identify module to extract
2. **Define API** – Define clear API for the service
3. **Extract service** – Extract module to separate service
4. **Update communication** – Change in-process calls to network calls
5. **Deploy independently** – Deploy service independently
6. **Monitor** – Monitor service independently

## Examples

### Before (Premature Microservices)

```typescript
// User Service
class UserService {
  async getUser(id: string): Promise<User> {
    // Database call
  }
}

// Order Service - needs to call User Service
class OrderService {
  constructor(private httpClient: HttpClient) {}
  
  async createOrder(userId: string): Promise<Order> {
    // Network call to user service
    const user = await this.httpClient.get(`http://user-service/users/${userId}`);
    // Create order
  }
}
```

**Problems:**
- Network latency for every order creation
- User service must be available for orders
- More complex error handling
- More complex testing
- Higher operational overhead

### After (Modular Monolith)

```typescript
// User Module
class UserService {
  async getUser(id: string): Promise<User> {
    // Database call
  }
}

// Order Module - in-process call
class OrderService {
  constructor(private userService: IUserService) {}
  
  async createOrder(userId: string): Promise<Order> {
    // In-process call - fast, no network
    const user = await this.userService.getUser(userId);
    // Create order
  }
}
```

**Benefits:**
- Fast in-process calls
- No network dependency
- Simpler error handling
- Simpler testing
- Lower operational overhead

### Evolution Example

**Phase 1: Modular Monolith**
- Single application
- User and Order modules
- In-process communication

**Phase 2: Extract User Service (when needed)**
- User module extracted to separate service
- Order module still in monolith
- Network communication for user data
- In-process for order operations

**Phase 3: Full Microservices (if needed)**
- Both modules as separate services
- Network communication between services
- Independent deployment and scaling

## Anti-Patterns to Avoid

### 1. Premature Microservices

- **Problem** – Splitting into microservices before understanding boundaries
- **Solution** – Start with modular monolith, extract when needed

### 2. Distributed Monolith

- **Problem** – Microservices that are tightly coupled like a monolith
- **Solution** – If services are tightly coupled, consider keeping them together

### 3. Shared Database Anti-Pattern

- **Problem** – Multiple services sharing same database
- **Solution** – Each service should own its data (but can start shared in monolith)

### 4. Chatty Services

- **Problem** – Services making many small network calls
- **Solution** – Batch operations, use events, or keep in monolith

### 5. Big Ball of Mud

- **Problem** – Monolith without modular structure
- **Solution** – Enforce modular boundaries from the start

## Compliance

This ADR aligns with the [Architecture Vision](../docs/architecture-vision.md):
- ✅ **Architecture follows business drivers** – Microservices only when business value is clear
- ✅ **Explicit trade-offs** – This ADR documents trade-offs explicitly
- ✅ **Evolutionary design** – Start simple, evolve to microservices when needed
- ✅ **Simplicity before sophistication** – Prefer simpler architectures initially
- ✅ **Anti-pattern: Premature microservices** – Explicitly avoids this anti-pattern

## Related ADRs

- ADR 0001 – Why Clean Architecture (supports modular monolith structure)
- ADR 0002 – Cloud-Agnostic Strategy (applies to both monoliths and microservices)
- (Future) ADR on when to extract services from monolith
- (Future) ADR on service communication patterns

## References

- [MonolithFirst by Martin Fowler](https://martinfowler.com/bliki/MonolithFirst.html)
- [Modular Monolith Primer by Kamil Grzybek](https://www.kamilgrzybek.com/blog/modular-monolith-primer)
- [The Monolith Strikes Back by Thoughtworks](https://www.thoughtworks.com/insights/blog/monolith-strikes-back)
- [Microservices Guide by Martin Fowler](https://martinfowler.com/microservices/)
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
