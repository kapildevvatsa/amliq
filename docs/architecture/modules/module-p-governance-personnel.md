# Module P — Governance, Personnel & Training

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module P)

---

## Purpose

Track the tenant's governance structure (CO appointment, senior manager designation, governing body members), personnel due diligence for AML/CTF roles, and training completion records. AUSTRAC requires that reporting entities appoint a CO, conduct personnel checks, and deliver AML/CTF training.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Personnel record creation | Name, role, appointment date, due diligence status |
| IN | Training record creation | Course, completion date, next due date, evidence (certificate) |
| IN | CO appointment/change | → Deadline Engine (14-day AUSTRAC notification deadline) |
| OUT | Governance structure | → Program Management (program document governance section) |
| OUT | Training compliance data | → Dashboard, ACR preparation |
| OUT | Personnel due diligence status | → RBAC (block privileged role assignment if due diligence incomplete) |

---

## Key Responsibilities

1. Record governance roles: CO (mandatory), senior manager, governing body members — with appointment dates and status
2. CO appointment change → create 14-day deadline for AUSTRAC notification (manual submission)
3. Personnel due diligence for AML/CTF-relevant roles: background check status, police check, ASIC disqualification check, reference check
4. Block privileged role assignment (`compliance_officer`, `senior_manager`, `governing_body`) until due diligence marked complete (configurable: enforce or warn)
5. Training management: define required courses per role (from sector pack), track completion, schedule refresher deadlines
6. Training record: course name, provider, completion date, expiry date, evidence file (certificate uploaded to Evidence Store)
7. Dashboard widget: training compliance percentage per role; overdue training alerts
8. Support single-employee mode: sole practitioner holds all roles; due diligence and training still tracked but self-attested

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **PersonnelRecord** | Main | `tenant_id` | `PERS#{personnel_id}` | user_id, role, appointment_date, due_diligence_status (pending/complete), bg_check, police_check, reference_check | Links to UserProfile |
| **GovernanceRole** | Main | `tenant_id` | `GOVROLE#{role_type}` | holder_user_id, appointed_at, previous_holder, notification_deadline_id | CO change → 14-day deadline |
| **TrainingRecord** | Main | `tenant_id#personnel_id` | `TRAIN#{training_id}` | course_name, provider, completed_at, expiry_date, evidence_id, status | Certificate stored in Evidence Store |
| **TrainingRequirement** | Main | `tenant_id` | `TREQ#{requirement_id}` | role, course_name, frequency, is_mandatory | Seeded from sector pack |

### Relevant GSIs

No dedicated GSIs. Direct key lookups on Main table.

---

## RBAC (from Section 8A — Program, Governance & Training)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Manage personnel records | — | Y | — | Y |
| Record training completion (self) | Self | Self | Self | Self |
| Record training completion (others) | — | Y | — | — |
| View training records | — | Y | Y | Y |
| View governance structure | Y | Y | Y | Y |

---

## Audit & Retention

**Audit requirements:** Role appointments, due diligence status changes, training completions all logged with timestamps and evidence references.

**Retention:**
- Personnel records: 7 years after role end date
- Training records: 7 years after completion
- Active personnel: never deleted

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| CO appointment notification deadline missed | Reporting offence | Deadline Engine escalation; created automatically on CO change; dashboard red alert |
| Training overdue | Compliance gap | Deadline Engine tracks training expiry; escalation to CO/SM; dashboard widget |
| Due diligence incomplete for privileged role | Unvetted personnel in compliance role | Configurable enforcement: block role assignment or warn + log override |

---

## Sector Pack Relationship

- Training requirement catalogue (which courses per role) is pack-driven with core defaults
- Due diligence checklist items may vary by sector (pack-configured)
- Governance role labels use sector language pack (e.g., "principal" vs "director" vs "managing agent")

---

## Amplify Gen2 Implementation Notes

- PersonnelRecord model in DynamoDB: `tenant_id` PK, `personnel_id` SK
- GovernanceRole model: `tenant_id` PK, `role_type` SK (CO, SM, GB member)
- TrainingRecord model: `tenant_id#personnel_id` PK, `training_id` SK
- TrainingRequirement model: `tenant_id` PK, `requirement_id` SK (seeded from pack on tenant creation)
- CO change detection: GovernanceRole update → Lambda → Deadline Engine (14-day notification deadline)

---

## Related Flows

- CO appointment change triggers a 14-day AUSTRAC notification deadline via [Deadline Engine](../flows.md#flow-4--periodic-review--risk-reassessment)
