# T2C (AMLIQ) — Security, Privacy & Compliance Controls

> **Source:** Extracted verbatim from *Module Design Document* (`docs/architecture/module-design-document.md`), Section 8 (lines 2317-2501).

---

## 8. Security, Privacy & Compliance Controls

### 8A. RBAC Permission Matrix

Complete permission matrix across all modules. Rows = operations, columns = roles. **Y** = permitted, **—** = denied, **Self** = self-service only.

#### Tenant & Configuration

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View tenant info | Y | Y | Y | Y |
| Update tenant config (risk appetite, notifications) | — | Y | — | Y |
| Update governance roles | — | — | — | Y |
| Toggle single-employee mode | — | — | — | Y |
| View billing / subscription | — | — | — | Y |
| Change plan / payment method | — | — | — | Y |

#### User Management

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Invite new user | — | Y | — | Y |
| Assign / change role | — | — | — | Y |
| Deactivate user | — | — | — | Y |
| View user list | — | Y | — | Y |
| Update own profile | Self | Self | Self | Self |
| Enrol MFA | Self | Self (mandatory) | Self (mandatory) | Self (mandatory) |

#### Case & Customer

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Create case | Y | Y | — | — |
| View cases | Y | Y | Y | Y |
| Update case status (compliance) | — | Y | — | — |
| Create customer | Y | Y | — | — |
| Update customer details | Y | Y | — | — |
| View customers | Y | Y | Y | Y |
| Offboard customer (initiate) | — | Y | — | — |
| Offboard customer (approve) | — | — | Y | Y |
| Add / remove case party | Y | Y | — | — |

#### CDD, Screening & Risk

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Initiate CDD | Y | Y | — | — |
| Complete onboarding form | Y | Y | — | — |
| Complete enhanced CDD form | — | Y | — | — |
| Approve enhanced CDD | — | — | Y | Y |
| View CDD status | Y | Y | Y | Y |
| View screening results | — | Y | Y | Y |
| Complete risk assessment (initial) | Y | Y | — | — |
| Override risk rating | — | Y | — | — |
| View risk assessments | Y | Y | Y | Y |

#### SMR / Tipping-Off Restricted Operations

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Flag unusual activity | Y | Y | — | — |
| View UAR records | — | Y | Y | Y |
| Create / edit SMR report | — | Y | — | — |
| View SMR records | — | Y | Y | Y |
| Record SMR submission | — | Y | — | — |
| View SMR-linked deadlines | — | Y | Y | Y |
| Export evidence pack with SMR content | — | Y | Y | Y |

#### Reporting (Non-SMR)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View TTR / IFTI / CBM reports | — | Y | Y | Y |
| Create / edit TTR / IFTI / CBM | — | Y | — | — |
| Record report submission | — | Y | — | — |
| Create / edit ACR | — | Y | — | — |
| Approve ACR | — | — | — | Y |

#### Escalations

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View escalations (assigned to role) | — | Y | Y | Y |
| Approve / reject escalation | — | Y (if assigned) | Y (if assigned) | Y (if assigned) |
| Create manual escalation | — | Y | — | — |

#### Program, Governance & Training

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View AML/CTF program | Y | Y | Y | Y |
| Draft / edit program | — | Y | — | — |
| Review program | — | — | Y | — |
| Approve program | — | — | — | Y |
| Manage personnel records | — | Y | — | Y |
| Record training completion (self) | Self | Self | Self | Self |
| Record training completion (others) | — | Y | — | — |
| View training records | — | Y | Y | Y |
| Record independent review | — | Y | — | Y |

#### Evidence & Audit

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Upload evidence (onboarding docs) | Y | Y | — | — |
| Upload evidence (all types) | — | Y | — | — |
| View evidence (non-SMR-linked) | Y | Y | Y | Y |
| View evidence (SMR-linked) | — | Y | Y | Y |
| Generate evidence pack | — | Y | Y | Y |
| View audit log | — | Y | Y | Y |

### 8B. Tipping-Off Controls Summary

Consolidated view of all tipping-off controls across the system.

| # | Control | Scope | Enforcement layer | Bypass |
|:--|:--------|:------|:------------------|:-------|
| T1 | SMR record access restriction | UAR, SMR reports, SMR-linked deadlines, SMR-linked escalations, SMR-linked evidence | AppSync resolver: checks `is_smr_restricted=true` + role ∈ {CO, SM, GB} | None. No override. |
| T2 | Compliant offboarding reasons | Customer offboarding reason field | Frontend: enum picker (4 values). Backend: mutation validates reason_code ∈ allowed set. | None. No free-text. |
| T3 | Safe communication templates | Offboarding letters / emails to customer | Frontend: read-only template. Reason text injected from reason_code. CO cannot edit reason paragraph. | None. |
| T4 | Escalation reason sanitisation | Escalation notifications visible to `client_facing` | Escalation Engine: `client_facing` view shows generic "compliance review required" — not suspicion language. | None. |
| T5 | Dashboard widget filtering | SMR-related reporting status, SMR-linked escalations | Dashboard: widget `visible_roles` config excludes `client_facing` for SMR widgets. | None. |
| T6 | Evidence pack SMR filtering | Evidence export containing SMR-linked records | Export Lambda: checks requester role before including SMR-linked records. `client_facing` export omits SMR content. | None. |
| T7 | Audit log for SMR access | All access to SMR-restricted records | Audit Writer: logs every read of `is_smr_restricted=true` records with accessor identity. | N/A (logging, not blocking). |
| T8 | Accountant qualified disclosure | Disclosure to client under s.123(4) | Sector Pack config: `accountant_qualified_disclosure: true`. Separate workflow with own evidence record. Only available if pack enables it. | Pack config toggle. |

### 8C. Encryption & Data Protection

| Layer | Mechanism | Configuration |
|:------|:----------|:-------------|
| **Data at rest — DynamoDB** | SSE-KMS | AWS-managed key (default); customer-managed key option for Business tier |
| **Data at rest — S3** | SSE-KMS | Per-bucket KMS key; bucket policy denies unencrypted uploads |
| **Data at rest — Cognito** | AWS-managed encryption | Cognito encrypts user pool data at rest by default |
| **Data in transit — API** | HTTPS (TLS 1.2+) | CloudFront + AppSync enforce TLS; HSTS headers |
| **Data in transit — S3** | HTTPS | Bucket policy: `aws:SecureTransport = false` → Deny |
| **Data in transit — internal** | AWS service mesh | Lambda ↔ DynamoDB / S3 / SQS over AWS internal endpoints (VPC endpoints optional for Business tier) |
| **Secrets** | AWS Secrets Manager | Stripe API keys, IDV provider keys, screening provider keys. Rotated per provider requirements. |
| **PII classification** | Tag-based | DynamoDB attributes containing PII tagged in data model documentation; S3 objects containing PII in tenant-prefixed paths with restricted access |
| **Evidence integrity** | SHA-256 hashing | Computed on write; verified on export; hash chain for AuditLog |

### 8D. Session & Authentication Security

| Control | Configuration |
|:--------|:-------------|
| **MFA** | TOTP mandatory for CO, SM, GB. Optional for `client_facing`. Enforced at Cognito user pool level. |
| **Session timeout** | Access token: 1 hour. Refresh token: 8 hours (active session). Idle timeout: 30 minutes (frontend-enforced). |
| **Re-authentication** | Required for: role change, program approval, offboarding approval, billing changes. Implemented as fresh Cognito auth challenge. |
| **Password policy** | Minimum 12 characters; uppercase + lowercase + number + symbol; no reuse of last 5; no common passwords (Cognito built-in). |
| **Brute-force protection** | Cognito: account lockout after 5 failed attempts (configurable). CloudWatch alarm on authentication failure spike. |
| **Token handling** | Access token in memory only (never localStorage). Refresh token in httpOnly secure cookie. CSRF protection via SameSite=Strict. |

### 8E. OWASP Top 10 Mitigations

| OWASP Risk | Mitigation |
|:-----------|:----------|
| **A01 Broken Access Control** | RBAC enforced at AppSync resolver level (not just UI). tenant_id validated from JWT on every request. No direct object references without auth check. |
| **A02 Cryptographic Failures** | SSE-KMS at rest. TLS 1.2+ in transit. SHA-256 for evidence hashing. No sensitive data in URLs or logs. |
| **A03 Injection** | AppSync/GraphQL with typed schema — no raw SQL. DynamoDB parameterised queries. Input validation on all mutations. CSP headers. |
| **A04 Insecure Design** | Threat modelling per module (Section 5 failure modes). Tipping-off controls designed as system invariants, not user discipline. |
| **A05 Security Misconfiguration** | Amplify Gen2 managed infrastructure. S3 bucket policies deny public access. IAM least-privilege per Lambda function. No default credentials. |
| **A06 Vulnerable Components** | Dependabot / npm audit in CI. Amplify managed runtime updates. Quarterly dependency review. |
| **A07 Auth Failures** | Cognito-managed auth. MFA for privileged roles. Session timeout. Brute-force protection. Token rotation. |
| **A08 Data Integrity Failures** | SHA-256 payload hashing. Append-only audit log with hash chain. IAM-enforced no-delete on AuditLog. Pack schema validation. |
| **A09 Logging & Monitoring** | All compliance actions → AuditLog. CloudWatch alarms for auth failures, deadline engine misses, hash chain breaks. |
| **A10 SSRF** | Lambda functions do not accept user-supplied URLs for outbound requests. IDV/screening provider endpoints are configuration-fixed (Secrets Manager). |

### 8F. Compliance Mapping

How T2C platform controls map to key AML/CTF Act obligations.

| AML/CTF Obligation | T2C Control | Modules |
|:-------------------|:-----------|:--------|
| Customer identification & verification (Part A) | CDD Orchestration + Form Renderer + IDV integration | E, D, G |
| Ongoing customer due diligence | Periodic reviews + trigger events + rescreening | N, G, F |
| Suspicious matter reporting (s.41) | SMR pipeline: UAR → SMR → deadline → manual submission | N, I, J |
| Threshold transaction reporting (s.43) | TTR auto-trigger on threshold + deadline + manual submission | C, I, J |
| Record keeping (s.107) | 7-year retention on all compliance records; evidence hashing; audit trail | K, L, all |
| AML/CTF program (Part 7A) | Program Management: versioned docs, approval workflow, independent review | O |
| Compliance officer appointment (s.81) | Governance module: CO record, 14-day notification deadline | P, J |
| Risk assessment (s.82) | Risk Engine: deterministic factor-based scoring per AUSTRAC catalogue | F |
| Employee due diligence & training (s.83-84) | Personnel due diligence + training records + compliance tracking | P |
| Tipping-off prohibition (s.122-123) | 8 tipping-off controls (T1–T8) enforced across UI, API, data layers | All |
| Governing body oversight | GB role: program approval, annual report, final escalation, full visibility | P, O, H, Q |
| Sanctions screening (DFAT) | Mandatory, immediate, cannot-delay screening on all customers | G |
