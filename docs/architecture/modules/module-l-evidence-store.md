# Module L — Evidence Store & Export

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module L)

---

## Purpose

Store, hash, and retrieve all compliance evidence artefacts (documents, IDV results, screening responses, completed forms, program documents). Generate scoped evidence packs (ZIP with integrity manifest) for AUSTRAC review, independent evaluation, or governing body reporting.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Evidence upload (from any module) | File/blob + metadata (type, linked entity, uploader, description) |
| IN | Export request (from CO/SM/GB) | Scope (customer, case, date range, report), format (PDF/CSV/JSON) |
| OUT | EvidenceRecord | S3 key, SHA-256 hash, metadata, upload timestamp |
| OUT | Evidence pack ZIP | Signed URL for download; manifest with file list + hashes |

---

## Key Responsibilities

1. Store evidence files in S3 Evidence bucket with tenant-prefixed keys (`evidence/{tenant_id}/{entity_type}/{entity_id}/{file_id}`)
2. Compute SHA-256 hash on ingestion; store hash in EvidenceRecord
3. SSE-KMS encryption at rest; HTTPS in transit
4. S3 lifecycle: 7-year retention from `retention_start_date` (set when parent entity relevance ends)
5. Evidence type catalogue from sector pack (document categories, required evidence per CDD level)
6. Generate evidence packs: query all evidence for a scope → compile ZIP → include JSON integrity manifest (file list with hashes) → store in Export bucket → generate signed URL (24h expiry)
7. Support PDF generation from structured data (risk assessments, audit trail excerpts, form submissions)
8. Periodic integrity check: sample random evidence files, recompute hash, compare to stored hash

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **EvidenceRecord** | Main | `tenant_id` | `EVID#{evidence_id}` | evidence_type, linked_entity_type, linked_entity_id, s3_key, file_name, mime_type, size_bytes, payload_hash, uploaded_by, uploaded_at, retention_start_date | S3 key follows tenant-prefix convention |
| **EvidenceExport** | Main | `tenant_id` | `EXPORT#{export_id}` | scope_description, scope_params (JSON), status (generating/ready/expired), s3_export_key, manifest_hash, requested_by, requested_at, expires_at | ZIP in Export bucket; 30-day expiry |

### Relevant GSIs (from Section 6C)

| GSI Name | Base Table | PK | SK | Purpose |
|:---------|:----------|:---|:---|:--------|
| **GSI14-EvidenceEntity** | Main | `tenant_id#linked_entity_type#linked_entity_id` | `uploaded_at` | Evidence files for a customer/case/report |

---

## RBAC (from Section 8A — Evidence & Audit)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Upload evidence (onboarding docs) | Y | Y | — | — |
| Upload evidence (all types) | — | Y | — | — |
| View evidence (non-SMR-linked) | Y | Y | Y | Y |
| View evidence (SMR-linked) | — | Y | Y | Y |
| Generate evidence pack | — | Y | Y | Y |

Additional:
- Evidence files inherit access control from parent entity
- SMR-linked evidence restricted per tipping-off controls

---

## Audit & Retention

**Audit requirements:** Upload, download, and export actions logged. Evidence pack generation logged with scope and requester.

**Retention:**
- Evidence records: 7 years after parent entity relevance ends
- S3 evidence files: lifecycle rule on `retention_start_date` tag
- Export ZIPs: 30-day auto-delete (regenerate on demand)

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| S3 upload failure | Evidence not stored | Retry with exponential backoff; multipart upload for large files; user notified of failure |
| Hash mismatch on retrieval | Evidence integrity question | Alert CO + admin; quarantine file; compare with backup; log incident |
| Export ZIP too large | Download timeout | Streaming ZIP generation; split into volumes if >500MB; signed URL with extended expiry |

---

## Sector Pack Relationship

Evidence type catalogue (which document types exist, which are required per CDD level) is pack-driven. Storage and hashing mechanics are core.

---

## Amplify Gen2 Implementation Notes

- EvidenceRecord model in DynamoDB: `tenant_id` PK, `evidence_id` SK
- GSI: `tenant_id#entity_type#entity_id` → all evidence for a customer/case/report
- S3 Evidence bucket with SSE-KMS, versioning enabled, lifecycle rules for retention
- S3 Export bucket with 30-day lifecycle expiry
- Evidence Pack Lambda (`evidence-export`) generates ZIP, writes to Export bucket, returns signed URL
- Amplify Storage access rules: tenant-prefixed paths with identity-pool scoped access

---

## Related Flows

- [Flow 2 — Jeweller Transaction Onboarding](../flows.md#flow-2--jeweller-transaction-onboarding-full-cdd) — IDV evidence storage
- [Flow 7 — Evidence Pack Export](../flows.md#flow-7--evidence-pack-export) — Full export workflow with manifest and integrity verification
