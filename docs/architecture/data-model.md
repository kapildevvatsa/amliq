# T2C (AMLIQ) — Data Model

> **Source:** Extracted verbatim from Section 6 of the master design document
> (`docs/architecture/module-design-document.md`, lines 1445–1594).

---

## 6. Data Model

### 6A. Design Rules

All DynamoDB models follow these invariants:

| Rule | Description |
|:-----|:-----------|
| **R1 — tenant_id-first partitioning** | Every table uses `tenant_id` (or a composite beginning with `tenant_id`) as its partition key. No query can accidentally cross tenants. |
| **R2 — Single-table where natural** | Entities with shared access patterns (e.g., Case + CaseParty) may share a table using type-prefixed sort keys. Entities with distinct throughput profiles or IAM requirements (AuditLog, Subscription) get dedicated tables. |
| **R3 — No overwrite keys** | Primary keys are designed so that `PutItem` cannot silently overwrite an existing record. Use ULIDs or composite keys that include a unique ID component. |
| **R4 — Soft-delete, never hard-delete** | Records are marked `status: archived` or `is_deleted: true`. Physical deletion only by the retention-expiry background job after 7-year hold. AuditLog has no delete path at all. |
| **R5 — Versioning for mutable records** | Entities that support edits (Customer, TenantConfig, ProgramDocument) use a `version` sort key. The latest version is also projected into a `_latest` GSI for fast reads. |
| **R6 — Hash on write** | Any entity that constitutes evidence (CompletedForm, ScreeningResult, EvidenceRecord, RiskAssessment, ReportPreparation) computes SHA-256 of its payload on write and stores `payload_hash`. |
| **R7 — UTC timestamps** | All `created_at`, `updated_at`, `due_date` fields stored as ISO 8601 UTC strings. Business-day calculations happen in application logic using tenant's configured state/territory. |
| **R8 — ULID for IDs** | All entity IDs use ULID (Universally Unique Lexicographically Sortable Identifier) — sortable by creation time, globally unique, no coordination required. |

### 6B. Entity Catalogue

Each row defines one logical entity. "Table" indicates whether it occupies a dedicated DynamoDB table or shares the main single-table.

#### Core Platform Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **Tenant** | A — Multi-Tenancy | Main | `tenant_id` | `TENANT` | sector_pack_id, pack_version, business_name, abn, status, is_single_employee, created_at | One record per tenant |
| **TenantConfig** | A — Multi-Tenancy | Main | `tenant_id` | `CONFIG#v{version}` | risk_appetite (JSON), country_risk_table (JSON), notification_prefs, enabled_entity_types, governance_roles, state_territory | Versioned; latest projected to GSI |
| **UserProfile** | S — Auth & RBAC | Main | `tenant_id` | `USER#{user_id}` | cognito_sub, email, display_name, role, notification_prefs, last_login, status, mfa_enrolled | Cognito is source of auth; this is the app-layer profile |
| **SectorPack** | B — Sector Pack | Packs | `sector_id` | `PACK#{version}` | status (draft/published/deprecated), release_date, changelog, asset_manifest | Platform-wide, not tenant-scoped |
| **PackAssetRef** | B — Sector Pack | Packs | `sector_id#version` | `ASSET#{asset_type}` | s3_key, schema_hash, last_updated | Points to S3 object for each asset type |

#### Case & Customer Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **Customer** | M — Customer Mgmt | Main | `tenant_id` | `CUST#{customer_id}` | entity_type, name, name_normalized, status (active/suspended/offboarded/archived), created_at, offboarded_at, offboard_reason | Versioned via Customer_V table for detail history |
| **Customer_V** | M — Customer Mgmt | Main | `tenant_id#customer_id` | `CUSTV#{version}` | All customer detail fields at that version, changed_by, changed_at, payload_hash | Immutable version snapshots |
| **BeneficialOwnership** | M — Customer Mgmt | Main | `tenant_id#entity_customer_id` | `BO#{owner_customer_id}` | ownership_percentage, control_type, verified, identified_at | Each BO is also a Customer with own CDD |
| **Case** | C — Case Mgmt | Main | `tenant_id` | `CASE#{case_id}` | case_type (transaction/engagement/property_transaction), status, created_by, created_at, closed_at, details (typed JSON per subtype) | Subtype fields in `details` JSON |
| **CaseParty** | C — Case Mgmt | Main | `tenant_id#case_id` | `PARTY#{customer_id}#{role}` | role (buyer/seller/client/counterparty/…), cdd_status, linked_at | Many-to-many Case↔Customer |

#### CDD, Screening & Risk Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **CompletedForm** | D — Form Renderer | Main | `tenant_id` | `FORM#{form_id}` | form_type, schema_version, pack_asset_ref, entity_type, entity_id, payload (JSON), payload_hash, submitted_by, submitted_at, parent_form_id (for corrections) | Immutable; corrections link to parent |
| **ScreeningRequest** | G — Screening | Main | `tenant_id` | `SCRREQ#{request_id}` | customer_id, screening_type (sanctions/pep/adverse_media), provider, requested_at, status | Tracks outbound provider call |
| **ScreeningResult** | G — Screening | Main | `tenant_id` | `SCRRES#{result_id}` | request_id, customer_id, screening_type, match_status (clear/potential_match/confirmed_match), match_details (JSON), provider_response_hash, s3_evidence_key, screened_at | Raw response hashed and stored in S3 |
| **RiskAssessment** | F — Risk Engine | Main | `tenant_id` | `RISK#{assessment_id}` | customer_id, factor_checklist (JSON array), rating (High/Medium/Low), override_flag, override_justification, assessed_by, assessed_at, payload_hash | Factor checklist embedded; override tracked separately |

#### Escalation, Reporting & Deadline Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **Escalation** | H — Escalation | Main | `tenant_id` | `ESC#{escalation_id}` | reason, source_entity_type, source_entity_id, required_approver_role, urgency, status (pending/acknowledged/approved/rejected/deferred), created_at | Routes to correct role |
| **EscalationDecision** | H — Escalation | Main | `tenant_id#escalation_id` | `DECISION#{decision_id}` | decision (approved/rejected/deferred), justification, conditions, decided_by, decided_at | Immutable record of each decision |
| **ReportPreparation** | I — Reporting | Main | `tenant_id` | `RPT#{report_id}` | report_type (SMR/TTR/IFTI/CBM/ACR), status (draft/review/ready/submitted/amended), content (JSON per AUSTRAC schema), deadline_id, is_smr_restricted, created_by, created_at, payload_hash | SMR reports access-restricted |
| **ReportSubmission** | I — Reporting | Main | `tenant_id#report_id` | `SUB#{submission_id}` | austrac_reference, submitted_at, submitted_by, submission_type (initial/supplementary/corrective), evidence_id | Records manual AUSTRAC filing |
| **Deadline** | J — Deadline Engine | Main | `tenant_id` | `DL#{deadline_id}` | deadline_type, due_date, status (pending/warned/due/met/overdue/missed), linked_entity_type, linked_entity_id, owner_role, warning_schedule (JSON), acknowledged_at, completed_at, is_smr_restricted | Lifecycle tracked by engine |
| **Notification** | J — Deadline Engine | Notifications | `tenant_id#user_id` | `NOTIF#{notification_id}` | channel (email/in_app/sms), status (queued/sent/delivered/failed), subject, body_ref, sent_at, deadline_id | Dedicated table for high throughput |

#### Monitoring, Program & Governance Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **MonitoringPlan** | N — Ongoing Monitoring | Main | `tenant_id#customer_id` | `MONPLAN#{version}` | risk_tier, review_frequency, next_review_date, next_rescreening_date, monitoring_level, created_at | Versioned; updated when risk tier changes |
| **TriggerEvent** | N — Ongoing Monitoring | Main | `tenant_id` | `TRIG#{event_id}` | customer_id, event_type (detail_change/unusual_activity/threshold_crossing), description, status (open/reviewed/resolved), created_at | Source: DynamoDB Stream or manual flag |
| **UnusualActivityReport** | N — Ongoing Monitoring | Main | `tenant_id` | `UAR#{uar_id}` | customer_id, case_id, reporter_id, description, status (draft/submitted_to_co/escalated_to_smr/closed), is_smr_restricted, created_at | Tipping-off restricted |
| **ProgramDocument** | O — Program Mgmt | Main | `tenant_id` | `PROG#{document_id}` | document_type (part_a/part_b/governance/risk/training/records), title, status (draft/review/approved/superseded), current_version | Container; versions in ProgramVersion |
| **ProgramVersion** | O — Program Mgmt | Main | `tenant_id#document_id` | `PROGV#{version}` | content (structured JSON/markdown), approved_by, approved_at, payload_hash, change_justification | Immutable once approved |
| **ComplianceCalendarEntry** | O — Program Mgmt | Main | `tenant_id` | `CAL#{entry_id}` | entry_type, title, recurrence_rule, next_due, deadline_id, status | Links to Deadline for tracking |
| **IndependentReview** | O — Program Mgmt | Main | `tenant_id` | `IREV#{review_id}` | reviewer_name, reviewer_firm, scope, start_date, end_date, findings (JSON), remediation_actions (JSON), status | Tracks external review cycle |
| **PersonnelRecord** | P — Governance | Main | `tenant_id` | `PERS#{personnel_id}` | user_id, role, appointment_date, due_diligence_status (pending/complete), bg_check, police_check, reference_check | Links to UserProfile |
| **GovernanceRole** | P — Governance | Main | `tenant_id` | `GOVROLE#{role_type}` | holder_user_id, appointed_at, previous_holder, notification_deadline_id | CO change → 14-day deadline |
| **TrainingRecord** | P — Governance | Main | `tenant_id#personnel_id` | `TRAIN#{training_id}` | course_name, provider, completed_at, expiry_date, evidence_id, status | Certificate stored in Evidence Store |
| **TrainingRequirement** | P — Governance | Main | `tenant_id` | `TREQ#{requirement_id}` | role, course_name, frequency, is_mandatory | Seeded from sector pack |

#### Evidence & Audit Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **EvidenceRecord** | L — Evidence Store | Main | `tenant_id` | `EVID#{evidence_id}` | evidence_type, linked_entity_type, linked_entity_id, s3_key, file_name, mime_type, size_bytes, payload_hash, uploaded_by, uploaded_at, retention_start_date | S3 key follows tenant-prefix convention |
| **EvidenceExport** | L — Evidence Store | Main | `tenant_id` | `EXPORT#{export_id}` | scope_description, scope_params (JSON), status (generating/ready/expired), s3_export_key, manifest_hash, requested_by, requested_at, expires_at | ZIP in Export bucket; 30-day expiry |
| **AuditLog** | K — Audit Trail | AuditLog | `tenant_id` | `{sequence_number}` | action_type, actor_id, actor_role, entity_type, entity_id, payload_snapshot (JSON), timestamp, entry_hash, chain_hash | **Dedicated table.** Append-only. No UPDATE/DELETE IAM. |

#### Billing Entities

| Entity | Owner Module | Table | PK | SK | Key attributes | Notes |
|:-------|:------------|:------|:---|:---|:--------------|:------|
| **Subscription** | R — Billing | Billing | `tenant_id` | `SUB#{subscription_id}` | stripe_customer_id, stripe_subscription_id, plan_id, status (trialing/active/past_due/canceled/suspended), current_period_end, created_at | **Dedicated table** (different IAM) |
| **Entitlement** | R — Billing | Billing | `tenant_id` | `ENT#{entitlement_type}` | limit_value, current_usage, is_enforced | Derived from plan on webhook |
| **UsageRecord** | R — Billing | Billing | `tenant_id` | `USAGE#{period}#{metric}` | metric (active_customers/users/storage_bytes), value, recorded_at | For usage-based pricing (future) |

### 6C. GSI Index

All Global Secondary Indexes across the system. GSIs enable access patterns that the base table's PK/SK cannot serve.

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI1-CustomerCases** | Main | `tenant_id#customer_id` | `case_id#role` | All cases for a customer (via CaseParty) |
| **GSI2-EntityForms** | Main | `tenant_id#entity_type#entity_id` | `submitted_at` | All forms for a customer/case |
| **GSI3-CustomerScreenings** | Main | `tenant_id#customer_id` | `screened_at` | All screenings for a customer |
| **GSI4-CustomerRisk** | Main | `tenant_id#customer_id` | `assessed_at` | All risk assessments for a customer |
| **GSI5-RoleEscalations** | Main | `tenant_id#approver_role#status` | `created_at` | Pending escalations for a role |
| **GSI6-ReportTypeStatus** | Main | `tenant_id#report_type#status` | `created_at` | Reports by type and status |
| **GSI7-DeadlineStatus** | Main | `tenant_id#status` | `due_date` | Upcoming/overdue deadlines sorted by due date |
| **GSI8-DeadlineEntity** | Main | `tenant_id#linked_entity_type#linked_entity_id` | `due_date` | Deadlines for a specific entity |
| **GSI9-CustomerStatus** | Main | `tenant_id#entity_type#status` | `name_normalized` | Customer search by type and status |
| **GSI10-CustomerName** | Main | `tenant_id` | `name_normalized` | Customer name search / duplicate detection |
| **GSI11-AuditEntity** | AuditLog | `tenant_id#entity_type#entity_id` | `timestamp` | Audit trail for a specific entity |
| **GSI12-AuditActor** | AuditLog | `tenant_id#actor_id` | `timestamp` | Audit trail for a specific user |
| **GSI13-TriggerCustomer** | Main | `tenant_id#customer_id` | `created_at` | Trigger events for a customer |
| **GSI14-EvidenceEntity** | Main | `tenant_id#linked_entity_type#linked_entity_id` | `uploaded_at` | Evidence files for a customer/case/report |
| **GSI15-NotifUser** | Notifications | `tenant_id#user_id#status` | `sent_at` | Notifications for a user by status |
| **GSI16-ConfigLatest** | Main | `tenant_id` | `CONFIG#LATEST` | Sparse: only latest TenantConfig version projected |

### 6D. Retention Rules

| Category | Retention trigger | Hold period | Deletion mechanism | Exceptions |
|:---------|:-----------------|:-----------|:-------------------|:-----------|
| Customer records (Customer, Customer_V, BeneficialOwnership) | Relationship end (offboarded_at or last case closed_at) | 7 years | Weekly retention scan Lambda; marks eligible records; batch delete after confirmation | Active customers: never deleted |
| Case records (Case, CaseParty) | Case closed_at | 7 years | Same retention scan | Open cases: never deleted |
| CDD records (CompletedForm, ScreeningResult, RiskAssessment) | Parent customer retention trigger | 7 years | Cascades from customer retention | — |
| Reporting records (ReportPreparation, ReportSubmission) | Report submitted_at | 7 years | Retention scan | Amended reports: 7yr from latest amendment |
| Escalation records | Parent entity retention trigger | 7 years | Cascades | — |
| Deadline records | Deadline completed_at or missed_at | 7 years | Retention scan | — |
| Monitoring records (MonitoringPlan, TriggerEvent, UAR) | Parent customer retention trigger | 7 years | Cascades | SMR-linked UAR: retained with report |
| Program documents (ProgramDocument, ProgramVersion) | Version superseded_at (for old versions); tenant lifetime (for current) | 7 years from superseded | Retention scan | Current version: retained for tenant lifetime |
| Governance & training (PersonnelRecord, GovernanceRole, TrainingRecord) | Role end date or training completion | 7 years | Retention scan | Active personnel: never deleted |
| Evidence files (S3) | retention_start_date on EvidenceRecord | 7 years | S3 lifecycle rule on `retention_start_date` tag | Export ZIPs: 30-day auto-delete |
| Audit log (AuditLog) | Entry created_at | 7 years | Dedicated retention job (never runs on main scan; separate approval gate) | Integrity-flagged entries: retained indefinitely |
| Billing records (Subscription, Entitlement, UsageRecord) | Subscription canceled_at | 7 years (subscription); 2 years (usage) | Retention scan | Active subscriptions: never deleted |
| Tenant record | Never auto-deleted | Indefinite | Manual only (platform admin) | — |
| Pack records (SectorPack, PackVersion, PackAssetRef) | Never auto-deleted | Indefinite | Manual only | Tenants may reference old versions |
| Notifications | sent_at | 90 days | TTL attribute on DynamoDB | — |

### 6E. Data Integrity Controls Summary

| Control | Scope | Mechanism |
|:--------|:------|:----------|
| **Payload hashing** | CompletedForm, ScreeningResult, RiskAssessment, ReportPreparation, ProgramVersion, EvidenceRecord | SHA-256 of payload computed on write; stored as `payload_hash`; verified on read for evidence export |
| **Hash chain** | AuditLog | Each entry: `chain_hash = SHA-256(prev_chain_hash + entry_data)`; daily verification job walks chain |
| **Append-only enforcement** | AuditLog | DynamoDB IAM policy: only `PutItem`, `Query`, `GetItem`. Explicit `Deny` on `UpdateItem`, `DeleteItem`. |
| **Versioning** | Customer, TenantConfig, ProgramDocument, MonitoringPlan | Edit creates new version record; previous versions immutable; latest version projected to GSI |
| **Soft-delete** | All entities except AuditLog | `status: archived` or `is_deleted: true`; physical deletion only by retention job |
| **Encryption at rest** | All DynamoDB tables, all S3 buckets | SSE-KMS with AWS-managed or customer-managed keys |
| **Encryption in transit** | All API calls, S3 access | HTTPS enforced; S3 bucket policy denies non-SSL |
| **Tenant isolation** | All entities | `tenant_id` in PK; AppSync resolver validates tenant_id from JWT; no cross-tenant GSI design |

> **Section 6 complete.** All entities, key design, GSIs, retention rules, and integrity controls documented.
