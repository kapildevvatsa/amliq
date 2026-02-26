# T2C (AMLIQ) — Module Index

> **Source of truth:** [`../module-design-document.md`](../module-design-document.md)
> These spoke files are working extracts for implementation. The master document is canonical.

---

## Module List

| ID | Module | File | Owner Entities |
|:---|:-------|:-----|:---------------|
| A | Multi-Tenancy & Tenant Configuration | [module-a-multi-tenancy.md](module-a-multi-tenancy.md) | Tenant, TenantConfig |
| B | Sector Pack Manager | [module-b-sector-pack.md](module-b-sector-pack.md) | SectorPack, PackVersion, PackAssetRef |
| C | Case Management | [module-c-case-management.md](module-c-case-management.md) | Case, CaseParty |
| D | Form Renderer | [module-d-form-renderer.md](module-d-form-renderer.md) | CompletedForm |
| E | CDD Orchestration | [module-e-cdd-orchestration.md](module-e-cdd-orchestration.md) | _(orchestrates across modules)_ |
| F | Risk Engine | [module-f-risk-engine.md](module-f-risk-engine.md) | RiskAssessment |
| G | Screening Orchestration | [module-g-screening.md](module-g-screening.md) | ScreeningRequest, ScreeningResult |
| H | Escalation Engine | [module-h-escalation.md](module-h-escalation.md) | Escalation, EscalationDecision |
| I | Reporting Preparation | [module-i-reporting.md](module-i-reporting.md) | ReportPreparation, ReportSubmission |
| J | Deadline & Notification Engine | [module-j-deadline-notification.md](module-j-deadline-notification.md) | Deadline, Notification, NotificationPreference |
| K | Audit Trail & Evidence Integrity | [module-k-audit-trail.md](module-k-audit-trail.md) | AuditLog |
| L | Evidence Store & Export | [module-l-evidence-store.md](module-l-evidence-store.md) | EvidenceRecord, EvidenceExport |
| M | Customer Management | [module-m-customer-management.md](module-m-customer-management.md) | Customer, Customer_V, BeneficialOwnership |
| N | Ongoing Monitoring | [module-n-ongoing-monitoring.md](module-n-ongoing-monitoring.md) | MonitoringPlan, TriggerEvent, UnusualActivityReport |
| O | Program Management | [module-o-program-management.md](module-o-program-management.md) | ProgramDocument, ProgramVersion, ComplianceCalendarEntry, IndependentReview |
| P | Governance, Personnel & Training | [module-p-governance-personnel.md](module-p-governance-personnel.md) | PersonnelRecord, GovernanceRole, TrainingRecord, TrainingRequirement |
| Q | Dashboard & Analytics | [module-q-dashboard.md](module-q-dashboard.md) | _(no owned entities)_ |
| R | Billing & Subscription | [module-r-billing.md](module-r-billing.md) | Subscription, Entitlement, UsageRecord |
| S | Auth & RBAC | [module-s-auth-rbac.md](module-s-auth-rbac.md) | UserProfile |

---

## Cross-Cutting Concerns

These topics span all modules and are documented in dedicated standalone files:

| Document | Scope | File |
|:---------|:------|:-----|
| Data Model | Design rules, full entity catalogue, GSI index, retention rules, integrity controls | [`../data-model.md`](../data-model.md) |
| Key Flows | All 8 sequence-diagrammed flows (signup, CDD, SMR, periodic review, etc.) | [`../flows.md`](../flows.md) |
| Security Controls | RBAC matrix, tipping-off controls, encryption, OWASP, compliance mapping | [`../security-controls.md`](../security-controls.md) |
| Delivery Plan | Phased delivery plan (Phases 1–4) + open questions | [`../delivery-plan.md`](../delivery-plan.md) |

---

## Cross-Cutting Invariants

These invariants are enforced across every module:

1. **Tenant isolation** — Every entity includes `tenant_id` in its primary key. No cross-tenant queries.
2. **Append-only audit** — Every compliance-relevant action writes to the AuditLog (Module K). No updates or deletes.
3. **Evidence hashing** — All evidence entities compute SHA-256 on write and store `payload_hash`.
4. **RBAC enforcement** — Permissions enforced at AppSync resolver level, not just UI.
5. **Tipping-off safety** — SMR-related records are access-restricted to CO/SM/GB via `is_smr_restricted` flag.
6. **7-year retention** — All compliance records retained for 7 years after relevance ends.
7. **Deterministic deadlines** — Every time-sensitive obligation tracked as a Deadline entity with lifecycle and escalation.
8. **Sector pack configuration** — Sector differences expressed as pack assets, not code changes.
