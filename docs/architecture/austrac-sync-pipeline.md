# AUSTRAC Sync Pipeline — Technical Design

## 1. Problem Statement

T2C's forms, red flags, checklists, glossary, FAQ, and guidance content are manually sourced from AUSTRAC's website and starter kits. When AUSTRAC updates their guidance, form templates, risk indicators, or regulatory requirements, T2C content drifts out of sync — creating compliance risk for users and reputational risk for us.

**Current state:**
- 64 unique AUSTRAC URLs referenced across the codebase
- 5 downloadable .docx templates directly linked
- 25 unique form types across 3 entity dashboards
- 30 red flags (accountants), 32 (jewellers), 27 (real estate)
- 15 quiz questions per entity
- ~30 glossary terms per entity
- ~15 FAQ entries per entity
- 10+ checklists per entity (40-80 items each)

All of this is **hand-coded in static JS files** with no automated sync to AUSTRAC.

---

## 2. AUSTRAC Source Inventory

### 2.1 Source Types

| Source Type | Format | Update Frequency | Example |
|---|---|---|---|
| **Starter Kit Document Libraries** | .docx (Word) | Major releases (~annually) | `Real estate - Process document - January 2026.docx` |
| **Guidance Web Pages** | HTML | Periodic (quarterly) | `/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/...` |
| **Sector-Specific Pages** | HTML | Periodic | `/reforms/sector-specific-guidance/accounting-guidance/...` |
| **Risk Insights & Indicators** | HTML/PDF | Periodic | `/guidance-resources/risk-insights-and-indicators-suspicious-activity-accountants` |
| **FATF Grey/Black Lists** | External (fatf-gafi.org) | 3x per year (Feb, Jun, Oct) | Countries list |
| **DFAT Consolidated Sanctions List** | XML/JSON (dfat.gov.au) | Weekly | Sanctioned persons/entities |
| **News & Media Releases** | HTML | Ad-hoc | Regulatory announcements, enforcement actions |
| **Regulatory Expectations** | HTML | Ad-hoc | Implementation guidance, enforcement priorities |

### 2.2 AUSTRAC URLs Currently Tracked (by category)

```
Starter Kit Document Libraries (3):
  ├── /accounting-program-starter-kit-document-library
  ├── /real-estate-program-starter-kit-document-library
  └── /jeweller-program-starter-kit-document-library

Sector-Specific Guidance (18):
  ├── /accounting-guidance (6 pages: getting-started, step-1, step-2, step-3, ...)
  ├── /real-estate-guidance (6 pages)
  └── /dealers-precious-metals-stones-and-products-guidance (6 pages)

CDD Reform Guidance (8):
  ├── /initial-customer-due-diligence-reform (by customer type)
  ├── /enhanced-customer-due-diligence-reform
  ├── /delayed-initial-customer-due-diligence-reform
  ├── /reliance-under-customer-due-diligence-arrangements-reform
  ├── /assigning-customer-risk-ratings-reform
  └── /source-funds-and-source-wealth-reform

Governance & Personnel (4):
  ├── /amlctf-compliance-officer-reform
  ├── /governing-body-reform
  ├── /governance-and-oversight-sole-traders-and-micro-businesses-reform
  └── /identifying-personnel-roles-require-due-diligence-and-training-reform

Reporting (3):
  ├── /reporting-austrac-reform
  ├── /suspicious-matter-reports-reform
  └── /threshold-transaction-reports-reform

Risk Insights (3):
  ├── /risk-insights-...-real-estate-sector
  ├── /risk-insights-...-accountants
  └── /risk-insights-...-dealers-precious-stones-metals-and-other-products

Other (25+):
  ├── Core guidance pages
  ├── Worked examples / customer case studies
  ├── Regulatory expectations
  └── General compliance resources
```

### 2.3 Downloadable Documents Currently Linked

| Document | Sector | Size | URL Pattern |
|---|---|---|---|
| Customise Guide | Real Estate | 1.13 MB | `/sites/default/files/2026-01/Real%20estate%20-%20Customise%20guide%20-%20January%202026.docx` |
| Risk Assessment | Real Estate | 995 KB | `/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx` |
| Policy Document | Real Estate | 1.07 MB | `/sites/default/files/2026-01/Real%20estate%20-%20Policy%20document%20-%20January%202026.docx` |
| Process Document | Real Estate | 977 KB | `/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx` |
| Process Document | Jewellers | 926 KB | `/sites/default/files/2026-01/Jewellers%20-%20Process%20document%20-%20January%202026.docx` |

**Missing from codebase** (need to add):
- Accountants: Customise Guide, Risk Assessment, Policy Document, Process Document
- Jewellers: Customise Guide, Risk Assessment, Policy Document

---

## 3. Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AUSTRAC SYNC PIPELINE                           │
│                                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐  │
│  │ MONITOR  │───▶│ EXTRACT  │───▶│ COMPARE  │───▶│   PROPOSE    │  │
│  │ (Lambda) │    │ (Lambda) │    │ (Lambda) │    │   (Lambda)   │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────┬───────┘  │
│       │                                                  │          │
│       │ EventBridge                              SES Email│          │
│       │ (daily cron)                          + Dashboard │          │
│       │                                                  │          │
│  ┌────▼────────────────────────────────────────────────▼─────────┐  │
│  │                       DynamoDB                                 │  │
│  │  ┌─────────────────┐  ┌────────────────┐  ┌───────────────┐  │  │
│  │  │ source_snapshots │  │ change_log     │  │ form_registry │  │  │
│  │  └─────────────────┘  └────────────────┘  └───────────────┘  │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐                              │
│  │ REVIEW (UI)  │───▶│ DEPLOY       │                              │
│  │ Admin Panel  │    │ (GitHub PR)  │                              │
│  └──────────────┘    └──────────────┘                              │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.1 Components

| Component | Service | Purpose |
|---|---|---|
| **Scheduler** | EventBridge | Triggers monitoring daily at 06:00 AEST |
| **Monitor** | Lambda (Node.js) | Fetches AUSTRAC pages, computes content hashes, detects changes |
| **Extract** | Lambda (Node.js) | Parses changed HTML/DOCX into structured data |
| **Compare** | Lambda (Node.js) | Diffs extracted data against current T2C content |
| **Propose** | Lambda (Node.js) | Generates change proposals with AI assistance |
| **Store** | DynamoDB | Stores snapshots, change history, form registry |
| **Notify** | SES | Emails change alerts to admin |
| **Review** | Simple admin UI (S3 static site) | Human review + approve/reject proposals |
| **Deploy** | GitHub Actions | Creates PR with approved changes |

---

## 4. Data Model (DynamoDB)

### 4.1 Table: `t2c-source-snapshots`

Stores the latest content hash and full text for each monitored AUSTRAC URL.

```
PK: source_url (string)      — e.g. "https://www.austrac.gov.au/reforms/..."
SK: "LATEST"                  — (for latest) or ISO timestamp for history

Attributes:
  content_hash    (string)    — SHA-256 of page content
  content_text    (string)    — Extracted plain text (stripped HTML)
  content_html    (string)    — Raw HTML snapshot (compressed)
  last_checked    (string)    — ISO timestamp
  last_changed    (string)    — ISO timestamp (when content_hash changed)
  source_type     (string)    — "web_page" | "docx" | "external"
  sector          (string)    — "real-estate" | "accountants" | "jewellers" | "all"
  category        (string)    — "cdd" | "reporting" | "governance" | "risk" | "general"
  http_status     (number)    — Last HTTP status code
  etag            (string)    — HTTP ETag header (if available)
  last_modified   (string)    — HTTP Last-Modified header (if available)
```

### 4.2 Table: `t2c-form-registry`

Maps every T2C form field to its AUSTRAC source, enabling targeted change detection.

```
PK: entity_type (string)      — "real-estate" | "accountants" | "jewellers"
SK: form_id#field_name         — e.g. "form-cdd-individual#full_name"

Attributes:
  form_id         (string)    — e.g. "form-cdd-individual"
  form_name       (string)    — e.g. "Initial CDD — Individual / Sole Trader"
  field_name      (string)    — e.g. "full_name"
  field_label     (string)    — e.g. "Customer Full Legal Name"
  field_type      (string)    — "text" | "date" | "select" | "yesno" | "textarea" | "risk"
  source_url      (string)    — AUSTRAC page this field derives from
  source_section  (string)    — Section within the AUSTRAC page
  austrac_form    (string)    — AUSTRAC's official form name (from starter kit)
  last_verified   (string)    — ISO timestamp
  notes           (string)    — Any manual notes about this mapping
```

### 4.3 Table: `t2c-change-log`

Records all detected changes and their resolution status.

```
PK: change_id (string)        — UUID
SK: "META"

Attributes:
  detected_at     (string)    — ISO timestamp
  source_url      (string)    — Which AUSTRAC page changed
  sector          (string)    — Affected sector(s)
  change_type     (string)    — "content_update" | "new_page" | "page_removed" | "doc_update"
  summary         (string)    — AI-generated summary of what changed
  diff_text       (string)    — Text diff of old vs new content
  affected_forms  (list)      — T2C forms potentially impacted
  affected_fields (list)      — Specific fields that may need updating
  severity        (string)    — "critical" | "high" | "medium" | "low" | "info"
  status          (string)    — "detected" | "reviewing" | "approved" | "deployed" | "dismissed"
  reviewed_by     (string)    — Who reviewed (if applicable)
  reviewed_at     (string)    — When reviewed
  pr_url          (string)    — GitHub PR URL (if deployed)
```

---

## 5. Pipeline Stages — Detailed Design

### 5.1 MONITOR Stage

**Trigger:** EventBridge cron — `cron(0 20 * * ? *)` (06:00 AEST = 20:00 UTC previous day)

**Logic:**
```
for each source in MONITORED_SOURCES:
  1. Fetch URL (with If-None-Match / If-Modified-Since headers)
  2. If HTTP 304 Not Modified → skip
  3. Extract text content (strip HTML tags, normalize whitespace)
  4. Compute SHA-256 hash of normalized text
  5. Compare hash to stored snapshot
  6. If hash differs → trigger EXTRACT stage
  7. Update snapshot record regardless (last_checked timestamp)
```

**Monitored sources list** (stored in DynamoDB or as Lambda environment config):
```json
{
  "sources": [
    {
      "url": "https://www.austrac.gov.au/reforms/sector-specific-guidance/accounting-guidance/accounting-program-starter-kit",
      "type": "web_page",
      "sector": "accountants",
      "category": "starter-kit",
      "check_children": true
    },
    {
      "url": "https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx",
      "type": "docx",
      "sector": "real-estate",
      "category": "starter-kit-doc"
    }
    // ... all 64 URLs + document library pages
  ]
}
```

**Special handling for .docx files:**
- Download file, compute hash of binary content
- If changed, use `mammoth.js` (Node.js) to extract text for diff
- Store both binary hash and extracted text

**Special handling for FATF lists:**
- Fetch from `https://www.fatf-gafi.org/en/countries/black-and-grey-lists.html`
- Parse country lists
- Compare against `AMLiqData.fatfHighRisk.blacklist` and `greylist` arrays

**Special handling for DFAT Consolidated List:**
- Fetch from `https://www.dfat.gov.au/sites/default/files/regulation8_consolidated.xml`
- Check `Last-Modified` header for changes
- Parse XML for sanctioned entity count (as a change signal)

### 5.2 EXTRACT Stage

**Trigger:** MONITOR detects a content hash change

**Logic:**
```
1. Receive changed source URL + old/new content
2. Based on source_type:
   - web_page: Parse HTML → extract structured sections, headings, lists, tables
   - docx: Parse with mammoth.js → extract headings, paragraphs, tables, form fields
   - external: Parse format-specific (XML for DFAT, HTML for FATF)
3. Produce structured extraction:
   {
     url, sector, category,
     sections: [{ heading, content, lists, tables }],
     form_fields: [{ label, type, options }],  // if form content detected
     key_terms: [],                              // glossary-relevant terms
     dates: [],                                  // regulatory dates mentioned
     thresholds: [],                             // dollar amounts, time limits
   }
4. Store extraction in DynamoDB
5. Trigger COMPARE stage
```

### 5.3 COMPARE Stage

**Trigger:** EXTRACT produces new structured data

**Logic:**
```
1. Load current T2C content for affected sector:
   - Form fields from form-registry
   - Red flags from data-{entity}.js
   - Glossary, FAQ, checklists from data-{entity}.js

2. Run comparison:
   a. FIELD-LEVEL DIFF:
      - New fields in AUSTRAC not in T2C → "field_missing"
      - Fields in T2C not in AUSTRAC → "field_orphaned"
      - Field label/options changed → "field_modified"

   b. CONTENT DIFF:
      - New red flag indicators → "red_flag_new"
      - Modified risk descriptions → "risk_modified"
      - New glossary terms → "glossary_new"
      - Changed regulatory dates/thresholds → "threshold_changed" (CRITICAL)

   c. STRUCTURAL DIFF:
      - New sections/pages added → "section_new"
      - Pages removed or redirected → "section_removed"
      - New downloadable documents → "document_new"

3. Assign severity:
   - CRITICAL: Regulatory dates, dollar thresholds, sanctions list, new obligations
   - HIGH: Form field changes, new red flags, changed CDD requirements
   - MEDIUM: Guidance text updates, new FAQ content, glossary updates
   - LOW: Minor wording changes, formatting, link updates
   - INFO: No material impact detected

4. Store comparison results in change_log
5. Trigger PROPOSE stage
```

### 5.4 PROPOSE Stage

**Trigger:** COMPARE identifies material changes

**Logic:**
```
1. For each change detected:
   a. Map to specific T2C files and line numbers
   b. Generate proposed code change (new field, modified text, etc.)
   c. Use Claude API to:
      - Summarize what AUSTRAC changed and why it matters
      - Draft the specific JS code changes needed
      - Assess impact on existing user data (localStorage)

2. Package proposal:
   {
     change_id,
     summary: "AUSTRAC added new CDD requirement for virtual asset customers",
     severity: "high",
     affected_files: ["js/forms-jewellers.js", "js/data-jewellers.js"],
     proposed_changes: [
       { file, line, old_code, new_code, explanation }
     ],
     user_data_impact: "none" | "migration_needed" | "field_added_only",
     recommendation: "approve" | "review_needed" | "dismiss"
   }

3. Send notification email via SES
4. Update change_log status to "reviewing"
```

### 5.5 REVIEW Stage (Admin UI)

**Simple static site** (S3 + CloudFront) with Cognito auth:

```
Dashboard showing:
├── Pending Changes (sorted by severity)
│   ├── [CRITICAL] FATF Grey List updated — 2 countries added
│   ├── [HIGH] Accountants CDD form fields updated by AUSTRAC
│   └── [MEDIUM] New glossary term added to jeweller guidance
├── Change History (last 90 days)
├── Source Health (last check status for all 64 URLs)
└── Form Registry (browse all form-to-AUSTRAC mappings)

For each change:
  - View side-by-side diff (old vs new AUSTRAC content)
  - View proposed T2C code changes
  - Actions: [Approve] [Modify] [Dismiss] [Escalate]
```

### 5.6 DEPLOY Stage

**Trigger:** Admin approves a change proposal

**Logic:**
```
1. Create GitHub branch: austrac-sync/{change_id}
2. Apply approved code changes to the branch
3. Create Pull Request with:
   - Title: "AUSTRAC Sync: {summary}"
   - Body: Change details, AUSTRAC source link, diff, impact assessment
   - Labels: "austrac-sync", severity label
4. Run existing CI/CD (Amplify auto-deploy on merge)
5. Update change_log: status = "deployed", pr_url = PR link
```

---

## 6. Content Mapping Schema

### 6.1 How AUSTRAC Content Maps to T2C Components

```
AUSTRAC Source                          T2C Component              JS File
─────────────────────────────────────   ────────────────────────   ──────────────────
Starter Kit - Onboarding Individual  →  CDD Individual Form     →  forms-{entity}.js
Starter Kit - Onboarding Entity      →  CDD Company/Trust Form  →  forms-{entity}.js
Starter Kit - Enhanced CDD           →  EDD Form                →  forms-{entity}.js
Starter Kit - Sanctions Check        →  PEP/TFS Screening Form  →  forms-{entity}.js
Starter Kit - PEP Check              →  PEP/TFS Screening Form  →  forms-{entity}.js
Starter Kit - Escalation             →  Suspicious Activity Log  →  forms-{entity}.js
Starter Kit - Periodic Review        →  Ongoing CDD Form        →  forms-{entity}.js
Starter Kit - Personnel DD           →  Personnel DD Form       →  forms-{entity}.js
Risk Insights Page                   →  Red Flags Array         →  data-{entity}.js
Sector Guidance Pages                →  FAQ, Glossary, Sections →  data-{entity}.js
CDD Reform Pages                     →  CDD Section Content     →  app-{entity}.js
Governance Reform Pages              →  Governance Section       →  app-{entity}.js
Reporting Reform Pages               →  Reporting Section        →  app-{entity}.js
FATF Grey/Black Lists                →  fatfHighRisk Object     →  data-{entity}.js
DFAT Consolidated List (reference)   →  PEP/TFS Form guidance   →  forms-{entity}.js
```

### 6.2 Form Field Mapping Example (CDD Individual — Accountants)

| T2C Field Name | T2C Label | AUSTRAC Source | AUSTRAC Form Name |
|---|---|---|---|
| `full_name` | Client Full Legal Name | Onboarding form — Individuals | "Full legal name" |
| `dob` | Date of Birth | Onboarding form — Individuals | "Date of birth" |
| `address` | Residential Address | Onboarding form — Individuals | "Residential address" |
| `own_behalf` | Acting on their own behalf? | Initial CDD form — Individual | "Acting on own behalf" |
| `doc1_type` | Document 1 — Type | Initial CDD form — Individual | "Primary ID document" |
| `pep_screening` | PEP Screening Completed? | PEP check process | "PEP screening" |
| `tfs_screening` | TFS/Sanctions Screening | Sanctions check process | "DFAT check" |
| `risk_rating` | Customer Risk Rating | Risk Assessment | "Client risk rating" |

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Monitor + detect changes. No automated extraction yet.

- Create DynamoDB tables (source_snapshots, change_log)
- Build Monitor Lambda — fetch all 64 URLs, compute hashes, store snapshots
- Set up EventBridge daily cron
- SES email notifications when any hash changes
- Manual review of changes (read the AUSTRAC page directly)

**AWS cost:** ~$5/month (Lambda invocations + DynamoDB + SES)

**Files:**
```
amplify/
  functions/
    austrac-monitor/
      handler.ts          — Main monitor logic
      sources.json        — List of monitored URLs
```

### Phase 2: Smart Extraction (Week 3-4)

**Goal:** Parse AUSTRAC changes into structured data.

- Build Extract Lambda — HTML parsing, .docx parsing (mammoth.js)
- Build form_registry table — manually seed with current form-to-AUSTRAC mappings
- Build Compare Lambda — field-level diffing against registry
- Severity classification logic
- Enhanced email notifications with diff summaries

**Files:**
```
amplify/
  functions/
    austrac-extract/
      handler.ts          — Parse HTML/DOCX
      parsers/
        html-parser.ts    — Cheerio-based HTML extraction
        docx-parser.ts    — Mammoth.js DOCX extraction
    austrac-compare/
      handler.ts          — Diff logic
      severity.ts         — Classification rules
```

### Phase 3: AI-Assisted Proposals (Week 5-6)

**Goal:** Auto-generate code change proposals.

- Integrate Claude API into Propose Lambda
- Generate human-readable change summaries
- Generate proposed JS code diffs
- Build simple admin dashboard (S3 static site)
- Approve/dismiss workflow

**Files:**
```
amplify/
  functions/
    austrac-propose/
      handler.ts          — AI proposal generation
      templates/           — Prompt templates for Claude
admin/
  index.html              — Review dashboard
  js/admin.js             — Dashboard logic (Cognito auth)
```

### Phase 4: Auto-Deploy (Week 7-8)

**Goal:** Approved changes become PRs automatically.

- GitHub API integration (create branch, commit, PR)
- Auto-label PRs by severity
- FATF list auto-update (no human review needed for country list changes)
- DFAT sanctions monitoring
- Monitoring health dashboard

---

## 8. Monitoring Priority Matrix

| Source | Check Frequency | Severity if Changed | Auto-Deploy? |
|---|---|---|---|
| FATF Grey/Black Lists | Daily | CRITICAL | Yes (country lists only) |
| DFAT Consolidated List | Daily | CRITICAL | No (reference only) |
| Starter Kit Document Libraries | Daily | HIGH | No |
| Risk Insights Pages | Daily | HIGH | No |
| CDD Reform Guidance | Daily | HIGH | No |
| Sector-Specific Guidance | Daily | MEDIUM | No |
| Reporting/Governance Pages | Daily | MEDIUM | No |
| News & Media Releases | Daily | INFO | No |
| .docx Download Files | Weekly | HIGH | No |

---

## 9. Cost Estimate

### At Launch (monitoring 70 sources daily)

| Service | Monthly Cost |
|---|---|
| Lambda (monitor: 70 invocations/day × 30 = 2,100/mo) | $0.05 |
| Lambda (extract/compare: ~10 invocations/mo) | $0.01 |
| DynamoDB (snapshots + change log, on-demand) | $2.00 |
| SES (change notification emails, ~10/mo) | $0.01 |
| EventBridge (1 rule) | Free |
| S3 + CloudFront (admin dashboard) | $1.00 |
| Claude API (proposals, ~5 calls/mo) | $5.00 |
| **Total** | **~$8/month** |

### Scaled (200+ sources, multiple sectors)

| Service | Monthly Cost |
|---|---|
| Lambda (all functions) | $1.00 |
| DynamoDB | $5.00 |
| SES | $0.50 |
| Claude API (more proposals) | $15.00 |
| S3 + CloudFront | $2.00 |
| **Total** | **~$24/month** |

---

## 10. Risk Mitigation

| Risk | Mitigation |
|---|---|
| AUSTRAC blocks scraping | Use polite crawling (1 req/sec, respect robots.txt, proper User-Agent). Fallback: RSS if available. |
| False positives (cosmetic changes flagged) | Content normalization (strip whitespace, dates, boilerplate). Severity classification filters noise. |
| AUSTRAC restructures URLs | Monitor for 301/302 redirects. Alert on 404s. URL redirect tracking in snapshots table. |
| AI generates incorrect proposals | Human-in-the-loop review for all code changes. Only FATF country lists auto-deploy. |
| Stale form registry | Quarterly manual audit of form-to-AUSTRAC mappings. Registry health check in admin dashboard. |
| AUSTRAC publishes new sector kits | Monitor `/reforms/program-starter-kits` parent page for new child links. Alert on new sectors. |

---

## 11. Future Enhancements

1. **RSS/Atom feed** — If AUSTRAC publishes feeds, subscribe instead of scraping
2. **Webhook from AUSTRAC** — If they ever expose an API or notification system
3. **Multi-sector expansion** — Lawyers, conveyancers (Tranche 2 sectors T2C doesn't cover yet)
4. **User-facing changelog** — Show T2C users what changed and when ("Updated: FATF Grey List, Feb 2026")
5. **Compliance calendar** — Auto-generate alerts based on regulatory dates detected in AUSTRAC content
6. **Version history** — Let users see previous versions of forms/guidance before an AUSTRAC update
7. **PDF report generation** — "Your T2C content is X% aligned with current AUSTRAC guidance"

---

## 12. Architecture Decision Log

| # | Decision | Rationale |
|---|---|---|
| D1 | Lambda over EC2 | Runs once daily for seconds. Serverless is 100x cheaper. |
| D2 | DynamoDB over RDS | Simple key-value lookups. No joins needed. On-demand pricing. |
| D3 | Content hashing over full-text diff | Hash comparison is O(1) and catches any change. Full diff only runs when hash differs. |
| D4 | Human-in-the-loop for all code changes | Compliance content is too sensitive for fully automated updates. One wrong field could create legal risk. |
| D5 | FATF lists auto-deploy | Country list changes are mechanical (add/remove from array). Low risk of error. High urgency. |
| D6 | Claude API for proposals | Translating AUSTRAC prose into T2C JS code requires understanding context. AI excels here. |
| D7 | GitHub PR workflow | Keeps all changes auditable in git. Team can review before merge. Amplify auto-deploys on merge. |
| D8 | mammoth.js for DOCX | Pure Node.js, no external dependencies, works in Lambda. Extracts clean text from Word docs. |
| D9 | Cheerio for HTML parsing | Lightweight, jQuery-like HTML parser for Node.js. No headless browser overhead. |
| D10 | EventBridge over CloudWatch Events | EventBridge is the modern replacement. Same pricing, better integration. |
