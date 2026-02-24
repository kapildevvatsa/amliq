# T2C — Technical Design: Monetization Tooling

> Engineering blueprint for implementing the monetization strategy outlined in MONETIZATION-STRATEGY.md.

---

## Table of Contents

1. [Current Architecture](#1-current-architecture)
2. [Target Architecture](#2-target-architecture)
3. [Tool Selection Matrix](#3-tool-selection-matrix)
4. [Service Deep Dives](#4-service-deep-dives)
5. [Feature Gating Architecture](#5-feature-gating-architecture)
6. [Data Flow Diagrams](#6-data-flow-diagrams)
7. [Security Considerations](#7-security-considerations)
8. [Cost Estimates](#8-cost-estimates)
9. [Implementation Phases](#9-implementation-phases)
10. [Integration Points](#10-integration-points-existing-codebase)
11. [Decision Log](#11-decision-log)

---

## 1. Current Architecture

### What Exists Today

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Static HTML Pages                                          │  │
│  │  ├─ index.html          (public landing page)              │  │
│  │  ├─ real-estate.html    (auth-gated dashboard)             │  │
│  │  ├─ accountants.html    (auth-gated dashboard)             │  │
│  │  ├─ jewellers.html      (auth-gated dashboard)             │  │
│  │  ├─ coming-soon.html    (public placeholder)               │  │
│  │  ├─ disclaimer.html     (public legal)                     │  │
│  │  ├─ terms.html          (public legal)                     │  │
│  │  └─ privacy.html        (public legal)                     │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  JavaScript Modules (vanilla ES6, no framework)             │  │
│  │  ├─ auth.js / auth-landing.js   (Cognito token handling)   │  │
│  │  ├─ app.js              (SPA router, section rendering)    │  │
│  │  ├─ data.js             (static content: glossary, FAQ)    │  │
│  │  ├─ forms.js            (CDD forms, governance forms)      │  │
│  │  ├─ checklist.js        (progress tracking)                │  │
│  │  ├─ risk.js             (risk assessment wizard)           │  │
│  │  ├─ quiz.js             (staff training quiz)              │  │
│  │  ├─ export.js           (JSON import/export)               │  │
│  │  └─ *-accountants.js / *-jewellers.js (entity variants)   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Client-Side Storage                                        │  │
│  │  ├─ localStorage    (forms, checklists, risk, quiz data)   │  │
│  │  └─ sessionStorage  (auth token: amliq_id_token)           │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (ap-southeast-2)                        │
│                                                                   │
│  ┌──────────────────────┐  ┌────────────────────────────────┐   │
│  │  Amplify Hosting      │  │  Cognito User Pool              │   │
│  │  ├─ S3 (static files) │  │  ├─ Domain: t2c-prod-amliq-    │   │
│  │  └─ CloudFront (CDN)  │  │  │   53314.auth.ap-southeast-  │   │
│  │                        │  │  │   2.amazoncognito.com       │   │
│  │  Domain:               │  │  ├─ Client: 31etl7ceunn7p...  │   │
│  │  tranche2compliance   │  │  ├─ Flow: Implicit grant        │   │
│  │  .com.au              │  │  └─ Login: email + password     │   │
│  └──────────────────────┘  └────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NOT currently deployed:                                   │   │
│  │  ✗ Lambda       ✗ API Gateway      ✗ DynamoDB             │   │
│  │  ✗ SES          ✗ CloudWatch       ✗ S3 (data storage)   │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Current Dependencies

```json
// package.json
{
  "devDependencies": {
    "@aws-amplify/backend": "^1.14.0",
    "@aws-amplify/backend-auth": "^1.5.0",
    "typescript": "^5.7.0",
    "tsx": "^4.19.0"
  }
}
```

External CDN: Tailwind CSS (`https://cdn.tailwindcss.com`)

### Current Data Model

| Storage | Key Pattern | Data | Persistence |
|---|---|---|---|
| localStorage | `check_[id]` | Checklist state (`"1"`) | Permanent (until cleared) |
| localStorage | `forms_[formId]` | Form field data (JSON) | Permanent |
| localStorage | `riskAssessment` | Risk wizard answers (JSON) | Permanent |
| localStorage | `quiz_state` | Quiz progress (JSON) | Permanent |
| sessionStorage | `amliq_id_token` | JWT from Cognito | Tab-scoped, cleared on close |
| sessionStorage | `amliq_return_url` | Post-login redirect URL | Tab-scoped |

### Key Constraints

- **No build step** — files are served as-is, no bundler/minifier
- **No backend API** — zero Lambda functions, no API Gateway
- **No database** — all state lives in the browser
- **No server-side rendering** — pure client-side SPA per entity page
- **Single-tenant** — each user's data is isolated in their own browser

---

## 2. Target Architecture

### What the Monetized System Looks Like

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Static HTML Pages (unchanged hosting model)                │  │
│  │  + NEW: pricing.html (public pricing page)                 │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  JavaScript Modules                                         │  │
│  │  ├─ (existing modules, unchanged)                          │  │
│  │  ├─ NEW: subscription.js   (tier check, feature gating)   │  │
│  │  ├─ NEW: pdf-generator.js  (jsPDF document generation)    │  │
│  │  └─ NEW: analytics.js      (event tracking wrapper)       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Client-Side Libraries (CDN)                                │  │
│  │  ├─ Tailwind CSS (existing)                                │  │
│  │  ├─ NEW: Stripe.js (stripe.com/js)                        │  │
│  │  ├─ NEW: jsPDF (cdnjs)                                    │  │
│  │  └─ NEW: html2canvas (cdnjs, for PDF rendering)           │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Client-Side Storage (unchanged)                            │  │
│  │  ├─ localStorage  (forms, checklists, risk, quiz)          │  │
│  │  ├─ sessionStorage (auth token)                             │  │
│  │  └─ NEW in sessionStorage: subscription_tier cache         │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          │                    │                    │
          │ Auth               │ Payments           │ API calls
          ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (ap-southeast-2)                        │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────────────────────────┐ │
│  │  Amplify Hosting  │  │  Cognito User Pool (enhanced)        │ │
│  │  (unchanged)      │  │  ├─ Existing: email login            │ │
│  │                    │  │  └─ NEW: custom attributes           │ │
│  │                    │  │       ├─ subscription_tier           │ │
│  │                    │  │       ├─ stripe_customer_id          │ │
│  │                    │  │       └─ subscription_expires        │ │
│  └──────────────────┘  └──────────────────────────────────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NEW: API Gateway (REST)                                   │   │
│  │  ├─ POST /webhook/stripe    (Stripe webhook receiver)     │   │
│  │  ├─ GET  /subscription      (check user's current tier)   │   │
│  │  └─ POST /checkout          (create Stripe checkout)      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│                         ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NEW: Lambda Functions (Node.js 20)                        │   │
│  │  ├─ stripe-webhook     (process payment events)           │   │
│  │  ├─ check-subscription (return tier for authenticated)    │   │
│  │  └─ create-checkout    (generate Stripe session)          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│                         ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NEW: DynamoDB                                             │   │
│  │  ├─ Table: t2c-subscriptions                              │   │
│  │  │   PK: cognito_user_id                                  │   │
│  │  │   Attrs: stripe_customer_id, tier, status,             │   │
│  │  │          period_end, created_at                         │   │
│  │  └─ Table: t2c-events (optional audit log)                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  NEW: SES (Simple Email Service)                           │   │
│  │  ├─ Welcome email                                         │   │
│  │  ├─ Subscription confirmation                              │   │
│  │  ├─ Trial expiring reminder (3 days before)               │   │
│  │  └─ Payment failed notification                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                          STRIPE                                   │
│  ├─ Products: Pro ($29/mo or $249/yr), PDF One-Time ($149)       │
│  ├─ Customer Portal: self-service plan management                │
│  ├─ Webhooks → API Gateway endpoint                              │
│  └─ Checkout Sessions: hosted payment page                       │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ANALYTICS                                     │
│  Plausible Analytics (privacy-first, no cookies)                 │
│  ├─ Page views, unique visitors                                  │
│  ├─ Custom events: upgrade_clicked, form_saved, pdf_generated   │
│  └─ Goal tracking: free_to_paid conversion                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Tool Selection Matrix

### Payments

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **Stripe** | Industry standard, excellent docs, Checkout + Portal hosted, webhook system, Australian entity support, Stripe Tax for GST | 2.9% + 30c per transaction | **SELECTED** |
| PayPal | High brand recognition | Higher fees, worse developer experience, less subscription tooling | Rejected |
| Paddle | Merchant of record (handles GST) | Higher fees (~5%), limited customisation | Consider later |
| LemonSqueezy | Simple, MoR | US-focused, newer/less proven | Rejected |

### Backend API

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **AWS Lambda + API Gateway** | Serverless, pay-per-use, already in AWS ecosystem (Amplify), Node.js runtime | Cold starts (~200ms), IAM complexity | **SELECTED** |
| Vercel Functions | Simple deployment, good DX | Separate hosting platform, vendor split | Rejected (keep all in AWS) |
| Express on EC2/ECS | Full control | Always-on cost, overkill for 3 endpoints | Rejected |
| Amplify Functions | Native Amplify integration | Less control, tied to Amplify CLI | Consider if Amplify Gen 2 matures |

### Database

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **DynamoDB** | Serverless, pay-per-use, single-digit ms latency, AWS-native | NoSQL learning curve, limited query flexibility | **SELECTED** |
| Aurora Serverless v2 | Full SQL, familiar | Minimum cost ~$50/mo even idle, overkill | Rejected |
| Firestore | Good DX, real-time sync | Google ecosystem (we're on AWS) | Rejected |
| Supabase | PostgreSQL, good free tier | Another vendor to manage | Rejected |

### PDF Generation

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **jsPDF + html2canvas** | Client-side (no backend cost), works offline, MIT licence | Limited styling control, large canvas for complex forms | **SELECTED (Phase 1)** |
| Puppeteer (Lambda) | Pixel-perfect HTML→PDF | Requires Lambda with headless Chrome (~250MB), cold starts | Consider Phase 3 |
| PDFKit | Programmatic PDF creation, small bundle | Must define layout in code (no HTML template) | Rejected |
| WeasyPrint | CSS-based PDF generation | Python, server-side only | Rejected |
| DocRaptor | Excellent quality | Paid service, per-document cost | Rejected (overkill) |

### Email

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **AWS SES** | $0.10 per 1,000 emails, AWS-native, high deliverability | Requires domain verification, sandbox mode initially | **SELECTED** |
| SendGrid | Good API, templates | Free tier limited, another vendor | Rejected |
| Stripe Emails | Built into Stripe | Limited to payment-related emails only | Use as supplement |
| Postmark | Excellent deliverability | Paid from day 1 | Rejected |

### Analytics

| Tool | Pros | Cons | Decision |
|---|---|---|---|
| **Plausible Analytics** | Privacy-first (no cookies = no cookie banner needed), lightweight (< 1KB), GDPR/AU Privacy Act compliant, simple dashboard | Paid ($9/mo for 10K views) | **SELECTED** |
| Google Analytics 4 | Free, powerful | Cookie consent required (legal overhead), complex, Google owns data | Alternative if cost-sensitive |
| Fathom | Privacy-first, EU-hosted | $14/mo, less feature-rich than Plausible | Rejected |
| PostHog | Product analytics, funnels | Heavy, overkill for static site | Rejected |

### Frontend Libraries (CDN)

| Library | Version | CDN URL | Size | Purpose |
|---|---|---|---|---|
| Stripe.js | Latest | `https://js.stripe.com/v3/` | ~40KB | Payment form, Checkout redirect |
| jsPDF | 2.5.2 | cdnjs | ~300KB | PDF document generation |
| html2canvas | 1.4.1 | cdnjs | ~250KB | HTML element → canvas → PDF |

---

## 4. Service Deep Dives

### 4a. Stripe — Payments & Subscriptions

**Products to create in Stripe Dashboard:**

| Product | Price ID (example) | Type | Price AUD | Trial |
|---|---|---|---|---|
| Pro Monthly | `price_pro_monthly` | Recurring | $29/month | 14 days |
| Pro Annual | `price_pro_annual` | Recurring | $249/year | 14 days |
| AML/CTF Program PDF | `price_pdf_onetime` | One-time | $149 | None |

> Only 2 Stripe products needed (Pro subscription + PDF one-time purchase).
> No Team or Enterprise products — keeps Stripe configuration simple.

**Stripe Components Used:**

1. **Stripe Checkout (Hosted)**
   - User clicks "Upgrade to Pro" → JS creates checkout session via API → redirect to Stripe-hosted page
   - User clicks "Buy Program PDF ($149)" → same flow but for one-time payment
   - No PCI compliance burden (card details never touch our servers)
   - Supports Australian cards, Apple Pay, Google Pay

2. **Stripe Customer Portal (Hosted)**
   - Self-service: cancel subscription, update payment method, view invoices
   - No UI to build — Stripe hosts it
   - Link from a "Manage Subscription" button in sidebar
   - Not needed for one-time PDF purchasers

3. **Stripe Webhooks**
   - Events to handle:
     - `checkout.session.completed` → activate Pro subscription OR grant PDF access
     - `customer.subscription.deleted` → downgrade to free
     - `invoice.payment_failed` → notify user, grace period
     - `invoice.paid` → extend subscription period

4. **Stripe Tax (Optional)**
   - Automatically calculate and collect 10% GST for Australian customers
   - Required if revenue exceeds $75K AUD (GST registration threshold)

**Stripe Configuration:**

```
Account: Australian Stripe account (AUD)
Mode: Test → Live (toggle in dashboard)
Webhook endpoint: https://api.tranche2compliance.com.au/webhook/stripe
Webhook secret: whsec_... (stored in Lambda env var)
Publishable key: pk_live_... (in client-side JS)
Secret key: sk_live_... (in Lambda env var only, NEVER client-side)
```

### 4b. AWS Lambda + API Gateway — Serverless Backend

**Three Lambda Functions:**

#### Function 1: `create-checkout`
```
Trigger: POST /checkout (API Gateway)
Auth: Cognito Authorizer (JWT)
Input: { priceId: "price_pro_monthly" }
Logic:
  1. Extract user ID from Cognito JWT
  2. Look up or create Stripe customer (DynamoDB → Stripe)
  3. Create Stripe Checkout Session
  4. Return { sessionUrl: "https://checkout.stripe.com/..." }
Runtime: Node.js 20
Memory: 256 MB
Timeout: 10 seconds
```

#### Function 2: `stripe-webhook`
```
Trigger: POST /webhook/stripe (API Gateway)
Auth: None (Stripe signature verification instead)
Input: Stripe event payload
Logic:
  1. Verify webhook signature (whsec_...)
  2. Switch on event type:
     - checkout.session.completed →
         if mode == "subscription": write Pro subscription to DynamoDB
         if mode == "payment": write one-time PDF purchase to DynamoDB
     - customer.subscription.deleted → downgrade to free in DynamoDB
     - invoice.payment_failed → send SES notification
  3. Update Cognito custom attribute (subscription_tier)
Runtime: Node.js 20
Memory: 256 MB
Timeout: 30 seconds
```

#### Function 3: `check-subscription`
```
Trigger: GET /subscription (API Gateway)
Auth: Cognito Authorizer (JWT)
Input: (none — user ID from JWT)
Logic:
  1. Extract user ID from Cognito JWT
  2. Query DynamoDB for subscription record
  3. Return { tier: "pro", status: "active", expires: "2026-08-01", pdf_purchased: false }
Runtime: Node.js 20
Memory: 128 MB
Timeout: 5 seconds
```

**API Gateway Configuration:**

```
Base URL: https://api.tranche2compliance.com.au
         (custom domain on API Gateway)
   OR:   https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/prod

CORS: Allow origin tranche2compliance.com.au
Auth: Cognito User Pool Authorizer (for /checkout and /subscription)
      None (for /webhook/stripe — uses Stripe signature verification)
```

### 4c. DynamoDB — Subscription State

**Table: `t2c-subscriptions`**

| Attribute | Type | Description |
|---|---|---|
| `user_id` (PK) | String | Cognito `sub` (UUID) |
| `email` | String | User email (from Cognito) |
| `stripe_customer_id` | String | `cus_...` |
| `stripe_subscription_id` | String | `sub_...` (null for one-time purchases) |
| `tier` | String | `free` / `pro` |
| `status` | String | `active` / `trialing` / `past_due` / `canceled` |
| `pdf_purchased` | Boolean | `true` if user bought the one-time $149 PDF |
| `period_end` | Number | Unix timestamp — when current billing period ends (null for one-time) |
| `created_at` | String | ISO 8601 timestamp |
| `updated_at` | String | ISO 8601 timestamp |

**Capacity Mode:** On-demand (pay-per-request). At <1,000 users, cost is effectively $0.

> Note: Only one table needed. No seat management table, no team table, no events table.
> Target businesses have 1–3 people who share one login — no multi-user complexity.

### 4d. jsPDF + html2canvas — PDF Generation

**Use Case:** Generate professional AML/CTF Program documents from user's completed forms.

**How it works:**

```
User completes Program Builder forms
          │
          ▼
Clicks "Generate PDF" button
          │
          ▼
JavaScript assembles document content from localStorage
(forms_*, riskAssessment, checklist data)
          │
          ▼
jsPDF creates PDF programmatically:
  - Cover page (business name, date, entity type)
  - Table of contents
  - Risk assessment summary
  - CDD procedures section
  - Governance structure
  - Training plan
  - Record keeping procedures
  - Review schedule
          │
          ▼
Browser downloads PDF file
```

**Library loading (CDN, lazy-loaded):**

```html
<!-- Only loaded when user clicks "Generate PDF" -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

**Alternative approach for forms:** Instead of html2canvas (which screenshots HTML), use jsPDF's text/table API to programmatically build the PDF. This produces smaller, searchable, more professional PDFs.

### 4e. AWS SES — Transactional Email

**Emails to send:**

| Template | Trigger | Content |
|---|---|---|
| Welcome | User signs up (Cognito post-confirmation) | Welcome, getting started guide |
| Subscription Confirmed | `checkout.session.completed` | Receipt, what's unlocked, quick start |
| Trial Expiring | 3 days before trial end (scheduled Lambda) | Reminder to subscribe, value prop |
| Payment Failed | `invoice.payment_failed` | Update payment method link |
| Subscription Canceled | `customer.subscription.deleted` | What they lose, re-subscribe link |
| Subscription Renewed | `invoice.paid` | Receipt, thank you |

**SES Configuration:**

```
Region: ap-southeast-2
Verified domain: tranche2compliance.com.au
From address: noreply@tranche2compliance.com.au
Reply-to: support@tranche2compliance.com.au
DKIM: Enabled (DNS records in Route 53)
```

**Important:** SES starts in sandbox mode (can only send to verified emails). Request production access before launch.

### 4f. Plausible Analytics

**Setup:**

```html
<!-- Add to all pages, in <head> -->
<script defer data-domain="tranche2compliance.com.au"
  src="https://plausible.io/js/script.js"></script>
```

**Custom Events to Track:**

| Event Name | Trigger | Properties |
|---|---|---|
| `Signup` | Cognito signup completed | `entity_type` |
| `Login` | Successful token validation | `entity_type` |
| `Upgrade_Clicked` | User clicks upgrade CTA | `feature`, `purchase_type` |
| `Checkout_Started` | Stripe checkout session created | `purchase_type` (pro/pdf) |
| `Pro_Active` | Pro subscription checkout completed | `billing_period` |
| `PDF_Purchased` | One-time PDF purchase completed | `entity_type` |
| `PDF_Generated` | PDF download triggered | `document_type`, `entity_type` |
| `Form_Saved` | User saves a form | `form_id` |
| `Quiz_Completed` | User finishes training quiz | `score`, `entity_type` |
| `Feature_Gated` | User hits paywall prompt | `feature`, `current_tier` |

**JavaScript tracking helper:**

```javascript
// analytics.js — thin wrapper
const Analytics = {
  track(event, props) {
    if (window.plausible) {
      window.plausible(event, { props: props || {} });
    }
  }
};
```

### 4g. Cognito Enhancements

**Custom Attributes to Add:**

| Attribute | Type | Purpose |
|---|---|---|
| `custom:subscription_tier` | String | `free` or `pro` |
| `custom:stripe_customer_id` | String | Links Cognito user to Stripe customer |
| `custom:subscription_expires` | String | ISO 8601 expiry date (cached for client-side checks) |

**Why Cognito custom attributes?**

The JWT id_token already includes custom attributes. This means:
1. `auth.js` can read the tier from the token without an API call
2. Feature gating happens instantly on page load (no network latency)
3. DynamoDB is the source of truth; Cognito attributes are a cache updated by the webhook Lambda

**Update flow:**

```
Stripe webhook fires
    → Lambda updates DynamoDB (source of truth)
    → Lambda updates Cognito custom attribute (cache)
    → User's next login gets updated JWT with new tier
    → Client-side JS reads tier from JWT
```

**Limitation:** Custom attribute changes only appear in the JWT after the user's next token refresh. For immediate effect, the client should also call `GET /subscription` API after checkout completion.

---

## 5. Feature Gating Architecture

### How It Works

```
Page Load
    │
    ▼
auth.js validates token (existing)
    │
    ▼
subscription.js reads tier from JWT custom attribute
    │
    ├─ If tier in JWT: use it (fast path, no API call)
    │
    └─ If no tier / expired: call GET /subscription API
       │
       ▼
       Cache result in sessionStorage for this session
    │
    ▼
Store tier globally: window.T2C_TIER = "pro" (or "free")
    │
    ▼
App.renderAllSections() checks T2C_TIER before rendering
    │
    ├─ FREE features: render normally
    │
    └─ PRO features: check tier
       │
       ├─ Tier is "pro": render normally
       │
       └─ Tier is "free": render "locked" overlay
          │
          ▼
          ┌───────────────────────────────────┐
          │  🔒 Pro Feature                    │
          │                                     │
          │  Unlock CDD forms, risk            │
          │  assessment, and 15+ templates     │
          │  with a Pro subscription.          │
          │                                     │
          │  [Upgrade — $29/month]             │
          │  [Or buy Program PDF — $149]       │
          └───────────────────────────────────┘
```

### Feature → Tier Mapping (in code)

With only two tiers (free / pro), gating is a simple boolean check — no tier hierarchy needed.

```javascript
// subscription.js
const PRO_SECTIONS = new Set([
  'risk-assessment',
  'program-builder',
  'cdd',
  'governance',
  'forms-library',
  'starter-kit-forms',
  'customer-examples',
  'record-keeping',
  'training',
  'program-review',
  'evaluation',
]);

// Everything NOT in PRO_SECTIONS is free:
// dashboard, am-i-regulated, obligations-overview, key-dates,
// red-flags, reporting, enrolment, glossary, faq, austrac-links

function canAccess(section) {
  if (!PRO_SECTIONS.has(section)) return true;  // free section
  return window.T2C_TIER === 'pro';             // pro section — check tier
}

// Special case: PDF generation
// Accessible if user is Pro subscriber OR has purchased PDF one-time
function canGeneratePDF() {
  return window.T2C_TIER === 'pro' || window.T2C_PDF_PURCHASED === true;
}
```

### Security Note on Client-Side Gating

Client-side gating is a **UX convenience, not a security boundary**. A determined user could:
- Modify `window.T2C_TIER` in browser console
- Edit localStorage/sessionStorage values
- Remove CSS overlay via DevTools

**This is acceptable because:**
1. The content being gated is educational guidance (not proprietary data)
2. The real value is in the PDF generation and form templates (which are client-side anyway)
3. Server-side enforcement of payments is handled by Stripe (users must pay to subscribe)
4. The gating primarily serves as a conversion mechanism, not access control
5. Competitors (HeadStart, etc.) also use client-side template delivery

**If server-side gating is needed later** (e.g., for API-delivered content), the Lambda functions already verify subscription status from DynamoDB.

---

## 6. Data Flow Diagrams

### 6a. New User Checkout Flow

```
User (browser)           API Gateway / Lambda           Stripe              DynamoDB
     │                         │                          │                    │
     │  Click "Upgrade"        │                          │                    │
     │────────────────────────>│                          │                    │
     │  POST /checkout         │                          │                    │
     │  { priceId, returnUrl } │                          │                    │
     │                         │  Create Checkout Session  │                    │
     │                         │────────────────────────-->│                    │
     │                         │  { sessionUrl }           │                    │
     │                         │<─────────────────────────│                    │
     │  { sessionUrl }         │                          │                    │
     │<────────────────────────│                          │                    │
     │                         │                          │                    │
     │  Redirect to Stripe     │                          │                    │
     │─────────────────────────────────────────────────-->│                    │
     │                         │                          │                    │
     │  User enters payment    │                          │                    │
     │  details on Stripe page │                          │                    │
     │                         │                          │                    │
     │  Redirect back to site  │                          │                    │
     │<─────────────────────────────────────────────────── │                    │
     │  (/pricing?success=1)   │                          │                    │
     │                         │                          │                    │
     │                         │  Webhook: checkout.       │                    │
     │                         │  session.completed        │                    │
     │                         │<─────────────────────────│                    │
     │                         │                          │                    │
     │                         │  Write subscription       │                    │
     │                         │─────────────────────────────────────────────>│
     │                         │                          │                    │
     │                         │  Update Cognito           │                    │
     │                         │  custom:subscription_tier │                    │
     │                         │                          │                    │
     │  GET /subscription      │                          │                    │
     │  (poll after redirect)  │                          │                    │
     │────────────────────────>│  Query DynamoDB          │                    │
     │                         │─────────────────────────────────────────────>│
     │                         │  { tier: "pro" }           │                    │
     │                         │<────────────────────────────────────────────│
     │  { tier: "pro" }        │                          │                    │
     │<────────────────────────│                          │                    │
     │                         │                          │                    │
     │  Unlock features        │                          │                    │
     │  (update T2C_TIER)      │                          │                    │
```

### 6b. Returning User — Subscription Check

```
User (browser)                      API Gateway / Lambda
     │                                     │
     │  Page load → auth.js validates JWT  │
     │                                     │
     │  Read custom:subscription_tier      │
     │  from JWT claims                    │
     │                                     │
     │  ├─ Tier found in JWT?              │
     │  │  YES → set T2C_TIER, done        │
     │  │                                  │
     │  │  NO (first login after signup)   │
     │  │                                  │
     │  └─ GET /subscription               │
     │─────────────────────────────────────>│
     │     { tier: "pro", pdf_purchased: false }
     │<─────────────────────────────────────│
     │                                     │
     │  Cache in sessionStorage            │
     │  Set T2C_TIER = "pro"              │
     │  Render unlocked features           │
```

### 6c. PDF Generation Flow

```
User (browser)
     │
     │  Navigate to Program Builder section
     │  Complete all required fields
     │
     │  Click "Generate AML/CTF Program PDF"
     │
     │  subscription.js checks: canGeneratePDF()
     │  ├─ NO  → show upgrade prompt (Pro $29/mo or PDF $149 one-time)
     │  └─ YES → continue (user is Pro subscriber or bought PDF)
     │
     │  pdf-generator.js:
     │  │
     │  ├─ Collect data from localStorage:
     │  │   forms_* (governance, CDD procedures)
     │  │   riskAssessment (risk profile)
     │  │   check_* (completion status)
     │  │
     │  ├─ Create new jsPDF instance (A4, portrait)
     │  │
     │  ├─ Build document sections:
     │  │   1. Cover page (business name, ABN, date)
     │  │   2. Table of contents
     │  │   3. Part A: AML/CTF risk assessment
     │  │   4. Part B: Customer due diligence procedures
     │  │   5. Part C: Reporting obligations
     │  │   6. Part D: Record keeping
     │  │   7. Part E: Staff training program
     │  │   8. Part F: Program review schedule
     │  │   9. Appendices (governance structure, roles)
     │  │
     │  ├─ Add header/footer to each page
     │  │   "Generated by T2C — Not an official AUSTRAC document"
     │  │
     │  └─ doc.save('AML-CTF-Program-[BusinessName]-[Date].pdf')
     │
     │  Analytics.track('PDF_Generated', { type: 'program' })
     │
     │  Browser downloads PDF
```

### 6d. Subscription Lifecycle

```
States:

  ┌──────────┐   checkout.session    ┌───────────┐
  │          │   .completed          │           │
  │   FREE   │──────────────────────>│  TRIALING │
  │          │                       │  (14 days)│
  └──────────┘                       └─────┬─────┘
       ▲                                    │
       │                          trial ends │
       │                          (auto-charge)
       │                                    │
       │  customer.subscription    ┌────────▼────┐
       │  .deleted                 │             │
       │◄──────────────────────────│   ACTIVE    │◄──────┐
       │                           │             │       │
       │                           └──────┬──────┘       │
       │                                  │              │
       │                   invoice.payment │    invoice   │
       │                   _failed         │    .paid     │
       │                                  │              │
       │                           ┌──────▼──────┐       │
       │  (after grace period)     │             │       │
       │◄──────────────────────────│  PAST_DUE   │───────┘
       │                           │  (7 days)   │  (retry succeeds)
       │                           └─────────────┘
```

---

## 7. Security Considerations

### Authentication & Authorization

| Concern | Mitigation |
|---|---|
| JWT token spoofing | Cognito signs JWTs with RS256 — signature verified server-side by API Gateway Cognito Authorizer |
| Client-side tier manipulation | Acceptable risk (see Section 5). Server-side endpoints verify tier from DynamoDB |
| Stripe webhook forgery | Verify `Stripe-Signature` header using webhook secret in Lambda |
| API replay attacks | Cognito JWTs have `exp` claim (1 hour). API Gateway rejects expired tokens |
| CSRF on checkout | Stripe Checkout session is single-use and time-limited |

### Data Protection

| Concern | Mitigation |
|---|---|
| Stripe secret key exposure | Store in Lambda environment variable (encrypted at rest). NEVER in client-side JS |
| DynamoDB access | IAM role with least-privilege policy (only t2c-subscriptions table) |
| PII in DynamoDB | Only email + Cognito sub + Stripe IDs. No passwords, no financial data |
| SES email spoofing | DKIM + SPF + DMARC configured on domain |
| localStorage data on shared computers | Existing: no change. User is responsible for clearing browser data |

### Compliance

| Requirement | Status |
|---|---|
| PCI DSS | Not in scope — Stripe handles all card data. No card numbers touch our infrastructure |
| Australian Privacy Act | Plausible (no cookies), SES (transactional only), DynamoDB (minimal PII) |
| GDPR | Not primary audience (Australian users), but Plausible is GDPR compliant |
| GST | Stripe Tax can auto-calculate 10% GST when revenue > $75K AUD |

---

## 8. Cost Estimates

### Monthly Costs by Scale

#### 100 Users (Launch)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | Static site, <10GB transfer | $0 (free tier) |
| Cognito | 100 MAU | $0 (first 50K free) |
| API Gateway | ~3,000 requests/mo | $0 (first 1M free) |
| Lambda | ~3,000 invocations, 256MB | $0 (first 1M free) |
| DynamoDB | <100 items, on-demand | $0 (first 25 read/write units free) |
| SES | ~200 emails/mo | $0.02 |
| Plausible | <10K pageviews | $9.00 |
| Stripe | 30 subscribers × $29 avg | ~$25 (2.9% + 30c per txn) |
| **Total AWS** | | **~$0.02** |
| **Total (all services)** | | **~$34** |

#### 500 Users (Month 6)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | ~50GB transfer | $0–$5 |
| Cognito | 500 MAU | $0 |
| API Gateway | ~15,000 requests/mo | $0 |
| Lambda | ~15,000 invocations | $0 |
| DynamoDB | ~500 items | $0–$1 |
| SES | ~1,500 emails/mo | $0.15 |
| Plausible | ~50K pageviews | $9.00 |
| Stripe | 75 Pro subs × $29 + PDF sales | ~$68 |
| **Total** | | **~$83** |
| **Revenue** (subs + PDF one-time) | | **~$2,900** |

#### 2,000 Users (Month 12)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | ~200GB transfer | $10–$20 |
| Cognito | 2,000 MAU | $0 |
| API Gateway | ~60,000 requests/mo | $0–$1 |
| Lambda | ~60,000 invocations | $0–$2 |
| DynamoDB | ~2,000 items | $1–$3 |
| SES | ~6,000 emails/mo | $0.60 |
| Plausible | ~200K pageviews | $19.00 |
| Stripe | 300 Pro subs × $29 + PDF sales | ~$260 |
| **Total** | | **~$316** |
| **Revenue** (subs + PDF one-time) | | **~$10,200** |

### Key Insight

Infrastructure costs are negligible relative to revenue. The AWS serverless stack costs effectively $0 at small scale due to free tiers. Stripe transaction fees (2.9% + 30c) are the largest cost but are proportional to revenue.

---

## 9. Implementation Phases

### Phase 1: Pro Tier + PDF + Payments (Weeks 1–6)

**Goal:** Single Pro tier live with Stripe payments, feature gating, and PDF generation.

| Week | Task | Tools |
|---|---|---|
| 1 | Set up Stripe account (AU), create Pro + PDF one-time products | Stripe Dashboard |
| 1 | Add Cognito custom attributes (`subscription_tier`, `stripe_customer_id`) | AWS Console |
| 1 | Create DynamoDB table: `t2c-subscriptions` | AWS Console |
| 1 | Create `pricing.html` page (Free vs Pro comparison) | HTML/Tailwind |
| 2 | Create `subscription.js` (tier check + feature gating logic) | JavaScript |
| 2 | Create Lambda: `create-checkout` | Node.js, Stripe SDK |
| 2 | Create Lambda: `stripe-webhook` | Node.js, Stripe SDK |
| 2 | Create Lambda: `check-subscription` | Node.js, AWS SDK |
| 3 | Set up API Gateway with Cognito Authorizer | AWS Console |
| 3 | Integrate feature gating into all 3 app.js variants | JavaScript |
| 3 | Add upgrade prompts on locked features | JavaScript/HTML |
| 4 | Create `pdf-generator.js` with jsPDF integration | jsPDF, JavaScript |
| 4 | Design PDF template (cover, sections, header/footer) | jsPDF API |
| 5 | Add Stripe.js to HTML pages, "Manage Subscription" link in sidebars | HTML |
| 5 | Implement $149 one-time PDF purchase checkout flow | Stripe + Lambda |
| 6 | End-to-end testing (Stripe test mode) | Manual + Stripe test cards |
| 6 | Go live: switch Stripe to live mode | Stripe Dashboard |

**New files:**
- `pricing.html` — public pricing page (Free vs Pro)
- `js/subscription.js` — tier checking and feature gating
- `js/pdf-generator.js` — client-side PDF generation
- `amplify/functions/create-checkout/` — Lambda source
- `amplify/functions/stripe-webhook/` — Lambda source
- `amplify/functions/check-subscription/` — Lambda source

**Modified files:**
- `js/app.js`, `js/app-accountants.js`, `js/app-jewellers.js` — add `canAccess()` gating
- `real-estate.html`, `accountants.html`, `jewellers.html` — add Stripe.js CDN, subscription.js
- `index.html` — add pricing page link
- `amplify/backend.ts` — add Lambda functions and API
- `amplify/auth/resource.ts` — add custom attributes

### Phase 2: Email + Analytics (Weeks 7–10)

**Goal:** Transactional emails and usage tracking live.

| Week | Task | Tools |
|---|---|---|
| 7 | Set up SES: verify domain, DKIM, request production access | AWS Console |
| 7 | Create email templates (welcome, subscription confirmed, trial expiring) | HTML |
| 8 | Add SES send calls to webhook Lambda | AWS SDK |
| 8 | Add Cognito post-confirmation trigger for welcome email | Lambda + Cognito |
| 9 | Add Plausible script to all pages | HTML |
| 9 | Create `analytics.js` wrapper with custom events | JavaScript |
| 10 | Implement custom event tracking across all features | JavaScript |
| 10 | Add scheduled Lambda for trial expiry reminders (EventBridge) | Lambda |

**New files:**
- `js/analytics.js` — Plausible event tracking wrapper
- `amplify/functions/send-email/` — SES email Lambda
- Email HTML templates

### Phase 3: Growth + Partners (Months 3–6)

**Goal:** Expand content, referral partnerships, industry body outreach.

| Task | Tools |
|---|---|
| Launch remaining entity types (Lawyers, TCSPs, Financial Advisors) | HTML/JS |
| SEO content pages / blog | HTML |
| Partner referral tracking (outbound affiliate links) | JavaScript |
| Compliance badge system | jsPDF + verification page |
| Industry body outreach (REIA, CPA Australia) | Sales / email |
| Branded PDF exports (add business logo/name) | jsPDF |

> No Phase 4 needed. There is no Team or Enterprise tier to build.
> The entire monetization stack is complete after Phase 2.
> Phase 3 is growth work, not infrastructure.

---

## 10. Integration Points (Existing Codebase)

### Files to Modify

| File | Changes | Phase |
|---|---|---|
| `real-estate.html` | Add `<script>` tags for Stripe.js, subscription.js, analytics.js, jsPDF (lazy) | 1, 2, 3 |
| `accountants.html` | Same as above | 1, 2, 3 |
| `jewellers.html` | Same as above | 1, 2, 3 |
| `index.html` | Add pricing page link in header/hero, Plausible script | 1, 3 |
| `js/app.js` | Wrap section rendering with `canAccess()` checks, add upgrade prompts | 1 |
| `js/app-accountants.js` | Same as above | 1 |
| `js/app-jewellers.js` | Same as above | 1 |
| `js/auth.js` | After token validation, extract `custom:subscription_tier` from JWT claims | 1 |
| `js/auth-landing.js` | No changes needed (landing page doesn't gate features) | — |
| `js/forms.js` | No changes (gating is at section level, not form level) | — |
| `js/export.js` | No changes | — |
| `amplify/auth/resource.ts` | Add custom attributes definition | 1 |
| `amplify/backend.ts` | Add Lambda functions and API Gateway | 1 |
| `package.json` | Add Stripe SDK, AWS SDK as dependencies for Lambda | 1 |

### New Files to Create

| File | Purpose | Phase |
|---|---|---|
| `pricing.html` | Public pricing/comparison page | 1 |
| `js/subscription.js` | Tier checking, feature gating, upgrade prompts | 1 |
| `js/pdf-generator.js` | jsPDF document assembly | 1 |
| `js/analytics.js` | Plausible event tracking wrapper | 2 |
| `amplify/functions/create-checkout/handler.ts` | Lambda: Stripe checkout session | 1 |
| `amplify/functions/stripe-webhook/handler.ts` | Lambda: process Stripe events | 1 |
| `amplify/functions/check-subscription/handler.ts` | Lambda: return user tier | 1 |
| `amplify/functions/send-email/handler.ts` | Lambda: SES transactional email | 2 |

> Note: No seat management, team invitation, or enterprise admin files needed.
> Target businesses (1–3 people) share a single login. Total new files: 8.

---

## 11. Decision Log

| # | Decision | Rationale | Date |
|---|---|---|---|
| D1 | Use Stripe (not PayPal/Paddle) | Best developer experience, Australian entity support, hosted Checkout eliminates PCI scope | 2026-02 |
| D2 | Use AWS Lambda (not separate hosting) | Already on AWS/Amplify, serverless = no idle cost, 3 functions only | 2026-02 |
| D3 | Use DynamoDB (not Aurora/Supabase) | Serverless, free at low scale, sufficient for key-value subscription lookups | 2026-02 |
| D4 | Client-side PDF with jsPDF (not server-side) | No backend cost, works offline, acceptable quality for forms/templates | 2026-02 |
| D5 | Client-side feature gating (not server-side) | Content is educational (not proprietary), server-side gating adds latency and complexity for minimal security gain | 2026-02 |
| D6 | Plausible (not Google Analytics) | No cookie consent banner needed (Australian Privacy Act compliance), lightweight, privacy-first | 2026-02 |
| D7 | Cognito custom attributes for tier caching | Avoids API call on every page load, JWT already includes custom claims | 2026-02 |
| D8 | Stripe Customer Portal (not custom billing UI) | Zero UI to build, Stripe maintains it, handles edge cases (failed payments, refunds) | 2026-02 |
| D9 | AWS SES (not SendGrid/Postmark) | Cheapest option, AWS-native, sufficient for transactional-only emails | 2026-02 |
| D10 | On-demand DynamoDB (not provisioned) | Unpredictable traffic at launch, on-demand scales to zero cost | 2026-02 |
| D11 | Two tiers only: Free + Pro (no Team/Enterprise) | Target businesses have 1–3 people. Multi-seat management adds major engineering complexity for zero demand. Share one login instead. | 2026-02 |
| D12 | One-time PDF purchase ($149) as alternative to subscription | Some micro-businesses resist subscriptions. A one-time purchase for the highest-value deliverable (AML/CTF Program PDF) captures revenue from subscription-averse users. | 2026-02 |
| D13 | No multi-user seat management | Building invite flows, seat counting, shared workspaces, and team billing is high-effort infrastructure that doesn't match the 1–3 person business reality. Removed entirely. | 2026-02 |
| D14 | Single DynamoDB table (no events/audit table) | With only ~1,000 users and simple free/pro binary, one table with 8 attributes is sufficient. No audit log needed at this scale. | 2026-02 |

---

## Appendix: Quick Reference

### Stripe Test Cards

| Card | Number | Use |
|---|---|---|
| Success | `4242 4242 4242 4242` | Happy path |
| Decline | `4000 0000 0000 0002` | Payment failure |
| 3D Secure | `4000 0025 0000 3155` | Authentication required |
| Insufficient funds | `4000 0000 0000 9995` | Specific decline |

### AWS CLI Commands

```bash
# Create DynamoDB table
aws dynamodb create-table \
  --table-name t2c-subscriptions \
  --attribute-definitions AttributeName=user_id,AttributeType=S \
  --key-schema AttributeName=user_id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-southeast-2

# Verify SES domain
aws ses verify-domain-identity \
  --domain tranche2compliance.com.au \
  --region ap-southeast-2

# Add Cognito custom attributes
aws cognito-idp add-custom-attributes \
  --user-pool-id ap-southeast-2_XXXXX \
  --custom-attributes Name=subscription_tier,AttributeDataType=String \
                      Name=stripe_customer_id,AttributeDataType=String \
                      Name=subscription_expires,AttributeDataType=String
```

### Environment Variables (Lambda)

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DYNAMODB_TABLE=t2c-subscriptions
COGNITO_USER_POOL_ID=ap-southeast-2_XXXXX
SES_FROM_EMAIL=noreply@tranche2compliance.com.au
SITE_URL=https://www.tranche2compliance.com.au
```
