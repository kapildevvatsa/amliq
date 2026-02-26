# Module O — Program Management

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module O)

---

## Purpose

Manage the tenant's AML/CTF program documents, compliance calendar, annual compliance report preparation, and independent review tracking. AUSTRAC requires every reporting entity to have and maintain a written AML/CTF program — this module is the system of record for that obligation.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Program document creation/edit | CO drafts/updates program parts (Part A: customer identification, Part B: reporting, governance) |
| IN | Program approval (from governing body) | GB reviews and approves program document versions |
| IN | Independent review completion | External reviewer submits findings; CO records |
| OUT | Program document versions | → Evidence Store (immutable, versioned) |
| OUT | Compliance calendar deadlines | → Deadline Engine (ACR, independent review, program review) |
| OUT | Annual compliance report data | → Reporting Preparation (ACR content) |

---

## Key Responsibilities

1. Structure AML/CTF program as versioned document with parts:
   - Part A: Customer identification and verification procedures
   - Part B: Reporting obligations (SMR, TTR, IFTI)
   - Governance: roles, responsibilities, escalation procedures
   - Risk management: risk appetite, risk assessment methodology
   - Training: training obligations and schedule
   - Record keeping: retention policies
2. Version control: edits create new version; previous versions immutable; diff view between versions
3. Program approval workflow: CO drafts → SM reviews → GB approves → version published
4. Compliance calendar: recurring deadlines (ACR 31 Mar, program review annually, independent review every 2-3 years, training refresher)
5. Independent review tracking: record reviewer details, scope, findings, remediation actions, completion dates
6. Annual compliance report (ACR) data compilation: aggregate system data (cases, screenings, SARs filed, training completed, incidents) for ACR preparation
7. Program change triggers: regulatory update, sector pack update, post-incident remediation — logged with justification

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **ProgramDocument** | Main | `tenant_id` | `PROG#{document_id}` | document_type (part_a/part_b/governance/risk/training/records), title, status (draft/review/approved/superseded), current_version | Container; versions in ProgramVersion |
| **ProgramVersion** | Main | `tenant_id#document_id` | `PROGV#{version}` | content (structured JSON/markdown), approved_by, approved_at, payload_hash, change_justification | Immutable once approved |
| **ComplianceCalendarEntry** | Main | `tenant_id` | `CAL#{entry_id}` | entry_type, title, recurrence_rule, next_due, deadline_id, status | Links to Deadline for tracking |
| **IndependentReview** | Main | `tenant_id` | `IREV#{review_id}` | reviewer_name, reviewer_firm, scope, start_date, end_date, findings (JSON), remediation_actions (JSON), status | Tracks external review cycle |

### Relevant GSIs

No dedicated GSIs. Direct key lookups on Main table.

---

## RBAC (from Section 8A — Program, Governance & Training)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View AML/CTF program | Y | Y | Y | Y |
| Draft / edit program | — | Y | — | — |
| Review program | — | — | Y | — |
| Approve program | — | — | — | Y |
| Record independent review | — | Y | — | Y |

---

## Audit & Retention

**Audit requirements:** All program document changes, approvals, and version publications logged. Independent review records and remediation tracking logged.

**Retention:**
- All program versions retained for 7 years after superseded
- Current version retained for tenant lifetime

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Program not approved before go-live | Operating without approved program | Onboarding checklist enforces program approval before first case creation |
| ACR deadline missed | Reporting offence | Deadline Engine escalation; starts tracking 60 days before 31 Mar |
| Independent review overdue | Compliance gap | Deadline Engine tracks review cycle; escalation to GB |

---

## Sector Pack Relationship

- Program document templates (section structure, guidance text) are pack-driven
- Designated service descriptions in Part A come from pack
- Risk factor references in risk management section come from pack
- Compliance calendar seed entries (which deadlines to create) are pack-driven with core defaults

---

## Amplify Gen2 Implementation Notes

- ProgramDocument model in DynamoDB: `tenant_id` PK, `document_id` SK
- ProgramVersion model: `tenant_id#document_id` PK, `version_number` SK
- Program content stored as structured markdown/JSON; rendered in frontend
- ComplianceCalendarEntry model: `tenant_id` PK, `entry_id` SK; links to Deadline records
- IndependentReview model: `tenant_id` PK, `review_id` SK

---

## Related Flows

- ACR preparation feeds into [Flow 3](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) (reporting module) for annual compliance reporting
