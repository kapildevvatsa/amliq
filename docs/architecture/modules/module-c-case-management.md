# Module C — Case Management

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module C)

---

## Purpose

Manage the central Case entity — the activity unit that triggers and organises all compliance workflows. Cases are subtyped per sector (Transaction, Engagement, Property Transaction) and linked to customers via CaseParty (many-to-many).

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | `createCase` mutation | Staff creates a new case (type determined by sector entry point) |
| IN | `addCaseParty` mutation | Link a customer to a case with a role |
| IN | `updateCaseStatus` mutation | Progress case through lifecycle |
| OUT | Case created event | → CDD Orchestration (triggers onboarding) |
| OUT | Case party linked event | → CDD Orchestration (triggers CDD per party) |
| OUT | Case data | → Reporting, Evidence Export |

---

## Key Responsibilities

1. Create cases with sector-specific subtypes (using `case_type` discriminator from pack workflow entry point)
2. Jewellers: Transaction subtype — capture items, value, payment method, physical currency amount, threshold assessment, regulated flag
3. Accountants: Engagement subtype — capture Table 6 service type, engagement description, ongoing vs one-off
4. Real Estate: Property Transaction subtype — capture property address, transaction type (sale/lease/manage), dual-party structure
5. Manage CaseParty links — customer + case + role (buyer/seller/landlord/tenant/client/counterparty) + CDD status per party
6. Enforce: no party can proceed to service delivery until CDD status is complete (or delayed CDD is approved)
7. Support counterparty offboarding (Real Estate) — remove counterparty without closing case for direct client

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Case** | Main | `tenant_id` | `CASE#{case_id}` | case_type (transaction/engagement/property_transaction), status, created_by, created_at, closed_at, details (typed JSON per subtype) | Subtype fields in `details` JSON |
| **CaseParty** | Main | `tenant_id#case_id` | `PARTY#{customer_id}#{role}` | role (buyer/seller/client/counterparty/…), cdd_status, linked_at | Many-to-many Case↔Customer |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI1-CustomerCases** | Main | `tenant_id#customer_id` | `case_id#role` | All cases for a customer (via CaseParty) |

---

## RBAC (from Section 8A — Case & Customer)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Create case | Y | Y | — | — |
| View cases | Y | Y | Y | Y |
| Update case status (compliance) | — | Y | — | — |
| Add / remove case party | Y | Y | — | — |

---

## Audit & Retention

**Audit requirements:** Case creation, status changes, party additions/removals all logged with timestamps and user attribution.

**Retention:** 7 years after case end date (closed_at). Open cases: never deleted.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Case created without party | Orphan case | Validation: at least one party required on creation (except real estate where parties may be added as identified) |
| Duplicate case for same transaction | Duplicate compliance records | Idempotency key on case creation (tenant_id + case_type + reference fields) |
| CDD status out of sync with actual CDD | Service delivered without CDD | CDD Orchestration module is source of truth; Case reads CDD status, doesn't write it |

---

## Sector Pack Relationship

- `case_type` discriminator mapped from sector pack workflow entry point
- Sector-specific fields on case subtypes (transaction value, service type, property address) defined in pack form templates
- "Is this regulated?" logic for jewellers is a pack-configured decision tree

---

## Amplify Gen2 Implementation Notes

- Case model in DynamoDB with `tenant_id` as partition key, `case_id` as sort key
- CaseParty model with `case_id` as partition key, `customer_id#role` as sort key
- GSI on CaseParty: `tenant_id#customer_id` → query all cases for a customer
- `case_type` stored as enum discriminator; subtype fields stored as a typed JSON `details` attribute
- AppSync subscription on case status change for real-time dashboard updates

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Transaction case creation + CDD
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Engagement case creation
- [Flow 6 — Real Estate Dual-Party CDD](../flows.md#flow-6--real-estate-dual-party-cdd) — Property transaction + dual-party
- [Flow 8 — Customer Offboarding](../flows.md#flow-8--customer-offboarding-with-tipping-off-controls) — Case closure on offboarding
