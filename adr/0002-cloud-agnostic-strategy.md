# ADR 0002 – Cloud-Agnostic Strategy

## Status
Accepted

## Context

### The Problem

Vendor lock-in limits long-term flexibility and negotiation power. When systems are tightly coupled to a specific cloud provider's proprietary services, organizations face several challenges:

- **Reduced negotiation leverage** – Difficult to negotiate better pricing or terms when migration is costly
- **Limited flexibility** – Cannot easily take advantage of better services or pricing from other providers
- **Migration barriers** – Moving to a different cloud provider requires significant re-architecture
- **Cost optimization constraints** – Cannot optimize costs by leveraging best-in-class services from different providers
- **Regional limitations** – Some cloud providers may not have presence in required regions
- **Compliance constraints** – Some regulations may require data residency in specific regions or with specific providers
- **Business continuity risks** – Over-reliance on a single provider creates business continuity risks
- **Innovation constraints** – Locked into provider's innovation timeline and priorities

### Historical Context

At Icarus Nova, we have observed:

- **Cost escalation** – Cloud costs increasing over time with limited ability to negotiate
- **Service limitations** – Needing features available in other cloud providers but unable to leverage them
- **Multi-cloud requirements** – Business requirements for using multiple cloud providers (e.g., for compliance, redundancy, or cost optimization)
- **Acquisition scenarios** – Mergers and acquisitions bringing systems from different cloud providers
- **Regulatory changes** – New regulations requiring data residency or specific cloud provider certifications
- **Vendor relationship issues** – Need for flexibility when vendor relationships change

### Business Drivers

This decision supports our core architectural drivers:

- **Business continuity** – Ability to migrate or use multiple providers reduces risk
- **Regulatory compliance** – Flexibility to meet data residency and compliance requirements across different regions
- **Scalability** – Can leverage best-in-class services from different providers
- **Operational resilience** – Not dependent on a single provider's availability or policies

### When Cloud-Agnostic Makes Sense

Cloud-agnostic architecture is valuable when:
- **Multi-cloud is a business requirement** – Compliance, redundancy, or business strategy requires multiple providers
- **Long-term flexibility is critical** – Business needs may change, requiring provider flexibility
- **Cost optimization is important** – Ability to leverage best pricing and services from different providers
- **Regulatory requirements** – Need to meet data residency or compliance requirements across regions
- **Negotiation leverage** – Want to maintain ability to negotiate with providers

### When Cloud-Native May Be Better

Cloud-agnostic is not always the right choice. Cloud-native (provider-specific) may be better when:
- **Rapid time-to-market is critical** – Provider-specific services enable faster development
- **Cost is not a primary concern** – Willing to pay premium for convenience and speed
- **Provider commitment is long-term** – Strong strategic partnership with a single provider
- **Unique provider capabilities** – Need capabilities only available from one provider
- **Small scale** – Migration cost would exceed benefits

## Decision

Design architectures that can run across cloud providers **when business value justifies it**.

### Strategy: Pragmatic Cloud-Agnostic Approach

We adopt a **pragmatic cloud-agnostic strategy** that balances portability with practical considerations:

1. **Core application logic** – Design to be cloud-agnostic
2. **Infrastructure abstraction** – Abstract cloud-specific services behind interfaces
3. **Provider-specific optimizations** – Use provider-specific services when business value is clear
4. **Clear boundaries** – Maintain clear boundaries between portable and provider-specific code
5. **Documentation** – Document provider-specific dependencies and migration paths

### Architectural Principles

#### 1. Abstraction Layers

Create abstraction layers for cloud services:

- **Storage abstraction** – Abstract object storage (S3, Blob Storage, Cloud Storage)
- **Database abstraction** – Abstract managed databases (RDS, Azure SQL, Cloud SQL)
- **Messaging abstraction** – Abstract messaging services (SQS, Service Bus, Pub/Sub)
- **Compute abstraction** – Abstract compute services (Lambda, Functions, Cloud Functions)
- **Identity abstraction** – Abstract identity services (Cognito, Azure AD, Identity Platform)

#### 2. Standard Protocols and Formats

Prefer standard protocols and formats:

- **HTTP/REST** – Standard REST APIs over provider-specific APIs
- **Standard data formats** – JSON, XML, Protocol Buffers
- **Standard protocols** – SQL, MQTT, AMQP
- **Container standards** – Docker, Kubernetes (avoid provider-specific container services)

#### 3. Infrastructure as Code

Use infrastructure as code tools that support multiple providers:

- **Terraform** – Multi-cloud infrastructure provisioning
- **Pulumi** – Multi-cloud infrastructure as code
- **Kubernetes** – Container orchestration that runs anywhere
- **Helm** – Package management for Kubernetes

#### 4. Configuration Management

Externalize configuration to enable provider-specific settings:

- **Environment-based configuration** – Different configs for different providers
- **Feature flags** – Enable/disable provider-specific features
- **Service discovery** – Abstract service discovery mechanisms

### Implementation Approach

#### Layer 1: Application Code (Cloud-Agnostic)

- **Business logic** – Pure business logic, no cloud dependencies
- **Domain models** – Domain entities and value objects
- **Use cases** – Application use cases
- **Interfaces** – Define interfaces for infrastructure services

#### Layer 2: Infrastructure Abstraction (Cloud-Agnostic Interface)

- **Service interfaces** – Define interfaces for cloud services
- **Abstractions** – Storage, database, messaging abstractions
- **Ports** – Ports in hexagonal architecture pattern

#### Layer 3: Infrastructure Implementation (Provider-Specific)

- **Adapters** – Provider-specific implementations of interfaces
- **Cloud SDKs** – Use cloud provider SDKs here
- **Provider services** – Leverage provider-specific services when appropriate

#### Layer 4: Infrastructure Provisioning (Provider-Specific)

- **Terraform modules** – Provider-specific infrastructure code
- **Cloud-specific configs** – Provider-specific configurations
- **Deployment pipelines** – Provider-specific deployment steps

### When to Use Provider-Specific Services

We use provider-specific services when:

- **Clear business value** – Significant cost savings, performance improvements, or unique capabilities
- **Documented decision** – Decision documented in an ADR with rationale
- **Abstraction possible** – Can abstract behind an interface for future migration
- **Migration path** – Have a plan for migration if needed

**Examples of acceptable provider-specific usage:**
- AWS Lambda for serverless functions (with abstraction layer)
- Azure Cognitive Services for AI (with abstraction layer)
- GCP BigQuery for analytics (with abstraction layer)
- Provider-specific monitoring tools (with abstraction for metrics export)

## Consequences

### Positive Consequences

#### Portability

- **Multi-cloud capability** – Systems can run on multiple cloud providers
- **Migration flexibility** – Can migrate between providers when needed
- **Hybrid cloud** – Can run parts of system on different providers
- **Disaster recovery** – Can use different providers for disaster recovery

**Example:**
```typescript
// Cloud-agnostic interface
interface ObjectStorage {
  upload(key: string, data: Buffer): Promise<void>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
}

// AWS implementation
class S3Storage implements ObjectStorage {
  async upload(key: string, data: Buffer) {
    // AWS S3 implementation
  }
}

// Azure implementation
class BlobStorage implements ObjectStorage {
  async upload(key: string, data: Buffer) {
    // Azure Blob Storage implementation
  }
}

// Application code uses interface, not implementation
class DocumentService {
  constructor(private storage: ObjectStorage) {}
  
  async saveDocument(id: string, content: Buffer) {
    await this.storage.upload(`documents/${id}`, content);
  }
}
```

#### Negotiation Leverage

- **Competitive pressure** – Can negotiate better terms by demonstrating portability
- **Cost optimization** – Can leverage best pricing from different providers
- **Service selection** – Can choose best-in-class services from different providers
- **Vendor relationships** – Maintain healthy vendor relationships through competition

#### Risk Mitigation

- **Business continuity** – Not dependent on single provider's availability
- **Compliance flexibility** – Can meet regional compliance requirements
- **Vendor lock-in reduction** – Reduced risk of being locked into unfavorable terms
- **Technology evolution** – Can adopt new technologies from any provider

#### Additional Benefits

- **Team skills** – Teams learn cloud-agnostic patterns applicable across providers
- **Code reuse** – Business logic can be reused across different cloud deployments
- **Testing** – Can test with different providers or local implementations
- **Documentation** – Forces explicit documentation of cloud dependencies

### Negative Consequences

#### Increased Abstraction Cost

- **Additional layers** – More abstraction layers to design and maintain
- **Interface design** – Need to design good abstractions that work across providers
- **Mapping complexity** – May need to map between different provider concepts
- **Performance overhead** – Abstraction layers may add slight performance overhead

**Mitigation:**
- Design abstractions carefully, don't over-abstract
- Use proven patterns (repository pattern, adapter pattern)
- Profile and optimize where necessary
- Accept that some overhead is worth the flexibility

#### Initial Complexity

- **More code** – More interfaces and implementations
- **Learning curve** – Teams need to understand abstraction patterns
- **Design decisions** – More architectural decisions to make
- **Testing complexity** – Need to test with multiple implementations

**Mitigation:**
- Start simple, add abstractions as needed
- Use established patterns and libraries
- Create reference implementations
- Provide training and documentation

#### Potential Performance Trade-offs

- **Abstraction overhead** – Interface calls may have slight overhead
- **Suboptimal implementations** – Generic abstractions may not leverage provider-specific optimizations
- **Feature limitations** – May not be able to use advanced provider-specific features

**Mitigation:**
- Profile and measure actual impact (often negligible)
- Use provider-specific optimizations behind abstractions when valuable
- Document performance characteristics
- Balance portability with performance needs

#### Development Velocity

- **Slower initial development** – More upfront design and abstraction work
- **More testing** – Need to test multiple implementations
- **Configuration complexity** – More configuration for different providers

**Mitigation:**
- Use infrastructure as code to reduce configuration complexity
- Automate testing across providers
- Create development templates
- Focus abstraction on high-value areas

## Trade-offs

### Considered Alternatives

#### 1. Full Cloud-Native (Provider-Specific)

- **Description** – Use provider-specific services directly, no abstraction
- **Pros** – Fastest development, best performance, access to all provider features
- **Cons** – Complete vendor lock-in, difficult migration, limited negotiation power
- **Decision** – Rejected for core systems, acceptable for specific use cases with documented rationale

#### 2. Full Cloud-Agnostic (Maximum Portability)

- **Description** – Abstraction for everything, avoid all provider-specific services
- **Pros** – Maximum portability, no vendor lock-in
- **Cons** – Significant overhead, may miss valuable provider features, slower development
- **Decision** – Rejected as too extreme; pragmatic approach is better

#### 3. Hybrid Approach (Selected)

- **Description** – Cloud-agnostic core with strategic use of provider-specific services
- **Pros** – Balances portability with practical benefits, flexible
- **Cons** – Requires discipline and clear boundaries
- **Decision** – **Accepted** – This is our chosen approach

### Trade-off Analysis

| Aspect | Cloud-Agnostic | Cloud-Native |
|--------|---------------|--------------|
| **Initial Development Speed** | Slower (abstraction work) | Faster (direct provider services) |
| **Long-term Flexibility** | High | Low |
| **Vendor Lock-in** | Low | High |
| **Negotiation Leverage** | High | Low |
| **Performance** | Slightly lower (abstraction) | Optimal (native services) |
| **Feature Access** | Limited to common features | Full provider feature set |
| **Migration Cost** | Low | High |
| **Complexity** | Higher | Lower |
| **Cost Optimization** | Can leverage multiple providers | Limited to one provider |

### Decision Rationale

We chose a **pragmatic cloud-agnostic strategy** because:

1. **Business continuity** – Architecture Vision emphasizes business continuity; cloud-agnostic reduces provider dependency risk
2. **Regulatory compliance** – Need flexibility to meet regional compliance requirements
3. **Cost optimization** – Ability to leverage best pricing and services from different providers
4. **Long-term value** – Initial investment in abstraction pays off in flexibility and negotiation power
5. **Pragmatic balance** – Not dogmatic; use provider-specific services when business value is clear

## Implementation Guidelines

### Abstraction Patterns

#### Repository Pattern for Storage

```typescript
// Interface
interface StorageRepository {
  save(key: string, data: Buffer): Promise<void>;
  get(key: string): Promise<Buffer | null>;
  delete(key: string): Promise<void>;
}

// AWS S3 implementation
class S3StorageRepository implements StorageRepository {
  // S3-specific implementation
}

// Azure Blob implementation
class AzureBlobStorageRepository implements StorageRepository {
  // Azure-specific implementation
}
```

#### Adapter Pattern for Services

```typescript
// Messaging interface
interface MessageQueue {
  sendMessage(queue: string, message: any): Promise<void>;
  receiveMessages(queue: string): Promise<Message[]>;
}

// AWS SQS adapter
class SQSAdapter implements MessageQueue {
  // SQS-specific implementation
}

// Azure Service Bus adapter
class ServiceBusAdapter implements MessageQueue {
  // Service Bus-specific implementation
}
```

### Infrastructure as Code

#### Terraform Multi-Cloud Example

```hcl
# variables.tf
variable "cloud_provider" {
  description = "Cloud provider: aws, azure, or gcp"
  type        = string
}

# main.tf - Provider-agnostic resources
module "storage" {
  source = "./modules/storage/${var.cloud_provider}"
  # Common configuration
}

module "database" {
  source = "./modules/database/${var.cloud_provider}"
  # Common configuration
}
```

#### Kubernetes for Compute

- Use Kubernetes for container orchestration (runs on all major clouds)
- Use standard Kubernetes APIs, avoid cloud-specific extensions
- Abstract cloud-specific services (load balancers, storage classes) behind Kubernetes resources

### Configuration Management

#### Environment-Based Configuration

```yaml
# config/aws.yaml
storage:
  type: s3
  bucket: my-bucket
  region: us-east-1

# config/azure.yaml
storage:
  type: blob
  account: myaccount
  container: mycontainer

# Application code
const config = loadConfig(process.env.CLOUD_PROVIDER);
const storage = createStorage(config.storage);
```

### Testing Strategy

- **Unit tests** – Test against interfaces, mock implementations
- **Integration tests** – Test with local implementations (MinIO for S3, Azurite for Azure)
- **Provider tests** – Test with actual cloud providers in CI/CD
- **Contract tests** – Ensure implementations meet interface contracts

### Documentation Requirements

- **Provider dependencies** – Document all provider-specific dependencies
- **Migration guides** – Document how to migrate between providers
- **Abstraction boundaries** – Clearly document what is abstracted and what is provider-specific
- **ADR references** – Reference ADRs for provider-specific service usage decisions

## Examples

### Before (Cloud-Specific)

```typescript
// Tightly coupled to AWS
import { S3 } from 'aws-sdk';

class DocumentService {
  private s3 = new S3();
  
  async saveDocument(id: string, content: Buffer) {
    await this.s3.putObject({
      Bucket: 'my-bucket',
      Key: `documents/${id}`,
      Body: content
    }).promise();
  }
}
```

**Problems:**
- Cannot run on Azure or GCP
- Cannot test without AWS
- Tightly coupled to AWS SDK
- Difficult to migrate

### After (Cloud-Agnostic)

```typescript
// Cloud-agnostic interface
interface StorageService {
  save(key: string, content: Buffer): Promise<void>;
  get(key: string): Promise<Buffer | null>;
}

// AWS implementation
class S3StorageService implements StorageService {
  private s3 = new S3();
  
  async save(key: string, content: Buffer) {
    await this.s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: content
    }).promise();
  }
}

// Azure implementation
class BlobStorageService implements StorageService {
  private blobService = createBlobService();
  
  async save(key: string, content: Buffer) {
    await this.blobService.createBlockBlobFromText(
      process.env.AZURE_CONTAINER,
      key,
      content.toString()
    );
  }
}

// Application code
class DocumentService {
  constructor(private storage: StorageService) {}
  
  async saveDocument(id: string, content: Buffer) {
    await this.storage.save(`documents/${id}`, content);
  }
}
```

**Benefits:**
- Can run on any cloud provider
- Can test with mock implementations
- Easy to add new provider implementations
- Business logic independent of cloud provider

## When to Deviate

### Acceptable Provider-Specific Usage

It's acceptable to use provider-specific services when:

1. **Clear business value** – Significant cost, performance, or capability advantage
2. **Documented in ADR** – Decision documented with rationale
3. **Abstracted when possible** – Abstracted behind interface for future flexibility
4. **Migration path exists** – Have a plan for migration if needed

**Examples:**
- AWS Lambda for serverless (with function interface abstraction)
- Azure Cognitive Services for AI (with AI service interface)
- GCP BigQuery for analytics (with analytics interface)
- Provider-specific monitoring (with metrics export abstraction)

### Documentation Requirements

When using provider-specific services:
- Document in ADR why provider-specific service was chosen
- Abstract behind interface when possible
- Document migration path if needed
- Include in architecture diagrams

## Compliance

This ADR aligns with the [Architecture Vision](../docs/architecture-vision.md):
- ✅ **Architecture follows business drivers** – Cloud-agnostic supports business continuity and compliance
- ✅ **Explicit trade-offs** – This ADR documents trade-offs explicitly
- ✅ **Evolutionary design** – Cloud-agnostic supports incremental evolution across providers
- ✅ **Simplicity before sophistication** – Pragmatic approach, not dogmatic

## Related ADRs

- ADR 0001 – Why Clean Architecture (supports cloud-agnostic through abstraction)
- (Future) ADR on specific cloud service choices
- (Future) ADR on infrastructure as code tool selection
- (Future) ADR on container orchestration strategy

## References

- [Cloud Native Computing Foundation](https://www.cncf.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform Multi-Cloud](https://www.terraform.io/docs)
- [12-Factor App Methodology](https://12factor.net/)
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
