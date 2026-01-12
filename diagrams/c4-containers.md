# C4 – Container Diagram

## Purpose

This diagram zooms into the **Icarus Platform** system boundary, showing the high-level technical building blocks (containers). Containers are deployable units that execute code or store data.

This diagram provides the technical architecture view and helps understand:
- What containers make up the system
- Technology choices for each container
- How containers interact
- External dependencies

This diagram aligns with the [C4 Model](https://c4model.com/) Level 2 and should be referenced in [Solution Architecture](../docs/solution-architecture-template.md) documents.

---

## Container Diagram

### Diagram

```mermaid
flowchart TB
    %% Users
    User[👤 User<br/>Web Browser / Mobile App]
    Admin[👤 Administrator<br/>Admin Portal]

    %% Web Applications
    WebApp[🌐 Web Application<br/>React / TypeScript<br/>Single Page Application]
    AdminPortal[⚙️ Admin Portal<br/>React / TypeScript<br/>Administration Interface]
    MobileApp[📱 Mobile Application<br/>React Native / TypeScript<br/>iOS & Android]

    %% API Layer
    APIGateway[🚪 API Gateway<br/>Kong / AWS API Gateway<br/>Routing, Auth, Rate Limiting]

    %% Application Services
    AuthService[🔐 Authentication Service<br/>Node.js / Express<br/>JWT, OAuth]
    UserService[👥 User Service<br/>Node.js / Express<br/>User Management]
    BusinessService[💼 Business Service<br/>Node.js / Express<br/>Core Business Logic]
    PaymentService[💳 Payment Service<br/>Node.js / Express<br/>Payment Processing]
    NotificationService[📧 Notification Service<br/>Node.js / Express<br/>Email, SMS, Push]

    %% Data Stores
    UserDB[(👤 User Database<br/>PostgreSQL<br/>User Data)]
    BusinessDB[(💼 Business Database<br/>PostgreSQL<br/>Business Data)]
    PaymentDB[(💳 Payment Database<br/>PostgreSQL<br/>Transaction Data)]
    Cache[(⚡ Cache<br/>Redis<br/>Session, Rate Limiting)]
    MessageQueue[📬 Message Queue<br/>RabbitMQ / AWS SQS<br/>Async Processing]

    %% External Systems
    IdentityProvider[🔐 Identity Provider<br/>External SSO]
    PaymentGateway[💳 Payment Gateway<br/>External]
    EmailService[📧 Email Service<br/>External SMTP]

    %% User interactions
    User -->|HTTPS| WebApp
    User -->|HTTPS| MobileApp
    Admin -->|HTTPS| AdminPortal

    %% Web to API
    WebApp -->|REST API| APIGateway
    MobileApp -->|REST API| APIGateway
    AdminPortal -->|REST API| APIGateway

    %% API Gateway to Services
    APIGateway -->|HTTP| AuthService
    APIGateway -->|HTTP| UserService
    APIGateway -->|HTTP| BusinessService
    APIGateway -->|HTTP| PaymentService
    APIGateway -->|HTTP| NotificationService

    %% Service to Database
    UserService -->|SQL| UserDB
    BusinessService -->|SQL| BusinessDB
    PaymentService -->|SQL| PaymentDB
    AuthService -->|Read/Write| Cache
    UserService -->|Read/Write| Cache

    %% Service to Message Queue
    PaymentService -->|Publish| MessageQueue
    NotificationService -->|Subscribe| MessageQueue
    BusinessService -->|Publish| MessageQueue

    %% Service to External
    AuthService -->|OAuth/SAML| IdentityProvider
    PaymentService -->|REST API| PaymentGateway
    NotificationService -->|SMTP/API| EmailService

    style WebApp fill:#4a90e2,stroke:#333,stroke-width:2px
    style AdminPortal fill:#4a90e2,stroke:#333,stroke-width:2px
    style MobileApp fill:#4a90e2,stroke:#333,stroke-width:2px
    style APIGateway fill:#f39c12,stroke:#333,stroke-width:2px
    style AuthService fill:#27ae60,stroke:#333,stroke-width:2px
    style UserService fill:#27ae60,stroke:#333,stroke-width:2px
    style BusinessService fill:#27ae60,stroke:#333,stroke-width:2px
    style PaymentService fill:#27ae60,stroke:#333,stroke-width:2px
    style NotificationService fill:#27ae60,stroke:#333,stroke-width:2px
    style UserDB fill:#e74c3c,stroke:#333,stroke-width:2px
    style BusinessDB fill:#e74c3c,stroke:#333,stroke-width:2px
    style PaymentDB fill:#e74c3c,stroke:#333,stroke-width:2px
    style Cache fill:#e74c3c,stroke:#333,stroke-width:2px
    style MessageQueue fill:#9b59b6,stroke:#333,stroke-width:2px
```

---

## Containers

### Web Application
- **Technology:** React, TypeScript, Material-UI
- **Purpose:** Primary user interface for business users
- **Deployment:** Static files served via CDN, containerized
- **Features:** Responsive design, offline support, PWA capabilities
- **Authentication:** JWT tokens, SSO integration

### Admin Portal
- **Technology:** React, TypeScript, Admin UI components
- **Purpose:** Administrative interface for system management
- **Deployment:** Static files served via CDN, containerized
- **Features:** User management, system configuration, monitoring dashboards
- **Authentication:** JWT tokens with admin role, MFA required

### Mobile Application
- **Technology:** React Native, TypeScript
- **Purpose:** Mobile access for iOS and Android
- **Deployment:** App stores (Apple App Store, Google Play)
- **Features:** Native device integration, push notifications, offline mode
- **Authentication:** Biometric authentication, JWT tokens

### API Gateway
- **Technology:** Kong / AWS API Gateway
- **Purpose:** Single entry point for all API requests
- **Features:**
  - Request routing
  - Authentication and authorization
  - Rate limiting
  - Request/response transformation
  - API versioning
  - Request logging
- **Deployment:** Containerized, load balanced

### Authentication Service
- **Technology:** Node.js, Express, Passport.js
- **Purpose:** Authentication and authorization
- **Features:**
  - JWT token generation and validation
  - OAuth 2.0 integration
  - SAML integration
  - Session management
  - Password management
- **Data:** User credentials, tokens (in cache)
- **Deployment:** Containerized, horizontally scalable

### User Service
- **Technology:** Node.js, Express
- **Purpose:** User management and profile operations
- **Features:**
  - User CRUD operations
  - Profile management
  - User preferences
  - User search and filtering
- **Data:** User profiles, preferences (in User Database)
- **Deployment:** Containerized, horizontally scalable

### Business Service
- **Technology:** Node.js, Express
- **Purpose:** Core business logic and operations
- **Features:**
  - Business process orchestration
  - Business rule enforcement
  - Data validation
  - Business event publishing
- **Data:** Business entities (in Business Database)
- **Deployment:** Containerized, horizontally scalable

### Payment Service
- **Technology:** Node.js, Express
- **Purpose:** Payment processing and transaction management
- **Features:**
  - Payment processing
  - Transaction management
  - Refund processing
  - Payment gateway integration
  - Payment event publishing
- **Data:** Transactions, payment records (in Payment Database)
- **Deployment:** Containerized, horizontally scalable
- **Security:** PCI-DSS compliance considerations

### Notification Service
- **Technology:** Node.js, Express
- **Purpose:** Notification delivery (email, SMS, push)
- **Features:**
  - Email notifications
  - SMS notifications
  - Push notifications
  - Notification templates
  - Delivery tracking
- **Data:** Notification queue (from Message Queue)
- **Deployment:** Containerized, horizontally scalable

### User Database
- **Technology:** PostgreSQL
- **Purpose:** User data storage
- **Data:** User profiles, authentication data, preferences
- **Features:** ACID transactions, backups, replication
- **Deployment:** Managed database service or containerized

### Business Database
- **Technology:** PostgreSQL
- **Purpose:** Business data storage
- **Data:** Business entities, transactions, business rules
- **Features:** ACID transactions, backups, replication
- **Deployment:** Managed database service or containerized

### Payment Database
- **Technology:** PostgreSQL
- **Purpose:** Payment and transaction data storage
- **Data:** Payment transactions, refunds, payment methods
- **Features:** ACID transactions, backups, replication, encryption
- **Deployment:** Managed database service or containerized
- **Security:** Encrypted at rest, PCI-DSS compliance

### Cache
- **Technology:** Redis
- **Purpose:** Caching and session storage
- **Data:**
  - User sessions
  - Rate limiting counters
  - Frequently accessed data
  - Temporary data
- **Features:** In-memory storage, TTL support, pub/sub
- **Deployment:** Containerized or managed service

### Message Queue
- **Technology:** RabbitMQ / AWS SQS
- **Purpose:** Asynchronous message processing
- **Features:**
  - Message queuing
  - Pub/sub messaging
  - Message persistence
  - Dead letter queues
- **Use Cases:**
  - Payment processing events
  - Notification delivery
  - Business event processing
- **Deployment:** Containerized or managed service

---

## Technology Decisions

### Frontend
- **React/TypeScript:** Modern, type-safe, large ecosystem
- **Material-UI:** Consistent design system
- **React Native:** Cross-platform mobile development

### Backend
- **Node.js/Express:** JavaScript ecosystem, fast development
- **Containerized:** Docker for consistent deployments

### Databases
- **PostgreSQL:** Relational database, ACID compliance, JSON support
- **Redis:** High-performance caching and session storage

### Infrastructure
- **API Gateway:** Centralized API management
- **Message Queue:** Asynchronous processing

**Reference:** See [ADR 0001](../adr/0001-why-clean-architecture.md) for architecture decisions.

---

## Communication Patterns

### Synchronous
- **HTTP/REST:** Primary communication pattern
- **API Gateway → Services:** HTTP requests
- **Services → Databases:** SQL queries

### Asynchronous
- **Message Queue:** Event-driven processing
- **Pub/Sub:** Event publishing and subscription

### External
- **OAuth 2.0:** Authentication with Identity Provider
- **REST API:** Payment Gateway integration
- **SMTP/API:** Email service integration

---

## Security Considerations

### API Gateway
- Authentication and authorization
- Rate limiting
- Request validation
- SSL/TLS termination

### Services
- Service-to-service authentication
- Input validation
- Output sanitization
- Error handling (no sensitive data leakage)

### Databases
- Encrypted connections
- Encrypted at rest (sensitive data)
- Access control
- Backup encryption

---

## Related Documents

- **[System Context Diagram](./c4-system-context.md)** – Higher level view
- **[Component Diagrams](./c4-components.md)** – Next level of detail
- **[Architecture Decision Records](../adr/)** – Technology decisions

---

**Last Updated:** 2026-01-15  
**Maintained by:** Icarus Nova IT Architecture Team
