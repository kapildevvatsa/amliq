# T2C-Master User Pool — Complete Setup Guide

> **Goal:** Create a new Cognito User Pool with the `t2c-master` prefix, dedicated to the `master` branch deployment, fully isolated from the current production pool (`ap-southeast-2_VQ5jADaPv`).

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [AWS Cognito — New User Pool](#2-aws-cognito--new-user-pool)
3. [AWS Cognito — App Client](#3-aws-cognito--app-client)
4. [AWS Cognito — Hosted UI Domain](#4-aws-cognito--hosted-ui-domain)
5. [AWS Cognito — Custom Attributes](#5-aws-cognito--custom-attributes)
6. [AWS Cognito — Lambda Triggers](#6-aws-cognito--lambda-triggers)
7. [Amplify Backend — backend.ts](#7-amplify-backend--backendts)
8. [Amplify Backend — auth/resource.ts](#8-amplify-backend--authresourcets)
9. [Amplify Backend — Lambda Environment Variables](#9-amplify-backend--lambda-environment-variables)
10. [Frontend — js/auth.js](#10-frontend--jsauthjs)
11. [Frontend — js/auth-landing.js](#11-frontend--jsauth-landingjs)
12. [Frontend — js/subscription.js](#12-frontend--jssubscriptionjs)
13. [Stripe — New Webhook Endpoint](#13-stripe--new-webhook-endpoint)
14. [Stripe — New Payment Links](#14-stripe--new-payment-links)
15. [Stripe — Customer Portal](#15-stripe--customer-portal)
16. [Stripe — Amplify Secrets](#16-stripe--amplify-secrets)
17. [API Gateway — New Endpoint](#17-api-gateway--new-endpoint)
18. [AWS SES — Email Sender](#18-aws-ses--email-sender)
19. [Amplify Hosting — Branch Config](#19-amplify-hosting--branch-config)
20. [Validation Script Update](#20-validation-script-update)
21. [Documentation Updates](#21-documentation-updates)
22. [Migration Checklist](#22-migration-checklist)
23. [Rollback Plan](#23-rollback-plan)

---

## 1. Architecture Overview

### Current Architecture (Production)

```
                        ┌──────────────────────────────────┐
                        │   EXTERNAL Production User Pool   │
                        │   ap-southeast-2_VQ5jADaPv        │
                        │   Domain: t2c-prod-amliq-53314    │
                        │   Client: 31etl7ceunn7p9g3...     │
                        └────────────┬─────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
    ┌──────▼──────┐           ┌──────▼──────┐          ┌───────▼──────┐
    │  auth.js    │           │  stripe-    │          │  check-      │
    │  auth-      │           │  webhook    │          │  subscription│
    │  landing.js │           │  Lambda     │          │  Lambda      │
    └─────────────┘           └──────┬──────┘          └──────┬───────┘
                                     │                        │
                              ┌──────▼──────┐          ┌──────▼───────┐
                              │  Stripe     │          │  API Gateway │
                              │  Webhooks   │          │  hl2mufk857  │
                              └─────────────┘          └──────────────┘
```

### Target Architecture (Master Branch)

```
                        ┌──────────────────────────────────┐
                        │   NEW Master User Pool            │
                        │   ap-southeast-2_XXXXXXXXX        │  ← TO BE CREATED
                        │   Domain: t2c-master              │
                        │   Client: XXXXXXXXXXXXXXXXX       │
                        └────────────┬─────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │                         │                         │
    ┌──────▼──────┐           ┌──────▼──────┐          ┌───────▼──────┐
    │  auth.js    │           │  stripe-    │          │  check-      │
    │  (updated)  │           │  webhook    │          │  subscription│
    │             │           │  (new pool) │          │  (new pool)  │
    └─────────────┘           └──────┬──────┘          └──────┬───────┘
                                     │                        │
                              ┌──────▼──────┐          ┌──────▼───────┐
                              │  Stripe     │          │  API Gateway │
                              │  (new hook) │          │  (new URL)   │
                              └─────────────┘          └──────────────┘
```

### Key Principle

The `master` branch will get its **own isolated Cognito User Pool** so that:
- Users in master are completely separate from production users
- Stripe webhooks route to the correct pool
- Auth tokens are issued by the master pool
- No cross-contamination between environments

---

## 2. AWS Cognito — New User Pool

### Action: Create in AWS Console (or CLI)

**Console:** AWS Console → Cognito → User Pools → Create User Pool

| Setting | Value |
|---------|-------|
| Pool name | `t2c-master` |
| Region | `ap-southeast-2` |
| Sign-in options | Email |
| MFA | None |
| Password policy | Min 8, require lowercase + uppercase + numbers + symbols |
| Self-service sign-up | Enabled |
| Required attributes | `email` |
| Verification | Email (send code) |
| Email provider | Cognito default (or SES if configured) |

### CLI Alternative

```bash
aws cognito-idp create-user-pool \
  --pool-name "t2c-master" \
  --region ap-southeast-2 \
  --auto-verified-attributes email \
  --username-attributes email \
  --policies '{
    "PasswordPolicy": {
      "MinimumLength": 8,
      "RequireUppercase": true,
      "RequireLowercase": true,
      "RequireNumbers": true,
      "RequireSymbols": true
    }
  }' \
  --schema '[
    {"Name":"email","Required":true,"Mutable":true,"AttributeDataType":"String"},
    {"Name":"given_name","Required":false,"Mutable":true,"AttributeDataType":"String"},
    {"Name":"family_name","Required":false,"Mutable":true,"AttributeDataType":"String"}
  ]'
```

**Output:** Note the `UserPoolId` (e.g., `ap-southeast-2_XXXXXXXXX`) — you'll need this everywhere.

---

## 3. AWS Cognito — App Client

### Action: Create App Client in the new pool

**Console:** Cognito → t2c-master pool → App integration → Create app client

| Setting | Value |
|---------|-------|
| App client name | `t2c-master-web` |
| Client type | Public client (no secret) |
| Auth flows | `ALLOW_USER_SRP_AUTH`, `ALLOW_REFRESH_TOKEN_AUTH` |
| OAuth grant types | Authorization code grant |
| Scopes | `email`, `openid`, `profile` |
| Callback URLs | See table below |
| Sign-out URLs | See table below |

### Callback URLs to Register

```
https://master.d348r0hmzvjji4.amplifyapp.com/
https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html
https://master.d348r0hmzvjji4.amplifyapp.com/accountants.html
https://master.d348r0hmzvjji4.amplifyapp.com/jewellers.html
https://master.d348r0hmzvjji4.amplifyapp.com/pricing.html
```

> **Note:** If the master branch also serves at a custom domain (e.g., `master.tranche2compliance.com.au`), add those URLs too. Also add `http://localhost:5500/` and similar for local development if needed.

### Sign-out URLs

```
https://master.d348r0hmzvjji4.amplifyapp.com/
```

**Output:** Note the `App Client ID` (e.g., `XXXXXXXXXXXXXXXXXXXXXXXXXX`).

---

## 4. AWS Cognito — Hosted UI Domain

### Action: Configure Cognito domain

**Console:** Cognito → t2c-master pool → App integration → Domain

| Setting | Value |
|---------|-------|
| Domain type | Cognito domain |
| Domain prefix | `t2c-master` |

This creates: `t2c-master.auth.ap-southeast-2.amazoncognito.com`

**Full URLs:**
- Login: `https://t2c-master.auth.ap-southeast-2.amazoncognito.com/login`
- Signup: `https://t2c-master.auth.ap-southeast-2.amazoncognito.com/signup`
- Token: `https://t2c-master.auth.ap-southeast-2.amazoncognito.com/oauth2/token`

---

## 5. AWS Cognito — Custom Attributes

### Action: Add custom attributes to the new pool

**Console:** Cognito → t2c-master pool → Sign-up experience → Custom attributes → Add

| Attribute | Data Type | Mutable |
|-----------|-----------|---------|
| `custom:subscription_tier` | String | Yes |
| `custom:stripe_customer_id` | String | Yes |
| `custom:pdf_purchased` | String | Yes |

### CLI

```bash
POOL_ID="ap-southeast-2_XXXXXXXXX"  # Replace with actual new pool ID

aws cognito-idp add-custom-attributes \
  --user-pool-id $POOL_ID \
  --region ap-southeast-2 \
  --custom-attributes \
    Name=subscription_tier,AttributeDataType=String,Mutable=true \
    Name=stripe_customer_id,AttributeDataType=String,Mutable=true \
    Name=pdf_purchased,AttributeDataType=String,Mutable=true
```

> **IMPORTANT:** Custom attributes cannot be removed or renamed once created. Double-check names before proceeding.

---

## 6. AWS Cognito — Lambda Triggers

### Action: Wire the post-confirmation Lambda trigger

After deploying the Amplify backend (step 7), the post-confirmation Lambda will be created. You'll need to either:

**Option A (Amplify-managed):** The `defineAuth` trigger in `auth/resource.ts` handles this automatically for the Amplify-managed pool. But since we're using an **external** pool, you must wire it manually.

**Option B (Manual — Console):**
1. Cognito → t2c-master pool → User pool properties → Lambda triggers
2. Post confirmation → Select the deployed `post-confirmation` Lambda
3. Save

**Option C (CLI):**
```bash
aws cognito-idp update-user-pool \
  --user-pool-id $POOL_ID \
  --region ap-southeast-2 \
  --lambda-config PostConfirmation=arn:aws:lambda:ap-southeast-2:ACCOUNT_ID:function:POST_CONFIRMATION_LAMBDA_NAME
```

> **Note:** The Lambda needs `lambda:InvokeFunction` permission from Cognito. Add a resource-based policy:
> ```bash
> aws lambda add-permission \
>   --function-name POST_CONFIRMATION_LAMBDA_NAME \
>   --statement-id CognitoPostConfirmation \
>   --action lambda:InvokeFunction \
>   --principal cognito-idp.amazonaws.com \
>   --source-arn arn:aws:cognito-idp:ap-southeast-2:ACCOUNT_ID:userpool/$POOL_ID
> ```

---

## 7. Amplify Backend — backend.ts

### File: `amplify/backend.ts`

### Changes Required

**Line 27 — Update EXTERNAL_USER_POOL_ID:**

```typescript
// BEFORE:
const EXTERNAL_USER_POOL_ID = 'ap-southeast-2_VQ5jADaPv';

// AFTER:
const EXTERNAL_USER_POOL_ID = 'ap-southeast-2_XXXXXXXXX';  // t2c-master pool ID
```

**Lines 27-28 — The ARN updates automatically** (it derives from `EXTERNAL_USER_POOL_ID`):
```typescript
const EXTERNAL_USER_POOL_ARN = `arn:aws:cognito-idp:ap-southeast-2:${Stack.of(backend.auth.resources.userPool).account}:userpool/${EXTERNAL_USER_POOL_ID}`;
```

No other changes needed in this file — the IAM policies, API Gateway authorizer, and environment variable injection all reference `EXTERNAL_USER_POOL_ID` dynamically.

---

## 8. Amplify Backend — auth/resource.ts

### File: `amplify/auth/resource.ts`

### Changes Required

**Lines 8-17 — Update callback/logout URLs for master branch:**

```typescript
// BEFORE:
callbackUrls: [
  'https://www.tranche2compliance.com.au/',
  'https://www.tranche2compliance.com.au/real-estate.html',
  'https://www.tranche2compliance.com.au/accountants.html',
  'https://www.tranche2compliance.com.au/jewellers.html',
  'https://www.tranche2compliance.com.au/pricing.html',
],
logoutUrls: [
  'https://www.tranche2compliance.com.au/',
],

// AFTER:
callbackUrls: [
  'https://master.d348r0hmzvjji4.amplifyapp.com/',
  'https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html',
  'https://master.d348r0hmzvjji4.amplifyapp.com/accountants.html',
  'https://master.d348r0hmzvjji4.amplifyapp.com/jewellers.html',
  'https://master.d348r0hmzvjji4.amplifyapp.com/pricing.html',
],
logoutUrls: [
  'https://master.d348r0hmzvjji4.amplifyapp.com/',
],
```

> **Note:** This configures the **Amplify-managed** pool's OAuth. The external pool (t2c-master) must be configured separately in the AWS Console (step 3).

---

## 9. Amplify Backend — Lambda Environment Variables

### File: `amplify/functions/check-subscription/resource.ts`

### Changes Required

**Lines 10-13 — Update ALLOWED_ORIGINS:**

```typescript
// BEFORE:
environment: {
  ALLOWED_ORIGINS: [
    'https://www.tranche2compliance.com.au',
    'https://master.d348r0hmzvjji4.amplifyapp.com',
  ].join(','),
},

// AFTER:
environment: {
  ALLOWED_ORIGINS: [
    'https://master.d348r0hmzvjji4.amplifyapp.com',
  ].join(','),
},
```

> **Why:** The master branch check-subscription Lambda should only accept requests from the master Amplify domain. Remove the production domain to enforce isolation.

### No changes needed for:
- `amplify/functions/stripe-webhook/resource.ts` — Secrets are environment-agnostic
- `amplify/functions/post-confirmation/resource.ts` — SES email is the same

---

## 10. Frontend — js/auth.js

### File: `js/auth.js`

### Changes Required

**Lines 2-8 — Update CONFIG object:**

```javascript
// BEFORE:
var CONFIG = {
  domain:      't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
  clientId:    '31etl7ceunn7p9g3gaipms8rhr',
  redirectUri: window.location.origin + window.location.pathname + window.location.search,
  logoutUri:   window.location.origin + '/',
  tokenEndpoint: 'https://t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
};

// AFTER:
var CONFIG = {
  domain:      't2c-master.auth.ap-southeast-2.amazoncognito.com',
  clientId:    'NEW_APP_CLIENT_ID_HERE',
  redirectUri: window.location.origin + window.location.pathname + window.location.search,
  logoutUri:   window.location.origin + '/',
  tokenEndpoint: 'https://t2c-master.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
};
```

> Replace `NEW_APP_CLIENT_ID_HERE` with the actual App Client ID from step 3.

---

## 11. Frontend — js/auth-landing.js

### File: `js/auth-landing.js`

### Changes Required

**Lines 2-8 — Update CONFIG object:**

```javascript
// BEFORE:
var CONFIG = {
  domain:    't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
  clientId:  '31etl7ceunn7p9g3gaipms8rhr',
  redirectUri: window.location.origin + '/',
  logoutUri:   window.location.origin + '/',
  tokenEndpoint: 'https://t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
};

// AFTER:
var CONFIG = {
  domain:    't2c-master.auth.ap-southeast-2.amazoncognito.com',
  clientId:  'NEW_APP_CLIENT_ID_HERE',
  redirectUri: window.location.origin + '/',
  logoutUri:   window.location.origin + '/',
  tokenEndpoint: 'https://t2c-master.auth.ap-southeast-2.amazoncognito.com/oauth2/token',
};
```

---

## 12. Frontend — js/subscription.js

### File: `js/subscription.js`

### Changes Required

**Lines 9-21 — Update payment links, portal URL, and API base URL:**

```javascript
// BEFORE:
PAYMENT_LINKS: {
  pro_monthly: 'https://buy.stripe.com/test_aFaaEXfyz9Uk68r0Cx00001',
  pro_annual:  'https://buy.stripe.com/test_9B65kDaef7MceEX70V00000',
  pdf_onetime: 'https://buy.stripe.com/test_dRmcN59ab7McgN55WR00002',
},
CUSTOMER_PORTAL_URL: 'https://billing.stripe.com/p/login/test_9B65kDaef7MceEX70V00000',
API_BASE_URL: 'https://hl2mufk857.execute-api.ap-southeast-2.amazonaws.com/prod',

// AFTER:
PAYMENT_LINKS: {
  pro_monthly: 'NEW_MONTHLY_PAYMENT_LINK_HERE',
  pro_annual:  'NEW_ANNUAL_PAYMENT_LINK_HERE',
  pdf_onetime: 'NEW_PDF_PAYMENT_LINK_HERE',
},
CUSTOMER_PORTAL_URL: 'NEW_CUSTOMER_PORTAL_LINK_HERE',
API_BASE_URL: 'NEW_API_GATEWAY_URL_HERE',
```

> **Why:** New payment links must be created that redirect back to the **master** branch URL (not production). The API Gateway URL will change after Amplify redeploys.

---

## 13. Stripe — New Webhook Endpoint

### Action: Create a new webhook in Stripe Dashboard

**Console:** Stripe Dashboard → Developers → Webhooks → Add endpoint

| Setting | Value |
|---------|-------|
| Endpoint URL | `https://NEW_API_GATEWAY_ID.execute-api.ap-southeast-2.amazonaws.com/prod/webhook/stripe` |
| Events to listen to | `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated` |
| Description | `t2c-master branch webhook` |

> **IMPORTANT:** The API Gateway URL is only known **after** deploying the Amplify backend. Deploy first, get the URL, then create the webhook.

**Output:** Note the **Webhook Signing Secret** (`whsec_...`) — needed for Amplify secrets (step 16).

### Decision: Same Stripe Account or Separate?

| Approach | Pros | Cons |
|----------|------|------|
| **Same Stripe account, separate webhook** | Simpler, shared products/prices | Must use different webhook endpoints; risk of accidentally using wrong keys |
| **Separate Stripe test/live modes** | Full isolation | Duplicate product setup |

**Recommendation:** Use the **same Stripe account** but create a **new webhook endpoint** pointing to the master branch's API Gateway. Use the same test API keys (`sk_test_...`) for now.

---

## 14. Stripe — New Payment Links

### Action: Create new payment links in Stripe Dashboard

**Console:** Stripe Dashboard → Payment Links → Create

You need **3 new payment links** with the success redirect URLs pointing to the **master branch domain**:

| Product | Success Redirect URL |
|---------|---------------------|
| T2C Pro Monthly ($29/mo) | `https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html?checkout_success=1` |
| T2C Pro Annual ($249/yr) | `https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html?checkout_success=1` |
| AML/CTF PDF ($149 one-time) | `https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html?checkout_success=1` |

For each payment link, enable:
- "Allow customers to adjust quantity" → No
- "Collect customer email" → Auto-fill
- Under Advanced → "Pass client_reference_id from URL" → Yes

**Output:** Note the 3 new `https://buy.stripe.com/...` URLs.

> **Note:** You can reuse the same Stripe Products/Prices — just create new Payment Links pointing to the master redirect URLs.

---

## 15. Stripe — Customer Portal

### Action: Create/update customer portal configuration

If using the same Stripe account, the existing customer portal should work. However, if you want a separate portal link for the master environment:

**Console:** Stripe Dashboard → Settings → Customer portal → create a new configuration

The portal link format is: `https://billing.stripe.com/p/login/XXXX`

Update `js/subscription.js` with the new portal link.

---

## 16. Stripe — Amplify Secrets

### Action: Set secrets for the master branch deployment

After deploying the Amplify backend for the master branch, set the secrets:

```bash
# Set the Stripe secret key (same test key if using same Stripe account)
npx ampx secret set STRIPE_SECRET_KEY
# Enter: sk_test_... (or sk_live_... for production)

# Set the NEW webhook signing secret from step 13
npx ampx secret set STRIPE_WEBHOOK_SECRET
# Enter: whsec_... (the NEW signing secret from the master webhook endpoint)
```

> **CRITICAL:** The `STRIPE_WEBHOOK_SECRET` must be the signing secret from the **new** webhook endpoint (step 13), NOT the old production one. Each webhook endpoint has its own signing secret.

### Branch-Specific Secrets

If using Amplify Gen 2 branch-based deployments, secrets are per-branch:

```bash
# For sandbox
npx ampx secret set STRIPE_SECRET_KEY --profile sandbox
npx ampx secret set STRIPE_WEBHOOK_SECRET --profile sandbox

# For branch deployment
npx ampx secret set STRIPE_SECRET_KEY --branch master
npx ampx secret set STRIPE_WEBHOOK_SECRET --branch master
```

---

## 17. API Gateway — New Endpoint

### Automatic via Amplify

The API Gateway is defined in `amplify/backend.ts` and is created automatically during `npx ampx deploy`. After deployment, Amplify outputs the new API Gateway URL.

### Post-Deployment Actions

1. Note the new API Gateway URL (format: `https://XXXXXXX.execute-api.ap-southeast-2.amazonaws.com/prod`)
2. Update `js/subscription.js` → `API_BASE_URL` with this URL
3. Create the Stripe webhook endpoint (step 13) using this URL + `/webhook/stripe`

---

## 18. AWS SES — Email Sender

### Check: SES Sender Verification

The `post-confirmation` Lambda sends emails from `noreply@tranche2compliance.com.au`.

**If SES is in sandbox mode:**
- Verify the sender email/domain in SES
- All recipient emails must also be verified in sandbox mode

**If SES is in production mode:**
- The domain `tranche2compliance.com.au` should already be verified
- No additional changes needed

### No code changes required — the email sender is the same across environments.

---

## 19. Amplify Hosting — Branch Config

### Check: Master branch deployment

Verify that the `master` branch is connected in Amplify Hosting:

**Console:** AWS Amplify → App → Hosting → Branch deployments

The master branch should be configured to:
- Auto-deploy on push to `master`
- Use the Amplify URL: `https://master.d348r0hmzvjji4.amplifyapp.com`

### Environment Variables in Amplify Hosting

If any environment variables are set at the Amplify Hosting level (not backend), verify them in:

**Console:** AWS Amplify → App → Hosting → Environment variables

---

## 20. Validation Script Update

### File: `scripts/validate-auth-hosted-ui.mjs`

### Changes Required

**Line 5 — Update default redirect URI:**

```javascript
// BEFORE:
const DEFAULT_REDIRECT_URI =
  'https://www.tranche2compliance.com.au/real-estate.html';

// AFTER:
const DEFAULT_REDIRECT_URI =
  'https://master.d348r0hmzvjji4.amplifyapp.com/real-estate.html';
```

Then run validation:

```bash
npm run test:auth
```

---

## 21. Documentation Updates

Update references in these documentation files:

| File | What to update |
|------|----------------|
| `docs/guides/auth-setup.md` | Domain prefix, client ID, pool ID |
| `docs/guides/monetization-setup.md` | Webhook URL, payment links, API URL |
| `docs/architecture/auth.md` | Pool architecture diagram |
| `docs/architecture/monetization.md` | Webhook endpoint URLs |
| `docs/testing/monetization-test-cases.md` | User pool ID references (`ap-southeast-2_VQ5jADaPv` → new ID) |

---

## 22. Migration Checklist

### Phase 1 — AWS Resources (Manual)

- [ ] Create new Cognito User Pool `t2c-master` in `ap-southeast-2`
- [ ] Record new User Pool ID: `ap-southeast-2_________________`
- [ ] Add custom attributes: `subscription_tier`, `stripe_customer_id`, `pdf_purchased`
- [ ] Create App Client `t2c-master-web` (public, no secret)
- [ ] Record App Client ID: `________________________________`
- [ ] Configure Hosted UI domain prefix: `t2c-master`
- [ ] Register callback URLs (master Amplify domain)
- [ ] Register sign-out URLs (master Amplify domain)

### Phase 2 — Code Changes (Local)

- [ ] Update `amplify/backend.ts` → `EXTERNAL_USER_POOL_ID`
- [ ] Update `amplify/auth/resource.ts` → callback/logout URLs
- [ ] Update `amplify/functions/check-subscription/resource.ts` → `ALLOWED_ORIGINS`
- [ ] Update `js/auth.js` → CONFIG (domain, clientId, tokenEndpoint)
- [ ] Update `js/auth-landing.js` → CONFIG (domain, clientId, tokenEndpoint)
- [ ] Update `js/subscription.js` → placeholder payment links & API URL
- [ ] Update `scripts/validate-auth-hosted-ui.mjs` → redirect URI

### Phase 3 — Deploy Amplify Backend

- [ ] Commit and push code changes to `master`
- [ ] Run `npx ampx deploy` (or let Amplify CI/CD auto-deploy)
- [ ] Wait for deployment to complete
- [ ] Record new API Gateway URL: `https://__________.execute-api.ap-southeast-2.amazonaws.com/prod`

### Phase 4 — Stripe Configuration

- [ ] Create new Stripe webhook endpoint → `NEW_API_GATEWAY_URL/webhook/stripe`
- [ ] Subscribe to events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
- [ ] Record webhook signing secret: `whsec_________________________`
- [ ] Create 3 new Stripe Payment Links with master redirect URLs
- [ ] Record payment link URLs
- [ ] Note customer portal URL

### Phase 5 — Secrets & Final Config

- [ ] Set `STRIPE_SECRET_KEY` via `npx ampx secret set`
- [ ] Set `STRIPE_WEBHOOK_SECRET` via `npx ampx secret set` (new whsec)
- [ ] Update `js/subscription.js` with real payment links + API URL
- [ ] Commit and push the final subscription.js update

### Phase 6 — Cognito Trigger Wiring

- [ ] Wire `post-confirmation` Lambda as trigger on new pool (Console or CLI)
- [ ] Add Lambda resource-based policy for Cognito invocation

### Phase 7 — Validation

- [ ] Run `npm run test:auth` — verify Hosted UI endpoints
- [ ] Test signup flow on master branch URL
- [ ] Test login flow (PKCE code exchange)
- [ ] Test token refresh
- [ ] Test sign-out
- [ ] Test Stripe checkout → webhook → Cognito attribute update
- [ ] Test subscription check API (`GET /subscription`)
- [ ] Verify welcome email arrives after signup
- [ ] Test feature gating (free vs pro sections)
- [ ] Test customer portal access

---

## 23. Rollback Plan

If something goes wrong:

1. **Frontend:** Revert the `js/auth.js`, `js/auth-landing.js`, `js/subscription.js` changes (restore production pool values)
2. **Backend:** Revert `amplify/backend.ts` to use `ap-southeast-2_VQ5jADaPv`
3. **Stripe:** Disable the new webhook endpoint in Stripe Dashboard (don't delete — just disable)
4. **Cognito:** The new pool can remain; it won't interfere with production
5. **Deploy:** Push reverted code to master

### Values to Restore (Production)

| Component | Production Value |
|-----------|-----------------|
| User Pool ID | `ap-southeast-2_VQ5jADaPv` |
| Cognito Domain | `t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com` |
| App Client ID | `31etl7ceunn7p9g3gaipms8rhr` |
| API Gateway URL | `https://hl2mufk857.execute-api.ap-southeast-2.amazonaws.com/prod` |
| Stripe Webhook | (keep existing production endpoint as-is) |

---

## Summary of All Identifiers to Record

Fill these in as you complete each step:

```
NEW_USER_POOL_ID       = ap-southeast-2_________________
NEW_APP_CLIENT_ID      = ________________________________
NEW_COGNITO_DOMAIN     = t2c-master.auth.ap-southeast-2.amazoncognito.com
NEW_API_GATEWAY_URL    = https://__________.execute-api.ap-southeast-2.amazonaws.com/prod
NEW_WEBHOOK_SECRET     = whsec_________________________
NEW_MONTHLY_LINK       = https://buy.stripe.com/__________
NEW_ANNUAL_LINK        = https://buy.stripe.com/__________
NEW_PDF_LINK           = https://buy.stripe.com/__________
NEW_PORTAL_LINK        = https://billing.stripe.com/p/login/__________
```
