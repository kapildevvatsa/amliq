# Module K — Audit Trail & Evidence Integrity

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module K)

---

## Purpose

Maintain an append-only, hash-chained audit log for every compliance-relevant action in the system. Provide tamper-evident integrity verification and support evidence pack generation for AUSTRAC review.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Audit event (from every module) | Action type, actor, tenant_id, entity references, payload snapshot, timestamp |
| OUT | AuditLog records | Immutable, append-only, hash-chained |
| OUT | Integrity verification result | → Dashboard (integrity status widget) |
| OUT | Audit data | → Evidence Export (scoped query for evidence packs) |

---

## Key Responsibilities

1. Write every compliance-relevant action as an AuditLog entry (append-only — no UPDATE, no DELETE)
2. Hash chain: each entry's hash = SHA-256(previous_chain_hash + current_entry_data)
3. IAM policy on AuditLog table: `PutItem` and `Query/GetItem` only — no `UpdateItem`, no `DeleteItem`
4. Periodic integrity verification job (daily, EventBridge): walk chain, verify hashes, alert on break
5. Store: action_type, actor_id, actor_role, tenant_id, entity_type, entity_id, payload_snapshot (relevant field values at time of action), timestamp, entry_hash, chain_hash
6. Support scoped queries: by tenant, by entity, by actor, by date range, by action type
7. High-volume write path: batch writes with ordering guarantee (sequence number per tenant)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **AuditLog** | AuditLog (dedicated) | `tenant_id` | `{sequence_number}` | action_type, actor_id, actor_role, entity_type, entity_id, payload_snapshot (JSON), timestamp, entry_hash, chain_hash | **Dedicated table.** Append-only. No UPDATE/DELETE IAM. |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI11-AuditEntity** | AuditLog | `tenant_id#entity_type#entity_id` | `timestamp` | Audit trail for a specific entity |
| **GSI12-AuditActor** | AuditLog | `tenant_id#actor_id` | `timestamp` | Audit trail for a specific user |

---

## RBAC (from Section 8A — Evidence & Audit)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View audit log | — | Y | Y | Y |

Additional:
- Write audit entry: system-only (Lambda functions via internal calls — no user-facing mutation)
- No role can delete or modify audit entries
- IAM enforcement: DynamoDB table policy restricts to PutItem + Query/GetItem

---

## Audit & Retention

**Audit requirements:** The audit trail IS the audit system. Integrity verification results are themselves logged (in a separate verification log).

**Retention:**
- 7 years from entry creation
- Entries are never deleted before retention expiry
- Integrity-flagged entries: retained indefinitely
- Dedicated retention job (never runs on main scan; separate approval gate)

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Hash chain break detected | Evidence integrity compromised | Alert CO + admin; isolate affected range; forensic investigation; generate integrity report |
| Audit write failure | Action proceeds without evidence | Retry with DLQ (dead letter queue); action blocks if audit write fails after retries (fail-closed) |
| High write volume throttling | Audit entries delayed | DynamoDB on-demand capacity; batch writes; SQS buffer for burst |

---

## Sector Pack Relationship

None. Audit trail is 100% core. Action type catalogue is universal.

---

## Amplify Gen2 Implementation Notes

- AuditLog model in DynamoDB: `tenant_id` PK, `sequence_number` SK (monotonically increasing per tenant)
- GSI: `tenant_id#entity_type#entity_id` → audit trail for a specific entity
- GSI: `tenant_id#actor_id#timestamp` → audit trail for a specific user
- Audit Writer Lambda (`audit-writer`) accepts events from SQS queue (decoupled from source modules)
- SQS FIFO queue ensures ordering per tenant (message group ID = tenant_id)
- Hash Chain Verifier Lambda (`hash-verifier`) triggered daily by EventBridge
- DynamoDB table IAM policy explicitly denies `dynamodb:UpdateItem` and `dynamodb:DeleteItem`

---

## Related Flows

- All flows emit audit events to this module
- [Flow 7 — Evidence Pack Export](../flows.md#flow-7--evidence-pack-export) — Audit trail included in evidence packs
