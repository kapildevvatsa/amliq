# T2C — Technical Design: Monetization

> Engineering blueprint for implementing the monetization strategy outlined in [monetization-strategy.md](../strategy/monetization-strategy.md).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Stripe Configuration](#2-stripe-configuration)
3. [Lambda Functions](#3-lambda-functions)
4. [Cognito Enhancements](#4-cognito-enhancements)
5. [Feature Gating](#5-feature-gating)
6. [PDF Generation](#6-pdf-generation)
7. [Analytics](#7-analytics)
8. [Email](#8-email)
9. [Data Flow Diagrams](#9-data-flow-diagrams)
10. [Security](#10-security)
11. [Cost Estimates](#11-cost-estimates)
12. [Implementation Plan](#12-implementation-plan)
13. [Files to Create & Modify](#13-files-to-create--modify)
14. [Quick Reference](#14-quick-reference)

---

## 1. Architecture Overview

**Design principle:** Stripe is the source of truth for all payment and subscription state. Cognito custom attributes cache the tier in the JWT for instant client-side reads. No custom database.

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Static HTML Pages (Amplify Hosting)                        │  │
│  │  ├─ index.html          (public landing page)              │  │
│  │  ├─ pricing.html        (public pricing page)              │  │
│  │  ├─ real-estate.html    (auth-gated dashboard)             │  │
│  │  ├─ accountants.html    (auth-gated dashboard)             │  │
│  │  ├─ jewellers.html      (auth-gated dashboard)             │  │
│  │  └─ (legal pages: disclaimer, terms, privacy)              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  JavaScript Modules                                         │  │
│  │  ├─ auth.js / auth-landing.js   (Cognito token handling)   │  │
│  │  ├─ app.js              (SPA router, section rendering)    │  │
│  │  ├─ subscription.js     (tier check, feature gating)       │  │
│  │  ├─ pdf-generator.js    (jsPDF document generation)        │  │
│  │  ├─ analytics.js        (Plausible event tracking)         │  │
│  │  └─ (existing: data, forms, checklist, risk, quiz, export) │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Client-Side Libraries (CDN, lazy-loaded)                   │  │
│  │  ├─ Tailwind CSS                                            │  │
│  │  ├─ jsPDF 2.5.2         (~300KB, loaded on demand)         │  │
│  │  └─ html2canvas 1.4.1   (~250KB, loaded on demand)         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Client-Side Storage                                        │  │
│  │  ├─ localStorage    (forms, checklists, risk, quiz data)   │  │
│  │  └─ sessionStorage  (auth token, subscription_tier cache)  │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          │                    │                    │
          │ Auth               │ Payments           │ API calls
          ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AWS (ap-southeast-2)                        │
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────────────────────────┐ │
│  │  Amplify Hosting  │  │  Cognito User Pool                    │ │
│  │  ├─ S3 + CDN      │  │  ├─ Email login (PKCE flow)          │ │
│  │  │                │  │  └─ Custom attributes:                │ │
│  │  │  Domain:       │  │       ├─ subscription_tier            │ │
│  │  │  tranche2      │  │       ├─ stripe_customer_id           │ │
│  │  │  compliance    │  │       └─ pdf_purchased                │ │
│  │  │  .com.au       │  │                                       │ │
│  │  └────────────────┘  └──────────────────────────────────────┘ │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  API Gateway (REST) — 2 routes                            │   │
│  │  ├─ POST /webhook/stripe    (Stripe webhook receiver)     │   │
│  │  └─ GET  /subscription      (check user's current tier)   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                         │                                         │
│                         ▼                                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Lambda Functions (Node.js 20) — 2 functions              │   │
│  │  ├─ stripe-webhook     (update Cognito from Stripe events)│   │
│  │  └─ check-subscription (read Cognito attrs for client)    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  SES — welcome email only (via Cognito post-confirmation) │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                          STRIPE                                   │
│  ├─ Products: Pro ($29/mo or $249/yr), PDF One-Time ($149)       │
│  ├─ Payment Links: no-code checkout URLs (3 links)               │
│  ├─ Customer Portal: self-service plan management (hosted)       │
│  ├─ Customer metadata: stores cognito_user_id for mapping        │
│  ├─ Built-in emails: receipts, failed payments, trial expiry     │
│  └─ Webhooks → API Gateway → Lambda                              │
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

### Where Subscription State Lives

| Data | Stored In | Role |
|---|---|---|
| Subscription status, period, plan | **Stripe** (source of truth) | Stripe manages all billing state natively |
| `cognito_user_id` mapping | **Stripe Customer metadata** | Set once on first checkout; used by webhook to find user |
| `subscription_tier` (`free`/`pro`) | **Cognito custom attribute** | Cache in JWT for instant client-side reads |
| `pdf_purchased` (`true`/`false`) | **Cognito custom attribute** | Cache in JWT for client-side PDF access check |
| `stripe_customer_id` (`cus_...`) | **Cognito custom attribute** | Links Cognito user to Stripe customer |

---

## 2. Stripe Configuration

### Products

| Product | Type | Price AUD | Trial |
|---|---|---|---|
| Pro Monthly | Recurring | $29/month | 14 days |
| Pro Annual | Recurring | $249/year | 14 days |
| AML/CTF Program PDF | One-time | $149 | None |

### Payment Links

Created in Stripe Dashboard — zero backend code for checkout. One Payment Link per product (3 total).

Client-side code constructs the URL with user context:

```javascript
// subscription.js
function getCheckoutUrl(priceType) {
  const userId = getUserIdFromJWT();
  const email = getEmailFromJWT();
  const links = {
    pro_monthly: 'https://buy.stripe.com/xxx',  // from Dashboard
    pro_annual:  'https://buy.stripe.com/yyy',
    pdf_onetime: 'https://buy.stripe.com/zzz',
  };
  return `${links[priceType]}?client_reference_id=${userId}&prefilled_email=${encodeURIComponent(email)}`;
}
```

- `client_reference_id` — maps payment to Cognito user in webhook
- `prefilled_email` — auto-fills email on checkout page
- Success redirect URL configured in Dashboard (e.g., `?checkout_success=1`)
- Supports subscriptions with trials, one-time payments, promo codes
- No PCI compliance burden; supports Australian cards, Apple Pay, Google Pay

### Customer Portal

Stripe-hosted self-service page for subscribers:
- Cancel subscription or switch plans (monthly ↔ annual)
- Update payment method
- View invoices and payment history
- Linked from a "Manage Subscription" button in the sidebar

### Built-in Emails

Configured in Stripe Dashboard — zero code, zero templates:

| Email | Dashboard Setting |
|---|---|
| Successful payment receipt | Settings → Customer emails |
| Failed payment notification | Settings → Billing → Subscriptions and emails |
| Trial ending reminder (7 days before) | Settings → Billing → Subscriptions and emails |
| Upcoming renewal reminder | Settings → Billing → Subscriptions and emails |
| Subscription canceled | Settings → Billing → Subscriptions and emails |

### Customer Metadata

Stripe Customer objects store `cognito_user_id` in metadata. This is set once by the webhook Lambda on first checkout (from the Payment Link's `client_reference_id`). All subsequent webhook events use this to map Stripe customer → Cognito user.

### Webhooks

Events to handle:

| Event | Action |
|---|---|
| `checkout.session.completed` | Store user mapping in Stripe metadata, update Cognito tier |
| `customer.subscription.deleted` | Downgrade Cognito tier to `free` |
| `customer.subscription.updated` | Update Cognito tier if status changed |

### Stripe Tax (Optional)

Automatically calculate and collect 10% GST for Australian customers. Required if revenue exceeds $75K AUD.

### Configuration

```
Account: Australian Stripe account (AUD)
Mode: Test → Live (toggle in dashboard)
Webhook endpoint: https://api.tranche2compliance.com.au/webhook/stripe
Webhook secret: whsec_... (stored in Lambda env var)
Secret key: sk_live_... (in Lambda env var only, NEVER client-side)
```

---

## 3. Lambda Functions

### Function 1: `stripe-webhook`

```
Trigger: POST /webhook/stripe (API Gateway)
Auth: Stripe signature verification (whsec_...)
Input: Stripe event payload

Logic:
  1. Verify webhook signature
  2. Switch on event type:

     checkout.session.completed:
       a. Get user_id from session.client_reference_id
       b. Get customer_id from session.customer
       c. Store mapping: stripe.customers.update(cus_...,
            { metadata: { cognito_user_id: user_id } })
       d. If mode == "subscription":
            → cognito.adminUpdateUserAttributes:
              custom:subscription_tier = "pro"
       e. If mode == "payment":
            → cognito.adminUpdateUserAttributes:
              custom:pdf_purchased = "true"
       f. Set: custom:stripe_customer_id = cus_...

     customer.subscription.deleted:
       a. Get customer_id from event.data.object.customer
       b. stripe.customers.retrieve(cus_...) → metadata.cognito_user_id
       c. cognito.adminUpdateUserAttributes:
            custom:subscription_tier = "free"

     customer.subscription.updated:
       a. Same user lookup via Stripe customer metadata
       b. Update Cognito attributes if tier/status changed

Runtime: Node.js 20
Memory: 256 MB
Timeout: 30 seconds
Dependencies: stripe (npm)
IAM: cognito-idp:AdminUpdateUserAttributes on user pool
```

> Cognito attribute updates are naturally idempotent — setting tier to `"pro"` twice is harmless. Stripe can safely retry webhook delivery.

### Function 2: `check-subscription`

```
Trigger: GET /subscription (API Gateway)
Auth: Cognito Authorizer (JWT)
Input: (none — user ID from JWT)

Logic:
  1. Extract user_id from Cognito JWT
  2. cognito.adminGetUser(user_id)
  3. Read custom attributes:
     - custom:subscription_tier (default: "free")
     - custom:pdf_purchased (default: "false")
  4. Return { tier: "pro", pdf_purchased: true }

Runtime: Node.js 20
Memory: 128 MB
Timeout: 5 seconds
Dependencies: none (AWS SDK included in Lambda runtime)
IAM: cognito-idp:AdminGetUser on user pool
```

> `adminGetUser` is a single AWS call (~10ms). Cognito is always current because the webhook Lambda updates it on every state change.

### API Gateway

```
Base URL: https://api.tranche2compliance.com.au
     OR:  https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/prod

Routes:
  POST /webhook/stripe   → stripe-webhook Lambda (no auth — Stripe signature)
  GET  /subscription     → check-subscription Lambda (Cognito JWT authorizer)

CORS: Allow origin tranche2compliance.com.au
```

---

## 4. Cognito Enhancements

### Custom Attributes

| Attribute | Type | Purpose |
|---|---|---|
| `custom:subscription_tier` | String | `free` or `pro` |
| `custom:stripe_customer_id` | String | Links Cognito user to Stripe customer |
| `custom:pdf_purchased` | String | `true` if user bought the one-time $149 PDF |

### Why Cognito Custom Attributes?

The JWT `id_token` includes custom attributes automatically. This means:
1. `auth.js` reads the tier from the token without any API call
2. Feature gating happens instantly on page load (no network latency)
3. Stripe is the source of truth; Cognito attributes are a cache updated by the webhook Lambda
4. `check-subscription` Lambda reads Cognito via `adminGetUser` — no external database needed

### Update Flow

```
Stripe webhook fires
    → Lambda reads user_id from Stripe Customer metadata
    → Lambda updates Cognito custom attributes (the cache)
    → User's next login gets updated JWT with new tier
    → Client-side JS reads tier from JWT
```

### Limitations

1. **Token refresh after checkout:** The current auth uses implicit grant, which does not issue refresh tokens. After checkout, the client must call `GET /subscription` to get the updated tier immediately (JWT won't reflect the change until next login). Migrating to Authorization Code + PKCE (recommended by AWS) enables mid-session token refresh.

2. **Post-checkout webhook timing:** The webhook may not have fired by the time the user is redirected back. The client polls `GET /subscription` with retry logic (see Section 9a).

---

## 5. Feature Gating

### How It Works

```
Page Load
    │
    ▼
auth.js validates token
    │
    ▼
subscription.js reads tier from JWT custom attribute
    │
    ├─ Tier in JWT → use it (fast path, no API call)
    │
    └─ No tier in JWT → call GET /subscription API
       │
       ▼
       Cache result in sessionStorage
    │
    ▼
Store tier globally: window.T2C_TIER = "pro" (or "free")
    │
    ▼
App.renderAllSections() checks T2C_TIER before rendering
    │
    ├─ FREE features → render normally
    │
    └─ PRO features → check tier
       │
       ├─ Tier is "pro" → render normally
       │
       └─ Tier is "free" → render locked overlay
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

### Tier Mapping

Two tiers (free / pro) — a simple boolean check:

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
  if (!PRO_SECTIONS.has(section)) return true;
  return window.T2C_TIER === 'pro';
}

function canGeneratePDF() {
  return window.T2C_TIER === 'pro' || window.T2C_PDF_PURCHASED === true;
}
```

### Security Note

Client-side gating is a **UX convenience, not a security boundary**. This is acceptable because:
1. The content is educational guidance (not proprietary data)
2. Server-side enforcement is handled by Stripe (users must pay to subscribe)
3. The gating serves as a conversion mechanism, not access control
4. If server-side gating is needed later, the Lambda functions verify status from Cognito

---

## 6. PDF Generation

### jsPDF + html2canvas (Client-Side)

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

### Lazy Loading

Libraries load on demand when the user clicks "Generate PDF", not on page load:

```javascript
// pdf-generator.js
function loadPDFLibraries() {
  if (window.jspdf) return Promise.resolve();
  return Promise.all([
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js'),
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
  ]);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
```

> **Alternative:** Use jsPDF's text/table API instead of html2canvas to produce smaller, searchable, more professional PDFs.

---

## 7. Analytics

### Plausible Analytics

Privacy-first, no cookies (no cookie banner needed), lightweight (< 1KB), GDPR/AU Privacy Act compliant.

```html
<!-- All pages, in <head> -->
<script defer data-domain="tranche2compliance.com.au"
  src="https://plausible.io/js/script.js"></script>
```

### Custom Events

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

### Tracking Helper

```javascript
// analytics.js
const Analytics = {
  track(event, props) {
    if (window.plausible) {
      window.plausible(event, { props: props || {} });
    }
  }
};
```

---

## 8. Email

### Stripe Handles All Payment Emails

| Email | Stripe Dashboard Setting |
|---|---|
| Successful payment receipt | Settings → Customer emails |
| Failed payment notification | Settings → Billing → Subscriptions and emails |
| Trial ending reminder (7 days before) | Settings → Billing → Subscriptions and emails |
| Upcoming renewal reminder | Settings → Billing → Subscriptions and emails |
| Subscription canceled | Settings → Billing → Subscriptions and emails |

### SES: Welcome Email Only

| Template | Trigger | Content |
|---|---|---|
| Welcome | Cognito post-confirmation Lambda trigger | Welcome, getting started guide, link to dashboard |

```
Region: ap-southeast-2
Verified domain: tranche2compliance.com.au
From: noreply@tranche2compliance.com.au
Reply-to: support@tranche2compliance.com.au
DKIM: Enabled (DNS records in Route 53)
```

SES starts in sandbox mode — request production access before launch.

---

## 9. Data Flow Diagrams

### 9a. Checkout Flow

```
User (browser)                     Stripe                    Lambda (webhook)
     │                               │                            │
     │  Click "Upgrade to Pro"       │                            │
     │  → JS builds Payment Link URL │                            │
     │    ?client_reference_id=      │                            │
     │     cognito_user_id           │                            │
     │    &prefilled_email=user@...  │                            │
     │                               │                            │
     │  Navigate to Payment Link     │                            │
     │──────────────────────────────>│                            │
     │                               │                            │
     │  User enters payment details  │                            │
     │  on Stripe-hosted page        │                            │
     │                               │                            │
     │  Redirect back to site        │                            │
     │<──────────────────────────────│                            │
     │  (?checkout_success=1)        │                            │
     │                               │                            │
     │                               │  Webhook: checkout.        │
     │                               │  session.completed         │
     │                               │───────────────────────────>│
     │                               │                            │
     │                               │  1. Read client_reference  │
     │                               │     _id (= cognito user)  │
     │                               │  2. Store cognito_user_id  │
     │                               │     in Stripe customer     │
     │                               │     metadata               │
     │                               │  3. Update Cognito:        │
     │                               │     subscription_tier=pro  │
     │                               │                            │
     │  GET /subscription            │                            │
     │  (poll after redirect)        │                            │
     │                               │                            │
     │  Show "Activating your        │                            │
     │  subscription..." spinner.    │                            │
     │  Poll every 2s, max 5         │                            │
     │  attempts (10s). If still     │                            │
     │  "free" after 10s: show       │                            │
     │  manual retry button.         │                            │
     │                               │                            │
     │──────────────────────────────────────────────────────────>│
     │                               │    adminGetUser → read     │
     │                               │    Cognito custom attrs    │
     │  { tier: "pro" }             │                            │
     │<──────────────────────────────────────────────────────────│
     │                               │                            │
     │  Unlock features              │                            │
     │  (update T2C_TIER)            │                            │
```

### 9b. Returning User

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
     │  │  (most common path — no API call)│
     │  │                                  │
     │  │  NO (first login after signup)   │
     │  │                                  │
     │  └─ GET /subscription               │
     │─────────────────────────────────────>│
     │                                     │  adminGetUser
     │                                     │  → read Cognito
     │                                     │    custom attrs
     │     { tier: "pro", pdf_purchased: true }
     │<─────────────────────────────────────│
     │                                     │
     │  Cache in sessionStorage            │
     │  Set T2C_TIER = "pro"              │
     │  Render unlocked features           │
```

### 9c. PDF Generation

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
     │  └─ YES → continue
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

### 9d. Subscription Lifecycle

```
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

## 10. Security

### Authentication & Authorization

| Concern | Mitigation |
|---|---|
| JWT token spoofing | Cognito signs JWTs with RS256 — verified server-side by API Gateway Cognito Authorizer |
| Client-side tier manipulation | Acceptable risk (see Section 5). Webhook writes to Cognito as source of truth |
| Stripe webhook forgery | Verify `Stripe-Signature` header using webhook secret in Lambda |
| Duplicate webhook delivery | Cognito attribute updates are naturally idempotent — no special handling needed |
| API replay attacks | Cognito JWTs have `exp` claim (1 hour). API Gateway rejects expired tokens |
| CSRF on checkout | Payment Links are Stripe-hosted — no CSRF vector on our domain |
| Payment Link URL tampering | `client_reference_id` only identifies the user for webhook correlation — cannot grant access or change pricing |
| Implicit grant token exposure | Tokens in URL fragments. Mitigated by `history.replaceState()` cleanup. Migrate to PKCE before launch |

### Data Protection

| Concern | Mitigation |
|---|---|
| Stripe secret key exposure | Lambda environment variable (encrypted at rest). NEVER client-side. Payment Links are plain URLs |
| Cognito admin access | Scope IAM policy to specific user pool ARN only |
| PII exposure | Cognito: email + tier + Stripe customer ID. Stripe: email + payment data. No custom database |
| SES email spoofing | DKIM + SPF + DMARC configured on domain |
| localStorage on shared computers | User is responsible for clearing browser data |

### Compliance

| Requirement | Status |
|---|---|
| PCI DSS | Not in scope — Stripe handles all card data |
| Australian Privacy Act | Plausible (no cookies), SES (welcome email only), Stripe (handles payment PII), Cognito (email + tier only) |
| GDPR | Not primary audience (Australian users), but Plausible is GDPR compliant |
| GST | Stripe Tax auto-calculates 10% GST when revenue > $75K AUD |

---

## 11. Cost Estimates

### 100 Users (Launch)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | Static site, <10GB transfer | $0 (free tier) |
| Cognito | 100 MAU | $0 (first 50K free) |
| API Gateway | ~1,000 requests/mo | $0 (first 1M free) |
| Lambda | ~1,000 invocations, 2 functions | $0 (first 1M free) |
| SES | ~100 welcome emails/mo | $0.01 |
| CloudWatch Logs | 2 functions | $0 (first 5GB free) |
| Route 53 | Hosted zone | $0.50 |
| Plausible | <10K pageviews | $9.00 |
| Stripe | 30 subscribers × $29 avg | ~$25 (2.9% + 30c per txn) |
| **Total AWS** | | **~$0.51** |
| **Total (all services)** | | **~$35** |

### 500 Users (Month 6)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | ~50GB transfer | $0–$5 |
| Cognito | 500 MAU | $0 |
| API Gateway | ~5,000 requests/mo | $0 |
| Lambda | ~5,000 invocations | $0 |
| SES | ~200 welcome emails/mo | $0.02 |
| CloudWatch Logs | ~5K invocations | $0 |
| Route 53 | Hosted zone | $0.50 |
| Plausible | ~50K pageviews | $9.00 |
| Stripe | 75 Pro subs × $29 + PDF sales | ~$68 |
| **Total** | | **~$83** |
| **Revenue** | | **~$2,900** |

### 2,000 Users (Month 12)

| Service | Usage | Monthly Cost |
|---|---|---|
| Amplify Hosting | ~200GB transfer | $10–$20 |
| Cognito | 2,000 MAU | $0 |
| API Gateway | ~20,000 requests/mo | $0 |
| Lambda | ~20,000 invocations | $0 |
| SES | ~500 welcome emails/mo | $0.05 |
| CloudWatch Logs | ~20K invocations | $0–$1 |
| Route 53 | Hosted zone | $0.50 |
| Plausible | ~200K pageviews | $19.00 |
| Stripe | 300 Pro subs × $29 + PDF sales | ~$260 |
| **Total** | | **~$301** |
| **Revenue** | | **~$10,200** |

AWS costs are effectively $0 at all scales. The only meaningful costs are Stripe transaction fees (2.9% + 30c, proportional to revenue) and Plausible ($9–$19/mo).

---

## 12. Implementation Plan

### Phase 1: Payments + Feature Gating + PDF (Weeks 1–4)

| Week | Task | Tools |
|---|---|---|
| 1 | Set up Stripe account (AU), create 3 products | Stripe Dashboard |
| 1 | Create 3 Payment Links, configure success redirect URLs | Stripe Dashboard |
| 1 | Enable Stripe built-in emails: receipts, failed payments, trial reminders | Stripe Dashboard |
| 1 | Configure Stripe Customer Portal: plan switching, cancellation, payment method | Stripe Dashboard |
| 1 | Add Cognito custom attributes (`subscription_tier`, `stripe_customer_id`, `pdf_purchased`) | AWS Console |
| 1 | Create `pricing.html` (Free vs Pro comparison, Payment Link URLs) | HTML/Tailwind |
| 2 | Create `subscription.js` (tier check, feature gating, Payment Link URL builder) | JavaScript |
| 2 | Create Lambda: `stripe-webhook` | Node.js, Stripe SDK |
| 2 | Create Lambda: `check-subscription` | Node.js, AWS SDK |
| 2 | Set up API Gateway (2 routes) with Cognito Authorizer | AWS Console |
| 3 | Integrate feature gating into all 3 app.js variants | JavaScript |
| 3 | Add upgrade prompts on locked features + "Manage Subscription" portal link | JavaScript/HTML |
| 3 | Create `pdf-generator.js` with jsPDF integration | jsPDF, JavaScript |
| 3 | Migrate auth from implicit grant to Authorization Code + PKCE | auth.js, Cognito config |
| 4 | End-to-end testing (Stripe test mode) | Manual + Stripe test cards |
| 4 | Go live: switch Stripe to live mode | Stripe Dashboard |

### Phase 2: Analytics + Welcome Email (Weeks 5–6)

| Week | Task | Tools |
|---|---|---|
| 5 | Set up SES: verify domain, DKIM, request production access | AWS Console |
| 5 | Create welcome email template | HTML |
| 5 | Add Cognito post-confirmation trigger for welcome email | Cognito + SES |
| 5 | Add Plausible script to all pages | HTML |
| 6 | Create `analytics.js` wrapper with custom events | JavaScript |
| 6 | Implement custom event tracking across all features | JavaScript |

### Phase 3: Growth + Partners (Months 3–6)

| Task | Tools |
|---|---|
| Launch remaining entity types (Lawyers, TCSPs, Financial Advisors) | HTML/JS |
| SEO content pages / blog | HTML |
| Partner referral tracking (outbound affiliate links) | JavaScript |
| Compliance badge system | jsPDF + verification page |
| Industry body outreach (REIA, CPA Australia) | Sales / email |
| Branded PDF exports (add business logo/name) | jsPDF |

The entire monetization stack is complete after Phase 2. Phase 3 is growth work, not infrastructure.

---

## 13. Files to Create & Modify

### New Files

| File | Purpose | Phase |
|---|---|---|
| `pricing.html` | Public pricing/comparison page with Payment Link URLs | 1 |
| `js/subscription.js` | Tier checking, feature gating, Payment Link URL builder | 1 |
| `js/pdf-generator.js` | jsPDF document assembly (lazy-loaded) | 1 |
| `js/analytics.js` | Plausible event tracking wrapper | 2 |
| `amplify/functions/stripe-webhook/handler.ts` | Lambda: update Cognito from Stripe events | 1 |
| `amplify/functions/check-subscription/handler.ts` | Lambda: read Cognito custom attributes | 1 |

> `pricing.html` must handle unauthenticated visitors — "Upgrade" button redirects to Cognito signup/login first, then to checkout after auth. Use `sessionStorage.setItem('amliq_return_url', '/pricing?action=checkout&price=pro_monthly')` before redirect.

### Modified Files

| File | Changes | Phase |
|---|---|---|
| `real-estate.html` | Add `<script>` tags for subscription.js, analytics.js | 1, 2 |
| `accountants.html` | Same as above | 1, 2 |
| `jewellers.html` | Same as above | 1, 2 |
| `index.html` | Add pricing page link in header/hero, Plausible script | 1, 2 |
| `js/app.js` | Wrap section rendering with `canAccess()` checks, add upgrade prompts | 1 |
| `js/app-accountants.js` | Same as above | 1 |
| `js/app-jewellers.js` | Same as above | 1 |
| `js/auth.js` | Extract `custom:subscription_tier` from JWT claims after validation | 1 |
| `amplify/auth/resource.ts` | Add custom attributes definition | 1 |
| `amplify/backend.ts` | Add Lambda functions and API Gateway | 1 |
| `package.json` | Add Stripe SDK as dependency for webhook Lambda | 1 |

---

## 14. Quick Reference

### Stripe Test Cards

| Card | Number | Use |
|---|---|---|
| Success | `4242 4242 4242 4242` | Happy path |
| Decline | `4000 0000 0000 0002` | Payment failure |
| 3D Secure | `4000 0025 0000 3155` | Authentication required |
| Insufficient funds | `4000 0000 0000 9995` | Specific decline |

### AWS CLI Commands

```bash
# Verify SES domain
aws ses verify-domain-identity \
  --domain tranche2compliance.com.au \
  --region ap-southeast-2

# Add Cognito custom attributes
aws cognito-idp add-custom-attributes \
  --user-pool-id ap-southeast-2_XXXXX \
  --custom-attributes Name=subscription_tier,AttributeDataType=String \
                      Name=stripe_customer_id,AttributeDataType=String \
                      Name=pdf_purchased,AttributeDataType=String
```

### Environment Variables

```
# stripe-webhook Lambda:
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
COGNITO_USER_POOL_ID=ap-southeast-2_XXXXX

# check-subscription Lambda:
COGNITO_USER_POOL_ID=ap-southeast-2_XXXXX
```

### Stripe Dashboard Checklist

```
1. Products: Create Pro Monthly ($29), Pro Annual ($249), PDF One-Time ($149)
2. Payment Links: Create 3 links (one per product), set success redirect URLs
3. Customer Portal: Enable plan switching, cancellation, payment method updates
4. Emails (Settings → Billing → Subscriptions): Enable all built-in emails
5. Emails (Settings → Customer emails): Enable successful payment receipts
6. Webhooks: Add endpoint https://api.tranche2compliance.com.au/webhook/stripe
   Events: checkout.session.completed, customer.subscription.deleted,
           customer.subscription.updated
7. Tax (optional): Enable Stripe Tax for automatic GST collection
```
