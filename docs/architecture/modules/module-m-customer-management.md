# Module M — Customer Management

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module M)

---

## Purpose

Manage the customer registry — individuals and entities (body corporate, trust, partnership, association, government body) — with full beneficial ownership mapping. Customers are linked to cases via CaseParty (Module C) and are the subjects of CDD, screening, risk assessment, and ongoing monitoring.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | `createCustomer` mutation | Entity type, identification details, contact info |
| IN | `updateCustomer` mutation | Detail changes (triggers trigger-event review) |
| IN | Beneficial owner identification | Linked individuals who own/control an entity customer |
| OUT | Customer data | → CDD Orchestration, Risk Engine, Screening, Reporting |
| OUT | Customer detail change event | → Ongoing Monitoring (trigger event) |
| OUT | Beneficial ownership graph | → CDD Orchestration (each beneficial owner requires own CDD) |

---

## Key Responsibilities

1. Store customer records by entity type: individual, body corporate, trust, partnership, unincorporated association, registered foreign company, government body
2. Entity-type-specific fields defined by sector pack form templates (e.g., ABN for body corporate, trust deed reference for trust)
3. Beneficial ownership mapping: entity customer → linked individual beneficial owners (≥25% ownership or control)
4. Each beneficial owner is a Customer record with their own CDD/screening/risk assessment
5. Support "unable to determine beneficial owner" workflow with justification and escalation
6. Track customer status: `active`, `suspended` (pending CDD), `offboarded`, `archived`
7. Offboarding workflow: tipping-off-safe reason selection (risk appetite / CDD non-compliance only — never suspicion); counterparty offboarding for real estate (remove party without closing case)
8. Detect and merge duplicate customers (name + DOB + entity type match suggestion; CO confirms)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Customer** | Main | `tenant_id` | `CUST#{customer_id}` | entity_type, name, name_normalized, status (active/suspended/offboarded/archived), created_at, offboarded_at, offboard_reason | Versioned via Customer_V table for detail history |
| **Customer_V** | Main | `tenant_id#customer_id` | `CUSTV#{version}` | All customer detail fields at that version, changed_by, changed_at, payload_hash | Immutable version snapshots |
| **BeneficialOwnership** | Main | `tenant_id#entity_customer_id` | `BO#{owner_customer_id}` | ownership_percentage, control_type, verified, identified_at | Each BO is also a Customer with own CDD |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI9-CustomerStatus** | Main | `tenant_id#entity_type#status` | `name_normalized` | Customer search by type and status |
| **GSI10-CustomerName** | Main | `tenant_id` | `name_normalized` | Customer name search / duplicate detection |

---

## RBAC (from Section 8A — Case & Customer)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Create customer | Y | Y | — | — |
| Update customer details | Y | Y | — | — |
| View customers | Y | Y | Y | Y |
| Offboard customer (initiate) | — | Y | — | — |
| Offboard customer (approve) | — | — | Y | Y |

Additional:
- Offboarding reason: system-enforced compliant reasons only (no free-text "suspicious" etc.)

---

## Audit & Retention

**Audit requirements:** Customer creation, updates, status changes, beneficial ownership changes, offboarding (with reason) all logged. Previous customer detail versions retained.

**Retention:** 7 years after customer relationship ends (last case closed or offboarded date). Active customers: never deleted.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Duplicate customer created | Fragmented compliance records | Duplicate detection on create (fuzzy match); CO merge workflow |
| Beneficial owner not identified | Compliance gap for entity customers | Mandatory beneficial ownership step for non-individual entity types; "unable to determine" requires justification + escalation |
| Offboarding exposes suspicion | Tipping-off offence | System-enforced reason picker (compliant reasons only); no free-text; safe communication templates |

---

## Sector Pack Relationship

- Entity type catalogue (which types are available) is pack-driven
- Entity-type-specific form templates for customer details are pack-driven
- Jewellers routing: non-individual entity types → electronic payment referral (not designated service unless electronic payment)
- Beneficial ownership requirements per entity type defined in pack
- Offboarding reason catalogue is core (tipping-off safe reasons are universal)

---

## Amplify Gen2 Implementation Notes

- Customer model in DynamoDB: `tenant_id` PK, `customer_id` SK
- GSI: `tenant_id#entity_type#status` → query customers by type and status
- GSI: `tenant_id#name_normalized` → duplicate detection and search
- BeneficialOwnership model: `tenant_id#entity_customer_id` PK, `beneficial_owner_customer_id` SK
- Customer detail changes trigger DynamoDB Stream → Lambda → Ongoing Monitoring event

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Customer creation during CDD
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Entity customer + beneficial ownership
- [Flow 6 — Real Estate Dual-Party CDD](../flows.md#flow-6--real-estate-dual-party-cdd) — Dual-party customer creation
- [Flow 8 — Customer Offboarding](../flows.md#flow-8--customer-offboarding-with-tipping-off-controls) — Offboarding with tipping-off controls
