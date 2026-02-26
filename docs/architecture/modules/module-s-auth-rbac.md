# Module S — Auth & RBAC

> **Source:** [module-design-document.md](../module-design-document.md) § 5 (Module S)

---

## Purpose

Manage user authentication, role-based access control, session security, and user lifecycle. Built on Amplify Auth (Cognito) with custom attributes for `tenant_id` and `role`. Enforces MFA for privileged roles, maps platform roles to AUSTRAC governance structure, and provides the identity context that every other module depends on.

---

## Interfaces

| Direction | Interface | Description |
|:----------|:----------|:-----------|
| IN | Signup / login | Email + password; MFA for privileged roles |
| IN | User invitation (from tenant admin/CO) | Email, assigned role, tenant_id |
| IN | Role change (from tenant admin/CO) | User ID, new role |
| OUT | Authenticated session | JWT with `tenant_id`, `role`, `user_id` claims → all modules |
| OUT | Cognito groups | → AppSync authorization rules (group-based access) |
| OUT | User lifecycle events | → Audit Trail (login, logout, role change, MFA enrollment) |

---

## Key Responsibilities

1. User signup flow: create Cognito user → post-confirmation Lambda sets `custom:tenant_id` and `custom:role` → add user to Cognito group matching role
2. User invitation flow: tenant admin/CO invites user by email → Cognito `AdminCreateUser` with temporary password → user completes setup (set password + MFA if required)
3. Role model (maps to AUSTRAC governance):
   - `governing_body` — full visibility, program approval, final escalation, billing
   - `senior_manager` — approve high-risk CDD, approve offboarding, receive escalations
   - `compliance_officer` — all compliance workflows, SMR access, program maintenance
   - `client_facing` — initiate cases, onboarding forms, flag unusual activity, no SMR access
4. Single-employee mode: one user holds all four roles (union of permissions); self-approval logged but not blocked
5. MFA enforcement: TOTP required for `compliance_officer`, `senior_manager`, `governing_body`; optional for `client_facing`
6. Session management: configurable session timeout (default 8h active, 30min idle); re-auth required for sensitive actions (role change, program approval, offboarding)
7. User deactivation: disable Cognito user; revoke active sessions; retain user record for audit attribution (never delete)
8. Entitlement-gated user count: check Subscription entitlement before allowing new user invitation
9. Password policy: minimum 12 characters, complexity requirements, no reuse of last 5 passwords

---

## Data Entities

### Owned Entities (from Section 6B)

| Entity | Table | PK | SK | Key Attributes | Notes |
|:-------|:------|:---|:---|:--------------|:------|
| **UserProfile** | Main | `tenant_id` | `USER#{user_id}` | cognito_sub, email, display_name, role, notification_prefs, last_login, status, mfa_enrolled | Cognito is source of auth; this is the app-layer profile |

### Relevant GSIs

No dedicated GSIs. UserProfile accessed via direct key lookup.

---

## RBAC (from Section 8A — User Management)

| Operation | `client_facing` | `compliance_officer` | `senior_manager` | `governing_body` |
|:----------|:-:|:-:|:-:|:-:|
| Invite new user | — | Y | — | Y |
| Assign / change role | — | — | — | Y |
| Deactivate user | — | — | — | Y |
| View user list | — | Y | — | Y |
| Update own profile | Self | Self | Self | Self |
| Enrol MFA | Self | Self (mandatory) | Self (mandatory) | Self (mandatory) |

---

## Audit & Retention

**Audit requirements:** All auth events logged: signup, login, logout, failed login, MFA enrollment, MFA challenge, role change, user invitation, user deactivation, password change, session timeout. Failed login tracking for brute-force detection.

**Retention:**
- User records: never deleted (audit attribution)
- Auth event logs: 7 years
- Cognito user pool: user disabled but retained

---

## Failure Modes

| Failure | Impact | Control |
|:--------|:-------|:--------|
| Cognito service degradation | Users cannot authenticate | CloudWatch alarm; status page; session tokens remain valid until expiry (no forced re-auth during outage) |
| MFA device lost | Privileged user locked out | Recovery flow: GB member can trigger MFA reset via admin API; backup codes issued at enrollment; support escalation path |
| Role misconfiguration (wrong role assigned) | Unauthorised access to compliance data | Role change requires GB approval; audit logged; role change triggers immediate session refresh |
| Brute-force login attempt | Account compromise | Cognito built-in: account lockout after 5 failed attempts (configurable); CloudWatch alert on spike |
| JWT token stolen | Session hijack | Short-lived access tokens (1h); refresh token rotation; IP-based anomaly detection (future Phase 4) |

---

## Sector Pack Relationship

None. Auth and RBAC are 100% core. Role names and descriptions may use sector language pack labels in the UI (e.g., "Principal" instead of "Governing Body" for sole practitioners), but the underlying role identifiers and permission model are universal.

---

## Amplify Gen2 Implementation Notes

- Cognito User Pool with custom attributes: `custom:tenant_id` (immutable), `custom:role` (mutable via admin API)
- Cognito Groups: `governing_body`, `senior_manager`, `compliance_officer`, `client_facing` — one group per role per tenant (group name: `{tenant_id}_{role}`)
- Post-confirmation Lambda trigger: sets custom attributes, creates UserProfile in DynamoDB, adds to Cognito group
- Pre-token-generation Lambda trigger: injects `tenant_id` and `role` into JWT claims for AppSync resolver access
- AppSync auth rules: `@auth(rules: [{ allow: groups, groupsField: "allowed_groups" }])` on every model
- UserProfile model in DynamoDB: `tenant_id` PK, `user_id` SK
- Role change: Lambda calls `AdminUpdateUserAttributes` + `AdminAddUserToGroup` / `AdminRemoveUserFromGroup`; invalidates existing tokens via `AdminUserGlobalSignOut`

---

## Related Flows

- [Flow 1 — Tenant Signup & Sector Pack Provisioning](../flows.md#flow-1--tenant-signup--sector-pack-provisioning) — User signup + role assignment
