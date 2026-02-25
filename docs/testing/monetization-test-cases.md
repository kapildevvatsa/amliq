# T2C Monetization — Test Cases

> Comprehensive test plan covering all tier-level behaviour, payment flows, feature gating, and backend integration across all pages and entity types.

**Tiers:** Free | Pro | PDF-Only (one-time purchase)
**Pages:** real-estate.html | accountants.html | jewellers.html | pricing.html
**Backend:** stripe-webhook Lambda | check-subscription Lambda | API Gateway

---

## Legend

- **[MANUAL]** — requires browser interaction
- **[CLI]** — can be verified via AWS CLI or Stripe CLI
- **[CODE]** — verify by reading code / browser console

---

## 1. Authentication & Session

### 1.1 PKCE Login Flow

| # | Test Case | Steps | Expected | Tier |
|---|-----------|-------|----------|------|
| 1.1.1 | Fresh login redirects to Cognito | Clear sessionStorage, navigate to real-estate.html | Redirects to Cognito hosted UI with `response_type=code` and `code_challenge` | All |
| 1.1.2 | Auth code exchanged for tokens | Complete login on Cognito | Redirected back, `amliq_id_token` and `amliq_refresh_token` in sessionStorage | All |
| 1.1.3 | URL cleaned after code exchange | Login completes | `?code=` removed from URL via `history.replaceState` | All |
| 1.1.4 | Return URL honoured | Set `amliq_return_url` before login redirect | After login, redirected to the saved return URL | All |
| 1.1.5 | Callback URL mismatch rejected | Navigate to a page not in Cognito callback list | Cognito shows `redirect_mismatch` error | All |
| 1.1.6 | Login works from all pages | Login from each of: `/real-estate.html`, `/accountants.html`, `/jewellers.html`, `/pricing.html`, `/` | No redirect_mismatch error on any page | All |

### 1.2 Token Management

| # | Test Case | Steps | Expected | Tier |
|---|-----------|-------|----------|------|
| 1.2.1 | Expired token triggers refresh | Set `amliq_id_token` to an expired JWT | `refreshTokens()` called, new token stored | All |
| 1.2.2 | Failed refresh redirects to login | Set expired token, remove refresh token | Redirects to Cognito login | All |
| 1.2.3 | User attributes extracted from JWT | Decode `amliq_id_token` | `window.T2C_TIER`, `T2C_USER_ID`, `T2C_USER_EMAIL` set correctly | All |
| 1.2.4 | Custom claims in JWT | Login as Pro user, decode token at jwt.io | `custom:subscription_tier: "pro"` present in claims | Pro |
| 1.2.5 | Missing custom claim defaults to free | Login as user without `custom:subscription_tier` | `window.T2C_TIER === 'free'` | Free |

### 1.3 Sign Out

| # | Test Case | Steps | Expected | Tier |
|---|-----------|-------|----------|------|
| 1.3.1 | Sign out clears session | Click sign-out link | `amliq_id_token`, `amliq_refresh_token` removed from sessionStorage | All |
| 1.3.2 | Sign out redirects to home | Click sign-out link | Navigated to `/` (landing page) | All |

---

## 2. Feature Gating — Free Tier

### 2.1 Free Sections (always accessible)

| # | Section | Page(s) | Expected |
|---|---------|---------|----------|
| 2.1.1 | Dashboard | All 3 | Renders normally, progress tracking visible |
| 2.1.2 | Obligations Overview | All 3 | Full content visible |
| 2.1.3 | Am I Regulated? | All 3 | Quiz functional |
| 2.1.4 | Key Dates & Timeline | All 3 | Countdown timer and dates visible |
| 2.1.5 | Glossary | All 3 | Searchable glossary visible |
| 2.1.6 | FAQ | All 3 | All FAQ items expandable |
| 2.1.7 | Red Flags | All 3 | Full reference visible |
| 2.1.8 | Enrolment Guide | All 3 | AUSTRAC enrolment steps visible |
| 2.1.9 | Reporting to AUSTRAC | All 3 | Reporting guide visible |

### 2.2 Pro Sections (gated for free users)

| # | Section ID | Page(s) | Expected |
|---|-----------|---------|----------|
| 2.2.1 | `risk-assessment` | All 3 | Locked overlay with upgrade buttons |
| 2.2.2 | `program-builder` | All 3 | Locked overlay with upgrade buttons |
| 2.2.3 | `cdd` | All 3 | Locked overlay with upgrade buttons |
| 2.2.4 | `governance` | All 3 | Locked overlay with upgrade buttons |
| 2.2.5 | `forms-library` | All 3 | Locked overlay with upgrade buttons |
| 2.2.6 | `starter-kit-forms` | All 3 | Locked overlay with upgrade buttons |
| 2.2.7 | `customer-examples` | All 3 | Locked overlay with upgrade buttons |
| 2.2.8 | `record-keeping` | All 3 | Locked overlay with upgrade buttons |
| 2.2.9 | `training` | All 3 | Locked overlay with upgrade buttons |
| 2.2.10 | `program-review` | All 3 | Locked overlay with upgrade buttons |
| 2.2.11 | `evaluation` | All 3 | Locked overlay with upgrade buttons |

### 2.3 Locked Overlay Content

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 2.3.1 | Overlay shows lock icon | Click any Pro section as free user | Lock emoji (&#128274;) visible |
| 2.3.2 | Overlay shows "Pro Feature" heading | Click any Pro section as free user | `<h2>Pro Feature</h2>` present |
| 2.3.3 | Monthly CTA button present | Inspect overlay | "Start Free Trial — $29/month" button |
| 2.3.4 | Annual CTA button present | Inspect overlay | "Annual — $249/year (save 30%)" button |
| 2.3.5 | PDF one-time link present | Inspect overlay | "buy just the Program PDF for $149" link |
| 2.3.6 | Monthly CTA calls correct checkout | Click monthly button | `Subscription.openCheckout('pro_monthly')` fires |
| 2.3.7 | Annual CTA calls correct checkout | Click annual button | `Subscription.openCheckout('pro_annual')` fires |
| 2.3.8 | PDF CTA calls correct checkout | Click PDF link | `Subscription.openCheckout('pdf_onetime')` fires |
| 2.3.9 | Analytics event fired on gate | Open DevTools, click Pro section | `Feature_Gated` event tracked with section name and tier |

---

## 3. Feature Gating — Pro Tier

### 3.1 All Sections Accessible

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 3.1.1 | Pro sections render normally | Log in as Pro user, navigate to each of the 11 Pro sections | Full section content visible, no locked overlay |
| 3.1.2 | Free sections still work | Navigate to dashboard, glossary, FAQ etc. | Renders normally |
| 3.1.3 | No lock icons in sidebar | Inspect sidebar nav links | No `.pro-lock-icon` spans on any nav link |

### 3.2 PDF Generation (Pro)

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 3.2.1 | PDF button visible in Program Builder | Navigate to `program-builder` as Pro user | "Generate AML/CTF Program PDF" button visible |
| 3.2.2 | PDF generates successfully | Click "Generate AML/CTF Program PDF" | PDF file downloads with correct filename format |
| 3.2.3 | PDF contains cover page | Open downloaded PDF | Cover page with business name, date, entity type, disclaimers |
| 3.2.4 | PDF contains table of contents | Check page 2 | Parts A-F and Appendix listed |
| 3.2.5 | PDF includes risk assessment data | Complete risk assessment, then generate | Part A contains risk data |
| 3.2.6 | PDF includes form data | Complete some forms, then generate | Parts B-F contain saved form data |
| 3.2.7 | PDF footer on all pages | Check each page | "Generated by T2C" footer and page numbers |
| 3.2.8 | Analytics event fired | Generate PDF with DevTools open | `PDF_Generated` event with entity_type |
| 3.2.9 | PDF button on accountants page | Login as Pro on accountants.html → program-builder | Button visible, generates accountants-specific PDF |
| 3.2.10 | PDF button on jewellers page | Login as Pro on jewellers.html → program-builder | Button visible, generates jewellers-specific PDF |

---

## 4. Feature Gating — PDF-Only Purchase

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 4.1 | Pro sections remain locked | Login as PDF-only user (T2C_TIER=free, T2C_PDF_PURCHASED=true) | All 11 Pro sections show locked overlay |
| 4.2 | PDF generation allowed | Navigate to program-builder (will be locked), but call `PDFGenerator.generate()` in console | PDF generates (canGeneratePDF returns true) |
| 4.3 | Sidebar shows "Upgrade to Pro" | Check sidebar | Upgrade button shown (not "Manage Subscription") |
| 4.4 | Lock icons still visible | Check sidebar nav | Lock emojis on Pro sections |

---

## 5. Sidebar Behaviour

### 5.1 Free User Sidebar

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 5.1.1 | Lock icons on all 11 Pro sections | Login as free user, inspect sidebar | Lock emoji (&#x1F512;) appended to each Pro nav link |
| 5.1.2 | No lock on free sections | Inspect sidebar | Dashboard, glossary, FAQ etc. have no lock icon |
| 5.1.3 | "Upgrade to Pro" button visible | Check bottom of sidebar | Button with "Upgrade to Pro" and "14-day free trial" text |
| 5.1.4 | Upgrade button triggers checkout | Click "Upgrade to Pro" | `Subscription.openCheckout('pro_monthly')` fires |
| 5.1.5 | Lock icons not duplicated | Navigate between sections multiple times | Only one lock icon per nav link (no duplicates) |

### 5.2 Pro User Sidebar

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 5.2.1 | No lock icons | Login as Pro user | No lock emojis on any nav link |
| 5.2.2 | "Manage Subscription" button visible | Check bottom of sidebar | Button with "Manage Subscription" text |
| 5.2.3 | Manage button opens portal | Click "Manage Subscription" | Opens Stripe Customer Portal in new tab |

---

## 6. Pricing Page

### 6.1 Display

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 6.1.1 | Page loads without auth | Navigate to pricing.html while not logged in | Page visible (uses auth-landing.js, not auth.js) |
| 6.1.2 | Monthly pricing shown by default | Load pricing.html | "$29/month" displayed |
| 6.1.3 | Toggle to annual | Click "Annual" toggle | "$249/year" displayed |
| 6.1.4 | Toggle back to monthly | Click "Monthly" toggle | "$29/month" displayed |
| 6.1.5 | Free tier features listed | Inspect Free column | Education content, glossary, FAQ, quiz etc. |
| 6.1.6 | Pro tier features listed | Inspect Pro column | Risk assessment, program builder, CDD, PDF, training etc. |
| 6.1.7 | PDF one-time option shown | Scroll down | "$149 one-time" PDF purchase option visible |

### 6.2 Checkout Flow (Not Authenticated)

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 6.2.1 | Pro checkout redirects to login | Click "Start Free Trial" while not logged in | Redirects to Cognito with return URL set to `/pricing.html?action=checkout&price=pro_monthly` |
| 6.2.2 | After login, checkout resumes | Complete login | Redirected back to pricing.html, auto-redirects to Stripe Payment Link |
| 6.2.3 | Annual checkout works same | Click annual CTA while not logged in | Same flow with `price=pro_annual` |
| 6.2.4 | PDF checkout works same | Click PDF CTA while not logged in | Same flow with `price=pdf_onetime` |

### 6.3 Checkout Flow (Authenticated)

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 6.3.1 | Pro checkout goes to Stripe | Click "Start Free Trial" while logged in | Opens Stripe Payment Link with `client_reference_id` and `prefilled_email` |
| 6.3.2 | client_reference_id set | Inspect outbound URL | Contains `?client_reference_id=<cognito_sub>` |
| 6.3.3 | prefilled_email set | Inspect outbound URL | Contains `&prefilled_email=<user_email>` |
| 6.3.4 | Analytics event fired | Open DevTools, click CTA | `Upgrade_Clicked` event with purchase_type and source |

---

## 7. Stripe Payment Links

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 7.1 | Pro Monthly link valid | Open `Subscription.PAYMENT_LINKS.pro_monthly` | Stripe checkout page loads for $29/month |
| 7.2 | Pro Annual link valid | Open `Subscription.PAYMENT_LINKS.pro_annual` | Stripe checkout page loads for $249/year |
| 7.3 | PDF One-Time link valid | Open `Subscription.PAYMENT_LINKS.pdf_onetime` | Stripe checkout page loads for $149 one-time |
| 7.4 | Customer Portal link valid | Open `Subscription.CUSTOMER_PORTAL_URL` | Stripe portal login page loads |
| 7.5 | 14-day free trial on subscriptions | Complete Pro Monthly checkout | Stripe shows trial period, $0 charged initially |
| 7.6 | Redirect URL after payment | Complete checkout | Redirected to `<app_url>/real-estate.html?checkout_success=1` |

---

## 8. Post-Checkout Activation

### 8.1 Activation Polling

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 8.1.1 | Activation spinner shown | Navigate to `real-estate.html?checkout_success=1` as free user | Spinner overlay with "Activating your subscription..." |
| 8.1.2 | URL cleaned immediately | Observe URL bar | `?checkout_success=1` removed |
| 8.1.3 | Polls /subscription API | Open Network tab | GET requests to `API_BASE_URL/subscription` every 2s, up to 5 times |
| 8.1.4 | Authorization header sent | Inspect polling request | `Authorization: Bearer <id_token>` header present |
| 8.1.5 | Success — tier updated | Webhook has already updated Cognito | Polling returns `{tier: "pro"}`, spinner removed, toast shown |
| 8.1.6 | Success — sections re-rendered | After activation succeeds | Pro sections accessible, lock icons removed, sidebar updated |
| 8.1.7 | Token refreshed on success | After activation succeeds | `amliqRefreshTokens()` called, new JWT has `custom:subscription_tier: "pro"` |
| 8.1.8 | Max retries shows retry UI | Webhook hasn't run (Cognito still free) after 5 polls | "Almost there!" message with "Check Again" button |
| 8.1.9 | Manual retry works | Click "Check Again" | Spinner shown, polling restarts from attempt 0 |
| 8.1.10 | Already Pro — skip polling | Navigate with `?checkout_success=1` as Pro user | Immediate success toast, no polling |

### 8.2 Activation on Different Pages

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 8.2.1 | Works on accountants.html | Navigate to `accountants.html?checkout_success=1` | Same activation flow |
| 8.2.2 | Works on jewellers.html | Navigate to `jewellers.html?checkout_success=1` | Same activation flow |

---

## 9. Stripe Webhook (Lambda)

### 9.1 checkout.session.completed

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 9.1.1 | Subscription checkout → Pro | Send event with `mode: "subscription"`, `client_reference_id: <user_sub>` | Cognito `custom:subscription_tier` set to `"pro"` |
| 9.1.2 | Stripe customer tagged | Same as above | Stripe customer metadata has `cognito_user_id` (or warn logged if customer can't be found) |
| 9.1.3 | `stripe_customer_id` stored | Same as above | Cognito `custom:stripe_customer_id` set to `cus_xxx` |
| 9.1.4 | One-time payment → PDF purchased | Send event with `mode: "payment"`, `client_reference_id: <user_sub>` | Cognito `custom:pdf_purchased` set to `"true"` |
| 9.1.5 | Missing client_reference_id | Send event without `client_reference_id` | Logs warning "No client_reference_id on checkout session", returns 200 |
| 9.1.6 | Invalid signature rejected | Send request with wrong/missing Stripe-Signature header | Returns 400 "Webhook signature verification failed" |
| 9.1.7 | Missing Stripe-Signature header | Send request without the header | Returns 400 "Missing Stripe-Signature header" |

### 9.2 customer.subscription.deleted

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 9.2.1 | Cancellation → downgrade to free | Cancel subscription in Stripe | Cognito `custom:subscription_tier` set to `"free"` |
| 9.2.2 | Customer without cognito_user_id | Delete with customer that has no metadata | Logs warning, returns 200 |

### 9.3 customer.subscription.updated

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 9.3.1 | Active subscription → pro | Send event with `status: "active"` | Cognito `custom:subscription_tier` set to `"pro"` |
| 9.3.2 | Trialing subscription → pro | Send event with `status: "trialing"` | Cognito `custom:subscription_tier` set to `"pro"` |
| 9.3.3 | Past due subscription → free | Send event with `status: "past_due"` | Cognito `custom:subscription_tier` set to `"free"` |
| 9.3.4 | Cancelled subscription → free | Send event with `status: "canceled"` | Cognito `custom:subscription_tier` set to `"free"` |

### 9.4 Error Handling

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 9.4.1 | Unhandled event type | Send `invoice.paid` event | Logs "Unhandled event type", returns 200 |
| 9.4.2 | Cognito update failure | Send event for non-existent user | Returns 500 "Internal error processing webhook" |
| 9.4.3 | Stripe customer tag failure is non-fatal | Customer doesn't exist in Stripe account | Warn logged, Cognito still updated, returns 200 |

---

## 10. Check-Subscription API (Lambda)

### 10.1 Successful Responses

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 10.1.1 | Returns Pro tier | Call GET /subscription with Pro user's JWT | `{tier: "pro", pdf_purchased: false, stripe_customer_id: "cus_xxx"}` |
| 10.1.2 | Returns Free tier | Call GET /subscription with Free user's JWT | `{tier: "free", pdf_purchased: false, stripe_customer_id: null}` |
| 10.1.3 | Returns PDF purchased | Call with PDF-only user's JWT | `{tier: "free", pdf_purchased: true, stripe_customer_id: "cus_xxx"}` |

### 10.2 Error Handling

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 10.2.1 | Missing/invalid JWT | Call GET /subscription without Authorization header | 401 from API Gateway Cognito authorizer |
| 10.2.2 | Expired JWT | Call with expired token | 401 from API Gateway Cognito authorizer |
| 10.2.3 | Cognito error | (simulate) | 500 with `{error: "Internal server error"}` |

### 10.3 CORS

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 10.3.1 | CORS allows Amplify domain | Request from `https://master.d348r0hmzvjji4.amplifyapp.com` | `Access-Control-Allow-Origin: https://master.d348r0hmzvjji4.amplifyapp.com` |
| 10.3.2 | CORS allows production domain | Request from `https://www.tranche2compliance.com.au` | `Access-Control-Allow-Origin: https://www.tranche2compliance.com.au` |
| 10.3.3 | OPTIONS preflight succeeds | Send OPTIONS to /subscription | 200 with correct CORS headers (handled by API Gateway) |
| 10.3.4 | Unknown origin falls back | Request from `https://evil.com` | `Access-Control-Allow-Origin: https://www.tranche2compliance.com.au` (first allowed origin) |

---

## 11. Cognito Configuration

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 11.1 | Custom attributes exist on pool | `aws cognito-idp describe-user-pool --query SchemaAttributes` | `custom:subscription_tier`, `custom:stripe_customer_id`, `custom:pdf_purchased` present |
| 11.2 | App Client has read access | `aws cognito-idp describe-user-pool-client --query ReadAttributes` | All 3 custom attributes in readable list |
| 11.3 | OAuth flows configured | Check app client | `AllowedOAuthFlows: ["code"]`, `AllowedOAuthScopes: ["openid", "email", "profile"]` |
| 11.4 | Callback URLs complete | Check app client | All page URLs for Amplify, production, and localhost |
| 11.5 | Logout URLs set | Check app client | Root URLs for Amplify, production, and localhost |

---

## 12. Lambda Environment & IAM

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 12.1 | stripe-webhook has STRIPE_SECRET_KEY | Check Lambda env vars | `<value will be resolved during runtime>` (from SSM) |
| 12.2 | stripe-webhook has STRIPE_WEBHOOK_SECRET | Check Lambda env vars | `<value will be resolved during runtime>` (from SSM) |
| 12.3 | stripe-webhook has COGNITO_USER_POOL_ID | Check Lambda env vars | `ap-southeast-2_VQ5jADaPv` |
| 12.4 | check-subscription has COGNITO_USER_POOL_ID | Check Lambda env vars | `ap-southeast-2_VQ5jADaPv` |
| 12.5 | check-subscription has ALLOWED_ORIGINS | Check Lambda env vars | Both domains listed |
| 12.6 | stripe-webhook IAM allows AdminUpdateUserAttributes | Check role policy | Resource matches external user pool ARN |
| 12.7 | check-subscription IAM allows AdminGetUser | Check role policy | Resource matches external user pool ARN |

---

## 13. End-to-End Flows

### 13.1 New User → Free Trial → Pro

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to real-estate.html | Redirected to Cognito login |
| 2 | Create account and log in | Dashboard loads, Pro sections locked, sidebar shows "Upgrade to Pro" |
| 3 | Click locked section (e.g. risk-assessment) | Locked overlay with upgrade buttons |
| 4 | Click "Start Free Trial — $29/month" | Redirected to Stripe Payment Link with user ID and email pre-filled |
| 5 | Complete payment with test card `4242 4242 4242 4242` | Stripe checkout succeeds |
| 6 | Redirected to app with `?checkout_success=1` | Activation spinner shown |
| 7 | Wait for webhook + polling | Spinner replaced by success toast |
| 8 | Navigate to risk-assessment | Full content visible, no overlay |
| 9 | Check sidebar | "Manage Subscription" button, no lock icons |
| 10 | Click "Manage Subscription" | Stripe Customer Portal opens |

### 13.2 Pro User → Cancel Subscription → Free

| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as Pro user | All sections accessible |
| 2 | Click "Manage Subscription" | Stripe Customer Portal opens |
| 3 | Cancel subscription in portal | Stripe sends `customer.subscription.deleted` webhook |
| 4 | Log out and log back in | JWT refreshed with `custom:subscription_tier: "free"` |
| 5 | Navigate to risk-assessment | Locked overlay shown |
| 6 | Check sidebar | "Upgrade to Pro" button, lock icons on Pro sections |

### 13.3 Free User → PDF One-Time Purchase

| Step | Action | Expected |
|------|--------|----------|
| 1 | Log in as free user | Pro sections locked |
| 2 | Click "buy just the Program PDF for $149" in overlay | Redirected to Stripe PDF Payment Link |
| 3 | Complete payment | Redirected back with `?checkout_success=1` |
| 4 | Wait for activation | Success toast shown |
| 5 | Pro sections still locked | All 11 Pro sections show locked overlay |
| 6 | Call `PDFGenerator.generate()` in console | PDF generates and downloads |

### 13.4 Pricing Page → Checkout (Unauthenticated)

| Step | Action | Expected |
|------|--------|----------|
| 1 | Navigate to pricing.html (not logged in) | Page loads, pricing visible |
| 2 | Click "Start Free Trial" | Redirected to Cognito login |
| 3 | Log in | Redirected back to pricing.html with `?action=checkout&price=pro_monthly` |
| 4 | After 500ms delay | Auto-redirected to Stripe Payment Link |

### 13.5 Subscription Update → Tier Change

| Step | Action | Expected |
|------|--------|----------|
| 1 | User has active Pro subscription | `custom:subscription_tier: "pro"` |
| 2 | Subscription payment fails (Stripe marks as `past_due`) | `customer.subscription.updated` webhook fires with `status: "past_due"` |
| 3 | Lambda processes event | `custom:subscription_tier` set to `"free"` |
| 4 | User refreshes app | Pro features locked |
| 5 | User updates payment method, subscription reactivated | `customer.subscription.updated` with `status: "active"` |
| 6 | Lambda processes event | `custom:subscription_tier` set to `"pro"` |
| 7 | User refreshes app | Pro features unlocked |

---

## 14. Cross-Entity Consistency

| # | Test Case | real-estate.html | accountants.html | jewellers.html |
|---|-----------|-----------------|------------------|----------------|
| 14.1 | Free user sees 11 locked sections | Yes | Yes | Yes |
| 14.2 | Pro user sees all sections | Yes | Yes | Yes |
| 14.3 | PDF button in program-builder | Yes | Yes | Yes |
| 14.4 | Lock icons in sidebar | Yes | Yes | Yes |
| 14.5 | Upgrade button in sidebar | Yes | Yes | Yes |
| 14.6 | Manage button for Pro | Yes | Yes | Yes |
| 14.7 | Post-checkout activation works | Yes | Yes | Yes |
| 14.8 | Locked overlay has correct CTAs | Yes | Yes | Yes |

---

## 15. Edge Cases

| # | Test Case | Steps | Expected |
|---|-----------|-------|----------|
| 15.1 | Double checkout_success param | Navigate with `?checkout_success=1&checkout_success=1` | Handled gracefully, single activation flow |
| 15.2 | Stale JWT after webhook | Webhook updates Cognito, but JWT cached | Polling API returns "pro" → globals updated → token refreshed |
| 15.3 | Multiple tabs open | Open app in 2 tabs, subscribe in tab 1 | Tab 2 sees "free" until refreshed/token refreshed |
| 15.4 | Network failure during polling | Disconnect network after checkout redirect | Polling catch retries, eventually shows retry UI |
| 15.5 | Rapid section navigation | Click multiple Pro sections quickly as free user | Each renders locked overlay correctly without UI glitches |
| 15.6 | Browser back/forward through locked section | Navigate to locked section, press back, press forward | Overlay re-renders correctly |
| 15.7 | localStorage cleared | Clear all localStorage as Pro user | Forms empty but tier still reads from JWT (sessionStorage), sections still accessible |
| 15.8 | sessionStorage cleared mid-session | Clear sessionStorage | Redirects to Cognito login on next navigation |
| 15.9 | Webhook received before user returns | Webhook processes in <1s, user takes 10s to return | Polling immediately finds "pro" on first attempt |
| 15.10 | Webhook delayed > 10s | Webhook takes >10s to process | Polling exhausts 5 attempts (10s total), shows retry UI |

---

## CLI Verification Commands

```bash
# Check Cognito user tier
MSYS_NO_PATHCONV=1 aws cognito-idp admin-get-user \
  --user-pool-id ap-southeast-2_VQ5jADaPv \
  --username <USER_SUB> \
  --query 'UserAttributes[?starts_with(Name, `custom:`)].{Name: Name, Value: Value}' \
  --output table --region ap-southeast-2

# Check Lambda env vars
MSYS_NO_PATHCONV=1 aws lambda get-function-configuration \
  --function-name amplify-amliq-kapil-sandb-stripewebhooklambdaF97E3-F7osyizDa9yL \
  --query 'Environment.Variables' --output json --region ap-southeast-2

# Check Cognito App Client readable attributes
MSYS_NO_PATHCONV=1 aws cognito-idp describe-user-pool-client \
  --user-pool-id ap-southeast-2_VQ5jADaPv \
  --client-id 31etl7ceunn7p9g3gaipms8rhr \
  --query 'UserPoolClient.ReadAttributes' --output json --region ap-southeast-2

# Trigger test webhook events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.deleted
stripe trigger customer.subscription.updated

# Resend specific event
stripe events resend <EVENT_ID> --webhook-endpoint <ENDPOINT_ID>

# Check webhook Lambda logs
MSYS_NO_PATHCONV=1 aws logs tail "/aws/lambda/amplify-amliq-kapil-sandb-stripewebhooklambdaF97E3-F7osyizDa9yL" \
  --since 5m --region ap-southeast-2

# Check check-subscription Lambda logs
MSYS_NO_PATHCONV=1 aws logs tail "/aws/lambda/amplify-amliq-kapil-sandb-checksubscriptionlambdaF-6og3QxoufdQJ" \
  --since 5m --region ap-southeast-2

# Set Cognito tier manually (for testing)
MSYS_NO_PATHCONV=1 aws cognito-idp admin-update-user-attributes \
  --user-pool-id ap-southeast-2_VQ5jADaPv \
  --username <USER_SUB> \
  --user-attributes Name=custom:subscription_tier,Value=pro \
  --region ap-southeast-2

# Reset user to free (for testing)
MSYS_NO_PATHCONV=1 aws cognito-idp admin-update-user-attributes \
  --user-pool-id ap-southeast-2_VQ5jADaPv \
  --username <USER_SUB> \
  --user-attributes Name=custom:subscription_tier,Value=free \
  --region ap-southeast-2
```

---

## Test Data

| Field | Value |
|-------|-------|
| Cognito User Pool | `ap-southeast-2_VQ5jADaPv` |
| App Client ID | `31etl7ceunn7p9g3gaipms8rhr` |
| Test User Sub | `a9ce34e8-8011-7003-1a34-a131acfbae0b` |
| Test User Email | `Kapildevvatsa@gmail.com` |
| API Gateway | `https://hl2mufk857.execute-api.ap-southeast-2.amazonaws.com/prod` |
| Stripe Test Card | `4242 4242 4242 4242` (any future exp, any CVC) |
| Stripe Test Card (decline) | `4000 0000 0000 0002` |
| Stripe Webhook Endpoint ID | `we_1T4KmPGkCjvFVRv2CdaWa9NO` |
