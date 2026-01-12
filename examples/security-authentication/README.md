# Security by Design Example – Authentication

This example demonstrates **Security by Design** principles for authentication and authorization, showing secure defaults, least privilege, and proper security practices.

## Purpose

Show how to:
- Implement secure authentication
- Use JWT tokens properly
- Enforce least privilege
- Follow security best practices

## Structure

```
security-authentication/
├── src/
│   ├── domain/
│   │   └── User.ts
│   ├── application/
│   │   ├── services/
│   │   │   ├── AuthenticationService.ts
│   │   │   └── AuthorizationService.ts
│   │   └── interfaces/
│   │       └── ITokenService.ts
│   ├── infrastructure/
│   │   ├── security/
│   │   │   ├── JWTTokenService.ts
│   │   │   └── PasswordHasher.ts
│   │   └── persistence/
│   │       └── UserRepository.ts
│   └── presentation/
│       └── middleware/
│           ├── AuthenticationMiddleware.ts
│           └── AuthorizationMiddleware.ts
└── README.md
```

## Key Principles Demonstrated

1. **Secure Defaults** – Strong password requirements, secure token settings
2. **Least Privilege** – Role-based access control
3. **Defense in Depth** – Multiple security layers
4. **No Hardcoded Secrets** – Secrets from environment/config

## Security Features

- Password hashing (bcrypt)
- JWT token generation and validation
- Role-based access control (RBAC)
- Secure session management
- Input validation
- Error handling (no information leakage)

## Related Documents

- **[Security by Design](../docs/security-by-design.md)**
- **[Architecture Vision](../docs/architecture-vision.md)**
