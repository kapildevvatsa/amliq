# T2C Authentication Service — Technical Design Document

**Version:** 1.0
**Date:** 24 February 2026
**Status:** Active
**Author:** Engineering

---

## 1. Overview

T2C uses AWS Cognito Hosted UI to authenticate users before they can access the entity dashboard tools. The landing page, legal pages, and coming-soon pages remain public. Authentication is client-side only — there is no backend API or server-side session management.

### Design Goals

- Protect dashboard tools behind login without a custom auth backend
- Keep the landing page public for discoverability
- Minimise code complexity (static site, no build step for frontend)
- Share session state across pages via browser sessionStorage
- Maintain the existing per-session legal acceptance gate after login

---

## 2. Architecture

```
                          ┌─────────────────────────┐
                          │   AWS Cognito User Pool  │
                          │  (Hosted UI + Email)     │
                          │                          │
                          │  Domain: t2c-prod-amliq- │
                          │  53314.auth.ap-southeast  │
                          │  -2.amazoncognito.com    │
                          └────────┬────────┬────────┘
                                   │        │
                          login redirect    token callback
                          (302 to Cognito)  (#id_token=...)
                                   │        │
         ┌─────────────────────────┼────────┼──────────────────────┐
         │                         │        │                      │
         │   ┌─────────────────────▼────────▼──────────────┐       │
         │   │              Browser (Client)                │       │
         │   │                                              │       │
         │   │  ┌───────────────────────────────────────┐   │       │
         │   │  │         sessionStorage                │   │       │
         │   │  │  amliq_id_token  = <JWT id_token>     │   │       │
         │   │  │  amliq_return_url = <return URL>      │   │       │
         │   │  └───────────────────────────────────────┘   │       │
         │   │                                              │       │
         │   │  ┌──────────────┐   ┌──────────────────┐     │       │
         │   │  │ auth.js      │   │ auth-landing.js  │     │       │
         │   │  │ (blocking)   │   │ (non-blocking)   │     │       │
         │   │  │              │   │                  │     │       │
         │   │  │ Dashboards:  │   │ Landing page:   │     │       │
         │   │  │ - real-estate│   │ - index.html    │     │       │
         │   │  │ - accountants│   │                  │     │       │
         │   │  │ - jewellers  │   │                  │     │       │
         │   │  └──────────────┘   └──────────────────┘     │       │
         │   │                                              │       │
         │   │  ┌──────────────────────────────────────┐    │       │
         │   │  │         localStorage                 │    │       │
         │   │  │  (checklists, forms, risk, quiz)     │    │       │
         │   │  │  NOT related to auth — app data only │    │       │
         │   │  └──────────────────────────────────────┘    │       │
         │   └──────────────────────────────────────────────┘       │
         │                                                          │
         │                    Static Site (AWS Amplify)             │
         └──────────────────────────────────────────────────────────┘
```

### Page Access Model

| Page | Auth Required | Auth Script | Legal Gate |
|---|---|---|---|
| `index.html` (landing) | No | `auth-landing.js` (non-blocking) | No |
| `real-estate.html` | **Yes** | `auth.js` (blocking) | Yes (modal) |
| `accountants.html` | **Yes** | `auth.js` (blocking) | Yes (modal) |
| `jewellers.html` | **Yes** | `auth.js` (blocking) | Yes (modal) |
| `coming-soon.html` | No | None | No |
| `disclaimer.html` | No | None | No |
| `terms.html` | No | None | No |
| `privacy.html` | No | None | No |

---

## 3. Auth Components

### 3.1 `js/auth.js` — Dashboard Gate (Blocking)

**Purpose:** Prevents unauthenticated access to dashboard pages. Runs as an IIFE immediately on page load.

**Behaviour:**

1. **Hide page** — Sets `document.documentElement.style.visibility = 'hidden'` (line 9) to prevent flash of protected content.
2. **Check for callback token** — Parses `#id_token=...` from URL hash (lines 43-53). If present, stores token in sessionStorage and cleans the hash from the URL.
3. **Validate existing token** — Reads `amliq_id_token` from sessionStorage (line 55). If missing or expired, redirects to Cognito login (line 58).
4. **Show page** — If valid token exists, restores page visibility (line 62).

**Key functions:**

| Function | Scope | Purpose |
|---|---|---|
| `parseHash()` | Private | Extracts URL hash params as URLSearchParams |
| `isExpired(token)` | Private | Decodes JWT payload, checks `exp` claim against `Date.now()` |
| `redirectToLogin()` | Private | Saves return URL, redirects to Cognito `/login` endpoint |
| `amliqSignOut()` | `window` (global) | Clears sessionStorage, redirects to Cognito `/logout` endpoint |

**Execution model:** Synchronous IIFE. Must be the first `<script>` tag in `<body>` to block rendering before auth check completes.

**Token flow:**
```
Page load
  → Hide page (visibility: hidden)
  → Is there an #id_token in the URL hash?
    → YES: Store token, clean hash, check for return URL redirect
    → NO: Check sessionStorage for existing token
      → Valid token exists: Show page (visibility: visible)
      → No valid token: Redirect to Cognito /login
```

### 3.2 `js/auth-landing.js` — Landing Page Auth (Non-Blocking)

**Purpose:** Provides Login / Sign Up and Sign Out functionality on the public landing page without blocking page rendering.

**Behaviour:**

1. **Handle callback** — If user returns from Cognito login to the landing page, parses the hash token and stores it (lines 21-25).
2. **Update UI** — On DOMContentLoaded, checks sessionStorage for a valid token and updates the `#auth-button` element to show either "Login / Sign Up" or "Sign Out" (lines 51-65).
3. **No blocking** — Page is always visible regardless of auth state.

**Key functions:**

| Function | Scope | Purpose |
|---|---|---|
| `t2cLogin()` | `window` (global) | Saves return URL, redirects to Cognito `/login` with redirect_uri = origin root `/` |
| `t2cSignOut()` | `window` (global) | Clears sessionStorage, redirects to Cognito `/logout` |
| `updateAuthUI()` | Private | Swaps `#auth-button` innerHTML based on session state |

**Execution model:** IIFE. Loaded at the bottom of `<body>` (non-blocking). UI update fires on DOMContentLoaded.

### 3.3 Legal Acceptance Gate (Post-Auth)

**Location:** `js/app.js` lines 8-94 (and equivalent in `js/app-accountants.js`, `js/app-jewellers.js`)

**Behaviour:** After auth.js allows the page to render, `App.init()` fires on DOMContentLoaded and calls `showLegalGate()`. This shows a full-screen modal requiring the user to accept the Disclaimer, Terms of Use, and Privacy Policy before the dashboard tools are accessible.

- Acceptance is **per-session only** (not persisted). Refreshing the page re-triggers the gate.
- Declining redirects to `index.html`.
- The modal is locked (no close button, full-screen overlay) until accepted.

**Sequence:**
```
auth.js validates token → page becomes visible
  → DOMContentLoaded fires
  → App.init() → showLegalGate()
  → User clicks "Accept" → App tools initialise
  → User clicks "Decline" → redirect to index.html
```

---

## 4. Cognito Configuration

### User Pool

| Setting | Value |
|---|---|
| **Pool domain** | `t2c-prod-amliq-53314.auth.ap-southeast-2.amazoncognito.com` |
| **Region** | `ap-southeast-2` (Sydney) |
| **App client ID** | `31etl7ceunn7p9g3gaipms8rhr` |
| **OAuth grant type** | Implicit (`response_type=token`) |
| **Scopes** | `email openid profile` |
| **Login method** | Email + password |
| **Signup fields** | `given_name`, `family_name`, `email`, `password` |

### Registered URLs

**Callback (redirect) URLs:**

| URL | Used By |
|---|---|
| `https://www.tranche2compliance.com.au/` | Landing page login, generic fallback |
| `https://www.tranche2compliance.com.au/real-estate.html` | Real Estate dashboard |
| `https://www.tranche2compliance.com.au/accountants.html` | Accountants dashboard |
| `https://www.tranche2compliance.com.au/jewellers.html` | Jewellers dashboard |

**Logout URLs:**

| URL | Used By |
|---|---|
| `https://www.tranche2compliance.com.au/` | All sign-out flows redirect here |

### Redirect URI Construction

- **auth.js** (dashboards): `window.location.origin + window.location.pathname + window.location.search` — dynamically matches the current page URL
- **auth-landing.js** (landing): `window.location.origin + '/'` — always resolves to the root URL

---

## 5. Session Management

### Storage Mechanism

**sessionStorage** (not localStorage). Tokens are scoped to the browser tab and cleared when the tab is closed.

| Key | Value | Set By | Cleared By |
|---|---|---|---|
| `amliq_id_token` | JWT ID token from Cognito | auth.js (line 45), auth-landing.js (line 23) | `amliqSignOut()`, `t2cSignOut()`, tab close |
| `amliq_return_url` | Full URL to return to after login | auth.js (line 23), auth-landing.js (line 29) | auth.js (line 49), sign-out functions |

### Token Lifecycle

1. **Issued:** Cognito returns `id_token` in URL hash after successful login
2. **Stored:** Extracted from hash, saved to sessionStorage
3. **Validated:** On each page load, `isExpired()` checks the JWT `exp` claim
4. **Expired:** If `Date.now() >= exp * 1000`, token is removed and user is redirected to login
5. **Cleared:** On explicit sign-out or when the browser tab is closed

### Cross-Page Session Sharing

sessionStorage is **shared across pages within the same tab** (same origin). This means:
- User logs in on the landing page → token stored in sessionStorage
- User clicks "Get Started" → navigates to dashboard page (same tab)
- auth.js on the dashboard page finds the token in sessionStorage → page loads without re-login

However, **opening a dashboard link in a new tab** requires a fresh login because sessionStorage is tab-scoped.

---

## 6. Security Considerations

### Current Implementation

| Aspect | Status | Notes |
|---|---|---|
| **OAuth flow** | Implicit grant | Tokens appear in URL hash. Standard for static sites but less secure than PKCE. |
| **Token storage** | sessionStorage | Not accessible to other tabs. Cleared on tab close. Not vulnerable to CSRF. |
| **Token validation** | Client-side `exp` check only | No signature verification (would require JWKS fetch). |
| **HTTPS** | Required | Cognito enforces HTTPS for all redirect URIs. |
| **Client ID exposure** | Public | Standard for SPA OAuth clients. Not a secret. |
| **Page hiding** | `visibility: hidden` | Prevents flash of content before auth check. Not a security boundary — content is in the HTML source. |

### Known Limitations

1. **No PKCE flow.** Implicit grant exposes tokens in URL fragments. For a future upgrade, switch to `response_type=code` with PKCE challenge. This requires calling the Cognito token endpoint client-side.

2. **No token signature verification.** The client only checks the `exp` claim. A forged or tampered token would be accepted if it has a valid-looking `exp`. This is acceptable because:
   - There is no sensitive backend — all data is in localStorage
   - Auth primarily gates access to educational UI, not privileged data

3. **sessionStorage is tab-scoped.** Users must log in again if they open a dashboard in a new tab. This is a UX trade-off for not using localStorage (which persists indefinitely).

4. **No token refresh.** If a token expires mid-session, the user won't be redirected until they navigate to a new page or refresh. There is no periodic check.

### Future Improvements

- Upgrade to authorization code flow + PKCE
- Add periodic token expiration check (e.g., `setInterval` every 5 minutes)
- Consider localStorage for token persistence across tabs (with explicit sign-out)
- Add JWKS-based token signature verification

---

## 7. File Reference

| File | Purpose | Loaded On |
|---|---|---|
| `js/auth.js` | Blocking auth gate for dashboards | real-estate.html, accountants.html, jewellers.html |
| `js/auth-landing.js` | Non-blocking auth UI for landing page | index.html |
| `js/app.js` | Legal gate modal + Real Estate app logic | real-estate.html |
| `js/app-accountants.js` | Legal gate modal + Accountants app logic | accountants.html |
| `js/app-jewellers.js` | Legal gate modal + Jewellers app logic | jewellers.html |
| `amplify/auth/resource.ts` | Cognito pool definition (Amplify Gen 2) | Build-time only |
| `amplify/backend.ts` | Amplify backend entrypoint | Build-time only |
| `scripts/validate-auth-hosted-ui.mjs` | Auth configuration smoke test | CI / manual |
| `package.json` | `test:auth` script definition | CLI |

---

## 8. User Flow Diagrams

### Flow A: New User (Enters via Dashboard Link)

```
User visits real-estate.html
  │
  ▼
auth.js hides page
  │
  ▼
No token in sessionStorage
  │
  ▼
Redirect to Cognito /login
  │
  ▼
User enters email + password (signup or login)
  │
  ▼
Cognito redirects to real-estate.html#id_token=eyJ...
  │
  ▼
auth.js extracts token from hash
  │
  ▼
Token stored in sessionStorage
  │
  ▼
Hash cleaned from URL
  │
  ▼
Page becomes visible
  │
  ▼
App.init() → showLegalGate()
  │
  ▼
User accepts terms → Dashboard loads
```

### Flow B: New User (Logs In from Landing Page)

```
User visits index.html
  │
  ▼
auth-landing.js shows "Login / Sign Up" button
  │
  ▼
User clicks button → t2cLogin()
  │
  ▼
Redirect to Cognito /login (redirect_uri = /)
  │
  ▼
User enters email + password
  │
  ▼
Cognito redirects to index.html#id_token=eyJ...
  │
  ▼
auth-landing.js extracts token, stores in sessionStorage
  │
  ▼
Header button changes to "Sign Out"
  │
  ▼
User clicks "Get Started" on entity card
  │
  ▼
Navigates to dashboard page (e.g. accountants.html)
  │
  ▼
auth.js finds valid token → page loads immediately
  │
  ▼
Legal acceptance modal → Accept → Dashboard loads
```

### Flow C: Returning User (Valid Session)

```
User visits index.html (same tab, session still active)
  │
  ▼
auth-landing.js finds valid token → shows "Sign Out"
  │
  ▼
User clicks "Get Started"
  │
  ▼
auth.js finds valid token → page loads immediately
  │
  ▼
Legal acceptance modal (per-session) → Accept → Dashboard
```

### Flow D: Sign Out

```
User clicks "Sign Out" (sidebar or header)
  │
  ▼
amliqSignOut() / t2cSignOut()
  │
  ▼
sessionStorage cleared (amliq_id_token, amliq_return_url)
  │
  ▼
Redirect to Cognito /logout
  │
  ▼
Cognito clears its session
  │
  ▼
Redirect to https://www.tranche2compliance.com.au/
  │
  ▼
Landing page loads, "Login / Sign Up" button shown
```

---

## 9. Testing

### Automated Validation

```bash
npm run test:auth
```

This runs `scripts/validate-auth-hosted-ui.mjs`, which:
1. Reads Cognito config from `js/auth.js`
2. Asserts the domain is NOT the deleted pool (11447)
3. Fetches the Cognito `/login` endpoint and asserts HTTP 200 + no `redirect_mismatch`
4. Fetches the Cognito `/signup` endpoint and asserts HTTP 200 + required form fields present
5. Prints the domain, client ID, and redirect URI on success

### Manual Test Matrix

| Test Case | Steps | Expected |
|---|---|---|
| Landing page (logged out) | Visit index.html | "Login / Sign Up" button in header |
| Landing page login | Click "Login / Sign Up" | Cognito hosted UI loads |
| Landing page callback | Complete login | Redirect to index.html, button changes to "Sign Out" |
| Dashboard access (logged in) | Click "Get Started" | Dashboard loads, legal modal fires |
| Dashboard access (logged out) | Visit real-estate.html directly | Redirect to Cognito login |
| Dashboard callback | Complete login from dashboard redirect | Dashboard loads with legal modal |
| Legal gate accept | Click "Accept" on modal | Dashboard tools accessible |
| Legal gate decline | Click "Decline" on modal | Redirect to index.html |
| Sign out (dashboard) | Click "Sign Out" in sidebar | Redirect to Cognito logout, then landing page |
| Sign out (landing) | Click "Sign Out" in header | Same as above |
| Token expiry | Wait for token to expire, then refresh | Redirect to Cognito login |
| New tab | Open dashboard URL in new tab | Redirect to Cognito login (sessionStorage is tab-scoped) |
| Accountants auth | Visit accountants.html directly | Redirect to Cognito login |
| Jewellers auth | Visit jewellers.html directly | Redirect to Cognito login |
