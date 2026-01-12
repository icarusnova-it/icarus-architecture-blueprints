# Cloud-Agnostic Storage Example

This example demonstrates how to create **cloud-agnostic storage abstractions** that work across different cloud providers (AWS S3, Azure Blob Storage, GCP Cloud Storage).

## Purpose

Show how to:
- Abstract cloud-specific storage behind interfaces
- Support multiple cloud providers
- Enable easy migration between providers
- Maintain portability

## Structure

```
cloud-agnostic-storage/
├── src/
│   ├── application/
│   │   └── interfaces/
│   │       └── IStorageService.ts    # Storage interface
│   ├── infrastructure/
│   │   ├── aws/
│   │   │   └── S3StorageService.ts   # AWS S3 implementation
│   │   ├── azure/
│   │   │   └── BlobStorageService.ts # Azure Blob implementation
│   │   └── gcp/
│   │       └── CloudStorageService.ts # GCP Cloud Storage implementation
│   └── examples/
│       └── usage.ts                  # Usage examples
└── README.md
```

## Key Principles

1. **Interface in Application Layer** – Storage interface defined in application layer
2. **Implementation in Infrastructure** – Provider-specific implementations in infrastructure
3. **Dependency Inversion** – Application depends on interface, not implementation
4. **Configuration-Based** – Provider selected via configuration

## Usage

```typescript
// Application code uses interface, not implementation
const storage = createStorageService(process.env.STORAGE_PROVIDER);
await storage.upload('documents/file.pdf', buffer);
```

## Related Documents

- **[ADR 0002 – Cloud-Agnostic Strategy](../adr/0002-cloud-agnostic-strategy.md)**
- **[Architecture Vision](../docs/architecture-vision.md)**
