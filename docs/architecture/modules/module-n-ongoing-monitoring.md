# Module N — Ongoing Monitoring

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module N)

---

## Purpose

Manage post-CDD compliance activities: periodic reviews (scheduled by risk tier), trigger event reviews (customer detail change, unusual activity, transaction threshold), rescreening, and unusual activity reporting (UAR → SMR pipeline). This module ensures customers remain compliant throughout the relationship, not just at onboarding.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Periodic review deadline (from Deadline Engine) | Scheduled by risk tier: High 12mo, Medium 2yr, Low 3yr |
| IN | Trigger event (from Customer Management, Case Management) | Detail change, unusual activity flag, threshold crossing |
| IN | Rescreening schedule (from Deadline Engine) | Periodic rescreening per monitoring plan |
| OUT | Review form | → Form Renderer (periodic review / trigger event review template) |
| OUT | Risk reassessment request | → Risk Engine |
| OUT | Rescreening request | → Screening Orchestration |
| OUT | UAR creation | → Reporting Preparation (SMR pipeline) |
| OUT | Escalation trigger | → Escalation Engine |

---

## Key Responsibilities

1. Schedule periodic reviews based on risk tier (created by Risk Engine after assessment)
2. Generate periodic review form (pre-populated with current customer data, last assessment, screening results)
3. Handle trigger events: customer detail change → trigger event review form → risk reassessment
4. Unusual activity detection: staff flags unusual activity → UAR form (restricted to CO/SM/GB) → CO evaluates → if suspicious → SMR workflow
5. Transaction monitoring (post-hoc): staff records transaction details → system checks TTR threshold (≥$10k physical currency for jewellers) → auto-trigger TTR preparation if threshold met
6. Rescreening: trigger periodic sanctions/PEP/adverse media rescreening → compare results to previous → flag changes
7. If risk rating changes after review → update monitoring schedule accordingly
8. Track monitoring plan per customer: next review date, next rescreening date, monitoring level

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **MonitoringPlan** | Main | `tenant_id#customer_id` | `MONPLAN#{version}` | risk_tier, review_frequency, next_review_date, next_rescreening_date, monitoring_level, created_at | Versioned; updated when risk tier changes |
| **TriggerEvent** | Main | `tenant_id` | `TRIG#{event_id}` | customer_id, event_type (detail_change/unusual_activity/threshold_crossing), description, status (open/reviewed/resolved), created_at | Source: DynamoDB Stream or manual flag |
| **UnusualActivityReport** | Main | `tenant_id` | `UAR#{uar_id}` | customer_id, case_id, reporter_id, description, status (draft/submitted_to_co/escalated_to_smr/closed), is_smr_restricted, created_at | Tipping-off restricted |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI13-TriggerCustomer** | Main | `tenant_id#customer_id` | `created_at` | Trigger events for a customer |

---

## RBAC (from Section 8A)

### Monitoring Operations

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Complete periodic review (data collection) | Y | Y | — | — |
| Complete periodic review (sign-off) | — | Y | — | — |
| Flag unusual activity | Y | Y | — | — |
| View monitoring plans | Y | Y | Y | Y |

### SMR / Tipping-Off Restricted Operations

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View UAR records | — | Y | Y | Y |
| Flag unusual activity | Y | Y | — | — |

Additional:
- UAR form access: `compliance_officer`, `senior_manager`, `governing_body` only (tipping-off)
- SMR pipeline: `compliance_officer` only (tipping-off)

---

## Audit & Retention

**Audit requirements:** Review completion, trigger event handling, UAR creation, risk rating changes all logged. UAR/SMR access logged separately for tipping-off compliance.

**Retention:** 7 years after customer relationship ends. SMR-linked UAR: retained with report.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Periodic review deadline missed | Compliance gap | Deadline Engine escalation; dashboard red alert; daily digest |
| Trigger event not detected | Changed details not reviewed | DynamoDB Stream on Customer model ensures all changes captured; manual flag option as backup |
| UAR visible to client-facing staff | Tipping-off risk | UAR/SMR records have `is_smr_restricted: true`; AppSync resolver enforces role check; UI hides restricted records |

---

## Sector Pack Relationship

- Periodic review form template is pack-driven
- Trigger event review form template is pack-driven
- TTR threshold amount and currency type are pack-configured (jewellers: $10k physical currency)
- UAR form template is pack-driven (sector-specific unusual activity indicators)
- Monitoring frequencies are core (risk-tier-based, not pack-specific)

---

## Amplify Gen2 Implementation Notes

- MonitoringPlan model in DynamoDB: `tenant_id#customer_id` PK, `plan_version` SK
- TriggerEvent model: `tenant_id` PK, `event_id` SK; GSI on `tenant_id#customer_id`
- UAR model: `tenant_id` PK, `uar_id` SK; attribute `is_smr_restricted: true` for access control
- Customer DynamoDB Stream → Monitoring Lambda (`monitoring-trigger`) evaluates change → creates TriggerEvent if relevant
- Monitoring Lambda also handles scheduled rescreening (invoked by Deadline Engine)

---

## Related Flows

- [Flow 3 — Suspicious Matter Report Pipeline](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) — UAR → SMR pipeline
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Full periodic review workflow
