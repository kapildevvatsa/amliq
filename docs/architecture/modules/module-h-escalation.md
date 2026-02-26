# Module H — Escalation Engine

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module H)

---

## Purpose

Route compliance decisions that require higher authority to the correct role based on RBAC and AUSTRAC governance requirements. Manages escalation queues, approval/rejection workflows, and tracks SLA deadlines for escalation responses.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Escalation trigger (from CDD, Risk, Screening, Reporting, Monitoring) | Reason, source entity, required approver role, urgency |
| IN | Approval/rejection (from approver) | Decision, justification, conditions |
| OUT | Escalation record | → Audit Trail |
| OUT | Notification | → Notification Dispatcher (to approver) |
| OUT | Approval result | → originating module (CDD proceeds, report filed, customer offboarded) |
| OUT | Deadline creation | → Deadline Engine (escalation response SLA) |

---

## Key Responsibilities

1. Create escalation records with reason, source entity reference, required approver role, and urgency level
2. Route to correct role: sanctions match → CO; high-risk CDD → CO then SM approval; SMR → CO; program approval → governing body
3. Notify approver via Notification Dispatcher (email + in-app)
4. Track escalation status: `pending` → `acknowledged` → `approved`/`rejected`/`deferred`
5. Create deadline for escalation response (configurable SLA per escalation type)
6. If escalation unacknowledged past SLA → re-escalate to next level (CO → SM → GB)
7. Record approval/rejection with mandatory justification
8. Support conditional approval (approve with additional controls required)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Escalation** | Main | `tenant_id` | `ESC#{escalation_id}` | reason, source_entity_type, source_entity_id, required_approver_role, urgency, status (pending/acknowledged/approved/rejected/deferred), created_at | Routes to correct role |
| **EscalationDecision** | Main | `tenant_id#escalation_id` | `DECISION#{decision_id}` | decision (approved/rejected/deferred), justification, conditions, decided_by, decided_at | Immutable record of each decision |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI5-RoleEscalations** | Main | `tenant_id#approver_role#status` | `created_at` | Pending escalations for a role |

---

## RBAC (from Section 8A — Escalations)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View escalations (assigned to role) | — | Y | Y | Y |
| Approve / reject escalation | — | Y (if assigned) | Y (if assigned) | Y (if assigned) |
| Create manual escalation | — | Y | — | — |

Additional:
- Create escalation: system-initiated (from other modules) or `compliance_officer`
- Self-approval: permitted only in single-employee mode (logged as self-approved)

---

## Audit & Retention

**Audit requirements:** Escalation creation, acknowledgement, decision (with justification), and re-escalation all logged with timestamps and user attribution.

**Retention:** 7 years after parent entity relevance ends.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Approver not available | Escalation stuck | Auto-re-escalate after SLA; notify next level; dashboard prominence |
| Notification delivery failure | Approver unaware | Multi-channel notification (email + in-app); dashboard badge; deadline engine catches missed acknowledgement |
| Circular escalation | Infinite loop | Max escalation depth (3 levels); terminal escalation to GB with manual-only resolution |

---

## Sector Pack Relationship

Escalation routing rules are core. Escalation reason text may use sector terminology from language pack. Escalation types (which events trigger escalation) are universal.

---

## Amplify Gen2 Implementation Notes

- Escalation model in DynamoDB: `tenant_id` PK, `escalation_id` SK
- GSI: `tenant_id#approver_role#status` → query pending escalations for a role
- Escalation Lambda (`escalation-engine`) handles creation, routing, and SLA enforcement
- AppSync subscription on escalation status for real-time approver notification

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — High-risk CDD escalation variant
- [Flow 3 — Suspicious Matter Report Pipeline](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) — Unusual activity escalation to CO
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Risk increase escalation
- [Flow 8 — Customer Offboarding](../flows.md#flow-8--customer-offboarding-with-tipping-off-controls) — Offboarding approval escalation
