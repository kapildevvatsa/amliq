# Lawyer Handoff Pack — T2C (tranche2compliance.com.au)

**Prepared:** 24 February 2026
**Purpose:** Supporting document for legal review of website terms, disclaimer, and privacy policy
**Status:** Draft legal pages written — awaiting lawyer review before publishing

> **Note:** The draft legal pages on this website were prepared with AI assistance and are not lawyer-reviewed. This document summarises the product, data profile, known risks, and open questions to support an efficient legal review.

---

## 1. Product Overview

### What T2C Is

| Item | Detail |
|---|---|
| **Product name** | T2C (Tranche 2 Compliance) |
| **Domain** | tranche2compliance.com.au |
| **Operator** | Biz Buzz Hub (ABN 86 768 265 615), sole trader |
| **Contact email** | support@tranche2compliance.com.au |
| **What it does** | Free, static, educational web portal that helps Australian professionals understand their new AML/CTF Tranche 2 obligations (effective 1 July 2026) |
| **Entity types served** | Real Estate Agents, Accountants & Tax Agents, Jewellers & Precious Metals Dealers (3 live). Lawyers, TCSPs, Financial Advisors (3 coming soon) |
| **Interactive features** | Checklists, risk-assessment wizards, form builders, quizzes, glossary, FAQ, AUSTRAC reference links |
| **Content source** | Publicly available AUSTRAC materials, the AML/CTF Act, AML/CTF Rules, and AUSTRAC Starter Kits |
| **Price** | Free (no payment, no subscription, no billing of any kind) |
| **Hosting** | AWS Amplify (ap-southeast-2, Sydney region) |
| **Tech stack** | Static HTML/CSS/JavaScript, Tailwind CSS (CDN), no backend API |

### What T2C Does NOT Do

- Does not provide legal, financial, tax, accounting, or compliance advice
- Does not create, deliver, or certify an AML/CTF program
- Does not guarantee or ensure regulatory compliance
- Does not collect, store, or transmit user data to any server
- Does not use analytics, cookies, or tracking
- Does not charge money or process payments
- Does not currently require user login (authentication code exists but is disabled)
- Does not send emails (email form on "coming soon" pages is a non-functional UI placeholder)
- Is not affiliated with, endorsed by, or authorised by AUSTRAC or any government body

---

## 2. Data Profile

### What Is Collected

| Data Type | Collected? | Where Stored | Details |
|---|---|---|---|
| **Form inputs, checklists, risk assessments, quiz answers** | Entered by user | Browser localStorage only | Never transmitted to any server. We have zero access. |
| **Server logs (IP, timestamp, pages, browser, referrer)** | Automatically by AWS | AWS infrastructure (ap-southeast-2) | Standard hosting logs. Not used for marketing or identification. |
| **Tailwind CSS CDN request** | Automatically by browser | CDN provider (Tailwind Labs) | User's IP sent to CDN when loading CSS framework. |
| **Email addresses** | No | N/A | "Notify Me" form is non-functional placeholder. No data stored or sent. |
| **Cookies** | No | N/A | Zero cookies set. |
| **Analytics / tracking** | No | N/A | No Google Analytics, no pixels, no tracking scripts. |
| **Authentication tokens** | Not currently | sessionStorage (disabled) | Cognito auth code exists but auth.js is not loaded on any page. |

### If Authentication Is Re-Enabled (Future)

AWS Cognito would collect: email address, login timestamps, session tokens. This would require updating the privacy policy.

---

## 3. Current Legal Pages (Draft — For Review)

Three legal pages have been drafted and are in the repo:

| Page | File | Clauses | Key Features |
|---|---|---|---|
| **Terms of Use** | `terms.html` | 19 clauses | Eligibility (18+, authority), what the site does/doesn't do, prohibited conduct, local data disclaimer, no warranties, liability cap (AUD $100 where ACL applies), ACL carve-out, indemnity, termination, severability, governing law (Victoria) |
| **Disclaimer** | `disclaimer.html` | 15 clauses | Not professional advice (legal/financial/tax/compliance), no compliance guarantee, no adviser-client relationship, accuracy limitations, official sources prevail, no government affiliation, interactive tools disclaimer, liability limitation |
| **Privacy Policy** | `privacy.html` | 12 sections | Leads with what is NOT collected, covers server logs and CDN, localStorage explanation, AWS cross-border disclosure, OAIC complaints reference |

All three pages are cross-linked and referenced in:
- Footer of every page
- Disclaimer banners on entity dashboards
- Mandatory legal acceptance gate (modal) before accessing any entity tool

---

## 4. Facts for Lawyer to Confirm

### Entity and Registration

| Question | Current Position | Action |
|---|---|---|
| Is "Biz Buzz Hub" a registered business name with ASIC? | Used as operator name on all legal pages | Confirm registration status |
| Is the ABN (86 768 265 615) current and correctly applied? | Listed on all legal pages | Verify on ABR |
| Is there a trust structure behind the sole trader? | Not mentioned | Confirm — affects liability and entity description |
| Is "T2C" registered as a business name? | Used as product brand | If not, consider registering or confirm legal position |
| Is incorporation planned? | Currently sole trader | If so, legal pages will need updating (entity name, structure) |

### Jurisdiction and Governing Law

| Question | Current Position | Action |
|---|---|---|
| Is Victoria the correct jurisdiction? | Set as "Victoria, Australia" in Terms clause 18 | Confirm — or change to appropriate state |
| Is a physical address required to be published? | Only ABN and email currently shown | Advise on whether a street/postal address is needed |

### Insurance and Licensing

| Question | Current Position | Action |
|---|---|---|
| Does the operator have professional indemnity insurance? | Unknown | Strongly recommended given AML/CTF-adjacent content |
| Does this educational aid trigger any licensing requirements (AFSL, tax agent, etc.)? | Site disclaims all of these | Lawyer to confirm no licence is required |
| Does operating a free tool in this space create any regulatory exposure? | Unknown | Advise |

### Copyright and Content

| Question | Current Position | Action |
|---|---|---|
| Is reproducing/adapting AUSTRAC Starter Kit forms permissible? | Site adapts official forms for educational use | Confirm under Crown copyright / open government licence |
| Does fair dealing cover the AUSTRAC CEO quote used in concept docs? | Attributed quote used in educational context | Confirm — and check if this appears in live rendered pages |
| Is all other content original? | Believed so | Confirm with operator |

### Consumer Law

| Question | Current Position | Action |
|---|---|---|
| Is this free website a "service" under the ACL? | Terms include ACL carve-out and liability cap | Advise on whether consumer guarantees apply to a free educational tool |
| Is the AUD $100 liability cap appropriate where ACL applies? | Set in Terms clause 11 | Confirm this is reasonable / enforceable |
| Are the "as is" / "no warranty" clauses enforceable for an Australian consumer audience? | Standard wording with ACL carve-out | Review for enforceability |

### Payment (Currently N/A)

| Question | Current Position | Action |
|---|---|---|
| If the site introduces paid features in future, what's needed? | No payment infrastructure exists | Advise on subscription terms, refund policy, ACL consumer guarantee obligations |

---

## 5. Risky Phrases Found on the Website

These phrases appear on the live site and may increase legal exposure. Lawyer should advise on whether edits are needed.

### High Priority

| File | Line | Current Phrase | Risk | Suggested Alternative |
|---|---|---|---|---|
| `index.html` | 60 | "Australia's AML/CTF Tranche 2 **Compliance Toolkit**" | "Compliance Toolkit" directly implies the site delivers compliance. This is the hero heading — highest visibility on the site. | "Australia's AML/CTF Tranche 2 **Guidance Portal**" |
| `index.html` | 89 | "AML/CTF **program setup**, risk assessments, customer due diligence..." | "program setup" implies we build their AML/CTF program | "AML/CTF **program guidance**, risk assessment aids, due diligence references..." |

### Medium Priority

| File | Line | Current Phrase | Risk | Suggested Alternative |
|---|---|---|---|---|
| `index.html` | 125 | "**Compliance guidance** for accountants and tax practitioners..." | "Compliance guidance" sits close to "compliance advice" | "**Educational guidance** for accountants..." or retain with disclaimers |
| `coming-soon.html` | 107 | "AML/CTF **compliance guidance** for legal practitioners..." | Same borderline issue | "AML/CTF **educational guidance** for..." |
| `index.html` | 143 | "AML/CTF **requirements** for dealers in precious metals..." | Minor — "requirements" is factual | Acceptable as-is |
| Concept docs (internal) | Multiple | "compliance generally boils down to just three forms" | Attributed AUSTRAC CEO quote — may trivialise obligations if it appears in rendered user-facing pages | Verify if this appears in live UI. If so, add qualifying context. |

### Low Priority

| File | Line | Current Phrase | Risk | Notes |
|---|---|---|---|---|
| All entity dashboards | Banner | "This website is an educational aid only..." | Protective language — good | No change needed |
| All footers | Footer | "All tools are free guidance aids. Not official AUSTRAC documents." | Protective language — good | No change needed |

---

## 6. Open Questions and Red Flags

### Red Flags

1. **AML/CTF-adjacent content creates heightened liability risk.** A user who relies on this site, builds an inadequate AML/CTF program based on its tools, and then faces AUSTRAC enforcement could attempt to claim they were misled. Strong disclaimers mitigate this, but do not eliminate it. Professional indemnity insurance is strongly recommended.

2. **Interactive tools produce outputs that resemble compliance documents.** The risk assessment wizards, form builders, and program builders generate outputs that a user could present as their actual AML/CTF program, risk assessment, or CDD form. Disclaimer clause 10 addresses this, but the lawyer should assess whether additional in-tool warnings are needed (e.g., watermarks, headers on exported documents).

3. **The "Compliance Toolkit" hero heading is the single highest-risk phrase on the site.** It directly implies the site delivers compliance. Recommend changing before go-live.

4. **Copyright position on AUSTRAC Starter Kit materials needs confirmation.** The site adapts official AUSTRAC forms. While this is likely permissible under Crown copyright and educational use, it should be formally confirmed.

5. **Sole trader structure means personal liability.** All legal exposure flows directly to the individual. If this is a concern, consider incorporating (Pty Ltd) to limit liability.

### Open Questions for Lawyer

1. Should the Terms include a dispute resolution clause (e.g., mediation before court)?
2. Is the governing law correctly set to Victoria? (Confirm with operator.)
3. Does the Privacy Act 1988 small business exemption (annual turnover < $3M) apply to this operator? If so, does the site need an APP-compliant privacy policy, or is it voluntary best practice?
4. If Cognito authentication is re-enabled in future, what additional privacy disclosures are needed?
5. Should exported documents (PDF/print outputs from the form builders) carry a disclaimer watermark or header?
6. Is there any risk that AUSTRAC could object to this educational use of their materials or brand references?
7. Should the legal acceptance gate (mandatory modal before accessing tools) be strengthened — e.g., require a checkbox rather than just a button click?

---

## 7. Document Locations in Repository

| File | Description |
|---|---|
| `terms.html` | Terms of Use (19 clauses) |
| `disclaimer.html` | Legal Disclaimer (15 clauses) |
| `privacy.html` | Privacy Policy (12 sections) |
| `index.html` | Landing page (hero, entity cards, footer) |
| `coming-soon.html` | Placeholder page for future entity types |
| `real-estate.html` | Real Estate Agents dashboard (SPA) |
| `accountants.html` | Accountants & Tax Agents dashboard (SPA) |
| `jewellers.html` | Jewellers & Precious Metals dashboard (SPA) |
| `js/app.js` | Core app logic incl. legal gate modal (Real Estate) |
| `js/app-accountants.js` | Accountants app logic incl. legal gate modal |
| `js/app-jewellers.js` | Jewellers app logic incl. legal gate modal |
| `docs/product/real-estate.md` | Product spec — Real Estate (internal, not user-facing) |
| `docs/product/accountants.md` | Product spec — Accountants (internal, not user-facing) |
| `docs/product/jewellers.md` | Product spec — Jewellers (internal, not user-facing) |

---

## 8. Summary of What Was Done (For Lawyer Context)

The following legal pages were drafted (or rewritten) on 24 February 2026 using AI assistance:

- **Terms of Use** — Expanded from 15 to 19 clauses. Added: eligibility, explicit "what the site does/doesn't do", local data clause, prohibited misrepresentation, termination, severability, entire agreement, specific jurisdiction.
- **Disclaimer** — Expanded from 11 to 15 clauses. Added: no compliance guarantee, expanded not-professional-advice list, interactive tools disclaimer, local data storage clause, accuracy/currency expansion.
- **Privacy Policy** — Created from scratch. Tailored to the site's minimal data profile. Leads with what is NOT collected. Covers server logs, CDN, localStorage, AWS hosting, cross-border, OAIC complaints.
- **All other pages** — Updated footers, disclaimer banners, and legal gate modals to link to all three legal pages.

**These documents are drafts. They have not been reviewed by a lawyer and should not be treated as legally compliant until reviewed by a qualified Australian legal practitioner.**

---

*Prepared for Biz Buzz Hub (ABN 86 768 265 615) — support@tranche2compliance.com.au*
