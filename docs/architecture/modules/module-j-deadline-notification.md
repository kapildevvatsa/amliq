# Module J — Deadline & Notification Engine

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module J)

---

## Purpose

Track every time-sensitive compliance obligation as a deterministic Deadline entity with lifecycle, warnings, escalation on miss, and multi-channel notification delivery. The engine runs independently of user sessions on EventBridge schedule.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Deadline creation (from any module) | Type, due date/time, owner role, linked entity, warning schedule |
| IN | Deadline acknowledgement/completion (from user) | Status update |
| IN | EventBridge scheduled tick (every 15 min) | Trigger deadline scan |
| OUT | Notification (email, in-app, SMS) | → SES, SNS, AppSync subscription |
| OUT | Escalation trigger | → Escalation Engine (on overdue) |
| OUT | Dashboard data | → Dashboard (deadline widgets, red/amber/green) |

---

## Key Responsibilities

1. Manage deadline lifecycle: `pending` → `warned` → `due` → `met`/`overdue`/`missed`
2. Deadline types with rules (all configurable):
   - SMR initial notification: 24 hours from suspicion formed
   - SMR supplementary report: 3 business days from suspicion formed
   - TTR filing: 10 business days from transaction
   - Delayed CDD completion: 20 days (accountants), sector-configurable
   - Periodic review: 12mo (High), 2yr (Medium), 3yr (Low) from last review
   - CO notification to AUSTRAC: 14 days from appointment
   - ACR submission: 31 March annually
   - Escalation response SLA: configurable per escalation type
3. Warning notifications at configurable intervals (e.g., 72h, 24h, 4h before due)
4. On overdue: escalate to next role level; mark dashboard red
5. On missed (past grace period): create compliance incident record; escalate to GB
6. Support business-day calculation (AU public holidays + state holidays, configurable)
7. Multi-channel notification: email (SES), in-app (AppSync subscription), SMS (SNS) based on tenant notification preferences
8. Daily digest email: summary of upcoming/overdue deadlines per role

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Deadline** | Main | `tenant_id` | `DL#{deadline_id}` | deadline_type, due_date, status (pending/warned/due/met/overdue/missed), linked_entity_type, linked_entity_id, owner_role, warning_schedule (JSON), acknowledged_at, completed_at, is_smr_restricted | Lifecycle tracked by engine |
| **Notification** | Notifications | `tenant_id#user_id` | `NOTIF#{notification_id}` | channel (email/in_app/sms), status (queued/sent/delivered/failed), subject, body_ref, sent_at, deadline_id | Dedicated table for high throughput |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI7-DeadlineStatus** | Main | `tenant_id#status` | `due_date` | Upcoming/overdue deadlines sorted by due date |
| **GSI8-DeadlineEntity** | Main | `tenant_id#linked_entity_type#linked_entity_id` | `due_date` | Deadlines for a specific entity |
| **GSI15-NotifUser** | Notifications | `tenant_id#user_id#status` | `sent_at` | Notifications for a user by status |

---

## RBAC

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View deadlines | Y | Y | Y | Y |
| View SMR-linked deadlines | — | Y | Y | Y |
| Acknowledge/complete deadline | (if assigned) | (if assigned) | (if assigned) | (if assigned) |
| Configure notification preferences | — | Y | — | Y |

Additional:
- Create deadline: system-initiated (from other modules)
- SMR-linked deadlines restricted per tipping-off rules

---

## Audit & Retention

**Audit requirements:** Deadline creation, warning sent, acknowledgement, completion, overdue, missed — all logged with timestamps. Notification delivery status logged.

**Retention:**
- Deadline records: 7 years after deadline resolution
- Notifications: 90 days (TTL attribute on DynamoDB)

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| EventBridge schedule fails | Deadlines not checked | CloudWatch alarm on missing invocations; manual trigger available; secondary schedule as backup |
| SES/SNS delivery failure | User not notified | Retry with exponential backoff; fall back to alternate channel; in-app notification always attempted |
| Business day calculation error | Deadline date wrong | Unit-tested holiday calendar; tenant-configurable state selection; manual override |

---

## Sector Pack Relationship

Deadline type catalogue (which deadlines exist) is mostly core. Delayed CDD duration is pack-configured. Periodic review frequencies are universal (risk-tier-based). Business day rules are tenant-configured (state selection).

---

## Amplify Gen2 Implementation Notes

- Deadline model in DynamoDB: `tenant_id` PK, `deadline_id` SK
- GSI: `tenant_id#status#due_date` → query upcoming/overdue deadlines
- GSI: `tenant_id#linked_entity` → deadlines for a specific case/customer/report
- Deadline Lambda (`deadline-engine`) triggered by EventBridge rule (every 15 min)
- Notification Dispatcher Lambda (`notification-dispatcher`) handles SES/SNS/AppSync delivery
- AppSync subscription `onDeadlineWarning(tenant_id)` for real-time in-app alerts

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — TTR + periodic review deadlines
- [Flow 3 — Suspicious Matter Report Pipeline](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) — SMR 24h + 3d deadlines
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Periodic review deadline scan + warning
- [Flow 8 — Customer Offboarding](../flows.md#flow-8--customer-offboarding-with-tipping-off-controls) — Deadline cancellation on offboarding
