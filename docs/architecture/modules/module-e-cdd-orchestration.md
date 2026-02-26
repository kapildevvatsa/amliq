# Module E — CDD Orchestration

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module E)

---

## Purpose

Orchestrate the full customer due diligence lifecycle: onboarding → identity verification → entity verification → beneficial ownership mapping → screening → risk assessment → escalation/approval. This module coordinates other modules but doesn't own the screening or risk rating logic.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | CDD triggered (from Case Management) | New case party requires CDD |
| IN | Entity type selected | Determines CDD path (full CDD vs electronic payment referral for jewellers) |
| IN | Pre-commencement flag | Lighter CDD for existing customers (1 Jul 2026) |
| OUT | CDD status updates | → Case Management (per CaseParty) |
| OUT | Screening requests | → Screening Orchestration |
| OUT | Risk assessment request | → Risk Engine |
| OUT | Escalation trigger | → Escalation Engine |
| OUT | Deadline creation | → Deadline Engine (for delayed CDD) |

---

## Key Responsibilities

1. Route CDD based on entity type + sector rules:
   - Jewellers non-individual entities → electronic payment referral (not regulated, no CDD)
   - All other cases → full CDD workflow
2. Orchestrate onboarding form completion (entity-type-specific template from pack)
3. Trigger sanctions screening immediately — cannot be delayed regardless of risk level
4. Trigger PEP and adverse media screening
5. Trigger identity verification (IDV provider integration or manual document upload)
6. For body corporate/trust/partnership/association/government body: trigger beneficial ownership mapping (Accountants, Real Estate)
7. For entity customers: trigger entity verification (ASIC/ABR lookup, trust deed)
8. Coordinate risk assessment (pass collected data to Risk Engine)
9. If High risk → trigger escalation to CO
10. Support delayed CDD workflow: track delay justification, create deadline (20-day for accountants), enforce sanctions-cannot-delay
11. Support simplified CDD for Low-risk customers (reduced verification depth, but sanctions still required)
12. Support alternative ID justification workflow for vulnerable customers
13. Track CDD completion status per CaseParty

---

## Data Entities

### Owned Entities

None directly. This module orchestrates across Customer, CaseParty, CompletedForm, ScreeningResult, RiskAssessment.

CDD state is tracked on the **CaseParty** record (`cdd_status` field):
`not_started` → `onboarding` → `screening` → `verifying` → `assessing` → `complete` / `escalated` / `delayed`

---

## RBAC (from Section 8A — CDD, Screening & Risk)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Initiate CDD | Y | Y | — | — |
| Complete onboarding form | Y | Y | — | — |
| Complete enhanced CDD form | — | Y | — | — |
| Approve enhanced CDD | — | — | Y | Y |
| View CDD status | Y | Y | Y | Y |

---

## Audit & Retention

**Audit requirements:** Every CDD state transition logged (initiated → screening → verified → assessed → approved/escalated). Delayed CDD justification and deadline creation logged.

**Retention:** CDD records follow customer retention (7 years after relationship ends).

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| IDV provider unavailable | CDD blocked | Fallback to manual document upload; flag for follow-up verification |
| Screening provider unavailable | Sanctions check blocked (compliance risk) | Fallback to manual DFAT list check; log manual verification; high-priority alert to CO |
| CDD state machine stuck | Customer blocked from service | CDD status dashboard with "stuck" indicator; CO can manually advance with justification |

---

## Sector Pack Relationship

- Entity type routing rules (which types get full CDD, which get alternative routing)
- Onboarding form templates (entity-type-specific)
- CDD form templates
- Delayed CDD rules (duration, conditions)
- Evidence type prompts for enhanced CDD (source of funds/wealth)

---

## Amplify Gen2 Implementation Notes

- CDD Orchestration implemented as a Lambda function (`cdd-orchestrator`) invoked by AppSync mutations
- State tracked on CaseParty record (`cdd_status` field)
- Uses Step Functions-style logic within Lambda (sequential steps with checkpoint writes to DynamoDB)
- Alternative: AWS Step Functions for complex long-running CDD workflows (evaluate complexity at implementation)

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Full CDD walkthrough
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Entity CDD + beneficial ownership
- [Flow 6 — Real Estate Dual-Party CDD](../flows.md#flow-6--real-estate-dual-party-cdd) — Parallel CDD for both parties
