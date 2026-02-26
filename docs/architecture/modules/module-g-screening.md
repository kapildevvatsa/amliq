# Module G — Screening Orchestration

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module G)

---

## Purpose

Coordinate sanctions (DFAT), PEP, and adverse media screening against external providers (Refinitiv / Dow Jones) and local DFAT list. Sanctions screening is mandatory and **cannot be delayed** regardless of risk level or delayed-CDD status.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Screening request (from CDD Orchestration) | Customer name, DOB, nationality, entity details |
| IN | Rescreening trigger (from Ongoing Monitoring) | Periodic or trigger-event-driven rescreening |
| OUT | ScreeningResult record | Match status, match details, provider response hash, timestamp |
| OUT | Sanctions match alert | → Escalation Engine (immediate block) |
| OUT | PEP/adverse media flags | → Risk Engine (factor input) |

---

## Key Responsibilities

1. DFAT sanctions screening on every customer — first step, cannot be deferred
2. PEP screening via external provider
3. Adverse media screening via external provider
4. Store raw provider response as hashed evidence artefact in Evidence Store
5. Parse provider response into structured ScreeningResult
6. Support manual DFAT list check fallback if provider unavailable
7. Support rescreening (periodic + trigger-event) with delta comparison to previous results
8. Manage screening provider API keys per tenant (or platform-wide)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **ScreeningRequest** | Main | `tenant_id` | `SCRREQ#{request_id}` | customer_id, screening_type (sanctions/pep/adverse_media), provider, requested_at, status | Tracks outbound provider call |
| **ScreeningResult** | Main | `tenant_id` | `SCRRES#{result_id}` | request_id, customer_id, screening_type, match_status (clear/potential_match/confirmed_match), match_details (JSON), provider_response_hash, s3_evidence_key, screened_at | Raw response hashed and stored in S3 |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI3-CustomerScreenings** | Main | `tenant_id#customer_id` | `screened_at` | All screenings for a customer |

---

## RBAC (from Section 8A — CDD, Screening & Risk)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Initiate screening (via CDD workflow) | Y | Y | — | — |
| View screening results | — | Y | Y | Y |

Additional:
- Sanctions match details: restricted if linked to SMR (tipping-off controls apply)

---

## Audit & Retention

**Audit requirements:** Every screening request/response logged with provider, timestamp, match status, response hash. Manual DFAT checks logged with verifier and source.

**Retention:** 7 years after customer relationship ends. Raw provider responses retained alongside structured results.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Provider API unavailable | Sanctions check blocked | Fallback to manual DFAT list check; high-priority CO alert; CDD cannot proceed until sanctions cleared |
| Provider returns false positive | Unnecessary escalation | CO review step for all matches; resolution recorded with justification |
| Provider response hash mismatch | Evidence integrity question | Re-fetch and compare; log discrepancy; alert admin |

---

## Sector Pack Relationship

Screening is core (not pack-configured). Entity name formatting rules may vary by pack (e.g., trust name conventions).

---

## Amplify Gen2 Implementation Notes

- Screening Lambda (`screening-orchestrator`) invoked from CDD Orchestration
- ScreeningResult in DynamoDB: `tenant_id` PK, `screening_id` SK
- GSI: `tenant_id#customer_id` → all screenings for a customer
- Raw provider response stored in S3 Evidence bucket with SHA-256 hash recorded in ScreeningResult
- Provider API keys stored in AWS Secrets Manager, referenced by Lambda environment

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Sanctions + PEP + adverse media screening
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Rescreening with delta comparison
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Entity + BO screening
- [Flow 6 — Real Estate Dual-Party CDD](../flows.md#flow-6--real-estate-dual-party-cdd) — Parallel screening for both parties
