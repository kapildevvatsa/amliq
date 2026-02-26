# Module D — Form Renderer

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module D)

---

## Purpose

Render, validate, and store compliance forms from sector pack JSON/YAML templates. Every completed form is an evidence artefact with a frozen schema version reference and payload hash.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Form template (from Sector Pack) | JSON schema defining fields, sections, conditional logic, validation rules, guidance text |
| IN | User input (form submission) | Field values entered by staff |
| OUT | CompletedForm record | Stored with schema_version, payload, payload_hash, submitted_by, timestamp |
| OUT | Form data | → CDD Orchestration, Risk Engine, Reporting, Evidence Export |

---

## Key Responsibilities

1. Parse JSON form templates from sector pack into renderable React form components
2. Support field types: text, number, date, select, multi-select, checkbox, file upload, signature, conditional section (show/hide based on other field values)
3. Apply validation rules from template (required, regex, min/max, cross-field)
4. Replace terminology tokens with sector language pack strings (e.g., `{{customer_label}}` → "customer" or "client")
5. On submission: freeze the schema version used, compute SHA-256 hash of payload, store as CompletedForm
6. Completed forms are immutable — corrections create a new form version linked to the original
7. Support pre-population from existing customer data for periodic review and trigger event forms
8. Render guidance text (from pack) as contextual help per field/section

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **CompletedForm** | Main | `tenant_id` | `FORM#{form_id}` | form_type, schema_version, pack_asset_ref, entity_type, entity_id, payload (JSON), payload_hash, submitted_by, submitted_at, parent_form_id (for corrections) | Immutable; corrections link to parent |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI2-EntityForms** | Main | `tenant_id#entity_type#entity_id` | `submitted_at` | All forms for a customer/case |

---

## RBAC (from Section 8A — CDD, Screening & Risk)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Complete onboarding form | Y | Y | — | — |
| Complete enhanced CDD form | — | Y | — | — |

Additional:
- Form submission role depends on form type (onboarding → `client_facing`+; enhanced CDD → `compliance_officer`+; SMR → `compliance_officer`+ only)
- Form read: scoped by SMR tipping-off rules (UAR/SMR forms restricted to CO/SM/GB)

---

## Audit & Retention

**Audit requirements:** Form submission logged with user, timestamp, schema version, payload hash. Form corrections logged with reference to original.

**Retention:** 7 years after parent entity (customer/case/program) relevance ends. CDD records follow customer retention rules.

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Template schema invalid | Form won't render | Schema validation on pack deployment; fallback to previous version |
| Payload hash mismatch on read | Evidence integrity question | Alert; compare stored hash with recomputed hash; log discrepancy |
| Large file upload timeout | Form submission fails | Multipart upload to S3; form payload references S3 key; retry |

---

## Sector Pack Relationship

Form templates are 100% pack-driven. The renderer is generic — all sector specificity comes from the template JSON. Terminology is injected from the language pack at render time.

---

## Amplify Gen2 Implementation Notes

- CompletedForm model in DynamoDB: `tenant_id` PK, `form_id` SK
- GSI: `tenant_id#entity_type#entity_id` → query forms for a customer/case
- Schema version references PackAssetRef (which form template + version was used)
- File uploads via Amplify Storage (S3) with tenant-prefixed keys
- Frontend: dynamic form renderer component reads template JSON and renders React Hook Form fields

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — Onboarding form completion
- [Flow 3 — Suspicious Matter Report Pipeline](../flows.md#flow-3--suspicious-matter-report-smr-pipeline) — SMR form completion
- [Flow 4 — Periodic Review & Risk Reassessment](../flows.md#flow-4--periodic-review--risk-reassessment) — Periodic review form
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Entity onboarding forms
