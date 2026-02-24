# T2C Monetization — Manual Setup Guide

> Step-by-step instructions for tasks that require human action: Stripe Dashboard, AWS Console, DNS configuration, and secrets management. Complete these in order — each section notes its dependencies.

---

## Table of Contents

1. [Stripe Account Setup](#1-stripe-account-setup)
2. [Stripe Products & Prices](#2-stripe-products--prices)
3. [Stripe Payment Links](#3-stripe-payment-links)
4. [Stripe Customer Portal](#4-stripe-customer-portal)
5. [Stripe Built-in Emails](#5-stripe-built-in-emails)
6. [Stripe Webhooks](#6-stripe-webhooks)
7. [Stripe Tax (Optional)](#7-stripe-tax-optional)
8. [Cognito Custom Attributes](#8-cognito-custom-attributes)
9. [Cognito App Client — Enable Code Grant](#9-cognito-app-client--enable-code-grant)
10. [SES Domain Verification](#10-ses-domain-verification)
11. [Plausible Analytics](#11-plausible-analytics)
12. [Lambda Environment Variables](#12-lambda-environment-variables)
13. [End-to-End Testing](#13-end-to-end-testing)
14. [Go-Live Checklist](#14-go-live-checklist)

---

## 1. Stripe Account Setup

**When:** Before any other Stripe step.

### Steps

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account with your business email
3. Complete business verification:
   - **Country:** Australia
   - **Currency:** AUD (Australian Dollars)
   - **Business type:** Sole trader / Individual (or your actual structure)
   - **Business name:** Tranche 2 Compliance (or your registered name)
   - **Website:** `https://www.tranche2compliance.com.au`
4. Verify your identity (photo ID + address proof)
5. Add a bank account for payouts (Australian bank, BSB + account number)

### After Setup

- Note your **Dashboard URL**: `https://dashboard.stripe.com`
- You will start in **Test mode** (toggle in top-right corner). Stay in test mode until you complete Section 13 (testing).
- Copy your **test API keys** from Developers → API keys:
  - **Publishable key:** `pk_test_...` (not needed for Payment Links approach, but good to note)
  - **Secret key:** `sk_test_...` → save this securely, needed for Lambda env var

---

## 2. Stripe Products & Prices

**When:** After Stripe account is active.
**Where:** Stripe Dashboard → Products

### Product 1: Pro Monthly

1. Click **+ Add product**
2. Fill in:
   - **Name:** `T2C Pro Monthly`
   - **Description:** `Full access to all T2C compliance tools, forms, and PDF generation`
   - **Pricing model:** Standard pricing
   - **Price:** `$29.00 AUD`
   - **Billing period:** Monthly
   - **Free trial:** 14 days
3. Click **Save product**
4. Note the **Price ID:** `price_...` (visible on the product detail page under Pricing)

### Product 2: Pro Annual

1. Click **+ Add product**
2. Fill in:
   - **Name:** `T2C Pro Annual`
   - **Description:** `Full access to all T2C compliance tools — save 30% with annual billing`
   - **Pricing model:** Standard pricing
   - **Price:** `$249.00 AUD`
   - **Billing period:** Yearly
   - **Free trial:** 14 days
3. Click **Save product**
4. Note the **Price ID:** `price_...`

### Product 3: AML/CTF Program PDF (One-Time)

1. Click **+ Add product**
2. Fill in:
   - **Name:** `AML/CTF Program PDF`
   - **Description:** `One-time purchase — generate your complete AML/CTF program document as a PDF`
   - **Pricing model:** Standard pricing
   - **Price:** `$149.00 AUD`
   - **Billing period:** One time
   - **Free trial:** None
3. Click **Save product**
4. Note the **Price ID:** `price_...`

### Record Your Price IDs

```
Pro Monthly Price ID:  price_________________________
Pro Annual Price ID:   price_________________________
PDF One-Time Price ID: price_________________________
```

---

## 3. Stripe Payment Links

**When:** After products are created (Section 2).
**Where:** Stripe Dashboard → Payment Links (or Product → Create payment link)

### Payment Link 1: Pro Monthly

1. Go to **Payment Links** → **+ New**
2. Select product: **T2C Pro Monthly** ($29/mo)
3. Configure:
   - **Type:** Subscription
   - **Free trial:** 14 days (should inherit from price)
   - **Allow promotion codes:** Yes (optional, for founder pricing)
   - **Collect customer address:** No (unless needed for tax)
   - **After payment → Redirect:** `https://www.tranche2compliance.com.au/real-estate.html?checkout_success=1`
     > Note: This redirect works for all entity types since subscription.js checks the URL param on any dashboard page. If you want entity-specific redirects, you can update later.
4. Under **Advanced settings** (if available):
   - Ensure `client_reference_id` is supported (Payment Links pass this from URL params automatically)
5. Click **Create link**
6. Copy the URL: `https://buy.stripe.com/...`

### Payment Link 2: Pro Annual

1. Same steps as above, select **T2C Pro Annual** ($249/yr)
2. Same redirect URL: `https://www.tranche2compliance.com.au/real-estate.html?checkout_success=1`
3. Copy the URL: `https://buy.stripe.com/...`

### Payment Link 3: PDF One-Time

1. Same steps, select **AML/CTF Program PDF** ($149)
2. Same redirect URL
3. Copy the URL: `https://buy.stripe.com/...`

### Record Your Payment Link URLs

```
Pro Monthly Link:  https://buy.stripe.com/________________________
Pro Annual Link:   https://buy.stripe.com/________________________
PDF One-Time Link: https://buy.stripe.com/________________________
```

### Update Code

After creating these links, update the placeholder URLs in `js/subscription.js`:

```javascript
const PAYMENT_LINKS = {
  pro_monthly: 'https://buy.stripe.com/YOUR_MONTHLY_LINK',
  pro_annual:  'https://buy.stripe.com/YOUR_ANNUAL_LINK',
  pdf_onetime: 'https://buy.stripe.com/YOUR_PDF_LINK',
};
```

---

## 4. Stripe Customer Portal

**When:** After Stripe account is active.
**Where:** Stripe Dashboard → Settings → Billing → Customer portal

### Steps

1. Go to **Settings** → **Billing** → **Customer portal**
2. Configure these options:

   **Subscriptions:**
   - Allow customers to switch plans: **Yes**
   - Allow customers to cancel: **Yes**
   - Cancellation: **Cancel immediately** (or end of period — your choice)
   - Proration: **Always prorate** (for plan switches)

   **Payment methods:**
   - Allow customers to update payment methods: **Yes**

   **Invoices:**
   - Allow customers to view invoice history: **Yes**

   **Business information:**
   - Business name: `Tranche 2 Compliance`
   - Terms of service URL: `https://www.tranche2compliance.com.au/terms.html`
   - Privacy policy URL: `https://www.tranche2compliance.com.au/privacy.html`

3. Click **Save**

### Customer Portal Link

The Customer Portal link is generated dynamically via Stripe API, but for our static site approach, users access it via:

```
https://billing.stripe.com/p/login/YOUR_PORTAL_LINK
```

You can find this under **Settings → Billing → Customer portal → Link**. Copy it and update `js/subscription.js`:

```javascript
const CUSTOMER_PORTAL_URL = 'https://billing.stripe.com/p/login/YOUR_PORTAL_LINK';
```

---

## 5. Stripe Built-in Emails

**When:** After Stripe account is active.
**Where:** Stripe Dashboard → Settings

### Enable Customer Emails

1. Go to **Settings** → **Customer emails** (under Branding)
2. Enable:
   - **Successful payments:** On — sends receipt after each payment
   - **Refunds:** On — confirms refunds to customers

### Enable Subscription Emails

1. Go to **Settings** → **Billing** → **Subscriptions and emails**
2. Enable:
   - **Upcoming renewals:** On — reminds customers before renewal
   - **Payment failures:** On — notifies of failed charges
   - **Trial ending reminders:** On (7 days before trial ends)
   - **Expiring cards:** On — prompts customers to update payment method

### Customise Email Branding (Optional)

1. Go to **Settings** → **Branding** → **Emails**
2. Set:
   - **From name:** `Tranche 2 Compliance`
   - **Reply-to email:** `support@tranche2compliance.com.au`
   - **Brand color:** `#1e3a5f` (matches T2C brand)
   - **Logo:** Upload `logo.png`

---

## 6. Stripe Webhooks

**When:** After Stripe account is active AND after Lambda + API Gateway are deployed.
**Where:** Stripe Dashboard → Developers → Webhooks

### Steps

1. Go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Configure:
   - **Endpoint URL:** `https://api.tranche2compliance.com.au/webhook/stripe`
     > If using API Gateway's default URL instead of a custom domain:
     > `https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/prod/webhook/stripe`
     > (Get this URL from AWS Console after deploying API Gateway)
   - **Description:** `T2C monetization webhook — updates Cognito user tier`
   - **Listen to:** Select these specific events:
     - `checkout.session.completed`
     - `customer.subscription.deleted`
     - `customer.subscription.updated`
4. Click **Add endpoint**
5. On the endpoint detail page, click **Reveal** under Signing secret
6. Copy the **Webhook signing secret:** `whsec_...`

### Record Your Webhook Secret

```
Webhook Signing Secret: whsec_________________________
```

This secret is needed for the `stripe-webhook` Lambda environment variable (Section 12).

### Testing Webhooks

After deployment, use the **Send test webhook** button on the endpoint page to verify connectivity. Stripe will show delivery status (success/failure) and response codes.

---

## 7. Stripe Tax (Optional)

**When:** When revenue approaches $75,000 AUD annually (GST registration threshold).
**Where:** Stripe Dashboard → Settings → Tax

### Steps

1. Go to **Settings** → **Tax**
2. Click **Get started**
3. Configure:
   - **Origin address:** Your Australian business address
   - **Tax registrations:** Add `Australia — GST` (10%)
   - **Product tax codes:** `txcd_10000000` (General — software) for all 3 products
4. Enable **Automatic tax calculation** on:
   - Subscriptions
   - One-time payments

> Skip this until you approach $75K AUD revenue. Stripe handles the calculation and reporting automatically once enabled.

---

## 8. Cognito Custom Attributes

**When:** Before deploying the updated `amplify/auth/resource.ts`.
**Where:** AWS Console or AWS CLI

### Option A: AWS CLI (Recommended)

First, find your User Pool ID:

```bash
# List user pools to find yours
aws cognito-idp list-user-pools --max-results 10 --region ap-southeast-2
```

Look for the pool named `t2c-prod-amliq` (or similar). Note the **Id** (format: `ap-southeast-2_XXXXX`).

Then add the custom attributes:

```bash
aws cognito-idp add-custom-attributes \
  --user-pool-id ap-southeast-2_XXXXX \
  --custom-attributes \
    Name=subscription_tier,AttributeDataType=String,Mutable=true \
    Name=stripe_customer_id,AttributeDataType=String,Mutable=true \
    Name=pdf_purchased,AttributeDataType=String,Mutable=true \
  --region ap-southeast-2
```

### Option B: AWS Console

1. Go to **AWS Console** → **Cognito** → **User pools**
2. Select your user pool (`t2c-prod-amliq-...`)
3. Go to **Sign-up experience** tab
4. Under **Custom attributes**, click **Add custom attribute** for each:

   | Name | Type | Min | Max | Mutable |
   |------|------|-----|-----|---------|
   | `subscription_tier` | String | 0 | 256 | Yes |
   | `stripe_customer_id` | String | 0 | 256 | Yes |
   | `pdf_purchased` | String | 0 | 256 | Yes |

5. Click **Save changes**

### Verify

```bash
aws cognito-idp describe-user-pool \
  --user-pool-id ap-southeast-2_XXXXX \
  --region ap-southeast-2 \
  --query 'UserPool.SchemaAttributes[?starts_with(Name, `custom:`)]'
```

You should see `custom:subscription_tier`, `custom:stripe_customer_id`, and `custom:pdf_purchased` in the output.

### Important: App Client Read/Write Permissions

The app client must have read and write access to these custom attributes:

1. Go to **Cognito** → **User pools** → your pool → **App integration** tab
2. Click on your app client (`31etl7ceunn7p9g3gaipms8rhr`)
3. Under **Attribute read and write permissions**, ensure:
   - **Read:** `custom:subscription_tier`, `custom:stripe_customer_id`, `custom:pdf_purchased` are checked
   - **Write:** Only the Lambda needs write access (via `AdminUpdateUserAttributes` IAM policy). The app client does NOT need write access to these.

### Record Your User Pool ID

```
Cognito User Pool ID: ap-southeast-2_________________________
```

---

## 9. Cognito App Client — Enable Code Grant

**When:** Before the PKCE auth migration (Step 12 in implementation plan).
**Where:** AWS Console → Cognito

### Steps

1. Go to **AWS Console** → **Cognito** → **User pools** → your pool
2. Go to **App integration** tab
3. Click on your app client (`31etl7ceunn7p9g3gaipms8rhr`)
4. Under **Hosted UI**:
   - **Allowed OAuth Flows:** Check **Authorization code grant** (keep **Implicit grant** checked temporarily for backward compatibility)
   - **Allowed OAuth Scopes:** Ensure `email`, `openid`, `profile` are all checked
5. Under **Callback URLs**, ensure all existing URLs are present:
   ```
   https://www.tranche2compliance.com.au/
   https://www.tranche2compliance.com.au/real-estate.html
   https://www.tranche2compliance.com.au/accountants.html
   https://www.tranche2compliance.com.au/jewellers.html
   ```
   Add the pricing page callback:
   ```
   https://www.tranche2compliance.com.au/pricing.html
   ```
6. Click **Save changes**

### After PKCE Migration is Deployed

Once the new auth code is deployed and tested, you can remove the **Implicit grant** checkbox to fully disable the deprecated flow. Do this only after verifying PKCE works in production.

---

## 10. SES Domain Verification

**When:** Before Phase 2 welcome email implementation.
**Where:** AWS Console → SES (ap-southeast-2 region)

### Step 1: Verify Domain

```bash
aws ses verify-domain-identity \
  --domain tranche2compliance.com.au \
  --region ap-southeast-2
```

This returns a **TXT record** value. Add it to your DNS:

| Type | Name | Value |
|------|------|-------|
| TXT | `_amazonses.tranche2compliance.com.au` | (value from command output) |

### Step 2: Set Up DKIM

```bash
aws ses verify-domain-dkim \
  --domain tranche2compliance.com.au \
  --region ap-southeast-2
```

This returns 3 DKIM tokens. Add 3 CNAME records to DNS:

| Type | Name | Value |
|------|------|-------|
| CNAME | `{token1}._domainkey.tranche2compliance.com.au` | `{token1}.dkim.amazonses.com` |
| CNAME | `{token2}._domainkey.tranche2compliance.com.au` | `{token2}.dkim.amazonses.com` |
| CNAME | `{token3}._domainkey.tranche2compliance.com.au` | `{token3}.dkim.amazonses.com` |

### Step 3: Request Production Access

SES starts in **sandbox mode** (can only send to verified emails). Request production access:

1. Go to **AWS Console** → **SES** → **Account dashboard**
2. Click **Request production access**
3. Fill in:
   - **Mail type:** Transactional
   - **Website URL:** `https://www.tranche2compliance.com.au`
   - **Use case description:**
     > "We send a one-time welcome email when users sign up for our AML/CTF compliance education platform. Volume: <100 emails/day initially. No marketing emails. Unsubscribe not required as this is a transactional welcome email triggered by account creation."
4. Submit. Approval typically takes 24 hours.

### Step 4: Set Up SPF + DMARC (Recommended)

Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| TXT | `tranche2compliance.com.au` | `v=spf1 include:amazonses.com ~all` |
| TXT | `_dmarc.tranche2compliance.com.au` | `v=DMARC1; p=quarantine; rua=mailto:admin@tranche2compliance.com.au` |

### Verify

```bash
aws ses get-identity-verification-attributes \
  --identities tranche2compliance.com.au \
  --region ap-southeast-2
```

Status should be `Success`.

---

## 11. Plausible Analytics

**When:** Before Phase 2 analytics implementation.
**Where:** [https://plausible.io](https://plausible.io)

### Steps

1. Go to [https://plausible.io/register](https://plausible.io/register)
2. Create an account (30-day free trial, then $9/mo for <10K monthly pageviews)
3. Add your site:
   - **Domain:** `tranche2compliance.com.au`
4. Plausible provides a script tag (already in the code):
   ```html
   <script defer data-domain="tranche2compliance.com.au"
     src="https://plausible.io/js/script.js"></script>
   ```
5. Configure **Goals** for custom event tracking:
   - Go to **Site Settings** → **Goals**
   - Add custom events:
     - `Signup`
     - `Login`
     - `Upgrade_Clicked`
     - `Checkout_Started`
     - `Pro_Active`
     - `PDF_Purchased`
     - `PDF_Generated`
     - `Form_Saved`
     - `Quiz_Completed`
     - `Feature_Gated`

> Plausible is privacy-first: no cookies, no personal data, GDPR/AU Privacy Act compliant. No cookie banner needed.

---

## 12. Lambda Environment Variables

**When:** After Lambda functions are deployed.
**Where:** AWS Console → Lambda (or via Amplify config)

### stripe-webhook Lambda

| Variable | Value | Source |
|----------|-------|--------|
| `STRIPE_SECRET_KEY` | `sk_test_...` (test) or `sk_live_...` (production) | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Section 6 above |
| `COGNITO_USER_POOL_ID` | `ap-southeast-2_XXXXX` | Section 8 above |

### check-subscription Lambda

| Variable | Value | Source |
|----------|-------|--------|
| `COGNITO_USER_POOL_ID` | `ap-southeast-2_XXXXX` | Section 8 above |

### How to Set (AWS Console)

1. Go to **AWS Console** → **Lambda**
2. Select the function (e.g., `stripe-webhook`)
3. Go to **Configuration** → **Environment variables**
4. Click **Edit**
5. Add each key-value pair
6. Click **Save**

### How to Set (Amplify)

If using Amplify's function definitions, environment variables can be set in the function's `resource.ts` file or via Amplify's secret management:

```bash
# Using Amplify secrets (recommended for production)
npx ampx secret set STRIPE_SECRET_KEY
npx ampx secret set STRIPE_WEBHOOK_SECRET
```

> **SECURITY:** Never commit secret keys to git. Use environment variables or Amplify secrets only. The `STRIPE_SECRET_KEY` must NEVER appear in client-side code.

---

## 13. End-to-End Testing

**When:** After all code is deployed (Phase 1 complete).
**Where:** Browser + Stripe Dashboard (test mode)

### Prerequisites

- Stripe is in **test mode** (toggle in Dashboard top-right)
- All Lambda functions deployed with **test** environment variables
- Webhook endpoint registered in Stripe (Section 6)

### Test Cards

| Card | Number | Use |
|------|--------|-----|
| Success | `4242 4242 4242 4242` | Happy path |
| Decline | `4000 0000 0000 0002` | Payment failure |
| 3D Secure | `4000 0025 0000 3155` | Authentication required |
| Insufficient funds | `4000 0000 0000 9995` | Specific decline |

Use any future expiry date, any 3-digit CVC, any name/postal code.

### Test Scenarios

#### Test 1: Free User Experience
1. Log in with a new account
2. Navigate to a Pro section (e.g., Risk Assessment)
3. **Expected:** See locked overlay with upgrade CTA
4. Verify free sections (Dashboard, Am I Regulated, etc.) work normally

#### Test 2: Pro Monthly Subscription
1. Click "Upgrade to Pro" on the locked overlay
2. Choose Monthly ($29/mo)
3. **Expected:** Redirect to Stripe Payment Link with prefilled email
4. Enter test card `4242 4242 4242 4242`
5. Complete checkout
6. **Expected:** Redirect back to dashboard with `?checkout_success=1`
7. **Expected:** See "Activating your subscription..." spinner
8. **Expected:** Within 10 seconds, all Pro sections unlock
9. Check Stripe Dashboard → Customers — verify customer has `cognito_user_id` in metadata

#### Test 3: One-Time PDF Purchase
1. Log in with a different free account
2. Navigate to Program Builder
3. Click "Generate PDF"
4. **Expected:** See upgrade prompt with PDF purchase option ($149)
5. Click "Buy PDF"
6. Complete checkout with test card
7. **Expected:** Redirect back, PDF generation now works
8. Verify Risk Assessment and other Pro sections are still locked (PDF purchase only unlocks PDF)

#### Test 4: Customer Portal
1. Log in as a Pro subscriber (from Test 2)
2. Click "Manage Subscription" in sidebar
3. **Expected:** Opens Stripe Customer Portal
4. Verify you can: view invoices, update payment method, switch to annual, cancel

#### Test 5: Subscription Cancellation
1. In Customer Portal, cancel the subscription
2. **Expected:** Stripe sends `customer.subscription.deleted` webhook
3. Return to T2C dashboard
4. Log out and log back in (to get fresh JWT)
5. **Expected:** Pro sections are now locked again

#### Test 6: Webhook Idempotency
1. Go to Stripe Dashboard → Developers → Webhooks → your endpoint
2. Find a recent `checkout.session.completed` event
3. Click **Resend** to deliver it again
4. **Expected:** No error, no duplicate side effects (Cognito update is naturally idempotent)

#### Test 7: PKCE Auth Flow
1. Log out
2. Log in — verify redirect goes to Cognito Hosted UI
3. **Expected:** URL contains `response_type=code` and `code_challenge`
4. After login, **Expected:** Callback URL contains `?code=...` (not `#id_token=...`)
5. **Expected:** Token exchange happens automatically, user is logged in
6. Check sessionStorage — should have `amliq_id_token` and `amliq_refresh_token`

#### Test 8: Pricing Page (Unauthenticated)
1. Open `pricing.html` in an incognito window (not logged in)
2. Click "Start Free Trial" on Pro Monthly
3. **Expected:** Redirects to Cognito signup/login page
4. After signup/login, **Expected:** Redirects back to pricing page and opens Payment Link

#### Test 9: Trial Expiry Email
1. Go to Stripe Dashboard → Customers
2. Find your test customer
3. Go to their subscription → click the clock icon to **advance trial**
4. Advance to 7 days before trial end
5. **Expected:** Stripe sends trial ending reminder email (if built-in emails are enabled)

### Verify Webhook Delivery

After each test, check:
1. **Stripe Dashboard → Developers → Webhooks → your endpoint → Recent events**
2. Verify all events show **200 OK** status
3. If any show errors, click to see the response body and Lambda logs

### Check Lambda Logs

```bash
aws logs tail /aws/lambda/stripe-webhook --follow --region ap-southeast-2
aws logs tail /aws/lambda/check-subscription --follow --region ap-southeast-2
```

---

## 14. Go-Live Checklist

**When:** After all tests pass in test mode.

### Pre-Launch

- [ ] All test scenarios in Section 13 pass
- [ ] Stripe account fully verified (identity + bank account)
- [ ] SES domain verified and production access approved (for welcome email)
- [ ] DNS records set: DKIM, SPF, DMARC
- [ ] Plausible Analytics account active

### Switch to Live Mode

1. **Stripe Dashboard:** Toggle from "Test mode" to "Live mode" (top-right corner)
2. **Copy live API keys:**
   - **Live Secret Key:** `sk_live_...` → update Lambda env var
   - **Live Publishable Key:** `pk_live_...` (not needed for Payment Links, but note it)
3. **Create live products + Payment Links:**
   - Test mode products do NOT carry over to live mode
   - Repeat Section 2 (Products) and Section 3 (Payment Links) in live mode
   - Update `js/subscription.js` with live Payment Link URLs
4. **Create live webhook endpoint:**
   - Repeat Section 6 (Webhooks) in live mode
   - Update Lambda env var with live `whsec_...`
5. **Verify live webhook connectivity:**
   - Send a test event from Stripe Dashboard
   - Check Lambda logs for successful processing

### Post-Launch Monitoring

- [ ] Monitor Stripe Dashboard → Webhooks for delivery failures
- [ ] Monitor CloudWatch Logs for Lambda errors
- [ ] Verify first real customer checkout flows through successfully
- [ ] Check Plausible for page views and events
- [ ] Verify welcome emails are delivering (check SES sending statistics)

### Rollback Plan

If issues arise:
1. **Disable Payment Links:** Delete or deactivate them in Stripe Dashboard
2. **Feature gating:** Set `window.T2C_TIER = 'pro'` globally in subscription.js as an emergency override to unlock all features
3. **Webhook issues:** Stripe retries failed webhooks for up to 3 days — fix the Lambda and webhooks will catch up
4. **Auth issues (PKCE):** Revert auth.js to implicit grant if PKCE causes problems (keep Cognito app client configured for both during transition)

---

## Quick Reference: All Secrets & IDs

Keep this filled in securely (do NOT commit to git):

```
Stripe Secret Key (test):     sk_test_________________________
Stripe Secret Key (live):     sk_live_________________________
Stripe Webhook Secret (test): whsec_________________________
Stripe Webhook Secret (live): whsec_________________________
Cognito User Pool ID:         ap-southeast-2_________________________
Cognito App Client ID:        31etl7ceunn7p9g3gaipms8rhr

Payment Link — Pro Monthly:   https://buy.stripe.com/________________________
Payment Link — Pro Annual:    https://buy.stripe.com/________________________
Payment Link — PDF One-Time:  https://buy.stripe.com/________________________
Customer Portal Link:         https://billing.stripe.com/p/login/________________________

Plausible Domain:             tranche2compliance.com.au
SES Verified Domain:          tranche2compliance.com.au
API Gateway URL:              https://xxxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/prod
```
