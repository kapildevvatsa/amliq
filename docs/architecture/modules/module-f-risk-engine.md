# Module F — Risk Engine

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module F)

---

## Purpose

Evaluate customer ML/TF risk using deterministic, AUSTRAC-aligned scoring rules. The engine reads risk factor catalogues from the sector pack, applies universal scoring logic, and produces a risk rating (High/Medium/Low) with full factor-by-factor justification.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Risk assessment request (from CDD Orchestration) | Customer data, entity type, screening results, case details |
| IN | Risk factor catalogue (from Sector Pack) | Factors with descriptions and default ratings per category |
| IN | Country risk table (from Tenant Config) | Country → Basel score → rating, with FATF/DFAT overrides |
| IN | Risk appetite (from Tenant Config) | Factor → accept/reject + controls |
| OUT | Risk assessment record | Rating (High/Medium/Low), factor checklist, assessed_by, timestamp |
| OUT | Escalation trigger | If High → Escalation Engine |
| OUT | Monitoring schedule | Risk tier → periodic review frequency |

---

## Key Responsibilities

1. Present risk factor checklist from sector pack catalogue (4 categories: designated services, customers, delivery channels, countries)
2. Staff evaluates each factor (High/Medium/Low/N/A) with guidance text from pack
3. Apply universal scoring rules: 1+ High = High; 2+ Medium (no High) = Medium; else Low
4. Apply country risk: Basel AML Index (0-5 Low, 5.01-6 Medium, 6.01-10 High) with FATF/DFAT override to High
5. Check risk appetite: if customer risk exceeds tenant's appetite for any factor, flag for offboarding consideration
6. Support human override with mandatory justification (stored in audit trail)
7. Determine CDD level: Low → standard/simplified; Medium → full CDD; High → full + enhanced CDD
8. Determine monitoring level: Low → 3yr review; Medium → 2yr; High → 12mo
9. Create periodic review deadline based on risk tier

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **RiskAssessment** | Main | `tenant_id` | `RISK#{assessment_id}` | customer_id, factor_checklist (JSON array), rating (High/Medium/Low), override_flag, override_justification, assessed_by, assessed_at, payload_hash | Factor checklist embedded; override tracked separately |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI4-CustomerRisk** | Main | `tenant_id#customer_id` | `assessed_at` | All risk assessments for a customer |

---

## RBAC (from Section 8A — CDD, Screening & Risk)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Complete risk assessment (initial) | Y | Y | — | — |
| Override risk rating | — | Y | — | — |
| View risk assessments | Y | Y | Y | Y |

---

## Audit & Retention

**Audit requirements:** Full factor checklist stored per assessment. Override justification stored separately with approver. Rating changes logged.

**Retention:** 7 years after customer relationship ends.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Factor catalogue missing | Cannot assess risk | Fallback: use previous pack version catalogue; alert admin |
| Country not in risk table | Cannot assess geographic risk | Trigger country risk escalation workflow (CO lookup + update) |
| Override without justification | Audit gap | Validation: justification field required if override flag is set |

---

## Sector Pack Relationship

- Risk factor catalogue (all factors, descriptions, default ratings) is 100% pack-driven
- Scoring rules are universal (not pack-configured)
- Country risk table is seeded from pack defaults but tenant-editable
- Risk appetite is tenant-configured, not pack-configured
- Actions per tier (CDD level, monitoring frequency) are universal

---

## Amplify Gen2 Implementation Notes

- Risk Engine implemented as a Lambda function (`risk-engine`) invoked from CDD Orchestration
- RiskAssessment stored in DynamoDB: `tenant_id` PK, `assessment_id` SK
- GSI: `tenant_id#customer_id` → query all assessments for a customer
- Factor checklist stored as JSON array within RiskAssessment record
- Country risk lookup from Tenant config (DynamoDB read)

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Risk assessment during CDD
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Risk reassessment with escalation branches
