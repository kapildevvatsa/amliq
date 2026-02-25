# AUSTRAC Sync Pipeline — Technical Design (v2)

> **Revision history:** v2 — Feb 2026. Full rewrite addressing design gaps, technical issues, and over-engineering from v1 review. Key changes: single-table DynamoDB, S3 for snapshots, merged COMPARE+PROPOSE into AI-powered ANALYZE stage, revised phasing, added pre-requisites, removed form_registry table.

---

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

**T2C content is paraphrased, not verbatim.** Red flags, FAQ answers, and checklist text are written in T2C's voice. There is no 1:1 text match between AUSTRAC pages and T2C data structures. This means deterministic field-level diffing is not feasible for most content types — AI-powered semantic analysis is required.

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

| Document | Sector | URL Pattern |
|---|---|---|
| Customise Guide | Real Estate | `/sites/default/files/2026-01/Real%20estate%20-%20Customise%20guide%20-%20January%202026.docx` |
| Risk Assessment | Real Estate | `/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx` |
| Policy Document | Real Estate | `/sites/default/files/2026-01/Real%20estate%20-%20Policy%20document%20-%20January%202026.docx` |
| Process Document | Real Estate | `/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx` |
| Process Document | Jewellers | `/sites/default/files/2026-01/Jewellers%20-%20Process%20document%20-%20January%202026.docx` |

**Warning:** These URLs embed a date (`2026-01`) in the path. When AUSTRAC publishes updates, the URL changes and old links return 404. The pipeline must discover .docx URLs dynamically by parsing the Document Library pages, not by hardcoding URLs.

**Missing from codebase** (need to add):
- Accountants: Customise Guide, Risk Assessment, Policy Document, Process Document
- Jewellers: Customise Guide, Risk Assessment, Policy Document

---

## 3. Pipeline Architecture

```
┌───────────────────────────────────────────────────────────────────────┐
│                     AUSTRAC SYNC PIPELINE (v2)                        │
│                                                                       │
│  ┌──────────┐    ┌──────────┐    ┌───────────────┐                   │
│  │ MONITOR  │───▶│  DIFF    │───▶│   ANALYZE     │                   │
│  │ (Lambda) │    │ (Lambda) │    │ (Lambda + AI) │                   │
│  └──────────┘    └──────────┘    └──────┬────────┘                   │
│       │                                  │                            │
│       │ EventBridge                      │ SES Email                  │
│       │ (daily cron)                     │ with summary + diff        │
│       │                                  │                            │
│  ┌────▼──────────────────────────────────▼────────────────────────┐   │
│  │                    DynamoDB (single table)                      │   │
│  │  SOURCE#url / LATEST     — current snapshot metadata           │   │
│  │  SOURCE#url / HIST#ts    — historical snapshots                │   │
│  │  CHANGE#uuid / META      — detected changes                    │   │
│  │  RUN#date / run_id       — pipeline execution metadata         │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌──────────┐    ┌───────────────────────────────┐                   │
│  │    S3    │    │  source-mapping.json (in repo) │                   │
│  │ snapshots│    │  URL → affected T2C files      │                   │
│  └──────────┘    └───────────────────────────────┘                   │
│                                                                       │
│  ┌──────────────────────────────────────────────┐                    │
│  │ CloudWatch Alarms — pipeline health monitor  │                    │
│  └──────────────────────────────────────────────┘                    │
└───────────────────────────────────────────────────────────────────────┘
```

### 3.1 Components

| Component | Service | Purpose |
|---|---|---|
| **Scheduler** | EventBridge | Triggers monitoring daily at 06:00 AEST |
| **Monitor** | Lambda (Node.js) | Fetches AUSTRAC pages, extracts content regions, computes hashes, detects changes |
| **Diff** | Lambda (Node.js) | Computes text diffs when content hash changes |
| **Analyze** | Lambda (Node.js) + Claude API | AI-powered analysis: what changed, does it impact T2C, what should be updated |
| **Store** | DynamoDB (single table) | Snapshot metadata, change log, pipeline run records |
| **Snapshots** | S3 | Full HTML/text snapshots (avoids DynamoDB 400KB item limit) |
| **Mapping** | JSON file in repo | Maps each AUSTRAC URL to affected T2C files and data structures |
| **Notify** | SES | Emails change alerts with diffs and AI analysis to admin |
| **Health** | CloudWatch Alarms | Alerts if the pipeline itself stops running |

**Deferred to future:**
- Admin review UI (S3 static site) — manual email review is sufficient initially
- GitHub PR automation — human creates PRs manually (~2 min per change)
- Severity classification rules — start with binary "changed / not changed"

---

## 4. Pre-requisites (Before Writing Code)

### 4.1 Validate AUSTRAC Fetchability

Before building the pipeline, manually test that all 64 AUSTRAC URLs are fetchable with a simple HTTP client (not a browser). Known issues:
- AUSTRAC runs Drupal — pages may be slow (10+ seconds) or use JavaScript rendering
- FATF website (`fatf-gafi.org`) returns **HTTP 403** for automated requests

**Action items:**
1. Write a simple Node.js script that fetches all 64 URLs and reports status codes + response times
2. For each URL, inspect if the main content is in the initial HTML or requires JS rendering
3. Identify which URLs need a headless browser (Puppeteer) vs simple HTTP fetch

### 4.2 Investigate AUSTRAC Notification Channels

Before building a scraper, check if AUSTRAC offers:
- RSS/Atom feeds for content changes
- Email notification lists for regulated entities
- An API or structured data format
- A sitemap.xml file

Contact AUSTRAC directly if needed. Government agencies are often open to this for compliance tooling.

### 4.3 FATF List Workaround

The FATF website blocks automated access. Alternative approaches:
- Parse FATF press releases (issued 3x/year after plenary sessions in Feb, Jun, Oct)
- Use the FATF API if one exists
- Manual update 3x/year — the schedule is predictable
- Use a third-party data provider (e.g., sanctions screening APIs)

### 4.4 Create Source-to-T2C Mapping File

Create `source-mapping.json` that maps each AUSTRAC URL to the T2C files and data structures it affects. This is the **most important artifact** and must be created manually before any code is written.

```json
[
  {
    "url": "https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance",
    "type": "web_page",
    "sector": "real-estate",
    "category": "guidance",
    "content_selector": "article .field--name-body",
    "affects": ["js/data.js", "js/app.js"],
    "affects_keys": ["glossary", "faq", "obligations"],
    "check_for_child_links": true,
    "notes": "Main guidance hub — check for new child pages"
  },
  {
    "url": "https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-document-library",
    "type": "document_library",
    "sector": "real-estate",
    "category": "starter-kit",
    "content_selector": "article .field--name-body",
    "affects": ["js/data.js"],
    "affects_keys": ["austracLinks"],
    "discover_docx_urls": true,
    "notes": "Parse this page for .docx download links — do NOT hardcode .docx URLs"
  },
  {
    "url": "https://www.austrac.gov.au/.../risk-insights-...-real-estate-sector",
    "type": "web_page",
    "sector": "real-estate",
    "category": "risk-insights",
    "content_selector": "article .field--name-body",
    "affects": ["js/data.js"],
    "affects_keys": ["redFlags"],
    "notes": "Red flag indicators — T2C content is paraphrased, not verbatim"
  }
]
```

Each entry includes a `content_selector` — a CSS selector identifying the main content region of the page. This avoids false positives from Drupal's dynamic sidebars, session tokens, and timestamps.

---

## 5. Data Model (DynamoDB — Single Table)

### 5.1 Table: `t2c-pipeline`

Single-table design. All access patterns served from one table with composite keys.

```
────────────────────────────────────────────────────────────────────
ACCESS PATTERN               PK                    SK
────────────────────────────────────────────────────────────────────
Current snapshot metadata    SOURCE#<url>          LATEST
Snapshot history             SOURCE#<url>          HIST#<iso_ts>
Change record                CHANGE#<uuid>         META
Pipeline run record          RUN#<date>            <run_id>
────────────────────────────────────────────────────────────────────
```

### 5.2 Source Snapshot Item (`SOURCE# / LATEST`)

```
PK:  SOURCE#<url>
SK:  LATEST

content_hash     (S)  — SHA-256 of normalized content text
s3_key           (S)  — S3 key for full HTML/text snapshot
last_checked     (S)  — ISO timestamp of last check
last_changed     (S)  — ISO timestamp of last content change
source_type      (S)  — "web_page" | "document_library" | "docx" | "external"
sector           (S)  — "real-estate" | "accountants" | "jewellers" | "all"
category         (S)  — "guidance" | "cdd" | "reporting" | "governance" | "risk" | "starter-kit"
http_status      (N)  — Last HTTP status code
error_count      (N)  — Consecutive error count (reset on success)
error_type       (S)  — "none" | "timeout" | "http_4xx" | "http_5xx" | "blocked" | "dns_error"
etag             (S)  — HTTP ETag header (if available)
last_modified    (S)  — HTTP Last-Modified header (if available)
```

### 5.3 Source Snapshot History (`SOURCE# / HIST#`)

```
PK:  SOURCE#<url>
SK:  HIST#<iso_ts>

content_hash     (S)
s3_key           (S)  — S3 key for this version's full text
http_status      (N)
```

### 5.4 Change Record (`CHANGE# / META`)

```
PK:  CHANGE#<uuid>
SK:  META

detected_at      (S)  — ISO timestamp
source_url       (S)  — Which AUSTRAC page changed
sector           (S)  — Affected sector(s)
change_type      (S)  — "content_update" | "new_page" | "page_removed" | "doc_update" | "new_doc_url"
diff_s3_key      (S)  — S3 key for the text diff
ai_summary       (S)  — Claude-generated summary of what changed and impact
affected_files   (L)  — T2C files potentially impacted (from source-mapping.json)
status           (S)  — "detected" | "reviewed" | "applied" | "dismissed"
reviewed_at      (S)  — When reviewed (if applicable)
notes            (S)  — Manual notes

GSI1PK: status   (S)  — for querying by status
GSI1SK: detected_at (S)
GSI2PK: sector   (S)  — for querying by sector
GSI2SK: detected_at (S)
```

### 5.5 Pipeline Run Record (`RUN# / <run_id>`)

```
PK:  RUN#<date>
SK:  <run_id>

started_at       (S)  — ISO timestamp
completed_at     (S)  — ISO timestamp
duration_ms      (N)  — Execution time
sources_checked  (N)  — How many URLs were checked
changes_found    (N)  — How many content changes detected
errors           (N)  — How many URLs failed
error_details    (L)  — [{ url, error_type, message }]
```

### 5.6 GSIs

| GSI | PK | SK | Purpose |
|---|---|---|---|
| GSI1 | `status` | `detected_at` | Find pending/reviewed/applied changes |
| GSI2 | `sector` | `detected_at` | Find changes by sector |

### 5.7 S3 Bucket: `t2c-pipeline-snapshots`

```
snapshots/
  <url_hash>/
    <iso_ts>.html        — Raw HTML snapshot
    <iso_ts>.txt         — Extracted normalized text
diffs/
  <change_uuid>.diff     — Text diff between old and new content
```

HTML snapshots stored in S3 (not DynamoDB) to avoid the 400KB item size limit. DynamoDB items only store the S3 key reference.

---

## 6. Pipeline Stages — Detailed Design

### 6.1 MONITOR Stage

**Trigger:** EventBridge cron — `cron(0 20 * * ? *)` (06:00 AEST = 20:00 UTC previous day)

**Lambda config:** timeout 300s (5 min), memory 512MB

**Logic:**
```
1. Load source-mapping.json (bundled with Lambda)
2. Create pipeline run record in DynamoDB

3. Process sources in batches of 5 concurrent requests:
   for each batch:
     a. Fetch URL with 10-second per-request timeout
        - Include headers: If-None-Match, If-Modified-Since, User-Agent
        - Rate limit: max 5 concurrent, ~1 req/sec effective
     b. If HTTP 304 Not Modified → update last_checked, skip
     c. If HTTP error (4xx/5xx/timeout):
        - Increment error_count on snapshot record
        - Set error_type
        - If error_count >= 3 consecutive days → include in alert email
        - Continue to next source (don't fail the whole run)
     d. If HTTP 200:
        - Extract content region using CSS selector from source-mapping.json
        - Normalize: strip HTML tags, collapse whitespace, remove Drupal tokens
        - Compute SHA-256 hash of normalized text
        - Compare hash to stored snapshot
        - If hash changed:
          * Store new snapshot to S3
          * Update DynamoDB with new hash, s3_key, last_changed
          * Add to changes list for this run
          * Create HIST# record
        - If hash same:
          * Update last_checked only
        - Reset error_count to 0

4. Special handling for document_library pages:
   - Parse page HTML for .docx download links
   - Compare discovered URLs against previously known URLs
   - If new .docx URL found → flag as "new_doc_url" change
   - If known .docx URL returns 404 → flag as "doc_url_changed"

5. Update pipeline run record with results

6. If any changes detected OR any sources have error_count >= 3:
   - Send SES summary email with:
     * List of changed URLs
     * Error summary (URLs failing consistently)
     * Link to each changed URL
```

**Content normalization rules:**
```
1. Parse HTML with Cheerio
2. Select content region using per-URL CSS selector (from source-mapping.json)
   - Default selector: "article .field--name-body" (Drupal standard)
   - Fallback: "main" or "body" if selector matches nothing
3. Remove: <script>, <style>, <nav>, <footer>, <aside> elements
4. Remove: HTML comments, data-* attributes, id attributes
5. Extract text content only
6. Collapse all whitespace to single spaces
7. Remove date patterns matching "DD Month YYYY" or "YYYY-MM-DD" (page last-updated dates)
8. Trim and lowercase
9. Compute SHA-256 of result
```

### 6.2 DIFF Stage

**Trigger:** MONITOR detects a content hash change. Can be inline (same Lambda) or separate invocation.

For Phase 1, this runs inline within the Monitor Lambda. For Phase 2+, it becomes a separate Lambda triggered by SQS.

**Logic:**
```
1. Load previous snapshot text from S3
2. Load new snapshot text from S3
3. Compute line-by-line text diff (using a diffing library like `diff`)
4. Store diff to S3 at diffs/<change_uuid>.diff
5. Create CHANGE# record in DynamoDB
```

### 6.3 ANALYZE Stage (Replaces old COMPARE + PROPOSE)

**Trigger:** DIFF produces a change record. Phase 3+ only.

**Why merged:** T2C content is paraphrased, not verbatim AUSTRAC text. Deterministic field-level diffing cannot work for most content types. Red flags, FAQ answers, checklist items, and form guidance are all written in T2C's voice. Mapping AUSTRAC prose to T2C data structures is a **semantic understanding task** that requires AI.

**Logic:**
```
1. Load the text diff from S3
2. Load source-mapping.json to identify affected T2C files and data keys
3. Send to Claude API with context:
   - The text diff (what changed on AUSTRAC's page)
   - Which T2C data structures are affected (from source-mapping.json)
   - The current T2C data for those structures (loaded from a bundled snapshot)
4. Claude returns:
   {
     summary: "AUSTRAC added a new risk indicator for virtual asset transactions",
     impacts_t2c: true,
     affected_data: ["redFlags"],
     affected_files: ["js/data-jewellers.js"],
     recommended_changes: "Add new red flag: { id: 'rf33', category: 'serviceTransactionRisk', ... }",
     urgency: "medium"
   }
5. Update CHANGE# record with AI analysis
6. Send detailed email with diff + AI summary + recommended action
```

**Claude prompt template:**
```
You are reviewing a change to AUSTRAC's website content that may affect
the T2C compliance tool.

## What changed on AUSTRAC's website
URL: {source_url}
Category: {category}
Sector: {sector}

### Text diff:
{diff_text}

## T2C data structures that may be affected
The following T2C data keys are sourced from this AUSTRAC page:
{affects_keys}

Current T2C content for these keys:
{current_t2c_data}

## Your task
1. Summarize what AUSTRAC changed in plain English
2. Determine if this change impacts any T2C content
3. If yes, specify exactly which T2C data entries need updating
4. Provide the recommended code changes
5. Rate urgency: critical / high / medium / low / none
```

---

## 7. Content Mapping Schema

### 7.1 How AUSTRAC Content Maps to T2C Components

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

### 7.2 T2C Data Structure Reference

| Data Key | Structure | Sector Differences |
|---|---|---|
| `glossary` | `[{ term, definition }]` | Terms vary by sector |
| `faq` | `[{ q, a, topics, source }]` | Questions sector-specific |
| `redFlags` | `[{ id, category, severity, title, detail }]` | Category names differ: `customer` vs `client` vs `customerBehaviour` |
| `checklists` | `{ category: [{ id, text, detail }] }` | Jewellers has unique `transactionDetection` |
| `obligations` | `[{ num, title, icon, summary, section }]` | Jewellers has 12 vs 10 |
| `austracLinks` | `[{ category, title, url, desc }]` | Sector-specific URLs |
| `riskQuestions` | `{ category: [{ id, text, risk, reason }] }` | Accountants uses `client` vs `customer` |
| `fatfHighRisk` | `{ blacklist: [...], greylist: [...] }` | **Identical across all 3 sectors** |
| `quiz` | Quiz questions | Sector-specific |

### 7.3 Known Limitations for Automated Comparison

| Content Type | Feasibility | Why |
|---|---|---|
| FATF country lists | **High** — mechanical array comparison | Structured data, exact match possible |
| AUSTRAC link URLs | **High** — URL string comparison | Exact match, detect 404s and new links |
| Glossary terms | **Medium** — term matching feasible, definitions may differ | T2C definitions are paraphrased |
| Red flags | **Low** — requires semantic understanding | T2C content is rewritten, not quoted |
| FAQ answers | **Low** — requires semantic understanding | T2C paraphrases AUSTRAC guidance |
| Form fields | **Very Low** — forms are not data-driven | Field definitions are inline HTML in render methods |
| Checklists | **Low** — requires semantic understanding | T2C checklist items summarize AUSTRAC requirements |

**Implication:** For most content types, the pipeline can detect that an AUSTRAC page changed and show the diff, but it cannot automatically determine the impact on T2C without AI analysis. This is why the COMPARE and PROPOSE stages are merged into a single AI-powered ANALYZE stage.

---

## 8. Implementation Phases

### Phase 0: Pre-requisites (Week 0)

**Goal:** Validate assumptions before writing pipeline code.

- [ ] Run fetchability test against all 64 AUSTRAC URLs (simple Node.js script)
- [ ] Identify which pages need a headless browser vs simple HTTP fetch
- [ ] Check if AUSTRAC has a sitemap.xml, RSS feed, or notification service
- [ ] Determine FATF data access approach (press releases, API, manual 3x/year)
- [ ] Create `source-mapping.json` with all 64 URLs mapped to T2C files
- [ ] Identify the correct CSS selector for content extraction per URL (test with Cheerio)

**Deliverables:** Fetchability report, source-mapping.json, decision on FATF approach.

### Phase 1: Monitor + Alert (Week 1-2)

**Goal:** Know when any AUSTRAC page changes. Email alerts with diffs.

- [ ] Create DynamoDB table (`t2c-pipeline`, single table, on-demand billing)
- [ ] Create S3 bucket (`t2c-pipeline-snapshots`)
- [ ] Build Monitor Lambda with content-region extraction and normalization
- [ ] Implement batched concurrent fetching (5 concurrent, 10s timeout per request)
- [ ] Implement inline text diffing (no separate Lambda yet)
- [ ] Set up EventBridge daily cron
- [ ] SES email notifications with diff summary
- [ ] CloudWatch alarm: zero Lambda invocations in 48 hours → SNS alert
- [ ] Pipeline run metadata recording
- [ ] Add to `backend.ts`: DynamoDB table, S3 bucket, Lambda, EventBridge rule, IAM policies

**AWS cost:** ~$3-5/month

**Files:**
```
amplify/
  functions/
    austrac-monitor/
      resource.ts           — defineFunction config
      handler.ts            — Monitor logic (fetch, normalize, hash, diff, alert)
      source-mapping.json   — URL-to-T2C-files mapping
      normalizer.ts         — Content extraction and normalization utils
```

### Phase 2: Smart Diffing + FATF (Week 3-4)

**Goal:** Better diffs, reduce false positives, automate FATF list detection.

- [ ] Refine content normalization per-URL (tune CSS selectors based on Phase 1 data)
- [ ] Implement .docx URL dynamic discovery from Document Library pages
- [ ] Implement .docx content extraction (mammoth.js) and hashing
- [ ] Implement FATF list detection (parse press releases or alternative source)
- [ ] FATF list auto-comparison against `AMLiqData.fatfHighRisk`
- [ ] Separate Diff stage into SQS-triggered Lambda (for longer processing)
- [ ] Better email formatting: side-by-side diffs, affected T2C files highlighted
- [ ] Monitor parent pages for new child links (new page discovery)
- [ ] Error tracking: distinguish 404/500/403/timeout, alert on 3+ consecutive failures

**Files:**
```
amplify/
  functions/
    austrac-monitor/
      ... (enhanced)
      docx-handler.ts       — .docx URL discovery and content extraction
      fatf-handler.ts       — FATF list comparison logic
```

### Phase 3: AI-Powered Analysis (Week 5-8)

**Goal:** Claude analyzes diffs and recommends T2C content changes.

- [ ] Build Analyze Lambda with Claude API integration
- [ ] Create prompt templates for different content types (red flags, glossary, forms, checklists)
- [ ] Bundle T2C data snapshots with Lambda (or fetch from S3) for Claude context
- [ ] Store AI analysis in DynamoDB change records
- [ ] Enhanced email: diff + AI summary + recommended code changes
- [ ] FATF list auto-update: generate the exact `fatfHighRisk` object update (mechanical, no AI needed)
- [ ] Basic admin API endpoints for listing/reviewing changes (optional)

**Files:**
```
amplify/
  functions/
    austrac-analyze/
      resource.ts
      handler.ts            — Claude API integration
      prompts/
        red-flags.txt       — Prompt template for red flag changes
        glossary.txt        — Prompt template for glossary changes
        general.txt         — General change analysis prompt
```

### Phase 4: Future Enhancements (Deferred)

- GitHub PR automation (auto-create PRs from approved changes)
- Admin review dashboard (S3 static site with Cognito auth)
- Severity classification rules (after operational data is available)
- Form refactor to data-driven (prerequisite for automated form comparison)
- User-facing changelog ("Updated: FATF Grey List, Feb 2026")
- Compliance calendar (auto-generate alerts from regulatory dates)

---

## 9. Monitoring Priority Matrix

| Source | Check Frequency | Auto-Actionable? | Notes |
|---|---|---|---|
| FATF Grey/Black Lists | Daily (or 3x/year manual) | Yes — mechanical array update | FATF site blocks bots; use press releases or manual |
| DFAT Consolidated List | Daily | No — reference only | Check `Last-Modified` header |
| Starter Kit Document Libraries | Daily | No — discover .docx URLs dynamically | Parse library page for download links |
| Risk Insights Pages | Daily | No — AI analysis needed | T2C red flags are paraphrased |
| CDD Reform Guidance | Daily | No — AI analysis needed | |
| Sector-Specific Guidance | Daily | No — AI analysis needed | |
| Reporting/Governance Pages | Daily | No — AI analysis needed | |
| News & Media Releases | Daily | No — informational only | |
| .docx Downloads | Discovered dynamically | No — mammoth.js extraction + AI | URLs change with each release |

---

## 10. Cost Estimate

### At Launch (Phase 1 — monitoring 70 sources daily)

| Service | Monthly Cost |
|---|---|
| Lambda (monitor: 1 invocation/day × 30 = 30/mo, 5 min each) | $0.05 |
| DynamoDB (single table, on-demand, <1GB) | $1.50 |
| S3 (HTML snapshots, ~200MB/year) | $0.05 |
| SES (alert emails, ~20/mo) | $0.02 |
| CloudWatch (alarms + logs) | $1.00 |
| EventBridge (1 rule) | Free |
| **Total** | **~$3-5/month** |

### With AI Analysis (Phase 3)

| Service | Monthly Cost |
|---|---|
| Lambda (monitor + analyze) | $0.10 |
| DynamoDB | $2.00 |
| S3 | $0.10 |
| SES | $0.05 |
| CloudWatch | $1.00 |
| Claude API (10-20 analysis calls/mo, Sonnet) | $5-15 |
| **Total** | **~$8-18/month** |

### Scaled (200+ sources, multiple sectors)

| Service | Monthly Cost |
|---|---|
| Lambda (all functions) | $1.00 |
| DynamoDB | $5.00 |
| S3 | $0.50 |
| SES | $0.50 |
| CloudWatch | $2.00 |
| Claude API (more proposals, possible Opus for accuracy) | $15-40 |
| **Total** | **~$25-50/month** |

---

## 11. Pipeline Health Monitoring

### 11.1 Dead Man's Switch

CloudWatch alarm on the Monitor Lambda invocation count. If zero invocations in any 48-hour window, fire an SNS alert to a separate notification channel (not the same SES path, since SES itself could be the problem).

### 11.2 Source Health Tracking

Each source snapshot has `error_count` and `error_type`. The pipeline email includes a health summary:
- Sources with `error_count >= 3`: listed as "failing consistently"
- Sources with `http_status` changing from 200 → 404: flagged as "URL possibly restructured"
- Sources with `http_status` 403: flagged as "access blocked"

### 11.3 Pipeline Run Records

Every execution creates a `RUN#<date> / <run_id>` record with duration, sources checked, changes found, errors. This enables:
- "Has the pipeline been running?"
- "How many errors per run over time?"
- "How often do changes occur?"

---

## 12. Risk Mitigation

| Risk | Mitigation |
|---|---|
| **AUSTRAC blocks scraping** | Polite crawling (5 concurrent max, 10s timeout, proper User-Agent). Investigate RSS/notification channels. Respect robots.txt. |
| **FATF site blocks bots** | Use FATF press releases (3x/year) or manual update. Do NOT scrape fatf-gafi.org. |
| **AUSTRAC uses Drupal with dynamic content** | Content-region extraction with per-URL CSS selectors. Normalize out session tokens, timestamps, sidebar content. If JS rendering detected, use Puppeteer for those URLs only. |
| **False positives (cosmetic changes flagged)** | Content normalization (strip whitespace, dates, boilerplate, Drupal tokens). Tune selectors based on Phase 1 operational data. |
| **DynamoDB 400KB item limit** | Store HTML/text snapshots in S3. DynamoDB only stores metadata and S3 key references. |
| **.docx URLs change with each release** | Discover .docx URLs dynamically by parsing Document Library pages. Never hardcode .docx URLs. |
| **AUSTRAC restructures URLs** | Monitor for 301/302 redirects. Alert on 404s. Track redirect chains in snapshot records. |
| **AI generates incorrect proposals** | Human-in-the-loop review for ALL content changes. Only FATF country lists are auto-actionable. |
| **Pipeline fails silently** | CloudWatch dead man's switch (48-hour alarm). Pipeline run records. Error tracking per source. |
| **Forms not data-driven** | Defer automated form comparison until forms are refactored. Manual review of form-related changes. |
| **AUSTRAC publishes new pages** | Monitor parent/hub pages for new child links. Alert on new URLs discovered. |
| **Lambda timeout for 64+ requests** | Batch 5 concurrent with 10s per-request timeout. Max ~130s for all sources. Lambda timeout set to 300s. |

---

## 13. Architecture Decision Log

| # | Decision | Rationale |
|---|---|---|
| D1 | Lambda over EC2 | Runs once daily for minutes. Serverless is 100x cheaper. |
| D2 | Single DynamoDB table (not 3) | Single-table design is DynamoDB best practice. Reduces infrastructure. All access patterns served by PK/SK + 2 GSIs. |
| D3 | S3 for snapshots (not DynamoDB) | DynamoDB has 400KB item size limit. AUSTRAC pages can exceed this. S3 has no practical limit. |
| D4 | Content-region hashing (not full-page) | Full-page hashing catches Drupal session tokens, timestamps, sidebar changes. Content-region extraction with per-URL CSS selectors eliminates false positives. |
| D5 | Merged COMPARE + PROPOSE into ANALYZE | T2C content is paraphrased, not verbatim. Deterministic field-level diffing can't work. Semantic understanding requires AI. One stage, not two. |
| D6 | JSON mapping file (not form_registry table) | ~64 URL mappings is manageable in a JSON file. The old form_registry required ~1,180 manual field mappings — unsustainable. |
| D7 | Human-in-the-loop for all content changes | Compliance content is too sensitive for fully automated updates. One wrong field could create legal risk. |
| D8 | FATF lists: manual or press releases | fatf-gafi.org blocks automated access (HTTP 403). FATF updates are predictable (3x/year). Not worth a headless browser. |
| D9 | Claude API for analysis | Translating AUSTRAC prose changes into T2C impact assessment requires semantic understanding. AI excels here. |
| D10 | Deferred: GitHub PR automation | Happens once/month. A human can create a PR in 2 minutes. Engineering effort not justified initially. |
| D11 | Deferred: Admin review UI | Email-based review is sufficient for <20 changes/month. Build UI when volume justifies it. |
| D12 | Deferred: Severity classification | Start with binary "changed / not changed". Add severity rules after collecting operational data on false positive rates. |
| D13 | mammoth.js for DOCX | Pure Node.js, no external dependencies, works in Lambda. Extracts clean text from Word docs. |
| D14 | Cheerio for HTML parsing | Lightweight, jQuery-like HTML parser for Node.js. No headless browser overhead for most pages. |
| D15 | EventBridge over CloudWatch Events | EventBridge is the modern replacement. Same pricing, better integration. |

---

## 14. Future Enhancements

1. **RSS/Atom feed** — If AUSTRAC publishes feeds, subscribe instead of scraping
2. **Webhook from AUSTRAC** — If they ever expose an API or notification system
3. **Multi-sector expansion** — Lawyers, conveyancers (Tranche 2 sectors T2C doesn't cover yet)
4. **User-facing changelog** — Show T2C users what changed and when ("Updated: FATF Grey List, Feb 2026")
5. **Compliance calendar** — Auto-generate alerts based on regulatory dates detected in AUSTRAC content
6. **Version history** — Let users see previous versions of forms/guidance before an AUSTRAC update
7. **Data-driven forms** — Refactor forms from inline HTML render methods to JSON field definitions, enabling automated form field comparison
8. **Admin dashboard** — S3 static site with source health, change history, review workflow
9. **GitHub PR automation** — Auto-create PRs from approved change proposals
10. **PDF report generation** — "Your T2C content is X% aligned with current AUSTRAC guidance"
