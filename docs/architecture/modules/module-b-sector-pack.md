# Module B — Sector Pack Manager

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module B)

---

## Purpose

Store, version, and deliver sector pack assets to all other modules at runtime. Packs are the mechanism by which sector-specific behaviour is injected into the universal core platform.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Pack deployment | Admin uploads new pack version (S3 + manifest) |
| IN | `loadPack(sector_pack_id, version?)` | Lambda reads pack assets for a tenant |
| OUT | Risk factor catalogue | → Risk Engine |
| OUT | Form templates | → Form Renderer |
| OUT | Entity type catalogue | → CDD Orchestration, Case Management |
| OUT | Workflow entry points | → Case Management |
| OUT | Language pack | → Frontend (i18n) |
| OUT | Dashboard layout | → Frontend (widget config) |
| OUT | Evidence type catalogue | → Evidence Store |
| OUT | Designated service definitions | → Case Management |
| OUT | Guidance text | → Form Renderer, Frontend |

---

## Key Responsibilities

1. Store pack assets in S3 with versioned keys (`packs/{sector}/{version}/{asset_type}.json`)
2. Maintain PackVersion records in DynamoDB (version, release date, changelog, status)
3. Support pack rollout: draft → published → deprecated lifecycle
4. Tenant records reference a specific pack version; upgrades are explicit
5. Validate pack schema on upload (all required assets present, JSON valid)
6. Cache frequently accessed pack assets (in-memory Lambda cache or DynamoDB)

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **SectorPack** | Packs | `sector_id` | `PACK#{version}` | status (draft/published/deprecated), release_date, changelog, asset_manifest | Platform-wide, not tenant-scoped |
| **PackAssetRef** | Packs | `sector_id#version` | `ASSET#{asset_type}` | s3_key, schema_hash, last_updated | Points to S3 object for each asset type |

### Relevant GSIs

None dedicated. Pack entities use the Packs table with direct key lookups.

---

## RBAC

- Pack deployment: platform admin only (not tenant users)
- Pack read: any authenticated user within a tenant referencing that pack
- Pack assets are read-only for tenants

---

## Audit & Retention

**Audit requirements:** Pack version changes logged. Tenant pack upgrades logged. Pack deployment history retained.

**Retention:**
- All pack versions retained indefinitely (tenants may reference old versions)
- Asset files in S3 with no lifecycle expiry
- Pack records (SectorPack, PackVersion, PackAssetRef): never auto-deleted; manual only

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Pack asset missing from S3 | Module cannot load config | Schema validation on deploy; health check on load; fall back to previous version |
| Pack version mismatch | Tenant uses stale config | Explicit version pinning per tenant; upgrade is a deliberate action |
| Corrupt pack JSON | Runtime errors in form renderer, risk engine | JSON schema validation on upload; reject invalid packs |

---

## Sector Pack Relationship

This module IS the sector pack system. It provides assets to all other modules.

---

## Amplify Gen2 Implementation Notes

- Pack assets stored in S3 bucket (`t2c-pack-assets`) with versioned key paths
- PackVersion and PackAssetRef stored in DynamoDB via Amplify Data models
- Pack Loader Lambda reads S3 assets and caches in Lambda execution context (reused across warm invocations)
- Frontend fetches language pack and dashboard layout via AppSync query (cached client-side)

---

## Related Flows

- [Flow 1 — Tenant Signup & Sector Pack Provisioning](../flows.md#flow-1--tenant-signup--sector-pack-provisioning) — Pack loading during signup
- [Flow 5 — Accountant Engagement Onboarding](../flows.md#flow-5--accountant-engagement-onboarding) — Pack routing for Table 6 services
