# Module A — Multi-Tenancy & Tenant Configuration

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module A)

---

## Purpose

Provision, configure, and isolate tenants. Every data entity in the system is scoped to a tenant. This module owns the Tenant entity and enforces the "no cross-tenant queries" invariant.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | `createTenant` mutation | Signup: business details, sector_pack_id, admin user |
| IN | `updateTenantConfig` mutation | Update risk appetite, country risk, notification config, governance roles |
| OUT | Tenant context | Every API call resolves tenant_id from authenticated user's Cognito custom attribute |
| OUT | Config read | Other modules read tenant config (risk appetite, enabled entity types, notification prefs) |

---

## Key Responsibilities

1. Create Tenant record with sector_pack_id on signup
2. Trigger Sector Pack Loader to hydrate pack assets
3. Seed default configuration (risk appetite, country risk table, governance roles)
4. Enforce tenant_id on all DynamoDB partition keys
5. Support single-employee mode toggle (collapses governance roles)
6. Manage tenant-level feature flags (from entitlements)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Tenant** | Main | `tenant_id` | `TENANT` | sector_pack_id, pack_version, business_name, abn, status, is_single_employee, created_at | One record per tenant |
| **TenantConfig** | Main | `tenant_id` | `CONFIG#v{version}` | risk_appetite (JSON), country_risk_table (JSON), notification_prefs, enabled_entity_types, governance_roles, state_territory | Versioned; latest projected to GSI |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI16-ConfigLatest** | Main | `tenant_id` | `CONFIG#LATEST` | Sparse: only latest TenantConfig version projected |

---

## RBAC (from Section 8A — Tenant & Configuration)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View tenant info | Y | Y | Y | Y |
| Update tenant config (risk appetite, notifications) | — | Y | — | Y |
| Update governance roles | — | — | — | Y |
| Toggle single-employee mode | — | — | — | Y |
| View billing / subscription | — | — | — | Y |
| Change plan / payment method | — | — | — | Y |

Additional:
- `createTenant`: unauthenticated (signup flow) → immediately assigns `governing_body` role to first user
- `updateTenantConfig`: `governing_body` or `compliance_officer` only
- All other modules read tenant config via internal context — never cross-tenant

---

## Audit & Retention

**Audit requirements:** All config changes logged (risk appetite changes, governance role assignments, notification config changes). Previous config versions retained.

**Retention:**
- Tenant record: lifetime (never auto-deleted; manual only by platform admin)
- Config change history: 7 years
- TenantConfig versions follow data model rule R5 (versioning for mutable records)

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Pack loading fails during signup | Tenant created but unusable | Transaction: roll back tenant creation if pack load fails; retry with exponential backoff |
| tenant_id missing from request | Cross-tenant data leak | AppSync resolver middleware validates tenant_id on every request; reject if missing |
| Config corruption | Workflows break | Config versioning; rollback to previous version |

---

## Sector Pack Relationship

`sector_pack_id` determines which pack is loaded. `enabled_entity_types` and `entity_type_routing` come from pack defaults but are tenant-editable. `is_single_employee` is tenant-set, not pack-determined.

---

## Amplify Gen2 Implementation Notes

- Tenant record in DynamoDB with `tenant_id` as partition key
- Cognito custom attribute `custom:tenant_id` set on user creation (post-confirmation Lambda trigger)
- Cognito custom attribute `custom:role` set on user creation and updated via admin API
- AppSync auth rules use `custom:tenant_id` for owner-based authorization on all models
- Lambda functions extract tenant_id from Cognito claims in the AppSync event

---

## Related Flows

- [Flow 1 — Tenant Signup & Sector Pack Provisioning](../flows.md#flow-1--tenant-signup--sector-pack-provisioning) — Primary flow for this module
