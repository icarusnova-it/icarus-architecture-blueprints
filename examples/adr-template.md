# ADR Template

This is a template for creating Architecture Decision Records (ADRs). Use this template when documenting significant architectural decisions.

## Template

```markdown
# ADR {number} – {Short Title}

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context

### The Problem
Describe the problem or situation that requires a decision.

### Historical Context
What has happened in the past that led to this decision?

### Business Drivers
How does this decision support business goals?
- Business continuity
- Regulatory compliance
- Scalability
- Security
- Operational resilience

### When {Decision} Makes Sense
When is this decision appropriate?

### When {Decision} Doesn't Make Sense
When should this decision NOT be used?

## Decision

{Describe the decision clearly}

### What is {Decision}?
{Explain the decision in detail}

### {Decision} Details
{Provide specific details about the decision}

### Implementation Approach
{How will this be implemented?}

## Consequences

### Positive Consequences
- {Benefit 1}
- {Benefit 2}
- {Benefit 3}

### Negative Consequences
- {Drawback 1}
- {Drawback 2}
- {Drawback 3}

**Mitigation:**
{How to mitigate negative consequences}

## Trade-offs

### Considered Alternatives
1. **Alternative 1**
   - Description: {description}
   - Pros: {pros}
   - Cons: {cons}
   - Decision: {accepted/rejected}

2. **Alternative 2**
   - Description: {description}
   - Pros: {pros}
   - Cons: {cons}
   - Decision: {accepted/rejected}

### Trade-off Analysis
| Aspect | {Decision} | {Alternative} |
|--------|-----------|--------------|
| {Aspect 1} | {Value} | {Value} |
| {Aspect 2} | {Value} | {Value} |

### Decision Rationale
Why was this decision chosen?

## Implementation Guidelines

{Provide guidelines for implementing this decision}

## Examples

### Before
{Show code/architecture before decision}

### After
{Show code/architecture after decision}

## Compliance

This ADR aligns with the [Architecture Vision](../docs/architecture-vision.md):
- ✅ {Principle 1}
- ✅ {Principle 2}

## Related ADRs

- ADR {number} – {Related decision}
- (Future) ADR on {future decision}

## References

- {External resource 1}
- {External resource 2}
- [Architecture Vision](../docs/architecture-vision.md)

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | YYYY-MM-DD | Name | Initial ADR |

---

**Decision Date:** YYYY-MM-DD  
**Decision Makers:** {Team/Person}  
**Status:** {Status}  
**Next Review:** YYYY-MM-DD (6 months)
```

## Example: Completed ADR

See [ADR 0001](../adr/0001-why-clean-architecture.md) for a complete example of an ADR using this template.

## Guidelines

### When to Create an ADR

Create an ADR when:
- Making a significant architectural decision
- Choosing a technology or framework
- Deciding on an architectural pattern
- Making a decision that affects multiple teams
- Making a decision that's difficult to reverse

### ADR Status

- **Proposed** – Decision under consideration
- **Accepted** – Decision approved and being implemented
- **Deprecated** – Decision is no longer recommended
- **Superseded** – Decision replaced by a newer ADR

### ADR Maintenance

- Review ADRs quarterly
- Update when context changes
- Deprecate when no longer relevant
- Link related ADRs

## Related Documents

- **[Architecture Vision](../docs/architecture-vision.md)** – Overall principles
- **[Solution Architecture Template](../docs/solution-architecture-template.md)** – Architecture documentation
- **[Existing ADRs](../adr/)** – Reference implementations

---

**Last Updated:** 2026-01-15  
**Maintained by:** Icarus Nova IT Architecture Team
