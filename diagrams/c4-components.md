# C4 – Component Diagram

## Purpose

This diagram zooms into the **Business Service** container, showing the components (logical groupings of code) inside it. Components represent the internal structure of a container.

This diagram helps understand:
- What components make up the container
- Responsibilities of each component
- How components interact
- Dependencies between components

This diagram aligns with the [C4 Model](https://c4model.com/) Level 3. Similar component diagrams can be created for other containers as needed.

---

## Business Service Component Diagram

### Diagram

```mermaid
flowchart TB
    %% External
    APIGateway[API Gateway<br/>External]
    BusinessDB[(Business Database<br/>External)]
    MessageQueue[Message Queue<br/>External]

    %% API Layer
    RESTController[REST Controller<br/>Express Routes<br/>Request/Response Handling]
    GraphQLController[GraphQL Controller<br/>GraphQL Resolvers<br/>Query/Mutation Handling]

    %% Application Layer
    OrderUseCase[Order Use Case<br/>Order Management<br/>Business Logic]
    ProductUseCase[Product Use Case<br/>Product Management<br/>Business Logic]
    InventoryUseCase[Inventory Use Case<br/>Inventory Management<br/>Business Logic]

    %% Domain Layer
    OrderDomain[Order Domain<br/>Order Entity<br/>Business Rules]
    ProductDomain[Product Domain<br/>Product Entity<br/>Business Rules]
    InventoryDomain[Inventory Domain<br/>Inventory Entity<br/>Business Rules]

    %% Infrastructure Layer
    OrderRepository[Order Repository<br/>Data Access<br/>Database Operations]
    ProductRepository[Product Repository<br/>Data Access<br/>Database Operations]
    InventoryRepository[Inventory Repository<br/>Data Access<br/>Database Operations]
    EventPublisher[Event Publisher<br/>Message Publishing<br/>Event Broadcasting]

    %% External connections
    APIGateway -->|HTTP| RESTController
    APIGateway -->|GraphQL| GraphQLController

    %% Controller to Use Case
    RESTController -->|Calls| OrderUseCase
    RESTController -->|Calls| ProductUseCase
    RESTController -->|Calls| InventoryUseCase
    GraphQLController -->|Calls| OrderUseCase
    GraphQLController -->|Calls| ProductUseCase
    GraphQLController -->|Calls| InventoryUseCase

    %% Use Case to Domain
    OrderUseCase -->|Uses| OrderDomain
    ProductUseCase -->|Uses| ProductDomain
    InventoryUseCase -->|Uses| InventoryDomain

    %% Use Case to Repository
    OrderUseCase -->|Uses| OrderRepository
    ProductUseCase -->|Uses| ProductRepository
    InventoryUseCase -->|Uses| InventoryRepository

    %% Use Case to Event Publisher
    OrderUseCase -->|Publishes| EventPublisher
    ProductUseCase -->|Publishes| EventPublisher
    InventoryUseCase -->|Publishes| EventPublisher

    %% Repository to Database
    OrderRepository -->|SQL| BusinessDB
    ProductRepository -->|SQL| BusinessDB
    InventoryRepository -->|SQL| BusinessDB

    %% Event Publisher to Queue
    EventPublisher -->|Publish| MessageQueue

    style RESTController fill:#4a90e2,stroke:#333,stroke-width:2px
    style GraphQLController fill:#4a90e2,stroke:#333,stroke-width:2px
    style OrderUseCase fill:#27ae60,stroke:#333,stroke-width:2px
    style ProductUseCase fill:#27ae60,stroke:#333,stroke-width:2px
    style InventoryUseCase fill:#27ae60,stroke:#333,stroke-width:2px
    style OrderDomain fill:#f39c12,stroke:#333,stroke-width:2px
    style ProductDomain fill:#f39c12,stroke:#333,stroke-width:2px
    style InventoryDomain fill:#f39c12,stroke:#333,stroke-width:2px
    style OrderRepository fill:#9b59b6,stroke:#333,stroke-width:2px
    style ProductRepository fill:#9b59b6,stroke:#333,stroke-width:2px
    style InventoryRepository fill:#9b59b6,stroke:#333,stroke-width:2px
    style EventPublisher fill:#9b59b6,stroke:#333,stroke-width:2px
```

---

## Components

### Presentation Layer

#### REST Controller
- **Technology:** Express.js routes
- **Purpose:** Handle HTTP REST API requests
- **Responsibilities:**
  - Request validation
  - Request/response transformation
  - Error handling
  - HTTP status codes
- **Dependencies:** Use Cases

#### GraphQL Controller
- **Technology:** GraphQL resolvers (Apollo Server)
- **Purpose:** Handle GraphQL queries and mutations
- **Responsibilities:**
  - Query resolution
  - Mutation execution
  - Field resolvers
  - Error handling
- **Dependencies:** Use Cases

### Application Layer

#### Order Use Case
- **Purpose:** Order management business logic
- **Responsibilities:**
  - Create order
  - Update order
  - Cancel order
  - Get order details
  - Order validation
- **Dependencies:** Order Domain, Order Repository, Event Publisher

#### Product Use Case
- **Purpose:** Product management business logic
- **Responsibilities:**
  - Create product
  - Update product
  - Get product details
  - Product search
  - Product validation
- **Dependencies:** Product Domain, Product Repository, Event Publisher

#### Inventory Use Case
- **Purpose:** Inventory management business logic
- **Responsibilities:**
  - Check inventory
  - Update inventory
  - Reserve inventory
  - Release inventory
  - Inventory validation
- **Dependencies:** Inventory Domain, Inventory Repository, Event Publisher

### Domain Layer

#### Order Domain
- **Purpose:** Order domain model and business rules
- **Responsibilities:**
  - Order entity
  - Order business rules
  - Order state management
  - Order validation rules
- **Dependencies:** None (pure domain logic)

#### Product Domain
- **Purpose:** Product domain model and business rules
- **Responsibilities:**
  - Product entity
  - Product business rules
  - Product validation rules
  - Product pricing rules
- **Dependencies:** None (pure domain logic)

#### Inventory Domain
- **Purpose:** Inventory domain model and business rules
- **Responsibilities:**
  - Inventory entity
  - Inventory business rules
  - Stock validation
  - Reservation logic
- **Dependencies:** None (pure domain logic)

### Infrastructure Layer

#### Order Repository
- **Purpose:** Data access for orders
- **Responsibilities:**
  - Save order
  - Find order by ID
  - Find orders by criteria
  - Update order
  - Delete order
- **Dependencies:** Business Database

#### Product Repository
- **Purpose:** Data access for products
- **Responsibilities:**
  - Save product
  - Find product by ID
  - Find products by criteria
  - Update product
  - Delete product
- **Dependencies:** Business Database

#### Inventory Repository
- **Purpose:** Data access for inventory
- **Responsibilities:**
  - Get inventory levels
  - Update inventory
  - Reserve inventory
  - Release inventory
- **Dependencies:** Business Database

#### Event Publisher
- **Purpose:** Publish domain events
- **Responsibilities:**
  - Publish events to message queue
  - Event serialization
  - Event routing
- **Dependencies:** Message Queue

---

## Architecture Pattern

This component structure follows **Clean Architecture** principles:

1. **Dependency Rule:** Dependencies point inward
   - Presentation depends on Application
   - Application depends on Domain
   - Infrastructure depends on Application and Domain
   - Domain has no dependencies

2. **Separation of Concerns:**
   - **Presentation:** HTTP/GraphQL handling
   - **Application:** Use cases and orchestration
   - **Domain:** Business logic and rules
   - **Infrastructure:** Technical implementations

3. **Dependency Inversion:**
   - Use Cases depend on Repository interfaces (defined in Application layer)
   - Infrastructure implements Repository interfaces

**Reference:** See [ADR 0001](../adr/0001-why-clean-architecture.md) for Clean Architecture details.

---

## Component Interactions

### Request Flow

1. **API Gateway** → **REST/GraphQL Controller** (HTTP request)
2. **Controller** → **Use Case** (business operation)
3. **Use Case** → **Domain** (business rules validation)
4. **Use Case** → **Repository** (data access)
5. **Repository** → **Database** (SQL query)
6. **Use Case** → **Event Publisher** (publish domain event)
7. **Event Publisher** → **Message Queue** (async message)

### Event Flow

1. **Use Case** executes business logic
2. **Domain** raises domain events
3. **Use Case** publishes events via **Event Publisher**
4. **Event Publisher** sends to **Message Queue**
5. Other services consume events from queue

---

## Related Documents

- **[Container Diagram](./c4-containers.md)** – Higher level view
- **[Clean Architecture ADR](../adr/0001-why-clean-architecture.md)** – Architecture pattern
- **[Solution Architecture Template](../docs/solution-architecture-template.md)** – Architecture documentation

---

**Last Updated:** 2026-01-15  
**Maintained by:** Icarus Nova IT Architecture Team
