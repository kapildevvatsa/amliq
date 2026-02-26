# Module Q — Dashboard & Analytics

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module Q)

---

## Purpose

Render role-specific, sector-themed dashboards with compliance-status widgets, deadline prominence, and activity summaries. The dashboard is the primary landing experience for every user and must surface the most urgent compliance actions within seconds of login.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Dashboard layout (from Sector Pack) | Widget slots, ordering, visibility-per-role |
| IN | Real-time data (AppSync subscriptions) | Deadline status changes, escalation creation, case status changes |
| IN | Aggregated data (queries) | Counts, compliance percentages, overdue items |
| OUT | Rendered dashboard | Role-filtered, tenant-scoped, sector-themed UI |
| OUT | Drill-down navigation | Widget click → relevant list/detail view |

---

## Key Responsibilities

1. Load dashboard layout from sector pack: widget IDs, grid positions, role visibility rules
2. Core widget catalogue (available to all packs):
   - **Deadline ticker** — upcoming/overdue deadlines, colour-coded (green/amber/red), sorted by urgency. Always top of dashboard.
   - **Escalation queue** — pending escalations for current user's role, with SLA countdown
   - **Open cases** — active cases by status, with CDD completion indicator per party
   - **Reporting status** — pending reports by type (SMR/TTR/IFTI), deadline countdown
   - **Risk distribution** — customer count by risk tier (High/Medium/Low), with trend
   - **Screening alerts** — unresolved screening matches awaiting CO review
   - **Training compliance** — percentage complete per role; overdue count
   - **Recent audit activity** — last N audit log entries for current user
   - **Program status** — current program version, next review date, independent review status
   - **Integrity status** — last hash-chain verification result (pass/fail/date)
3. Role-based widget visibility: `client_facing` sees cases + deadlines + training; `compliance_officer` sees everything; `governing_body` sees program + escalations + risk distribution + training + integrity
4. SMR-related widgets (reporting status for SMRs, related escalations) hidden from `client_facing` (tipping-off)
5. Real-time updates via AppSync subscriptions: deadline status change, new escalation, case status change
6. Support sector-specific widgets in future packs (e.g., jewellers daily TTR count, accountants engagement pipeline)
7. Responsive layout: desktop (3-column grid), tablet (2-column), mobile (single-column stack)

---

## Data Entities

### Owned Entities

None. Dashboard reads from all other modules; layout from Sector Pack.

---

## RBAC

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Dashboard access | Y | Y | Y | Y |

Additional:
- Widget visibility: enforced by role (layout config specifies `visible_roles` per widget)
- Data within widgets: scoped by tenant_id; further scoped by tipping-off rules for SMR-related widgets
- No dashboard-specific mutations — all actions navigate to the relevant module

---

## Audit & Retention

**Audit requirements:** None (dashboard is read-only). Navigation events optionally logged for UX analytics (not compliance-required).

**Retention:** N/A (no owned data).

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Dashboard layout missing from pack | Blank dashboard | Fallback to core default layout (all widgets, standard order); log warning |
| Real-time subscription disconnected | Stale data | Auto-reconnect with exponential backoff; "last updated" timestamp on widgets; manual refresh button |
| Widget data query slow | Dashboard load delay | Widgets load independently (skeleton loaders); cached aggregates refreshed on interval; critical widgets (deadline ticker) load first |

---

## Sector Pack Relationship

Dashboard layout (widget selection, ordering, grid positions) is 100% pack-driven. Widget implementations are core. Sector-specific widgets can be added to the core catalogue and enabled per pack. Terminology in widget titles/labels from language pack.

---

## Amplify Gen2 Implementation Notes

- No dedicated DynamoDB model — dashboard reads from existing models via AppSync queries
- Dashboard layout fetched from pack config (cached in React state / localStorage with TTL)
- AppSync subscriptions: `onDeadlineChange(tenant_id)`, `onEscalationChange(tenant_id)`, `onCaseStatusChange(tenant_id)`
- Frontend: React component per widget; layout engine reads pack config and renders grid
- Aggregation queries use DynamoDB GSIs with `begins_with` for count-by-status patterns

---

## Related Flows

- [Flow 1 — Tenant Signup](../flows.md#flow-1--tenant-signup--sector-pack-provisioning) — Dashboard loaded after signup
