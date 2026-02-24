# T2C Authentication — Manual Setup Guide

**Version:** 1.0
**Date:** 24 February 2026

This guide walks through the complete setup, configuration, and troubleshooting of the T2C authentication system using AWS Cognito.

---

## Prerequisites

- AWS account with access to the Cognito console
- Access to the T2C codebase (`amliq` repository)
- Node.js 18+ (for running the validation script)
- The domain `tranche2compliance.com.au` pointing to your AWS Amplify deployment

---

## Part 1: AWS Cognito Setup

### 1.1 Verify the User Pool Exists

1. Log in to the **AWS Console**
2. Navigate to **Amazon Cognito** (region: **ap-southeast-2 / Sydney**)
3. Find the user pool with domain prefix **`t2c-prod-amliq-53314`**
4. If the pool doesn't exist, see [Part 4: Creating a New Pool](#part-4-creating-a-new-cognito-pool-from-scratch)

### 1.2 Verify the App Client

1. In the Cognito User Pool, go to **App integration** tab
2. Find the app client with ID: **`31etl7ceunn7p9g3gaipms8rhr`**
3. Confirm these settings:

| Setting | Required Value |
|---|---|
| **App type** | Public client (no client secret) |
| **OAuth grant types** | Implicit grant |
| **OAuth scopes** | `email`, `openid`, `profile` |

### 1.3 Configure Callback URLs

In the app client's **Hosted UI** settings, ensure all of these callback URLs are listed:

```
https://www.tranche2compliance.com.au/
https://www.tranche2compliance.com.au/real-estate.html
https://www.tranche2compliance.com.au/accountants.html
https://www.tranche2compliance.com.au/jewellers.html
```

**How to update:**
1. Go to **App integration** → scroll to **App clients and analytics**
2. Click the app client name
3. Click **Edit** on the **Hosted UI** section
4. Under **Allowed callback URLs**, add any missing URLs (one per line)
5. Click **Save changes**

### 1.4 Configure Logout URL

In the same Hosted UI section, ensure the sign-out URL is:

```
https://www.tranche2compliance.com.au/
```

### 1.5 Configure Cognito Domain

1. Go to **App integration** → **Domain**
2. Confirm the domain is: `t2c-prod-amliq-53314`
3. The full domain URL should be: `https://t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com`

### 1.6 Verify Signup Attributes

1. Go to **Sign-up experience** → **Required attributes**
2. Ensure these attributes are required:
   - `email` (used as username)
   - `given_name` (first name)
   - `family_name` (last name)

---

## Part 2: Codebase Configuration

### 2.1 Auth Configuration in Code

The Cognito domain and client ID are configured in two files. They must match your AWS Cognito pool.

**File: `js/auth.js`** (lines 2-7)
```javascript
var CONFIG = {
  domain:      't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
  clientId:    '31etl7ceunn7p9g3gaipms8rhr',
  redirectUri: window.location.origin + window.location.pathname + window.location.search,
  logoutUri:   window.location.origin + '/',
};
```

**File: `js/auth-landing.js`** (lines 2-7)
```javascript
var CONFIG = {
  domain:    't2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com',
  clientId:  '31etl7ceunn7p9g3gaipms8rhr',
  redirectUri: window.location.origin + '/',
  logoutUri:   window.location.origin + '/',
};
```

**If you need to change the domain or client ID**, update both files.

### 2.2 Amplify Auth Resource

**File: `amplify/auth/resource.ts`**

This file defines the Cognito configuration for Amplify deployments. Keep it in sync with the Cognito console settings:

```typescript
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      callbackUrls: [
        'https://www.tranche2compliance.com.au/',
        'https://www.tranche2compliance.com.au/real-estate.html',
        'https://www.tranche2compliance.com.au/accountants.html',
        'https://www.tranche2compliance.com.au/jewellers.html',
      ],
      logoutUrls: [
        'https://www.tranche2compliance.com.au/',
      ],
    },
  },
});
```

### 2.3 Script Loading in HTML

Auth scripts must be loaded in the correct position in each HTML file:

**Dashboard pages** (`real-estate.html`, `accountants.html`, `jewellers.html`):
```html
<body class="bg-slate-50 font-sans text-slate-800">
<script src="js/auth.js"></script>    <!-- MUST be first script in body -->

<!-- Legal Reference Banner -->
...
```

**Landing page** (`index.html`):
```html
<!-- At the bottom, before </body> -->
<script src="js/auth-landing.js"></script>
</body>
```

### 2.4 Sign Out Buttons

**Dashboard sidebars** (all 3 dashboard pages):
```html
<!-- Sign Out -->
<div class="px-5 py-2 border-b border-slate-700">
  <button onclick="amliqSignOut()" class="text-xs text-slate-400 hover:text-white font-medium transition-colors">Sign Out</button>
</div>
```
Located in the sidebar, between the logo section and the navigation.

**Landing page header** (`index.html`):
```html
<div class="ml-auto" id="auth-button"></div>
```
This empty `div` is populated by `auth-landing.js` — it shows "Login / Sign Up" or "Sign Out" depending on auth state.

---

## Part 3: Validation and Testing

### 3.1 Run the Automated Validation Script

```bash
npm run test:auth
```

This script (`scripts/validate-auth-hosted-ui.mjs`):
1. Reads the Cognito domain and client ID from `js/auth.js`
2. Checks that the old deleted pool (11447) is not referenced
3. Fetches the Cognito `/login` endpoint and verifies HTTP 200
4. Fetches the Cognito `/signup` endpoint and verifies form fields
5. Checks for `redirect_mismatch` errors

**Expected output on success:**
```
Auth hosted UI validation passed.
Domain: t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com
Client: 31etl7ceunn7p9g3gaipms8rhr
Redirect URI: https://www.tranche2compliance.com.au/real-estate.html
```

**To test with a specific redirect URI:**
```bash
AUTH_REDIRECT_URI=https://www.tranche2compliance.com.au/accountants.html npm run test:auth
```

### 3.2 Manual Testing Checklist

Test each scenario below after deployment:

**Landing Page Auth:**

- [ ] Visit `https://www.tranche2compliance.com.au/` — "Login / Sign Up" button appears in header
- [ ] Click "Login / Sign Up" — Cognito hosted login page loads
- [ ] Create a new account (email, first name, last name, password)
- [ ] After signup, verify email confirmation (check inbox)
- [ ] After confirmation, redirected back to landing page
- [ ] Header now shows "Sign Out" instead of "Login / Sign Up"
- [ ] Click "Sign Out" — redirected to landing page, button reverts to "Login / Sign Up"

**Dashboard Auth Gating:**

- [ ] While logged out, visit `real-estate.html` directly — redirected to Cognito login
- [ ] While logged out, visit `accountants.html` directly — redirected to Cognito login
- [ ] While logged out, visit `jewellers.html` directly — redirected to Cognito login
- [ ] Log in from the Cognito page — redirected back to the correct dashboard
- [ ] Dashboard page loads with the legal acceptance modal visible

**Cross-Page Session:**

- [ ] Log in on the landing page (via header button)
- [ ] Click "Get Started" on Real Estate card — dashboard loads without re-login
- [ ] Navigate back to landing page — "Sign Out" still shown
- [ ] Click "Get Started" on Accountants card — dashboard loads without re-login
- [ ] Click "Get Started" on Jewellers card — dashboard loads without re-login

**Legal Acceptance Gate:**

- [ ] After auth, legal acceptance modal appears (full screen, no close button)
- [ ] Click "Decline" — redirected to landing page
- [ ] Return to dashboard, accept terms — dashboard tools load
- [ ] Refresh page — legal modal appears again (per-session only)

**Sign Out:**

- [ ] Click "Sign Out" in dashboard sidebar — redirected to landing page
- [ ] Try to access a dashboard page — redirected to Cognito login (session cleared)

**Edge Cases:**

- [ ] Open a dashboard URL in a new tab — must log in again (sessionStorage is tab-scoped)
- [ ] Access `https://www.tranche2compliance.com.au/index.html` (explicit filename) — login button works
- [ ] Legal pages (disclaimer, terms, privacy) — accessible without login
- [ ] Coming-soon page — accessible without login

---

## Part 4: Creating a New Cognito Pool from Scratch

If you need to create a fresh Cognito User Pool (e.g., for a new environment):

### Step 1: Create the User Pool

1. AWS Console → **Amazon Cognito** → **Create user pool**
2. **Sign-in experience:**
   - Sign-in identifiers: **Email**
   - Multi-factor authentication: **Optional** (or No MFA for simplicity)
3. **Sign-up experience:**
   - Self-registration: **Enabled**
   - Required attributes: `email`, `given_name`, `family_name`
   - Attribute verification: **Email** (send verification code)
4. **Message delivery:**
   - Email provider: **Cognito default** (for low volume) or **Amazon SES** (for production)
5. **App integration:**
   - User pool name: e.g., `t2c-prod-auth`
   - Cognito domain: Choose a unique prefix (e.g., `t2c-prod-yourname`)
   - App client name: e.g., `t2c-web-client`
   - App type: **Public client** (no client secret)
6. Click **Create user pool**

### Step 2: Configure the App Client Hosted UI

1. Go to the new pool → **App integration** → **App clients**
2. Click the app client → **Edit Hosted UI**
3. Configure:

| Setting | Value |
|---|---|
| **Allowed callback URLs** | `https://www.tranche2compliance.com.au/`, `https://www.tranche2compliance.com.au/real-estate.html`, `https://www.tranche2compliance.com.au/accountants.html`, `https://www.tranche2compliance.com.au/jewellers.html` |
| **Allowed sign-out URLs** | `https://www.tranche2compliance.com.au/` |
| **OAuth 2.0 grant types** | Implicit grant |
| **OpenID Connect scopes** | `email`, `openid`, `profile` |

4. Click **Save changes**

### Step 3: Update the Codebase

1. Note your new **Cognito domain** (e.g., `t2c-prod-yourname.auth.ap-southeast-2.amazoncognito.com`)
2. Note your new **App client ID** (shown in App integration → App clients)
3. Update `js/auth.js` lines 3-4:
   ```javascript
   domain:      'YOUR-NEW-DOMAIN.auth.ap-southeast-2.amazoncognito.com',
   clientId:    'YOUR-NEW-CLIENT-ID',
   ```
4. Update `js/auth-landing.js` lines 3-4 with the same values
5. Update `amplify/auth/resource.ts` if using Amplify deployments
6. Run `npm run test:auth` to validate

### Step 4: Test the New Pool

Follow the [Manual Testing Checklist](#32-manual-testing-checklist) above.

---

## Part 5: Adding a New Dashboard Page

When adding a new entity type (e.g., Lawyers), follow these steps to enable auth:

### Step 1: Add callback URL to Cognito

Add the new URL to the app client's Hosted UI callback URLs in the AWS Console:
```
https://www.tranche2compliance.com.au/lawyers.html
```

### Step 2: Update `amplify/auth/resource.ts`

Add the URL to the `callbackUrls` array:
```typescript
callbackUrls: [
  'https://www.tranche2compliance.com.au/',
  'https://www.tranche2compliance.com.au/real-estate.html',
  'https://www.tranche2compliance.com.au/accountants.html',
  'https://www.tranche2compliance.com.au/jewellers.html',
  'https://www.tranche2compliance.com.au/lawyers.html',    // NEW
],
```

### Step 3: Add auth.js to the new HTML page

Insert immediately after the `<body>` tag:
```html
<body class="bg-slate-50 font-sans text-slate-800">
<script src="js/auth.js"></script>
```

### Step 4: Add Sign Out button to the sidebar

Insert after the sidebar logo div:
```html
<!-- Sign Out -->
<div class="px-5 py-2 border-b border-slate-700">
  <button onclick="amliqSignOut()" class="text-xs text-slate-400 hover:text-white font-medium transition-colors">Sign Out</button>
</div>
```

### Step 5: Ensure the app.js file includes the legal gate

The new entity's app JS file (e.g., `js/app-lawyers.js`) must include:
- `legalAccepted: false` and `legalGateActive: false` properties
- `showLegalGate()` method (copy from existing app.js)
- `App.init()` must call `this.showLegalGate()`

### Step 6: Validate

```bash
AUTH_REDIRECT_URI=https://www.tranche2compliance.com.au/lawyers.html npm run test:auth
```

---

## Part 6: Troubleshooting

### Problem: `redirect_mismatch` error from Cognito

**Cause:** The redirect URI sent by the browser doesn't match any URL registered in the Cognito app client.

**Fix:**
1. Check the browser URL bar — note the exact URL Cognito is complaining about
2. In AWS Console → Cognito → App client → Hosted UI → Allowed callback URLs
3. Add the exact URL (case-sensitive, including trailing slashes)
4. Save and retry

**Common mismatches:**
- `https://www.tranche2compliance.com.au/` vs `https://tranche2compliance.com.au/` (www mismatch)
- `https://www.tranche2compliance.com.au/index.html` vs `https://www.tranche2compliance.com.au/` (explicit index.html)
- HTTP vs HTTPS

### Problem: Page flashes content before redirecting to login

**Cause:** `auth.js` is not loaded early enough.

**Fix:** Ensure `<script src="js/auth.js"></script>` is the **first** script tag inside `<body>`, before any visible HTML content.

### Problem: User is logged in but dashboard still redirects to Cognito

**Cause:** Token has expired, or user opened the link in a new tab (sessionStorage doesn't persist across tabs).

**Fix:** This is expected behaviour. The user needs to log in again. To improve UX, consider switching from `sessionStorage` to `localStorage` for token persistence (see [auth.md](../architecture/auth.md) for trade-offs).

### Problem: Sign Out doesn't work / user stays logged in

**Cause:** Cognito session cookie may still be active even after clearing sessionStorage.

**Fix:** Ensure the sign-out function redirects to the Cognito `/logout` endpoint (not just clearing local state). Check that `logoutUri` matches a registered sign-out URL in Cognito.

### Problem: "Login / Sign Up" button doesn't appear on landing page

**Cause:** `auth-landing.js` not loaded, or `#auth-button` div missing from header.

**Fix:**
1. Check that `<div class="ml-auto" id="auth-button"></div>` exists in the index.html header
2. Check that `<script src="js/auth-landing.js"></script>` is loaded before `</body>`
3. Open browser devtools console — look for JavaScript errors

### Problem: Validation script fails with "Unable to read domain"

**Cause:** The regex in `validate-auth-hosted-ui.mjs` can't find the config values in `js/auth.js`.

**Fix:** Ensure `js/auth.js` uses single quotes for the domain and clientId values, formatted as:
```javascript
domain:      'your-domain.auth.ap-southeast-2.amazoncognito.com',
clientId:    'your-client-id',
```

### Problem: Email verification not working

**Cause:** Cognito's default email sender has strict limits (50 emails/day).

**Fix:** For production, configure Amazon SES as the email provider:
1. Cognito → User Pool → **Messaging** → **Email**
2. Switch from "Cognito" to "Amazon SES"
3. Verify your sender email address/domain in SES
4. Request SES production access (sandbox mode limits to verified emails only)

---

## Part 7: Environment-Specific Configuration

### Production

| Setting | Value |
|---|---|
| Domain | `www.tranche2compliance.com.au` |
| Cognito pool | `t2c-prod-amliq-53314` |
| Region | `ap-southeast-2` |
| Client ID | `31etl7ceunn7p9g3gaipms8rhr` |

### Local Development

For local testing, you would need to:
1. Add `http://localhost:PORT/` and `http://localhost:PORT/real-estate.html` (etc.) to the Cognito callback URLs
2. Update `js/auth.js` and `js/auth-landing.js` temporarily, OR
3. Override the redirect URI via the browser (not recommended for shared pools)

**Important:** Never commit localhost callback URLs to the production Cognito pool. Use a separate pool or a feature branch with a separate Amplify environment.

---

## Appendix: File Inventory

| File | Lines | Purpose |
|---|---|---|
| `js/auth.js` | 63 | Blocking auth gate for dashboard pages |
| `js/auth-landing.js` | 73 | Non-blocking auth UI for landing page |
| `amplify/auth/resource.ts` | 18 | Cognito pool definition (Amplify IaC) |
| `amplify/backend.ts` | 4 | Amplify backend entrypoint |
| `scripts/validate-auth-hosted-ui.mjs` | 65 | Cognito configuration smoke test |
| `package.json` | 15 | npm scripts (includes `test:auth`) |
| `real-estate.html` | ~220 | Dashboard — loads auth.js, has Sign Out |
| `accountants.html` | ~218 | Dashboard — loads auth.js, has Sign Out |
| `jewellers.html` | ~218 | Dashboard — loads auth.js, has Sign Out |
| `index.html` | ~220 | Landing page — loads auth-landing.js, has Login/Sign Out |
