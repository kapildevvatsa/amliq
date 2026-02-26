# Module R — Billing & Subscription

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module R)

---

## Purpose

Manage tenant subscription lifecycle, plan entitlements, and usage metering via Stripe. Controls feature access (entity limits, user seats, module availability) based on subscription tier. Handles trial, upgrade, downgrade, cancellation, and payment failure gracefully without disrupting compliance workflows.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Stripe webhook events | `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` |
| IN | Plan selection (from tenant admin) | During signup or upgrade flow |
| OUT | Entitlements | → All modules (feature gates, entity limits, user seat count) |
| OUT | Subscription status | → Frontend (plan badge, upgrade prompts, grace period warnings) |
| OUT | Billing portal URL | → Frontend (Stripe Customer Portal redirect) |

---

## Key Responsibilities

1. Create Stripe Customer on tenant signup; link `stripe_customer_id` to Tenant record
2. Create Stripe Checkout Session for plan selection; handle `checkout.session.completed` to activate subscription
3. Map Stripe plan/price IDs to internal entitlement sets:
   - **Starter:** 1 user, up to 50 active customers, core modules only
   - **Professional:** up to 5 users, up to 500 active customers, all modules
   - **Business:** up to 20 users, unlimited customers, all modules + priority support
   - (Tiers are illustrative — final pricing TBD)
4. Enforce entitlements at module level: check user seat count on invite, check customer count on creation, check module availability on access
5. Handle payment failure: grace period (7 days), read-only mode (14 days), suspension (28 days) — compliance data never deleted
6. Handle subscription cancellation: retain all data for 7-year compliance obligation; disable new case creation; retain read-only access to existing records
7. Stripe Customer Portal for self-service billing management (payment method, invoices, plan changes)
8. Trial period: 14-day free trial with full entitlements; convert or downgrade at trial end
9. Usage metering: track active customer count, user count, evidence storage volume for potential usage-based pricing

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **Subscription** | Billing (dedicated) | `tenant_id` | `SUB#{subscription_id}` | stripe_customer_id, stripe_subscription_id, plan_id, status (trialing/active/past_due/canceled/suspended), current_period_end, created_at | **Dedicated table** (different IAM) |
| **Entitlement** | Billing (dedicated) | `tenant_id` | `ENT#{entitlement_type}` | limit_value, current_usage, is_enforced | Derived from plan on webhook |
| **UsageRecord** | Billing (dedicated) | `tenant_id` | `USAGE#{period}#{metric}` | metric (active_customers/users/storage_bytes), value, recorded_at | For usage-based pricing (future) |

### Relevant GSIs

No dedicated GSIs. Direct key lookups on Billing table.

---

## RBAC (from Section 8A — Tenant & Configuration)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| View billing / subscription | — | — | — | Y |
| Change plan / payment method | — | — | — | Y |

Additional:
- Stripe webhook: verified via Stripe signature (`stripe-signature` header)
- Entitlement checks: system-internal (every module reads entitlements, no user-facing mutation)

---

## Audit & Retention

**Audit requirements:** Subscription changes (plan, status, payment events) logged. Entitlement enforcement events (limit reached, feature blocked) logged. Payment failures and grace period transitions logged.

**Retention:**
- Subscription history: tenant lifetime + 7 years
- Usage records: 2 years (billing disputes)
- Active subscriptions: never deleted

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Stripe webhook delivery failure | Subscription state out of sync | Stripe retries (up to 3 days); periodic Stripe API sync job (daily) reconciles state |
| Entitlement check fails (service error) | Feature incorrectly blocked or allowed | Fail-open for compliance-critical features (deadline engine, audit trail, reporting); fail-closed for non-critical (new case creation) |
| Payment failure during active compliance work | Tenant loses access mid-workflow | Grace period (7 days full access → 14 days read-only); compliance data never deleted; CO notified of billing issue |
| Stripe signature verification fails | Potential spoofed webhook | Reject webhook; log security event; alert admin |

---

## Sector Pack Relationship

None. Billing is 100% core. Entitlement tiers are platform-defined, not pack-specific. Sector packs may influence which modules are relevant per plan, but this is configured at the platform level.

---

## Amplify Gen2 Implementation Notes

- Subscription model in DynamoDB: `tenant_id` PK, `subscription_id` SK
- Entitlement model: `tenant_id` PK, `entitlement_type` SK (derived from Stripe plan on webhook)
- Stripe Webhook Lambda (`stripe-webhook`) behind API Gateway (not AppSync — raw HTTP required for signature verification)
- Stripe API calls from Lambda using `stripe` Node.js SDK; API key in Secrets Manager
- Billing Portal: Lambda generates Stripe Customer Portal session URL; frontend redirects
- Entitlement checks: utility function `checkEntitlement(tenant_id, entitlement_type)` reads from DynamoDB; cached in Lambda execution context (5-min TTL)

---

## Related Flows

- [Flow 1 — Tenant Signup & Sector Pack Provisioning](../flows.md#flow-1--tenant-signup--sector-pack-provisioning) — Stripe customer + trial subscription created during signup
