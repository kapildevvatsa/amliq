# Module I — Reporting Preparation

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module I)

---

## Purpose

Prepare structured content for AUSTRAC reports — SMR (Suspicious Matter Report), TTR (Threshold Transaction Report), IFTI (International Funds Transfer Instruction), CBM (Correspondent Banking Monthly), and ACR (Annual Compliance Report). T2C prepares report content only; submission to AUSTRAC Online is **manual**.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Report trigger (from Escalation, Monitoring, Deadline Engine) | Report type, source case/customer, triggering event |
| IN | Report form completion (from CO) | Structured report content per AUSTRAC schema |
| OUT | ReportPreparation record | Type, content, status, deadline, submission reference |
| OUT | Deadline creation | → Deadline Engine (SMR 24h initial / 3d supplementary; TTR 10 business days) |
| OUT | Evidence artefact | → Evidence Store (completed report content + submission confirmation) |

---

## Key Responsibilities

1. SMR workflow: suspicion formed → 24h initial notification deadline → 3-day supplementary report deadline → CO review → manual submission → record AUSTRAC reference + timestamp
2. TTR workflow: threshold crossed (≥$10k cash) → 10 business day deadline → auto-populate from transaction data → CO review → manual submission
3. IFTI workflow: international transfer → deadline → form preparation → CO review → manual submission
4. CBM workflow (if applicable): monthly compilation → deadline → CO review → manual submission
5. ACR workflow: annual compliance report → 31 March deadline → CO compiles from system data → GB approval → manual submission
6. Validate report content against AUSTRAC field requirements before marking "ready for submission"
7. Record submission confirmation (AUSTRAC reference number, submission timestamp) after manual filing
8. Support report amendment workflow (supplementary/corrective reports linked to original)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **ReportPreparation** | Main | `tenant_id` | `RPT#{report_id}` | report_type (SMR/TTR/IFTI/CBM/ACR), status (draft/review/ready/submitted/amended), content (JSON per AUSTRAC schema), deadline_id, is_smr_restricted, created_by, created_at, payload_hash | SMR reports access-restricted |
| **ReportSubmission** | Main | `tenant_id#report_id` | `SUB#{submission_id}` | austrac_reference, submitted_at, submitted_by, submission_type (initial/supplementary/corrective), evidence_id | Records manual AUSTRAC filing |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI6-ReportTypeStatus** | Main | `tenant_id#report_type#status` | `created_at` | Reports by type and status |

---

## RBAC (from Section 8A)

### SMR / Tipping-Off Restricted Operations

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Create / edit SMR report | — | Y | — | — |
| View SMR records | — | Y | Y | Y |
| Record SMR submission | — | Y | — | — |

### Reporting (Non-SMR)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View TTR / IFTI / CBM reports | — | Y | Y | Y |
| Create / edit TTR / IFTI / CBM | — | Y | — | — |
| Record report submission | — | Y | — | — |
| Create / edit ACR | — | Y | — | — |
| Approve ACR | — | — | — | Y |

---

## Audit & Retention

**Audit requirements:** Report creation, edits, review, submission, and amendment all logged. SMR access logged separately for tipping-off compliance.

**Retention:** 7 years after report submission date. Amended reports: 7yr from latest amendment.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Report deadline missed | Reporting offence | Deadline Engine escalation; dashboard red alert; daily digest to CO + SM |
| Report content validation fails | Cannot submit | Validation errors shown in-form; CO must resolve before "ready" status |
| Submission confirmation not recorded | No evidence of filing | Reminder notification until confirmation recorded; escalation if >24h |

---

## Sector Pack Relationship

Report types available are universal (SMR/TTR are sector-agnostic). TTR threshold trigger logic for jewellers (physical currency ≥$10k) is pack-configured. IFTI applicability is pack-configured. CBM applicability is pack-configured.

---

## Amplify Gen2 Implementation Notes

- ReportPreparation model in DynamoDB: `tenant_id` PK, `report_id` SK
- GSI: `tenant_id#report_type#status` → query reports by type and status
- Report content stored as structured JSON matching AUSTRAC field schema
- Reporting Lambda (`report-preparation`) handles form validation and deadline creation
- SMR records use additional DynamoDB attribute `is_smr_restricted: true` for resolver-level access control

---

## Related Flows

- [Flow 3 — Suspicious Matter Report Pipeline](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) — Full SMR workflow with tipping-off controls
