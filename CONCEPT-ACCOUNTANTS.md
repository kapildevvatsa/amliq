# T2C — AML/CTF Compliance Guide for Accountants

## Product Concept Document — v1.3

---

## 1. Vision

**T2C for Accountants** is a lightweight, static, single-page web application that guides Australian accounting professionals through their new Anti-Money Laundering / Counter-Terrorism Financing (AML/CTF) obligations under the reformed AML/CTF Act (Tranche 2), effective **1 July 2026**.

It is **not** legal or professional advice. It is a practical, step-by-step guidance tool built entirely from publicly available AUSTRAC materials, including the official **Accounting Program Starter Kit** released January 2026.

The tool mirrors the structure of AUSTRAC's own starter kit — **Customise → Implement → Maintain & Review** — with a 4-step customisation approach: (1) Risk Assessment, (2) Personnel, (3) Client Sections, (4) Document & Approve. It wraps this in an interactive, user-friendly interface with checklists, wizards, template forms, and plain-English explanations.

---

## 2. Problem Statement

From **1 July 2026**, accounting practices providing designated services will be required to:

- Enrol with AUSTRAC as a reporting entity (within 28 days of providing a designated service — by **29 July 2026**)
- Develop and maintain an AML/CTF program (risk assessment, policy document, process document)
- Appoint an AML/CTF compliance officer
- Conduct initial and ongoing customer due diligence (CDD)
- Screen for Politically Exposed Persons (PEPs) and Targeted Financial Sanctions (TFS)
- Report suspicious matters (SMRs), threshold transactions (TTRs), and submit an annual AML/CTF compliance report
- Conduct personnel due diligence on staff in AML/CTF roles
- Keep records for 7 years
- Train staff on ML/TF/PF risks and obligations
- Conduct internal reviews and independent evaluations (at least every 3 years)

Accountants are recognised internationally as **"gatekeeper" professionals** — their expertise in structuring transactions, creating entities, and managing funds makes them attractive targets for criminal exploitation. AUSTRAC's 2024 National Risk Assessment identified accounting services as posing a **high money laundering risk**. Australia is bringing approximately **90,000 new reporting entities** into the AML/CTF regime under Tranche 2, aligning with FATF standards.

Most small to mid-sized accounting practices have **zero experience** with AML/CTF compliance. The regulation is complex, the 8 designated services are nuanced, and hiring compliance consultants is expensive.

**T2C bridges that gap** by translating AUSTRAC's requirements into plain-English, actionable guidance with interactive tools — all for free, with no data leaving the user's browser.

---

## 3. Who Is Regulated (and Who Is Not)

### 3.1 The Eight Designated Services for Accountants

Accountants are regulated under the **"Professional Services"** category. AML/CTF obligations are triggered when an accountant provides any of the following **8 designated services** (with a geographical link to Australia):

| # | Designated Service | Typical Examples |
|---|---|---|
| 1 | **Assisting in planning or executing transactions to buy, sell, or transfer real estate** | Advising on property acquisition structures, tax planning for property purchases/sales, structuring property deals |
| 2 | **Assisting in planning or executing transactions to sell, buy, or transfer a body corporate or legal arrangement** | Advising on mergers & acquisitions, business sales, share transfers, partnership buy-ins/buy-outs |
| 3 | **Receiving, holding, controlling, or managing a person's property to help plan or execute a transaction** | Holding client funds in trust accounts, managing client assets during transaction execution |
| 4 | **Assisting in organising, planning, or executing equity or debt financing for a body corporate or legal arrangement** | Preparing financial models for loan applications, structuring capital raising, advising on financing arrangements |
| 5 | **Selling or transferring a shelf company** | Selling pre-registered companies to clients |
| 6 | **Assisting in planning or executing the creation or restructuring of a body corporate or legal arrangement** | Setting up new companies, trusts, partnerships, SMSFs; restructuring existing entities; deregistering entities |
| 7 | **Acting as or arranging for someone to act on behalf of a person in particular positions within a body corporate or legal arrangement** | Acting as a nominee director, company secretary, trustee, or arranging for others to fill these roles |
| 8 | **Providing a registered office address or principal place of business address for a body corporate or legal arrangement** | Letting clients use the accounting firm's address as the entity's registered office |

### 3.2 What Is Exempt (NOT Designated Services)

Critically, many routine accounting services are **NOT** designated services and do **not** trigger AML/CTF obligations:

| Exempt Service | Why It's Not Captured |
|---|---|
| **Standard tax return preparation** (individual & business) | Not one of the 8 designated services |
| **BAS (Business Activity Statement) agent work** | Not one of the 8 designated services |
| **Bookkeeping** | Not one of the 8 designated services |
| **Payroll processing** | Not one of the 8 designated services |
| **Financial statement preparation** | Not one of the 8 designated services (unless linked to a designated service) |
| **Audit and assurance** | Not one of the 8 designated services |
| **General tax advisory** (not linked to a transaction in the 8 categories) | Not one of the 8 designated services |
| **Superannuation administration** (standard) | Not one of the 8 designated services (unless structuring an SMSF, which may be captured under service 6) |

### 3.3 The Critical Distinction

**If your practice provides even ONE designated service, you must implement a full AML/CTF program** — including risk assessments, CDD procedures, reporting systems, and staff training. The obligations apply to the designated service activities, not to your entire practice. However, the program must cover all designated services you provide.

**If your practice provides ONLY exempt services** (e.g., only tax returns, BAS, bookkeeping, and payroll), you are **not required** to comply with AML/CTF regulations.

### 3.4 Mixed Practices

Many accounting practices provide a mix of exempt and designated services. For example:
- A practice that does tax returns (exempt) AND sets up companies for clients (designated service 6) IS captured
- A practice that does bookkeeping (exempt) AND holds client funds in trust (designated service 3) IS captured
- A practice that ONLY does tax returns and BAS work is NOT captured

### 3.5 The Geographical Link Requirement

> **AUSTRAC Source:** [The Geographical Link Requirement](https://www.austrac.gov.au/business/new-to-austrac/geographical-link-requirement)

AML/CTF obligations only apply when a designated service has a **geographical link to Australia**. This means:

| Geographical Link Exists When... | Example |
|---|---|
| The service is provided **in Australia** | Setting up an Australian company from your Sydney office |
| The service is provided **from Australia** to an overseas client | An Australian accountant sets up a trust for an overseas client from their Melbourne office |
| The service is provided **to Australia** from overseas | An overseas accountant sets up an Australian entity remotely |
| The transaction involves **Australian real estate or entities** | Assisting in the purchase of Australian property regardless of where the advice is given |

**When There Is NO Geographical Link:**
- An Australian accountant who sets up a purely foreign entity, in a foreign jurisdiction, for a foreign client, with no connection to Australian assets, entities, or financial systems would likely **not** have a geographical link — and therefore would **not** be captured.

**Accountant-Specific Note:** Most accounting practices operating in Australia will have a geographical link for their designated services. The geographical link becomes important for firms with international operations or overseas clients seeking Australian services.

### 3.6 Reporting Groups (Larger Firms)

Larger accounting firms or firms that are part of a corporate group may need to consider whether they form a **reporting group** under the AML/CTF Act.

**What Is a Reporting Group?**
- Two or more reporting entities may form a reporting group if they share common ownership or control
- A reporting group may adopt a **joint AML/CTF program** covering all entities in the group
- The group must nominate a **lead entity** responsible for the joint program

**When This Applies:**
- Multi-office accounting firms with separate legal entities per office
- Accounting firms that are subsidiaries of a larger professional services group
- Firms that provide both accounting and other regulated services (e.g., real estate advisory)

**Note:** The AUSTRAC Accounting Program Starter Kit is designed for practices with **15 or fewer personnel** that are **not** part of a reporting group. Larger firms should seek tailored compliance advice.

---

## 4. Target Users

| User Persona | Description |
|---|---|
| **Practice Principal / Partner** | Needs to understand overall obligations, determine if the practice is captured, set up the AML/CTF program, appoint a compliance officer, and obtain senior management sign-off |
| **Senior Accountant / Manager** | Needs to understand CDD procedures for client engagements that involve designated services, and how to spot red flags |
| **Graduate / Junior Accountant** | Needs training on what ML/TF is, how to follow CDD procedures, and when to escalate |
| **AML/CTF Compliance Officer** | Needs templates, checklists, record-keeping guidance, review triggers, reporting procedures, and annual compliance report guidance |
| **Sole Practitioner** | Wears all hats — needs a streamlined, all-in-one guide from start to finish |
| **Bookkeeper / BAS Agent** (information only) | Needs to confirm they are likely exempt, but understand when a service might cross into a designated service |

---

## 5. Design Principles

| Principle | Detail |
|---|---|
| **No APIs, No Backend** | 100% static site. All data stays in localStorage. Zero network calls after page load. |
| **No Legal Risk** | Every page carries a disclaimer. Content sourced only from public AUSTRAC documents. Tool provides guidance, never "advice". |
| **Aligned to AUSTRAC Starter Kit** | Structure mirrors AUSTRAC's 4-step customisation approach and 3-step lifecycle: Customise → Implement → Maintain & Review. |
| **Plain English** | Regulatory jargon is translated. Tooltips explain technical terms. |
| **Service-Specific Guidance** | Guidance is tailored to each of the 8 designated services, not generic. |
| **Mobile-Friendly** | Responsive design for tablet and desktop use (accountants work primarily at desks but may need access in meetings). |
| **Progress Persistence** | Checklist progress, risk assessment results, and form data saved in browser localStorage. |
| **Print-Friendly** | Key sections (checklists, templates, forms) can be printed or exported as PDF via browser print. |
| **Offline-Capable** | Once loaded, the entire app works without internet. |

---

## 6. Sitemap & Feature Breakdown

```
T2C for Accountants
│
├── Home / Dashboard
│
├── PHASE 1: UNDERSTAND
│   ├── 1. Am I Regulated? (Service Checker)
│   │   ├── The 8 Designated Services Explained
│   │   ├── Interactive Service Checker Quiz
│   │   ├── Exempt vs. Designated — Quick Reference
│   │   ├── Geographical Link Requirement
│   │   └── Reporting Groups (Larger Firms)
│   ├── 2. Obligations Overview
│   │   └── 10 Core Obligations (Summary Cards)
│   └── 3. Key Dates & Timeline
│
├── PHASE 2: BUILD YOUR PROGRAM (Customise — AUSTRAC Steps 1-4)
│   ├── 4. Risk Assessment Wizard
│   │   ├── Client Risk
│   │   ├── Service Risk
│   │   ├── Delivery Channel Risk
│   │   └── Geographic/Jurisdiction Risk
│   ├── 5. AML/CTF Program Builder (Policy & Process Checklist)
│   │   ├── Risk Assessment Document
│   │   ├── Policy Document
│   │   └── Process Document
│   ├── 6. Governance Setup
│   │   ├── Appoint Compliance Officer
│   │   ├── Assign AML/CTF Roles
│   │   └── Personnel Due Diligence
│   └── 7. Enrolment Guide
│
├── PHASE 3: IMPLEMENT (Day-to-Day Operations)
│   ├── 8. Customer Due Diligence (CDD)
│   │   ├── Initial CDD — Individuals & Sole Traders
│   │   ├── Initial CDD — Companies
│   │   ├── Initial CDD — Trusts (incl. SMSFs)
│   │   ├── Initial CDD — Partnerships
│   │   ├── Initial CDD — Foreign Clients
│   │   ├── Simplified CDD (Low-Risk Clients)
│   │   ├── Enhanced Due Diligence (EDD)
│   │   ├── Ongoing CDD
│   │   ├── PEP & Sanctions Screening
│   │   ├── Beneficial Ownership Identification
│   │   ├── Delayed CDD
│   │   ├── Third-Party Reliance Arrangements
│   │   ├── When CDD Cannot Be Completed
│   │   └── Privacy Obligations & CDD Data
│   ├── 9. Client Risk Rating Guide
│   │   └── Worked Examples (Low / Medium / High)
│   ├── 10. Suspicious Activity & Red Flags
│   │   ├── Client Risk Indicators
│   │   ├── Service/Transaction Risk Indicators
│   │   ├── Delivery Channel Risk Indicators
│   │   └── Foreign Jurisdiction Risk Indicators
│   ├── 11. Reporting to AUSTRAC
│   │   ├── Suspicious Matter Reports (SMRs)
│   │   ├── Threshold Transaction Reports (TTRs)
│   │   ├── IFTIs (International Funds Transfer Instructions)
│   │   ├── Annual AML/CTF Compliance Report
│   │   └── Tipping-Off Prohibition
│   ├── 12. Record Keeping
│   └── 13. Staff Training & Awareness
│       ├── Training Plan Builder
│       └── Staff Knowledge Quiz
│
├── PHASE 4: MAINTAIN & REVIEW (AUSTRAC Step 3)
│   ├── 14. Program Review & Maintenance
│   │   ├── Periodic Review Triggers
│   │   ├── Review Checklist
│   │   └── Change Log
│   └── 15. Independent Evaluation Planning
│
├── RESOURCES
│   ├── 16. Forms & Templates Library
│   ├── 17. Jargon Buster (Glossary)
│   ├── 18. FAQ
│   └── 19. AUSTRAC Links & Source Documents
│
└── Disclaimer (persistent footer/banner on every page)
```

---

## 7. Detailed Feature Specifications

### 7.1 Home / Dashboard

**Purpose:** Single-screen overview of where the practice stands.

**Elements:**
- Welcome message with context ("You have X days until obligations begin")
- **Live countdown timer** to 1 July 2026
- **Compliance Readiness Score** — percentage based on completed checklist items across all phases (from localStorage)
- **Phase progress cards** — 4 cards showing Phase 1–4 completion percentage
- Quick-access cards to the most critical sections (Service Checker, Risk Assessment, CDD, Red Flags, Enrolment)
- **"What should I do today?"** — contextual nudge based on the current date:
  - Before 31 Mar 2026: "Determine if you provide designated services and start building your program"
  - 31 Mar – 30 Jun 2026: "Enrolment is open — enrol now and finalise your program"
  - After 1 Jul 2026: "Your obligations are live — ensure day-to-day compliance"
- Prominent disclaimer banner at the top

---

### 7.2 Am I Regulated? (Service Checker) — KEY PAGE

**Purpose:** Interactive tool that helps an accountant determine if their practice provides any of the 8 designated services.

This is arguably the **most important page** for accountants, because unlike real estate (where it's relatively clear if you're an agent), accountants may unknowingly provide designated services as part of their broader work.

#### 7.2.1 The 8 Designated Services Explained

Each service is explained in plain English with practical accounting examples:

| # | Designated Service | Plain English | Common Accounting Scenarios |
|---|---|---|---|
| 1 | Real estate transaction assistance | Helping plan or execute a property buy/sell/transfer | Advising a client on the tax-efficient structure for a property acquisition; assisting with CGT planning for a property sale |
| 2 | Body corporate/legal arrangement transaction assistance | Helping plan or execute a business buy/sell/transfer | Assisting with M&A due diligence; advising on share sale vs asset sale; facilitating a partnership buy-in |
| 3 | Managing a person's property for a transaction | Holding or controlling client assets to help execute a transaction | Holding settlement funds in a trust account; managing client monies during a business sale |
| 4 | Equity/debt financing assistance | Helping organise financing for a body corporate | Preparing financials for a bank loan application; structuring a capital raise; advising on equity vs. debt options |
| 5 | Shelf company sale/transfer | Selling a pre-registered company | Selling a shelf company to a client who wants to start trading immediately |
| 6 | Creating or restructuring entities | Helping create or restructure a body corporate or legal arrangement | Setting up a Pty Ltd company; establishing a discretionary trust or SMSF; restructuring a group of entities; deregistering a company |
| 7 | Nominee/officer services | Acting as or arranging someone to be a director, secretary, trustee, etc. | Acting as a nominee director; arranging for a staff member to be a company secretary; appointing a trustee |
| 8 | Registered office address | Providing your practice address as the registered office for a client entity | Letting a client's company use your firm's address as its registered office with ASIC |

#### 7.2.2 Interactive Service Checker Quiz

A step-by-step questionnaire:

```
Q1: Does your practice help clients buy, sell, or transfer real estate 
    (beyond just preparing their tax return)?
    Examples: structuring property acquisitions, CGT planning for property 
    sales, advising on property investment structures
    → YES → Designated Service 1 is triggered. Continue to check others.
    → NO → Go to Q2.

Q2: Does your practice help clients buy, sell, or transfer a business, 
    company, or partnership interest?
    Examples: M&A advisory, share sale structuring, partnership buy-ins, 
    business succession planning involving ownership transfers
    → YES → Designated Service 2 is triggered.
    → NO → Go to Q3.

Q3: Does your practice hold, manage, or control client funds or assets 
    to help execute a transaction?
    Examples: trust account for settlement funds, client money management
    → YES → Designated Service 3 is triggered.
    → NO → Go to Q4.

Q4: Does your practice help clients obtain or structure financing 
    (equity or debt) for a company, trust, or other entity?
    Examples: preparing financials for bank loans, structuring capital 
    raises, advising on funding options
    → YES → Designated Service 4 is triggered.
    → NO → Go to Q5.

Q5: Does your practice sell or transfer shelf companies to clients?
    → YES → Designated Service 5 is triggered.
    → NO → Go to Q6.

Q6: Does your practice help clients create or restructure companies, 
    trusts, partnerships, SMSFs, or other legal structures?
    Examples: company incorporation, trust establishment, SMSF setup, 
    corporate restructuring, entity deregistration
    → YES → Designated Service 6 is triggered.
    → NO → Go to Q7.

Q7: Does your practice act as a nominee director, secretary, trustee, 
    or arrange for someone to fill these roles for a client?
    → YES → Designated Service 7 is triggered.
    → NO → Go to Q8.

Q8: Does your practice provide its address as the registered office or 
    principal place of business for any client entity?
    → YES → Designated Service 8 is triggered.
    → NO → Assessment complete.
```

**Output:**
- Summary of which designated services (if any) the practice provides
- If ANY service is triggered: "Your practice provides designated services. You will need to enrol with AUSTRAC and implement an AML/CTF program. Proceed to the Obligations Overview."
- If NO service is triggered: "Based on your answers, your practice may not be providing designated services. You may not have AML/CTF obligations. However, review AUSTRAC's guidance to confirm, and reconsider if your services change."
- Visual checklist showing 8 services with green (not triggered) / red (triggered) indicators

#### 7.2.3 Exempt vs. Designated — Quick Reference Card

| Service | Status | Notes |
|---|---|---|
| Tax return preparation | **Exempt** | Unless linked to planning a transaction in the 8 categories |
| BAS agent / GST work | **Exempt** | Standard compliance work |
| Bookkeeping | **Exempt** | Standard financial record-keeping |
| Payroll processing | **Exempt** | Standard employment-related |
| Financial statement preparation | **Exempt** | Unless prepared as part of a financing transaction (Service 4) |
| Audit and assurance | **Exempt** | Independent assurance function |
| General tax advisory | **Exempt** | Unless the advice is about structuring a transaction in the 8 categories |
| Setting up a new company | **Designated** | Service 6 — creating a body corporate |
| Setting up a trust or SMSF | **Designated** | Service 6 — creating a legal arrangement |
| Business sale advisory (M&A) | **Designated** | Service 2 — transfer of a body corporate |
| Acting as a nominee director | **Designated** | Service 7 — acting on behalf of a person |
| Providing registered office | **Designated** | Service 8 — address provision |
| Holding client funds in trust | **Designated** | Service 3 — managing property for a transaction |
| Structuring a loan application | **Designated** | Service 4 — financing assistance |
| Selling a shelf company | **Designated** | Service 5 — shelf company transfer |
| CGT planning for property sale | **Potentially Designated** | Service 1 — if you assist in planning the transaction (not just calculating CGT after the fact) |

---

### 7.3 Obligations Overview

**Purpose:** Explain, in plain English, what the new law means for accounting practices providing designated services.

**Content Sections:**

#### What Changed?
- Brief explanation of the AML/CTF Act reform (Tranche 2)
- Why accountants were included (gatekeeper role, FATF recommendations, high ML risk rating)
- Australia joining the other 195 FATF member jurisdictions in regulating professional services
- ~90,000 new reporting entities nationally

#### Your 10 Core Obligations (Summary Cards)

Each obligation is a clickable card linking to the relevant detailed section:

| # | Obligation | Links To |
|---|---|---|
| 1 | Determine which designated services you provide | Section 7.2 |
| 2 | Enrol with AUSTRAC | Section 7.7 |
| 3 | Appoint a compliance officer | Section 7.6 |
| 4 | Conduct an ML/TF/PF risk assessment | Section 7.4 |
| 5 | Develop an AML/CTF program (risk assessment, policy, process documents) | Section 7.5 |
| 6 | Conduct initial customer due diligence (CDD) for designated service clients | Section 7.8 |
| 7 | Conduct ongoing CDD and monitor client relationships | Section 7.8.8 |
| 8 | Screen for PEPs and sanctions | Section 7.8.9 |
| 9 | Report suspicious matters, threshold transactions, and submit an annual compliance report | Section 7.11 |
| 10 | Keep records for 7 years, train staff, and plan for independent evaluation | Sections 7.12, 7.13, 7.15 |

#### What Happens If You Don't Comply?

**AUSTRAC's Approach:**
- They will focus enforcement on entities that **fail to enrol or make no meaningful implementation effort**
- AUSTRAC has stated they will take a proportionate, risk-based approach for newly regulated sectors
- Serious organised crime costs the Australian community up to **$60.1 billion** — the government takes this seriously

**AUSTRAC's Enforcement Toolkit:**

| Enforcement Tool | Description |
|---|---|
| **Civil penalty orders** | Court-imposed financial penalties for breaches of the AML/CTF Act. Penalties can be substantial — up to **$28.2 million** for body corporates for serious breaches. |
| **Infringement notices** | AUSTRAC can issue infringement notices for certain contraventions as an alternative to court proceedings. |
| **Enforceable undertakings** | AUSTRAC can accept written undertakings from a reporting entity to take specific actions to address compliance failures. Breach of an undertaking can lead to court orders. |
| **Remedial directions** | AUSTRAC can direct a reporting entity to take specific actions to comply with the Act (e.g., improve CDD processes, update the AML/CTF program). |
| **External audit** | AUSTRAC can require you to commission an external audit of your AML/CTF program at your own expense. |
| **Deregistration / suspension** | In extreme cases, AUSTRAC can suspend or cancel a reporting entity's registration. |

**Key Message for Accountants:** AUSTRAC is not expecting perfection from day one. They want to see a **genuine, good-faith effort** to understand obligations, build a program, and progressively improve. The biggest risk is doing **nothing at all**.

---

### 7.4 Risk Assessment Wizard

**Purpose:** Guide the practice through a structured self-assessment of their ML/TF/PF risk — aligned to AUSTRAC's starter kit risk assessment template and the 4 AUSTRAC risk categories.

#### Category 1: Client Risk

| Question | Risk Implication |
|---|---|
| Do you work with clients whose business structures make identifying the true beneficial owner difficult? | Higher risk — ownership opacity |
| Do you have clients who obscure details about the purpose, ownership, or nature of a transaction? | Higher risk — deliberate concealment |
| Do you work with clients connected to industries with higher ML/TF risk profiles (e.g., cash-intensive businesses, gambling, crypto)? | Higher risk — sector exposure |
| Do you work with PEPs or their associates? | Higher risk — corruption/bribery exposure |
| Do you have clients who are trusts or complex multi-layered corporate structures? | Higher risk — trust opacity |
| Do you have clients whose source of wealth is unclear or inconsistent with their profile? | Higher risk — proceeds of crime |
| Do you have clients who are reluctant to provide identification or business information? | Higher risk — identity concealment |
| Do you have many one-off or short-term client engagements (e.g., entity setup with no ongoing relationship)? | Higher risk — transactional relationships |
| Do you act for clients who have been refused services by other professionals? | Higher risk — prior suspicion |

#### Category 2: Service Risk

| Question | Risk Implication |
|---|---|
| Do you create or restructure companies, trusts, or other entities? (Service 6) | Higher risk — entity creation is a key ML vector |
| Do you act as a nominee director, secretary, or trustee? (Service 7) | Higher risk — professional enabler role |
| Do you provide registered office addresses for client entities? (Service 8) | Higher risk — address lending for opaque entities |
| Do you hold or manage client funds in trust? (Service 3) | Higher risk — fund management exposure |
| Do you sell shelf companies? (Service 5) | Higher risk — shell company risk |
| Do you assist with M&A or business transfers? (Service 2) | Medium–High risk — value transfer |
| Do you assist with financing arrangements? (Service 4) | Medium risk — financial complexity |
| Do you assist with property transactions? (Service 1) | Medium–High risk — real estate ML vector |
| Do you set up Self-Managed Super Funds (SMSFs)? | Medium–High risk — SMSF as legal arrangement |

#### Category 3: Delivery Channel Risk

| Question | Risk Implication |
|---|---|
| Do you provide services to clients you've never met face-to-face? | Higher risk — identity verification challenges |
| Do you accept new client instructions entirely via email or online without in-person verification? | Higher risk — non-face-to-face channel |
| Do you use third-party intermediaries or referral partners to introduce clients? | Higher risk — reliance on third parties |
| Do clients communicate through intermediaries (e.g., lawyers, other advisors) rather than directly? | Medium risk — layered relationships |
| Do you provide services across state or national borders? | Medium risk — geographic complexity |

#### Category 4: Geographic / Foreign Jurisdiction Risk

| Question | Risk Implication |
|---|---|
| Do you have clients based in or connected to countries identified as high-risk by FATF? | Higher risk — FATF grey/blacklist jurisdictions |
| Do you help clients with transactions involving overseas entities or assets? | Higher risk — cross-border complexity |
| Do you set up entities for clients with overseas beneficial owners? | Higher risk — foreign ownership opacity |
| Do you deal with clients who have complex international corporate structures? | Higher risk — multi-jurisdictional layering |
| Do you have clients with subsidiaries in secrecy jurisdictions or tax havens? | Higher risk — tax and ML risk |

**Output:**
- **Visual risk matrix** — 4-quadrant chart (Low / Medium / High / Very High) per category
- **Overall risk rating** with colour coding
- **Tailored action items** based on rating
- **"AUSTRAC Says" callouts** with relevant risk insights
- Ability to **save and print** the risk assessment result
- Results feed into the Program Builder (Section 7.5)

---

### 7.5 AML/CTF Program Builder (Policy & Process Checklist)

**Purpose:** Comprehensive checklist aligned to the AUSTRAC starter kit's 3 core documents: **Risk Assessment**, **Policy Document**, and **Process Document**.

#### A. Risk Assessment Document

- [ ] Identify all designated services your practice provides
- [ ] Assess ML/TF/PF risks across 4 categories (client, service, delivery channel, geographic)
- [ ] Document risk indicators for each category
- [ ] Identify controls to mitigate each risk
- [ ] Document your risk appetite (what level of risk is acceptable)
- [ ] Identify high-risk scenarios specific to your practice
- [ ] Consider AUSTRAC's risk insights and indicators for accountants
- [ ] Have risk assessment approved by senior management / governing body
- [ ] Set a schedule to review the risk assessment (and define review triggers)

#### B. Policy Document

- [ ] Appoint an AML/CTF compliance officer (Section 7.6)
- [ ] Ensure compliance officer meets eligibility requirements
- [ ] Notify AUSTRAC of compliance officer appointment within 14 days
- [ ] Define AML/CTF roles and responsibilities
- [ ] Assign responsibilities to specific staff
- [ ] Establish governing body / senior management oversight arrangements
- [ ] Set up compliance officer annual reporting to governing body
- [ ] Define CDD policies for each client type (individual, company, trust, partnership, foreign)
- [ ] Define beneficial ownership identification policies
- [ ] Define PEP and TFS screening policies
- [ ] Define enhanced due diligence triggers and policies
- [ ] Define simplified CDD policies for low-risk clients
- [ ] Define ongoing CDD and monitoring policies
- [ ] Define client risk rating methodology (Low / Medium / High)
- [ ] Define suspicious activity identification and escalation policies
- [ ] Define reporting policies (SMR, TTR, annual compliance report)
- [ ] Define record-keeping policies (7-year retention)
- [ ] Define training policies (initial and ongoing)
- [ ] Define personnel due diligence policies
- [ ] Define program review and maintenance policies
- [ ] Define independent evaluation schedule (at least every 3 years)

#### C. Process Document

- [ ] Document step-by-step CDD process for individual clients
- [ ] Document step-by-step CDD process for company clients
- [ ] Document step-by-step CDD process for trust clients (including SMSFs)
- [ ] Document step-by-step CDD process for partnership clients
- [ ] Document step-by-step CDD process for foreign clients
- [ ] Document beneficial ownership verification process
- [ ] Document PEP/TFS screening process
- [ ] Document enhanced due diligence process
- [ ] Document ongoing CDD monitoring process
- [ ] Document suspicious activity escalation process
- [ ] Document SMR filing process (timeframes, who files, what to include)
- [ ] Document TTR filing process
- [ ] Document annual compliance report process
- [ ] Document record-keeping process (what, where, how long)
- [ ] Document training delivery and record-keeping process
- [ ] Document personnel due diligence process
- [ ] Document program review process (triggers, steps, documentation)

#### D. Approval & Implementation

- [ ] Present completed AML/CTF program to senior management / governing body
- [ ] Obtain formal approval (documented sign-off with date and signatory)
- [ ] Ensure program is accessible to all relevant staff
- [ ] Integrate forms into existing practice management systems where possible
- [ ] Schedule launch briefing for all staff

**UI Elements:**
- Checkboxes with progress bar per section (A, B, C, D)
- Overall program completion percentage
- Expand/collapse detail under each item with "AUSTRAC says..." guidance
- localStorage persistence
- "Export Progress" button (JSON download for backup)
- Print-friendly view

---

### 7.6 Governance Setup

**AUSTRAC requires THREE key governance roles.** In sole practices, one person may hold all roles:

> **AUSTRAC Source:** [Step 1: Establish your governance framework (Reform)](https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform)

| Role | Key Responsibilities | AUSTRAC Source |
|---|---|---|
| **AML/CTF Compliance Officer** | Day-to-day compliance oversight; reports to governing body at least annually; communicates with AUSTRAC | [Compliance Officer (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform) |
| **Senior Manager** | **Personally** approves risk assessment, AML/CTF policies, and updates; approves high-risk client relationships and PEP engagements; approves third-party reliance arrangements. **Cannot delegate these obligations.** | [Senior Manager (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/senior-manager-reform) |
| **Governing Body** | Exercises ongoing oversight of ML/TF/PF risk and compliance; receives CO reports at least annually; takes reasonable steps to ensure compliance; should have AML/CTF as a regular agenda item | [Governing Body (Reform)](https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governing-body-reform) |

**Sole Practitioners & Micro Practices:** If one person holds all three roles, they do not need to report to themselves, but remain responsible for all duties. See [AUSTRAC guidance for sole traders and micro businesses](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governance-and-oversight-sole-traders-and-micro-businesses-reform).

**Senior Manager — Specific Personal Obligations (cannot be delegated):**
- Approve the ML/TF/PF risk assessment and any updates
- Approve AML/CTF policies and any updates
- Approve or be informed of certain high-risk client relationships before they're entered into
- Approve written agreements with third parties for CDD reliance
- Approve provision of designated services to high-risk clients and PEPs

#### 7.6.1 Appoint Compliance Officer

**Eligibility Requirements (from AUSTRAC):**
- Must be a **fit and proper person**
- Must be employed or engaged by the practice at **management level** (authority-based, not number of reports)
- Must be an **Australian resident** if the practice has a permanent establishment in Australia
- For sole practitioners: you are the compliance officer
- For small practices: a partner or practice manager
- For larger firms: could be a risk manager, compliance manager, or dedicated AML officer
- **External compliance officers are permitted** if they have sufficient authority, resources, and expertise

**Appointment Process:**
1. Identify a suitable person
2. Conduct due diligence on the nominee (open-source searches, credit checks, reference checks, police checks)
3. Document the eligibility assessment
4. Formally appoint the person
5. Notify AUSTRAC within **14 days** of appointment

**Interactive Form — Compliance Officer Appointment:**

| Field | Input |
|---|---|
| Full name | Text |
| Position/Title | Text |
| Is this person at management level? | Yes/No |
| Is this person an Australian resident? | Yes/No |
| Due diligence conducted? | Checklist: open-source search, credit check, reference check, police check |
| Date of appointment | Date picker |
| Date AUSTRAC notified | Date picker |
| Approved by (senior management) | Text |

#### 7.6.2 Assign AML/CTF Roles

**Interactive Form — AML/CTF Roles Assignment:**

| Role | Responsibilities | Assigned To |
|---|---|---|
| AML/CTF Compliance Officer | Oversee day-to-day compliance, report to governing body annually, communicate with AUSTRAC | Text input |
| CDD Lead | Supervise client identification and verification for designated services | Text input |
| Suspicious Activity Escalation Point | Receive and assess internal escalations, decide on SMR filing | Text input |
| Training Coordinator | Plan and deliver AML/CTF training, maintain training records | Text input |
| Record Keeper | Maintain AML/CTF records, ensure 7-year retention | Text input |
| Senior Management / Governing Body | Approve AML/CTF program, receive annual compliance reports, oversee ML/TF/PF risk management | Text input |

> In sole practices or small firms, one person may fill multiple or all roles.

#### 7.6.3 Personnel Due Diligence

**Who Requires Due Diligence:**
Anyone performing roles relevant to AML/CTF obligations:
- Partners and directors
- Employed accountants who perform designated services
- Contractors and consultants performing AML/CTF functions
- Administrative staff involved in CDD or record keeping
- IT personnel managing compliance systems

**Due Diligence Measures:**

| Measure | When Required |
|---|---|
| Identity verification | All AML/CTF roles |
| Open-source / media searches | Compliance officer + high-risk roles |
| Reference checks | Compliance officer + high-risk roles |
| Credit checks | Compliance officer (recommended for others) |
| Police / criminal history check | Compliance officer (recommended for others) |
| Ongoing monitoring | All AML/CTF roles |

**Interactive Form — Personnel Due Diligence Record:**

| Field | Input |
|---|---|
| Staff member name | Text |
| Role | Dropdown |
| Identity verified? | Yes/No + date |
| Open-source search completed? | Yes/No + date |
| Reference check completed? | Yes/No + date |
| Credit check completed? | Yes/No + date |
| Police check completed? | Yes/No + date |
| Risk assessment of role | Low / Medium / High |
| Training completed? | Yes/No + date |
| Next review due | Date |

---

### 7.7 Enrolment Guide

**Content:**

**Step 1: Confirm You Are Captured**
- Link to "Am I Regulated?" service checker (Section 7.2)
- If you provide any of the 8 designated services, you must enrol

**Step 2: Prepare Your Information**
- ABN (Australian Business Number)
- Practice name and structure (sole trader, partnership, company, trust)
- Contact person details
- Nominated AML/CTF compliance officer details
- Description of designated services provided
- Practice address(es)

**Step 3: Enrol via AUSTRAC Online**
- Link to: [AUSTRAC Online](https://online.austrac.gov.au)
- Use the **AUSTRAC Business Profile Form (ABPF)** — see [ABPF Guide](https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/austrac-business-profile-form-abpf-guides)
- You will need: legal business name, ABN/ACN, registered office address, designated services description, key personnel details, compliance officer details, financial year information
- Enrolment opens **31 March 2026**
- Must be completed within **28 days** of first providing a designated service
- Latest possible date: **29 July 2026**
- After submission you receive a receipt number; AUSTRAC will email your unique **AUSTRAC Account Number (AAN)** once enrolment is confirmed
- If your business details change, AUSTRAC must be notified within **14 days**

**Step 4: Nominate Your Compliance Officer**
- Must notify AUSTRAC within 14 days of appointment

**Step 5: Confirm and Record**
- Save enrolment confirmation
- Record enrolment date

**Interactive Checklist:**
- [ ] Confirmed I provide at least one designated service
- [ ] Gathered all required practice information
- [ ] Appointed a compliance officer
- [ ] Enrolled via AUSTRAC Online
- [ ] Notified AUSTRAC of compliance officer
- [ ] Saved enrolment confirmation to records

**AUSTRAC Regulatory Expectation:** By 30 June 2026, AUSTRAC expects all Tranche 2 entities to have enrolled, adopted an AML/CTF program, trained staff, and implemented reporting systems. Regulatory intervention will focus on entities that fail to enrol or make no meaningful effort.

---

### 7.8 Customer Due Diligence (CDD)

**Overarching Principle:** You must conduct initial CDD **before providing a designated service** to a client. If CDD cannot be completed satisfactorily, you should consider whether to decline or cease providing the service.

**Important for Accountants:** CDD is only required for clients to whom you are providing a **designated service**. If a client only engages you for tax returns (exempt), you do not need to conduct AML/CTF CDD on that client — unless you also provide a designated service to them.

#### 7.8.1 Initial CDD — Individuals & Sole Traders

**What You Must Establish (on reasonable grounds):**
- The client's identity
- The identity of any person acting on the client's behalf and their authority
- The identity of any person on whose behalf the client is receiving the service
- Whether the client is a PEP or designated for TFS
- The nature and purpose of the business relationship or engagement

**Information to Collect:**
- Full legal name
- Date of birth
- Residential address (not a PO Box)
- For sole traders: ABN, trading name

**Verification — Acceptable Documents:**

| Category | Acceptable Documents |
|---|---|
| **Primary photographic ID** | Australian passport, driver's licence, proof-of-age card |
| **Primary non-photographic ID** | Australian birth certificate, citizenship certificate |
| **Secondary ID** | Medicare card, utilities bill (within 3 months), bank statement, government-issued letter |

**Interactive Form — Individual/Sole Trader CDD:**

| Field | Input |
|---|---|
| Client full name | Text |
| Date of birth | Date |
| Residential address | Text |
| Sole trader? | Yes / No |
| If sole trader — ABN | Text |
| If sole trader — Trading name | Text |
| Acting on own behalf? | Yes / No (if No → identify the principal) |
| Designated service(s) being provided | Multi-select (8 services) |
| ID Document 1 — Type | Dropdown |
| ID Document 1 — Number | Text |
| ID Document 1 — Issuer | Text |
| ID Document 1 — Expiry | Date |
| ID Document 2 — Type (if required) | Dropdown |
| PEP screening completed? | Yes / No + date |
| TFS screening completed? | Yes / No + date |
| Source of funds / wealth discussed? | Yes / No |
| Nature/purpose of engagement | Text |
| Client risk rating | Low / Medium / High |
| EDD required? | Yes / No (auto-flagged if High) |
| Simplified CDD applicable? | Yes / No (auto-flagged if Low with no EDD triggers) |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.2 Initial CDD — Companies

**What You Must Establish:**
- Company name and registration details (ACN/ABN)
- That the company exists (ASIC register, ABN lookup)
- The identity of **beneficial owners** (anyone owning or controlling 25%+ of the company)
- The identity of the person authorised to instruct on behalf of the company
- PEP/TFS status of all beneficial owners
- Nature and purpose of the engagement

**Interactive Form — Company CDD:**

| Field | Input |
|---|---|
| Company name | Text |
| ACN / ABN | Text |
| Registered address | Text |
| ASIC registration verified? | Yes / No + date |
| Designated service(s) being provided | Multi-select |
| Beneficial Owner 1 — Name | Text |
| Beneficial Owner 1 — Ownership % | Number |
| Beneficial Owner 1 — ID verified? | Yes / No |
| (Repeat for additional beneficial owners) | |
| Authorised representative — Name | Text |
| Authority documented? | Yes / No |
| PEP/TFS screening completed for all beneficial owners? | Yes / No |
| Source of funds | Text |
| Nature/purpose of engagement | Text |
| Client risk rating | Low / Medium / High |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.3 Initial CDD — Trusts (Including SMSFs)

> **AUSTRAC risk note:** Trusts are rated as a **high national money laundering risk** due to poor transparency. This includes family trusts, discretionary trusts, unit trusts, and SMSFs.

**What You Must Establish:**
- The full name of the trust
- That the trust exists (trust deed, ABN registration)
- The identity of **all beneficial owners**, including:
  - Individual trustees (or beneficial owners of corporate trustees)
  - **Settlor** (person who established the trust)
  - **Appointor** (person who can appoint/remove the trustee)
  - **Guardian or Protector** (if applicable)
  - Any person with effective control over the trust
- All **beneficiaries**, or if not individually identifiable, each **class** of beneficiaries
- For SMSFs: all members and their roles
- PEP/TFS status of all identified individuals
- Nature and purpose of the engagement

**Interactive Form — Trust/SMSF CDD:**

| Field | Input |
|---|---|
| Trust name | Text |
| Trust type | Dropdown: Discretionary / Unit / Family / Testamentary / SMSF / Hybrid / Other |
| ABN (if registered) | Text |
| Trust deed sighted? | Yes / No + date |
| Designated service(s) being provided | Multi-select |
| Trustee name(s) | Text (add multiple) |
| Trustee type | Individual / Corporate |
| If corporate trustee — beneficial owners identified? | Yes / No |
| Settlor name | Text |
| Settlor identity verified? | Yes / No |
| Appointor name | Text |
| Appointor identity verified? | Yes / No |
| Guardian/Protector name (if applicable) | Text |
| Beneficiaries identified? | Yes / By class / Not identifiable |
| Beneficiary names or class description | Text |
| For SMSF — all members listed? | Yes / No / N/A |
| PEP/TFS screening completed for all individuals? | Yes / No |
| Person acting on behalf of trust — Name | Text |
| Authority documented? | Yes / No |
| Source of funds | Text |
| Nature/purpose of engagement | Text |
| Client risk rating | Medium / High / Very High |
| EDD required? | Yes / No (auto-flagged for trusts) |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.4 Initial CDD — Partnerships

**Interactive Form — Partnership CDD:**

| Field | Input |
|---|---|
| Partnership name | Text |
| ABN | Text |
| Partnership type | General / Limited / Limited Liability |
| Designated service(s) being provided | Multi-select |
| Partner 1 — Name | Text |
| Partner 1 — Type | Individual / Entity |
| Partner 1 — ID verified? | Yes / No |
| (Repeat for additional partners) | |
| Authorised representative — Name | Text |
| Authority documented? | Yes / No |
| PEP/TFS screening completed? | Yes / No |
| Source of funds | Text |
| Client risk rating | Low / Medium / High |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.5 Initial CDD — Foreign Clients

**Additional Requirements for Foreign Clients:**
- All standard CDD steps apply
- **Enhanced due diligence is likely required** due to foreign jurisdiction risk
- Assess whether the client or funds originate from a high-risk jurisdiction (FATF grey/blacklist)
- Special attention for:
  - Foreign entities requesting Australian company or trust creation
  - Clients with complex international corporate structures
  - Clients with subsidiaries in secrecy jurisdictions
  - Cross-border financing arrangements

**Additional Form Fields:**

| Additional Field | Input |
|---|---|
| Client country of residence/incorporation | Dropdown (country list) |
| Is this a FATF high-risk jurisdiction? | Auto-flagged |
| Source of overseas funds | Text |
| Reason for requiring Australian entity/service | Text |
| Foreign ID document type | Text |
| Foreign ID — certified translation? | Yes / No / N/A |
| Enhanced due diligence applied? | Yes / No |
| EDD measures taken | Text |

#### 7.8.6 Simplified CDD (Low-Risk Clients) — ACCOUNTANT-SPECIFIC

**Purpose:** AUSTRAC guidance allows for simplified CDD for genuinely low-risk clients.

**When Simplified CDD May Apply:**
- Client is a well-known, long-standing client with a clear profile
- Service is routine and low-complexity (e.g., simple company setup for a known client)
- Client is an Australian individual or simple domestic entity
- No EDD triggers are present (no PEPs, no high-risk jurisdictions, no complex structures)
- Client risk rating is assessed as Low

**Simplified CDD Measures:**
- Collect baseline identity information
- Document the basis for the simplified assessment
- Retain the right to escalate to standard or enhanced CDD at any time

**Important:** Simplified CDD is **not** the same as no CDD. You still need to identify the client and form a reasonable view of their risk.

#### 7.8.7 Enhanced Due Diligence (EDD)

**When EDD Is Required:**

| Trigger | Accounting-Specific Example |
|---|---|
| High-risk client type | Complex trust structures, multi-layered corporate groups, offshore entities |
| PEP identified | Client or beneficial owner is a politically exposed person |
| High-risk jurisdiction | Client or funds from FATF grey/blacklisted country |
| Unusual engagement patterns | Client wants entity set up urgently with no clear business purpose |
| Unclear source of funds/wealth | Client's wealth inconsistent with known profile |
| Client refused by others | Client has been turned away by other accounting firms |
| Complex or unusual structures | Multi-jurisdictional arrangements with no apparent commercial rationale |
| Virtual asset involvement | Client's business involves cryptocurrency or digital assets |

**EDD Measures:**
- More detailed source-of-funds / source-of-wealth inquiries
- Additional identity verification documents
- Senior management / partner approval for the engagement
- Increased frequency of ongoing monitoring
- Independent verification of information provided
- Enhanced record keeping of rationale for proceeding

**Interactive Form — EDD Record:**

| Field | Input |
|---|---|
| Client name | Text |
| CDD form reference | Text |
| EDD trigger(s) | Multi-select checklist |
| Additional source-of-funds information obtained | Text |
| Additional documents collected | Text |
| Senior management / partner approval obtained? | Yes / No + name + date |
| Ongoing monitoring frequency set | Dropdown |
| Rationale for proceeding with engagement | Text |
| Completed by | Text |
| Date | Date |

#### 7.8.8 Ongoing CDD

**What Ongoing CDD Means for Accountants:**
- Keep client information **up to date** (especially for long-term clients)
- Monitor engagements for consistency with the client's known profile
- Be alert to **changes in risk** (new business activities, new jurisdictions, unusual requests)
- Re-verify identity if doubts arise
- Periodic reviews of higher-risk clients more frequently

**When to Re-Assess:**
- Client requests a new type of designated service
- Client's business structure changes significantly
- New information suggests a higher risk level
- Source of funds changes unexpectedly
- Adverse media about the client emerges
- Client introduces new beneficial owners or controllers

**Interactive Checklist — Ongoing CDD Review:**

- [ ] Client information is current (name, address, contact, structure)
- [ ] Engagement is consistent with client's known profile
- [ ] No new red flags or suspicious indicators identified
- [ ] Source of funds/wealth remains consistent
- [ ] PEP/TFS status re-checked
- [ ] Beneficial ownership information re-confirmed
- [ ] Risk rating reviewed and confirmed / updated
- [ ] Review date recorded

#### 7.8.9 PEP & Sanctions Screening

**Screening Process:**
1. Ask the client (or their representative) whether they are a PEP or associated with a PEP
2. Check the DFAT Consolidated List for sanctions matches
3. Document the screening result
4. If PEP → apply EDD
5. If sanctioned person → **do not proceed** and seek legal advice

**Interactive Form — PEP/TFS Screening Record:**

| Field | Input |
|---|---|
| Client name | Text |
| PEP self-declaration obtained? | Yes / No |
| Is client a PEP? | Yes / No / Uncertain |
| PEP type | Domestic / Foreign / International Organisation |
| DFAT Consolidated List checked? | Yes / No + date |
| Sanctions match found? | Yes / No |
| Action taken | EDD applied / Service declined / Seek advice |
| Screened by | Text |
| Date | Date |

#### 7.8.10 Beneficial Ownership Identification — NEW PAGE

**Purpose:** Dedicated guidance on identifying beneficial owners across entity types — a critical area for accountants who regularly set up and restructure entities.

**Why This Matters for Accountants:**
Accountants create companies, trusts, and other structures daily. Identifying the true beneficial owner is essential because criminals exploit complex structures to hide ownership and launder money.

**Beneficial Owner Identification by Entity Type:**

| Entity Type | Who Are the Beneficial Owners? |
|---|---|
| **Company** | Any individual who directly or indirectly owns or controls 25%+ of the company; any individual who exercises effective control over the company |
| **Trust** | Trustees, settlor, appointor, guardian/protector, beneficiaries (or classes of beneficiaries), anyone with effective control |
| **Partnership** | All partners (or beneficial owners of entity partners) |
| **SMSF** | All members (as both trustees/directors and beneficiaries) |
| **Multi-layered structures** | Trace through each layer until you reach the natural person(s) who ultimately own or control the structure |

**The 25% Threshold:**
A person is generally considered a beneficial owner if they directly or indirectly own or control **25% or more** of a company's shares or voting rights, or if they exercise **significant influence or control** over the entity (even without meeting the ownership threshold).

For **discretionary trusts**, beneficial owners include persons who:
- Received distributions in the last 3 years
- Are likely to receive distributions
- Exert significant influence over the trust

**Upcoming: Australian Beneficial Ownership Register:**
Australia is implementing a **Commonwealth-operated beneficial ownership register** for unlisted companies. Stage 1 access will prioritise regulators, law enforcement, AML/CTF reporting entities, journalists, and academics. This register will become a valuable tool for accountants conducting CDD on company clients in the future.

**Red Flags for Beneficial Ownership:**
- Client is unwilling to disclose beneficial owners
- Ownership traced to a jurisdiction with corporate secrecy laws
- Nominee shareholders or bearer shares used
- Multiple layers of entities with no clear commercial purpose
- Circular ownership structures

#### 7.8.11 Delayed CDD (Accountant-Specific) — NEW PAGE

**Purpose:** Explain when and how CDD verification can be delayed for accounting engagements.

> **AUSTRAC Source:** [Delayed initial customer due diligence (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform)

**When You May Delay CDD:**
You may delay initial CDD if **both** conditions are met:

1. You determine on reasonable grounds that there is **low additional ML/TF/PF risk** if you delay
2. Delaying is **essential to avoid interrupting the ordinary course of business**

**Accounting Examples Where Delay May Be Appropriate:**
- An urgent company incorporation where the client cannot provide original ID documents until the next business day
- A time-sensitive M&A transaction where a short delay in CDD completion would not change the risk profile
- An existing long-standing client requests a new designated service at short notice

**Mandatory Completion Rules:**
- CDD must be completed **as soon as reasonably practicable** after you start providing the service
- Must be completed no later than the timeframes in the AML/CTF Rules 2025
- **Civil penalties apply** for failing to verify within required timeframes

**Your AML/CTF Program Must Include:**
- When it is appropriate to delay CDD
- How you will manage and mitigate ML/TF/PF risks during the delay
- A process for what happens if CDD reveals concerns after you've started (e.g., cease engagement, file SMR)

**Interactive Checklist — Delayed CDD Record:**

| Field | Input |
|---|---|
| Client name | Text |
| Designated service being provided | Dropdown (8 services) |
| Reason for delay | Text |
| Low ML/TF/PF risk assessment documented? | Yes / No |
| Delay essential to avoid interrupting business? | Yes / No |
| Date service commenced | Date |
| CDD completion target date | Date |
| CDD actually completed date | Date |
| Any concerns identified after completion? | Yes / No |
| Action taken if concerns found | Text |

---

#### 7.8.12 Third-Party Reliance Arrangements — NEW PAGE

**Purpose:** Explain when and how you can rely on another party's CDD.

> **AUSTRAC Source:** [Reliance under customer due diligence arrangements (Reform)](https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform)

**What Is Third-Party Reliance?**
You may rely on CDD information collected and verified by another reporting entity, rather than conducting CDD yourself from scratch.

**Accounting Example:**
A law firm has already verified the identity of a client as part of a business sale. As the accountant advising on the same transaction, you may rely on the lawyer's CDD rather than re-verifying the client yourself.

**Eligible Third Parties:**
- A reporting entity regulated under Australian AML/CTF law
- A foreign business subject to AML/CTF regulation implementing FATF recommendations

**Before Entering a Reliance Arrangement, You Must:**
1. Assess whether the arrangement is appropriate to your own ML/TF/PF risks
2. Evaluate the third party's ML/TF risk assessment, countries of operation, client types, and business complexity
3. Review any published disciplinary actions, adverse media, or evaluation findings about the third party
4. Agree on CDD standards appropriate to the client's risk level
5. Document the arrangement in your AML/CTF program

**Critical Rule:** You **remain responsible** for ensuring CDD obligations are met. If the third party's CDD was inadequate, you are still liable.

**Interactive Form — Third-Party Reliance Record:**

| Field | Input |
|---|---|
| Client name | Text |
| Third party relied upon — Name/Firm | Text |
| Third party is a reporting entity? | Yes / No |
| Third party's jurisdiction | Text |
| Assessment of third party's ML/TF risk framework completed? | Yes / No |
| CDD standards agreed? | Yes / No |
| Arrangement documented in AML/CTF program? | Yes / No |
| Date of reliance | Date |
| CDD information received | Text |

---

#### 7.8.13 When CDD Cannot Be Completed — NEW PAGE

**Purpose:** Guide accountants on what to do when a client refuses or is unable to complete CDD.

> **AUSTRAC Source:** [CDD before providing a designated service](https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service)

**When CDD Fails, Consider:**

| Scenario | Recommended Action |
|---|---|
| Client refuses to provide ID | Decline the engagement. Consider filing an SMR if the refusal is suspicious. |
| Client provides inconsistent or fraudulent documents | Do not proceed. Escalate internally. File an SMR. |
| Beneficial owner cannot be identified | Do not proceed until beneficial owners are identified. Apply EDD. |
| Client is on the DFAT sanctions list | **Do not proceed under any circumstances.** Seek legal advice. |
| CDD reveals a PEP | Do not automatically decline — apply EDD and obtain partner/senior management approval. |
| CDD reveals high-risk jurisdiction | Apply EDD. May proceed if risk can be adequately mitigated and documented. |
| Source of funds cannot be verified | Consider declining. If proceeding, apply EDD and document rationale. File SMR if suspicious. |
| Client wants entity created urgently to avoid CDD | This is itself a red flag. Escalate. Consider filing an SMR. |

**Accountant-Specific Note:** Unlike real estate (where a transaction may already be in motion), many accounting designated services can be paused or declined before any work is done. You generally have more ability to decline upfront.

**Interactive Form — CDD Outcome Record:**

| Field | Input |
|---|---|
| Client name | Text |
| Designated service requested | Dropdown (8 services) |
| CDD issue encountered | Dropdown: Refused ID / Inconsistent docs / Beneficial owner unclear / Sanctions match / PEP identified / High-risk jurisdiction / Source of funds unverifiable / Urgency to avoid CDD / Other |
| Detail of issue | Text |
| Action taken | Dropdown: Engagement declined / EDD applied and proceeded / SMR filed / Sanctions freeze / Seek legal advice |
| Rationale for decision | Text |
| Senior management / partner approval (if proceeding) | Yes / No + name + date |
| SMR filed? | Yes / No |
| Documented by | Text |
| Date | Date |

---

#### 7.8.14 Privacy Obligations & CDD Data — NEW PAGE

**Purpose:** Brief guidance on how AML/CTF data collection intersects with the Australian Privacy Principles (APPs).

**Key Points:**
- When collecting personal information for CDD, you are doing so under a **legal obligation** (AML/CTF Act). This is a permitted purpose under the APPs.
- You should **only collect information that is reasonably necessary** for CDD purposes.
- CDD data must be **stored securely** and protected from unauthorised access, loss, or misuse.
- You must **not use CDD information for marketing** or any purpose unrelated to your AML/CTF obligations.
- Clients have a right to know **why** you are collecting their information. You can explain that it is required under Australian AML/CTF law.
- Clients do **not** have a right to refuse CDD collection — but you must handle their data in accordance with the APPs.
- SMR-related records must be handled with **additional care** due to the tipping-off prohibition.

**Accountant-Specific Note:** Many accounting firms already collect significant personal and financial information from clients for tax and compliance purposes. AML/CTF CDD data should be integrated into existing secure record-keeping systems but clearly flagged as AML/CTF records for the 7-year retention requirement.

**Privacy Notice Template:**
```
We are required by Australian Anti-Money Laundering and Counter-Terrorism 
Financing (AML/CTF) law to collect and verify your identity information 
before providing certain services. This information will be stored securely, 
used only for AML/CTF compliance purposes, and retained for a minimum of 
7 years as required by law. For more information, please refer to our 
Privacy Policy.
```

---

### 7.9 Client Risk Rating Guide — ACCOUNTANT-SPECIFIC PAGE

**Purpose:** Help accountants assign risk ratings to clients based on AUSTRAC's framework, with worked examples from the AUSTRAC starter kit.

#### Worked Example 1: LOW Risk — Plumber Setting Up a Company

**Scenario:** An Australian individual (sole trader plumber) engages you to set up a private company (Pty Ltd) as sole director and shareholder. They have been your tax return client for 5 years.

**Risk Assessment:**
- Client risk: **Low** — known individual, Australian, simple profile, not a PEP
- Service risk: **Low** — straightforward company incorporation (Service 6)
- Delivery channel risk: **Low** — face-to-face meeting, existing client relationship
- Geographic risk: **Low** — domestic only, no foreign connections

**Overall rating: LOW**

**CDD approach:** Simplified CDD may be appropriate. Verify identity (driver's licence already on file), confirm ABN, check sanctions list, assign low risk rating. No enhanced measures required.

#### Worked Example 2: MEDIUM Risk — Online Enquiry for Trust Setup

**Scenario:** A new client contacts you online requesting setup of a discretionary trust with a corporate trustee. The client says they are acting on behalf of an overseas family member. They have provided an email and phone number but no physical address.

**Risk Assessment:**
- Client risk: **Medium-High** — new client, acting on behalf of a third party, overseas connection
- Service risk: **Medium** — trust and company creation (Services 6)
- Delivery channel risk: **High** — entirely online, non-face-to-face
- Geographic risk: **Medium** — overseas family member involved

**Overall rating: MEDIUM**

**CDD approach:** Standard CDD required. Verify identity of both the client and the overseas family member. Identify beneficial owners. Request meeting (phone or video at minimum). Apply enhanced measures if any further red flags emerge.

#### Worked Example 3: HIGH Risk — Complex Structure with Overseas Links

**Scenario:** A new client requests you to set up a multi-layered corporate structure: an offshore holding company, an Australian subsidiary company, and a discretionary trust. The client is a foreign national, the source of funds is from a FATF grey-listed country, and the stated purpose is "investment." The client declines to explain the commercial rationale.

**Risk Assessment:**
- Client risk: **Very High** — foreign national, unclear source of wealth, evasive
- Service risk: **High** — multi-entity creation with no clear rationale (Service 6)
- Delivery channel risk: **High** — remote engagement
- Geographic risk: **Very High** — FATF grey-listed jurisdiction, complex cross-border structure

**Overall rating: HIGH**

**CDD approach:** Enhanced due diligence required. Senior partner approval needed. Detailed source-of-funds/source-of-wealth investigation. May need to decline the engagement if concerns cannot be resolved. Consider filing an SMR regardless of whether you proceed.

---

### 7.10 Suspicious Activity & Red Flags — ACCOUNTANT-SPECIFIC

**Purpose:** Help accountants recognise warning signs of money laundering specific to professional services — aligned to AUSTRAC's 4 risk categories from their official "Risk insights and indicators of suspicious activity for accountants" guidance.

**Context:** AUSTRAC states that criminals exploit accountants' professional expertise to create **distance from illegal proceeds** using intermediaries, third-party involvement, and complex business structures. Accountants may **unknowingly assist** money laundering through designated services.

#### Category 1: Client Risk Indicators

| Red Flag | Detail |
|---|---|
| Client obscures purpose of a transaction | Vague or shifting explanations for why they need a structure or service |
| Client obscures ownership details | Reluctant to disclose beneficial owners; provides inconsistent information |
| Complex structures with no commercial rationale | Multi-layered entities with no apparent business purpose |
| Client is inconsistent with their profile | A low-income individual seeking to set up multiple companies |
| Client connected to high-risk industries | Cash-intensive businesses, gambling, cryptocurrency, adult services |
| Client has been refused by other professionals | Mentions being turned away by other accountants or lawyers |
| Client pressures for rapid entity creation | Urgency with no clear business deadline |
| Client introduces unexpected third parties | Unknown individuals appear as directors, trustees, or beneficial owners |
| Client's instructions are received from unidentified persons | Someone other than the client directs the engagement |
| Client is unwilling to meet in person | Avoids face-to-face meetings even for significant engagements |

#### Category 2: Service/Transaction Risk Indicators

| Red Flag | Detail |
|---|---|
| Entity created and immediately used for a large transaction | Company incorporated and used to purchase property within days |
| Multiple entities created with same or similar structures | Pattern of creating shell companies or trusts |
| Nominee director/secretary arrangements for unknown clients | Being asked to act as or arrange nominees for clients you don't know well |
| Registered office for entities with no physical presence | Client entity has no employees, premises, or operations |
| Funds flowing through trust accounts with no clear purpose | Client money passes through but the underlying transaction is unclear |
| Shelf companies requested with urgency | Need for immediate, pre-formed companies |
| Restructuring designed to hide ownership | Changes made to move beneficial ownership behind additional layers |
| Financing arrangements that don't match the business profile | Loan applications that don't align with the client's actual business |
| Client seeks advice on how to avoid reporting thresholds | Questions about keeping cash amounts below $10,000 |

#### Category 3: Delivery Channel Risk Indicators

| Red Flag | Detail |
|---|---|
| Entirely non-face-to-face engagement | Client never meets the accountant in person for significant services |
| Instructions from encrypted or untraceable channels | Client insists on communicating only via encrypted messaging |
| Third-party intermediary provides all instructions | Client is shielded behind other professionals or agents |
| Engagement initiated by an overseas referral with no context | Foreign introducer sends a client with minimal background information |
| Client uses multiple communication channels inconsistently | Different instructions received via different channels |

#### Category 4: Foreign Jurisdiction Risk Indicators

| Red Flag | Detail |
|---|---|
| Funds from high-risk jurisdictions | Money originates from FATF grey/blacklisted countries |
| Complex international corporate structures | Multiple layers of overseas entities with unclear purpose |
| Client has subsidiaries in secrecy jurisdictions | Shell companies in tax havens with no operational substance |
| Foreign national seeking Australian entity creation with no Australian connection | No business, family, or residency ties to Australia |
| Cross-border transactions with no clear commercial rationale | Money flowing between jurisdictions without business justification |
| Client uses foreign nominees to hold Australian assets | Overseas individuals acting as nominees for Australian property or entities |

**"What Should I Do?" Action Guidance:**

```
1. STOP — Do not tip off the client about your concerns.
2. DOCUMENT — Record your observations and concerns in writing.
3. ESCALATE — Report your concerns to your AML/CTF compliance officer 
   or the designated escalation point within your practice.
4. ASSESS — The compliance officer assesses whether an SMR should be filed.
5. REPORT — If grounds exist, file an SMR with AUSTRAC within the 
   required timeframe.
6. CONSIDER — Whether to continue, limit, or terminate the engagement.
7. CONTINUE MONITORING — Even if no SMR is filed, continue monitoring.
```

---

### 7.11 Reporting to AUSTRAC

#### 7.11.1 Suspicious Matter Reports (SMRs)

**When You Must File:**
An SMR must be submitted if you suspect, on **reasonable grounds**, that:
- A client or matter may be linked to money laundering, terrorism financing, or proliferation financing
- A client is not who they claim to be
- Information you hold may be relevant to the investigation of a crime (including tax evasion, fraud, bribery, corruption)
- A transaction has no clear business purpose or seems unusual for the client

**"Reasonable grounds"** = an objective standard. Would a reasonable person with similar knowledge and experience reach the same suspicion?

**Key SMR Rules:**
- Submit a **separate SMR for each new suspicion**
- Reference previous SMRs on the same client
- Obligations apply even if you **decline** the engagement
- Suspicion is sufficient — you do not need certainty

**Timeframes:**

| Scenario | Deadline |
|---|---|
| Suspicion relates to **terrorism financing** | Within **24 hours** |
| All other suspicions | Within **3 business days** |

**What to Include:** Firm details, staff details, comprehensive client information, details of the suspicious activity, transaction details, supporting evidence.

**Accounting-Specific Example:**
> A new client asks you to set up a company and a trust with a corporate trustee. The client wants the entity structures completed within 48 hours and is vague about the business purpose. When asked about beneficial owners, the client names individuals you cannot independently verify and who appear to be based in a FATF-blacklisted jurisdiction. The compliance officer should file an SMR regardless of whether the firm proceeds with the engagement.

#### 7.11.2 Threshold Transaction Reports (TTRs)

**When You Must File:**
A TTR is required when your practice receives **$10,000 or more in physical currency** (cash, banknotes, or coins — Australian or foreign equivalent) in a single transaction or matter.

**Timeframe:** Within **10 business days**

**Accounting-Specific Note:** While cash payments to accounting firms are uncommon, they can occur (e.g., a cash-intensive business client pays fees in cash). The obligation applies regardless of whether the cash payment seems legitimate.

**Structuring Warning:**
If a client appears to be **breaking up cash payments** into amounts just under $10,000, this is **structuring** and is itself a criminal offence. It should also trigger an SMR.

#### 7.11.3 International Funds Transfer Instructions (IFTIs) — NOTE FOR ACCOUNTANTS

**Do IFTIs Apply to Accountants?**

IFTI reports are required when a reporting entity sends or receives instructions to transfer money **into or out of Australia**. This obligation is most relevant to financial institutions and remittance dealers.

**When It May Apply to Accountants:**
- If your practice holds client funds in a trust account (Designated Service 3) and receives **international wire transfers** into that trust account, you may have IFTI reporting obligations
- If you facilitate or instruct international fund transfers as part of a designated service engagement

**Timeframe:** Within **10 business days** of the instruction being sent or received.

**Practical Note:** Most small-to-medium accounting practices will not encounter IFTI obligations. However, practices that regularly manage client funds with international elements should include IFTIs in their AML/CTF program. If in doubt, seek AUSTRAC guidance.

> **AUSTRAC Source:** [International Funds Transfer Instructions (IFTIs) reporting](https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/international-funds-transfer-instructions-iftis-reporting)

#### 7.11.4 Annual AML/CTF Compliance Report — ACCOUNTANT-SPECIFIC

**Purpose:** Accounting practices must submit an annual compliance report to AUSTRAC demonstrating how the firm is meeting its AML/CTF obligations.

**What to Include:**
- Confirmation of AML/CTF program maintenance
- Summary of risk assessment reviews
- Training completion records
- Number of SMRs/TTRs filed during the period
- Any program changes made during the period
- Independent evaluation status
- Compliance officer details

**Interactive Checklist — Annual Report Preparation:**

- [ ] AML/CTF program reviewed and current
- [ ] Risk assessment reviewed and updated
- [ ] All staff training completed and recorded
- [ ] All SMRs filed within required timeframes
- [ ] All TTRs filed within required timeframes
- [ ] Record-keeping obligations met
- [ ] Personnel due diligence up to date
- [ ] Independent evaluation on schedule
- [ ] Compliance officer details current with AUSTRAC
- [ ] Report drafted and ready for submission

#### 7.11.5 Tipping-Off Prohibition

> **AUSTRAC Source:** [Tipping Off](https://www.austrac.gov.au/about-us/amlctf-reform/current-reporting-entities/tipping-off)

**Critical Legal Requirement:**

You **MUST NOT** disclose to the client or any other person that:
- You have filed or intend to file an SMR
- You suspect or have formed a suspicion about the client
- AUSTRAC is investigating or may investigate the client
- You have received an AUSTRAC notice under sections 49 or 49B
- Any information from which it could reasonably be inferred that an SMR was submitted

**Penalties:**
- Maximum **2 years imprisonment**
- Maximum **120 penalty units** (currently ~$39,600 for individuals)
- Or both

This is a **criminal offence** under Section 123 of the AML/CTF Act.

**What You CAN Disclose (Permitted Exceptions):**

| Permitted Disclosure | Condition |
|---|---|
| **Internal compliance officer** | Discussing concerns within your practice for compliance purposes |
| **External auditors** | Sharing information with your firm's external auditors |
| **Legal advice** | Seeking professional legal advice (covered by confidentiality) |
| **Foreign group members** | Sharing with foreign members of the same corporate/designated business group, **only if** they are regulated under laws implementing FATF recommendations |
| **AUSTRAC-entrusted persons** | Sharing with persons authorised by AUSTRAC |
| **Terminating a relationship** | You CAN inform a client that you've made a risk-based decision to terminate a business relationship — provided the discussion does not reasonably infer that an SMR was submitted |

**Accountant-Specific Considerations:**
- You may need to continue providing services to the client while an SMR is filed — the tipping-off prohibition means you cannot tell the client why you might be asking additional questions
- You CANNOT discuss SMR details with the client, their other advisors, or colleagues who don't need to know
- Be careful in multi-partner practices — only share on a need-to-know basis

---

### 7.12 Record Keeping

**Records to Retain:**

| Record Type | Examples |
|---|---|
| **Client identification records** | CDD forms, copies of ID documents, beneficial owner records, PEP/TFS screening results |
| **Engagement records** | Engagement letters for designated services, scope of work, instructions |
| **Transaction records** | Entity incorporation records, trust deeds, financing documents, restructuring records |
| **AML/CTF program documentation** | Risk assessment, policy document, process document, governance records |
| **Reporting records** | Internal copies of SMRs, TTRs, annual compliance reports; internal escalation records |
| **Training records** | Attendance records, training materials, quiz results, training dates |
| **Personnel records** | Due diligence records for AML/CTF roles, compliance officer appointment |
| **Review records** | Program review records, independent evaluation reports, change logs |

**Retention Period:** Minimum **7 years** from when the record was made or the client relationship ended (whichever is later).

**Accountant-Specific Note:** Many accounting practices already retain client files for 7 years under professional standards. AML/CTF records should be integrated into existing file retention practices but may require additional categories (e.g., PEP screening records, SMR copies).

**Interactive Checklist — Record Keeping Self-Audit:**

- [ ] All CDD forms are being saved systematically
- [ ] ID document copies are stored securely
- [ ] Engagement records for designated services are retained
- [ ] SMR/TTR/compliance report copies are kept separately (tipping-off protection)
- [ ] Training records include dates, attendees, and content covered
- [ ] Personnel due diligence records are maintained
- [ ] Program review records document changes and approvals
- [ ] All records are set for minimum 7-year retention
- [ ] Storage method is secure and privacy-compliant
- [ ] Records can be retrieved within a reasonable timeframe

---

### 7.13 Staff Training & Awareness

#### 7.13.1 Training Plan Builder

**Who Needs Training:**
- All partners and directors
- Employed accountants who perform designated services
- Administrative staff involved in CDD, record keeping, or client onboarding
- Compliance officer (additional specialised training)
- Contractors and consultants performing AML/CTF functions
- New hires (before performing designated services)

**Training Modules:**

| Module | Content | For Whom |
|---|---|---|
| 1. ML/TF/PF Overview | What is money laundering, terrorism financing, proliferation financing? Why are accountants a target? The gatekeeper role. | All staff |
| 2. The 8 Designated Services | Which services trigger AML/CTF obligations? How to identify when you're providing one. | All staff |
| 3. Legal Obligations | Overview of AML/CTF Act obligations for accountants | All staff |
| 4. Your Practice's AML/CTF Program | Walk through the firm's specific risk assessment, policies, and processes | All staff |
| 5. Customer Due Diligence | How to perform CDD for individuals, companies, trusts, and partnerships | Client-facing staff |
| 6. Beneficial Ownership | How to identify beneficial owners for complex structures | Client-facing staff |
| 7. PEP & Sanctions Screening | What PEPs and TFS are; screening process; action on match | Client-facing staff, compliance officer |
| 8. Client Risk Rating | How to assign risk ratings; worked examples (low/medium/high) | Client-facing staff |
| 9. Red Flags & Suspicious Activity | AUSTRAC's accountant-specific red flag indicators; how to recognise exploitation | All staff |
| 10. Reporting Obligations | SMRs, TTRs, annual compliance report; internal escalation | All staff |
| 11. Tipping-Off Prohibition | What you must not disclose; penalties | All staff |
| 12. Record Keeping | What to keep, how, for how long | Admin staff, compliance officer |
| 13. Ongoing CDD & Monitoring | Ongoing monitoring; when to re-assess risk | Client-facing staff |
| 14. Program Review & Evaluation | Review triggers; independent evaluation planning | Compliance officer, partners |

#### 7.13.2 Staff Knowledge Quiz — 15 Questions

**Example Questions:**

1. *Which of the following is a designated service for accountants?*
   - a) Preparing a tax return
   - b) Processing payroll
   - c) Setting up a company for a client
   - d) Preparing a BAS
   - **Answer: c (Service 6 — creating a body corporate)**

2. *A client asks you to set up 5 companies in 3 days and won't explain the business purpose. What should you do?*
   - a) Proceed — the client is paying
   - b) Treat this as a red flag, conduct enhanced due diligence, and escalate if concerns remain
   - **Answer: b**

3. *You file an SMR about a client. Can you tell the client?*
   - a) Yes, they have a right to know
   - b) No — disclosing an SMR is a criminal offence (tipping off)
   - **Answer: b**

4. *Your practice only prepares tax returns and BAS. Are you captured by the AML/CTF reforms?*
   - a) Yes — all accounting practices are captured
   - b) No — tax returns and BAS are not designated services
   - **Answer: b**

5. *A new client requests entity creation. They are evasive about who the beneficial owners are and mention the entity will hold Australian property on behalf of overseas investors. What risk level does this indicate?*
   - a) Low
   - b) Medium
   - c) High — complex structure, foreign beneficial owners, evasive client
   - **Answer: c**

6. *How long must you keep CDD records?*
   - a) 3 years
   - b) 5 years
   - c) 7 years
   - d) 10 years
   - **Answer: c**

7. *A client from a FATF grey-listed country asks you to set up an Australian trust. What should you do?*
   - a) Refuse immediately
   - b) Proceed normally
   - c) Apply enhanced due diligence, verify source of funds, assess the engagement carefully
   - **Answer: c**

8. *When must you file an SMR if the suspicion relates to terrorism financing?*
   - a) Within 3 business days
   - b) Within 10 business days
   - c) Within 24 hours
   - **Answer: c**

9. *A client offers to pay your $12,000 fee in cash. What must you do?*
   - a) Accept and proceed normally
   - b) Accept but file a TTR with AUSTRAC within 10 business days
   - **Answer: b**

10. *What is a "shelf company" and why is selling one a designated service?*
    - a) A company that sells shelves
    - b) A pre-registered company with no activity, sold to clients — it's designated because shell companies can be used to launder money
    - **Answer: b**

11. *Can you apply simplified CDD to a low-risk client?*
    - a) Yes — AUSTRAC allows reduced measures for genuinely low-risk clients, but you must still identify them and document the assessment
    - b) No — all clients require the same level of CDD
    - **Answer: a**

12. *Who must be appointed to oversee your AML/CTF program?*
    - a) An external lawyer
    - b) An AML/CTF compliance officer at management level
    - c) The most junior staff member
    - **Answer: b**

13. *How often must an independent evaluation of your AML/CTF program be conducted?*
    - a) Every year
    - b) Every 2 years
    - c) At least every 3 years
    - **Answer: c**

14. *You suspect a client is using your services to structure a transaction to avoid reporting thresholds. What should you do?*
    - a) Help them — it's their money
    - b) Recognise structuring as a criminal offence and a red flag; escalate internally and consider filing an SMR
    - **Answer: b**

15. *An existing tax-return-only client asks you to also set up a trust. Does this change your AML/CTF obligations for this client?*
    - a) No — they are an existing client
    - b) Yes — trust creation is a designated service (Service 6); you now need to conduct CDD on this client for the designated service
    - **Answer: b**

---

### 7.14 Program Review & Maintenance

**AUSTRAC Requirement:** Your AML/CTF program must remain current. Regular reviews are required.

#### Review Triggers

| Trigger | Example |
|---|---|
| **Scheduled periodic review** | Your program specifies reviews every 6 or 12 months |
| **Changes to designated services** | You start offering trust creation (Service 6) when you previously only did financing (Service 4) |
| **Changes to client types** | You begin servicing overseas clients or clients in high-risk industries |
| **Changes to jurisdictions** | You begin dealing with clients linked to new high-risk jurisdictions |
| **Internal incidents or control failures** | A CDD step was missed; a suspicious activity was not escalated |
| **Regulatory or legislative updates** | AUSTRAC issues new guidance or Rules change |
| **New or emerging ML/TF/PF risks** | New typologies identified by AUSTRAC or law enforcement |
| **AUSTRAC communications** | AUSTRAC issues a sector alert, NRA update, or direct regulatory feedback |
| **Adverse independent evaluation findings** | An evaluator identifies gaps or weaknesses |
| **Significant practice changes** | New partner, office relocation, practice merger, new technology platforms |

#### Review Checklist & Change Log

Same structure as the real estate version (interactive checklists, localStorage, exportable).

---

### 7.15 Independent Evaluation Planning

**AUSTRAC Requirement:** Independent evaluation at least once every **3 years**. Evaluator must be independent of the program.

**Accountant-Specific Consideration:** Many accounting practices may choose to have their AML/CTF program evaluated by another accounting firm (peer review), an external compliance consultant, or an internal audit function (for larger firms).

**Interactive Planning Form:**

| Field | Input |
|---|---|
| First evaluation due by | Date (3 years from program commencement) |
| Evaluator type | External compliance consultant / Peer review (another firm) / Internal audit |
| Evaluator name/firm | Text |
| Confirmed independent of program? | Yes / No |
| Scope agreed | Text |
| Estimated cost | Text |
| Status | Not started / Planning / In progress / Completed |
| Findings summary | Text |
| Adverse findings? | Yes / No |
| Remediation actions | Text |
| Remediation completed? | Yes / No + date |

---

### 7.16 Forms & Templates Library

**All Interactive Forms:**

| # | Form Name | Used In | Purpose |
|---|---|---|---|
| 1 | CDD — Individual / Sole Trader | 7.8.1 | Client identification for individuals |
| 2 | CDD — Company | 7.8.2 | Client identification for companies |
| 3 | CDD — Trust / SMSF | 7.8.3 | Client identification for trusts and SMSFs |
| 4 | CDD — Partnership | 7.8.4 | Client identification for partnerships |
| 5 | CDD — Foreign Client (Supplement) | 7.8.5 | Additional fields for foreign clients |
| 6 | Simplified CDD Record | 7.8.6 | Document basis for simplified CDD |
| 7 | Enhanced Due Diligence Record | 7.8.7 | Document EDD measures applied |
| 8 | Ongoing CDD Review | 7.8.8 | Periodic client review checklist |
| 9 | PEP/TFS Screening Record | 7.8.9 | PEP and sanctions screening |
| 10 | Beneficial Ownership Record | 7.8.10 | Trace and record beneficial owners |
| 11 | Client Risk Rating Record | 7.9 | Assign and document risk rating |
| 12 | Compliance Officer Appointment | 7.6.1 | CO eligibility and appointment |
| 13 | AML/CTF Roles Assignment | 7.6.2 | Assign AML/CTF responsibilities |
| 14 | Personnel Due Diligence Record | 7.6.3 | Staff due diligence |
| 15 | Training Plan | 7.13.1 | Plan training modules and audiences |
| 16 | Training Attendance Record | 7.13.1 | Record training completion |
| 17 | Program Review Record | 7.14 | Document program reviews |
| 18 | Change Log | 7.14 | Track all program changes |
| 19 | Independent Evaluation Plan | 7.15 | Plan and record evaluations |
| 20 | Suspicious Activity Log | 7.10 | Internal suspicious activity record |
| 21 | SMR Decision Record | 7.11.1 | Document SMR filing decision |
| 22 | Annual Compliance Report Prep | 7.11.3 | Annual report preparation checklist |
| 23 | Enrolment Checklist | 7.7 | Track enrolment steps |
| 24 | Risk Assessment Summary | 7.4 | Output of risk assessment wizard |
| 25 | Designated Service Register | 7.2 | Record which services the practice provides |

---

### 7.17 Jargon Buster (Glossary)

All terms from the real estate glossary, plus the following accountant-specific additions:

| Term | Plain English Meaning |
|---|---|
| **Body Corporate** | A company or other incorporated entity (e.g., Pty Ltd, Ltd) |
| **Legal Arrangement** | A trust, partnership, or other non-incorporated structure |
| **Shelf Company** | A company that has been registered but never traded — "off the shelf" and ready to use |
| **Nominee** | A person who acts on behalf of another person in a formal role (e.g., nominee director, nominee shareholder) |
| **Settlor** | The person who establishes a trust by transferring property to the trustee |
| **Appointor** | The person who has the power to appoint or remove the trustee of a trust |
| **SMSF** | Self-Managed Superannuation Fund — a type of trust structure for retirement savings |
| **Tranche 2** | The second wave of AML/CTF reforms, extending obligations to accountants, lawyers, real estate agents, etc. |
| **Gatekeeper** | A professional (like an accountant) whose services can be exploited by criminals to gain access to the financial system or legitimise illegal funds |
| **Professional Enabler** | A professional who — wittingly or unwittingly — facilitates money laundering through their services |
| **Simplified CDD** | Reduced due diligence measures permitted for genuinely low-risk clients |
| **Annual Compliance Report** | A yearly report to AUSTRAC demonstrating how the practice is meeting its AML/CTF obligations |
| **Registered Office** | The official address of a company as registered with ASIC |
| **Restructuring** | Changing the legal or ownership structure of a body corporate or legal arrangement |

---

### 7.18 FAQ — ACCOUNTANT-SPECIFIC

| # | Question | Short Answer |
|---|---|---|
| 1 | I only do tax returns and BAS. Am I captured? | No. Tax returns and BAS are not designated services. You are likely exempt. |
| 2 | I do tax returns AND set up companies for clients. Am I captured? | Yes. Company creation is a designated service (Service 6). You need an AML/CTF program. |
| 3 | Do I need to do CDD on ALL my clients? | No. Only on clients to whom you provide a designated service. Your tax-return-only clients don't need AML/CTF CDD. |
| 4 | I set up SMSFs. Is that a designated service? | Likely yes. An SMSF is a legal arrangement (trust). Assisting in creating it is Service 6. |
| 5 | What if a client who currently only gets tax returns asks me to also set up a company? | The company setup is a designated service. You'll need to conduct CDD on this client for that engagement, even though they're an existing client. |
| 6 | I provide my firm's address as the registered office for some client companies. Is that captured? | Yes. That's designated Service 8. |
| 7 | What's the difference between a designated service and an exempt service? | Designated services are the 8 specific services listed in the AML/CTF Act that trigger compliance obligations. Exempt services (like tax prep, bookkeeping, payroll) don't trigger these obligations. |
| 8 | Can I apply simplified CDD to low-risk clients? | Yes, AUSTRAC permits reduced CDD measures for genuinely low-risk clients, but you must still identify them and document the basis for the simplified approach. |
| 9 | A client wants to pay a $15,000 fee in cash. What do I do? | Accept and file a TTR with AUSTRAC within 10 business days. Also consider whether the cash payment is suspicious (SMR). |
| 10 | Do I need to report tax evasion through an SMR? | Yes. SMR obligations cover suspicions related to any crime, including tax evasion. |
| 11 | Is bookkeeping a designated service? | No. Standard bookkeeping is not a designated service. |
| 12 | Can I outsource my AML/CTF program? | You can use external consultants and appoint an external compliance officer (if eligible), but you remain ultimately responsible. |
| 13 | How much does AUSTRAC enrolment cost? | Enrolment with AUSTRAC is free. |
| 14 | Do I need separate CDD forms for each designated service I provide to the same client? | No. You can use one CDD form per client, but ensure it covers all designated services being provided. |
| 15 | I act as a nominee director for some client companies. Is that captured? | Yes. That's designated Service 7. |
| 16 | Does preparing financial statements for a bank loan trigger AML/CTF obligations? | Potentially. If you are assisting in organising, planning, or executing debt financing (Service 4), it may be captured. Simply preparing financials that a client then uses independently may not be. Seek professional advice if unsure. |
| 17 | What is the annual compliance report? | A yearly report to AUSTRAC demonstrating how your practice is meeting AML/CTF obligations. It covers program maintenance, training, reporting activity, and evaluation status. |
| 18 | What if my client is a government body? | Government bodies (Commonwealth, state, territory, or local government entities) have specific CDD guidance from AUSTRAC. In general, they are considered lower risk, and simplified CDD may be appropriate. See [AUSTRAC CDD — Government Bodies](https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-government-body-reform). |
| 19 | What is the "geographical link" requirement? | AML/CTF obligations only apply when a designated service has a connection to Australia — provided in, from, or to Australia, or involving Australian assets/entities. If you only provide services with no Australian connection, you may not be captured. See Section 3.5. |
| 20 | My practice is part of a larger group. Does that change anything? | If your practice is part of a corporate group or multi-entity structure, you may be able to form a reporting group with a joint AML/CTF program. The starter kit is designed for small practices (15 or fewer personnel) not in reporting groups. Larger firms should seek tailored advice. See Section 3.6. |
| 21 | Do I need to report IFTIs? | IFTI (International Funds Transfer Instructions) reports are required if your practice sends or receives instructions to transfer money into or out of Australia. This is uncommon for most accounting practices but could apply if you manage international fund transfers through trust accounts (Service 3). See Section 7.11.3. |

---

### 7.19 AUSTRAC Links & Source Documents

| Document | URL |
|---|---|
| Accountant Guidance (main page) | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance |
| Accounting Program Starter Kit | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit |
| Starter Kit — Document Library | https://www.austrac.gov.au/reforms/program-starter-kits/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library |
| Step 1: Customise Your Program | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-1-customise-your-accounting-program-using-starter-kit |
| Examples of Dealing with Clients | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-examples-dealing-clients |
| Risk Insights — Accountant Suspicious Activity Indicators | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-accountants |
| Professional Services (Reform) — Designated Services | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/professional-services-reform |
| Reform Checker — Professional Services | https://www.austrac.gov.au/reform-checker-professional-services |
| Summary of Obligations (Tranche 2) | https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities |
| Initial CDD for Individuals (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-individuals-reform |
| Initial CDD for Trusts (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-trust-reform |
| Enhanced CDD (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform |
| Assigning Customer Risk Ratings (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/assigning-customer-risk-ratings-reform |
| AML/CTF Compliance Officer (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform |
| Personnel Due Diligence & Training (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform |
| Suspicious Matter Reports (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform |
| Threshold Transaction Reports (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform |
| Legal Professional Privilege (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/legal-professional-privilege-reform |
| Beneficial Owners | https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners |
| Regulatory Expectations for Implementation | https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms |
| AUSTRAC Online (Enrolment & Reporting) | https://online.austrac.gov.au |
| DFAT Consolidated Sanctions List | https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list |
| Money Laundering NRA 2024 | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024 |
| FATF Risk-Based Approach for Accounting | https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Rba-accounting-profession.html |
| CPA Australia — AML Reform Guide | https://intheblack.cpaaustralia.com.au/policy/accountants-guide-anti-money-laundering-reforms |
| Starter Kit — Getting Started | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-getting-started |
| Governing Body (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governing-body-reform |
| Senior Manager (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/senior-manager-reform |
| Sole Trader / Micro Business Governance | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governance-and-oversight-sole-traders-and-micro-businesses-reform |
| CDD — Sole Traders (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-sole-traders-reform |
| CDD — Body Corporate / Partnership / Unincorporated (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-body-corporate-partnership-or-unincorporated |
| CDD — Government Bodies (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-government-body-reform |
| Delayed CDD (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform |
| Third-Party Reliance (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform |
| Customer Risk Ratings (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/assigning-customer-risk-ratings-reform |
| Step 4: Review & Update Program (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-4-review-and-update-your-amlctf-program-reform |
| Step 5: Independent Evaluation (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-5-conduct-independent-evaluation-reform |
| Develop Your Program (Overview) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform |
| AML/CTF Reform Home | https://www.austrac.gov.au/amlctf-reform-webpage-home-everything-reform |
| Newly Released Guidance | https://www.austrac.gov.au/newly-released-amlctf-reforms-guidance |
| AML/CTF Program Quick Guide (PDF) | https://www.austrac.gov.au/sites/default/files/2025-12/AML%20CTF%20program%20quick%20guide.pdf |
| Tranche 2 Obligations Factsheet (PDF) | https://www.austrac.gov.au/sites/default/files/2025-07/AMLCTF_obligations_factsheet_for_tranche_2_REs.pdf |
| Tipping Off | https://www.austrac.gov.au/about-us/amlctf-reform/current-reporting-entities/tipping-off |
| Starter Kit — Getting Started | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-getting-started |
| Step 2: Use Your Program (Day-to-Day) | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-2-use-your-accounting-program |
| Step 3: Maintain & Review Your Program | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-3-maintain-and-review-your-accounting-program |
| Check If You'll Be Regulated (Interactive Tool) | https://www.austrac.gov.au/about-us/amlctf-reform/check-if-youll-be-regulated |
| AUSTRAC Business Profile Form (ABPF) Guide | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/austrac-business-profile-form-abpf-guides |
| Enrol a New Business — User Guide | https://www.austrac.gov.au/business/austrac-online/austrac-online-user-guides/user-guide-austrac-online-business/user-guide-enrol-new-business-us |
| Ongoing CDD (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/ongoing-customer-due-diligence-reform |
| AML/CTF Training (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/amlctf-training-reform |
| Personnel Due Diligence (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/personnel-due-diligence-reform |
| IFTIs Reporting Guidance | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/international-funds-transfer-instructions-iftis-reporting |
| Geographical Link Requirement | https://www.austrac.gov.au/business/new-to-austrac/geographical-link-requirement |
| Exemptions and Modifications | https://www.austrac.gov.au/business/core-guidance/exemptions-and-modifications |
| AUSTRAC Typologies Paper (ML/TF Indicators) | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/typologies-paper-austrac-money-laundering-and-terrorism-financing-indicators |
| External Auditors (Reform) | https://www.austrac.gov.au/business/service-providers-reporting-entities/external-auditors |
| Record Keeping Overview (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/record-keeping-reform/record-keeping-overview-reform |
| Reporting to AUSTRAC (Reform — Overview) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform |

---

## 8. Legal Disclaimer (Mandatory — Present on Every Page)

```
DISCLAIMER

This website is an educational aid only. Despite best efforts, some content may 
be factually unreliable.

This tool does NOT constitute legal, financial, compliance, or professional 
advice. It is NOT a substitute for the AUSTRAC Accounting Program Starter 
Kit, which should be used as the primary resource for building your AML/CTF 
program.

The creators of this tool are not lawyers, licensed compliance consultants, 
or representatives of AUSTRAC. They accept no liability for any loss or 
damage arising from reliance on the information provided.

You should seek independent professional advice tailored to your specific 
circumstances before making decisions about your AML/CTF obligations.

This tool does not collect, store, or transmit any personal or business 
data. All information entered is stored locally in your browser 
(localStorage) and never leaves your device. Data can be cleared at any 
time by clearing your browser data.

Content in this tool was last reviewed: [DATE].
For the most current guidance, always refer directly to austrac.gov.au.
```

---

## 9. Key Differences from Real Estate Version

| Aspect | Real Estate | Accountants |
|---|---|---|
| **Number of designated services** | 2 (brokering, direct sales) | 8 (entity creation, financing, nominees, etc.) |
| **Complexity of "Am I Regulated?" check** | Relatively simple | Complex — many accounting services are exempt, requires detailed service checker |
| **Exempt services** | Property management, commercial leasing | Tax returns, BAS, bookkeeping, payroll, audit |
| **Client types** | Buyers and sellers of property | Individuals, companies, trusts, SMSFs, partnerships, foreign entities |
| **Red flags focus** | Property transactions, cash, pricing | Complex structures, shell companies, nominee arrangements, international structuring |
| **Annual compliance report** | Not specifically mentioned | Required — specific annual report to AUSTRAC |
| **Simplified CDD** | Less emphasis | Significant — many accounting clients are low-risk |
| **Entity creation risk** | N/A | Core risk — accountants create the entities criminals use |
| **SMSF** | N/A | Specific CDD considerations for SMSF clients |
| **Beneficial ownership depth** | Important for trusts/companies | Critical — accountants create and manage ownership structures |
| **Worked examples** | Property transaction focused | Entity setup, M&A, trust creation scenarios |
| **IFTI reporting** | Required (property purchases often involve international transfers) | Rare (applies if practice manages international fund transfers through trust accounts — Service 3) |
| **Geographical link** | Clear (property is in Australia) | May require assessment for cross-border entity creation and advisory |
| **Forms count** | 23 | 28 (additional: Simplified CDD, Annual Report, Beneficial Ownership, Designated Service Register, Client Risk Rating, Delayed CDD, Third-Party Reliance, CDD Outcome) |

---

## 10. Technical Architecture

Same architecture as the real estate version — pure static site, localStorage, no API, no backend.

**File Structure:**

```
amliq-accountants/
├── index.html
├── css/
│   └── custom.css
├── js/
│   ├── app.js
│   ├── forms.js
│   ├── quiz.js
│   ├── risk.js
│   ├── service-checker.js    (new — 8 designated service checker)
│   ├── timeline.js
│   └── export.js
├── data/
│   ├── glossary.json
│   ├── faq.json
│   ├── redflags.json
│   ├── quiz.json
│   ├── services.json         (new — 8 designated services data)
│   └── examples.json         (new — worked client examples)
├── CONCEPT-ACCOUNTANTS.md
└── README.md
```

---

## 11. Risks & Mitigations

Same risk table as the real estate version, plus:

| Risk | Impact | Mitigation |
|---|---|---|
| Accountant incorrectly determines they are exempt | Non-compliance | Service checker includes "When in doubt, seek advice" messaging; link to AUSTRAC reform checker |
| Designated service boundaries are ambiguous | Accountant unsure if an activity is captured | Provide detailed examples for each service; recommend professional advice for grey areas |
| Mixed practice confusion | Accountant applies AML/CTF to all clients instead of just designated service clients | Clear guidance that CDD is only required for designated service engagements |
| Annual compliance report missed | Regulatory penalty | Calendar reminders in the tool; annual report preparation checklist |

---

## 12. UI Design: AUSTRAC Reference Tooltips

### 12.1 Tooltip Pattern

Same pattern as the real estate version. Every key concept, obligation, and procedure includes an **AUSTRAC Reference Tooltip** — a small ℹ️ icon that on hover/click shows:

1. A plain-English summary of what AUSTRAC says (1-2 sentences)
2. A direct link to the specific AUSTRAC page
3. A "Last verified" date

### 12.2 AUSTRAC Reference Tooltip Map — Accountants

| Tool Section | Tooltip Text (Summary) | AUSTRAC URL |
|---|---|---|
| **Am I Regulated? (Service Checker)** | "AUSTRAC's reform checker helps professional service providers determine if they are captured." | https://www.austrac.gov.au/reform-checker-professional-services |
| **8 Designated Services** | "Professional services reform captures 8 designated services including entity creation, financing, nominee services, and more." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/professional-services-reform |
| **Obligations Overview** | "AUSTRAC summarises core obligations for Tranche 2 entities: enrolment, CDD, reporting, and record keeping." | https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities |
| **Key Dates & Timeline** | "AUSTRAC's regulatory expectations outline what should be completed before 1 July 2026." | https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms |
| **Accountant Guidance (Main)** | "AUSTRAC's main guidance page for accountants, including the starter kit and sector-specific resources." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance |
| **Accounting Starter Kit** | "The accounting starter kit provides customisable risk assessment, policy, and process documents." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit |
| **Starter Kit — Customise (Step 1)** | "The 4-step customisation process: risk assessment, personnel, client sections, document and approve." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-1-customise-your-accounting-program-using-starter-kit |
| **Starter Kit — Document Library** | "The document library contains core documents (risk assessment, policy, process) and supporting forms." | https://www.austrac.gov.au/reforms/program-starter-kits/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library |
| **Starter Kit — Client Examples** | "Worked examples show how to apply CDD for low, medium, and high-risk clients in accounting scenarios." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-examples-dealing-clients |
| **Risk Assessment** | "Your risk assessment should identify ML/TF/PF risks across customer, service, delivery channel, and geographic categories." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-2-identify-and-assess-your-risks-risk-assessment-reform |
| **AML/CTF Policies** | "Your AML/CTF policies must mitigate and manage identified ML/TF/PF risks." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-3-mitigate-and-manage-your-risks-amlctf-policies-reform |
| **Compliance Officer** | "The compliance officer must be at management level, an Australian resident, and a fit and proper person." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform |
| **Personnel Due Diligence** | "Due diligence and training applies to anyone performing AML/CTF-relevant roles." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform |
| **Enrolment** | "Enrolment opens 31 March 2026 via AUSTRAC Online. Enrol within 28 days of providing a designated service." | https://online.austrac.gov.au |
| **CDD — Individuals** | "Initial CDD for individuals requires establishing identity, authority to act, PEP/TFS status, and purpose of relationship." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-individuals-reform |
| **CDD — Trusts** | "Trusts are rated high national ML risk. Identify all beneficial owners including trustees, settlor, appointor, and beneficiaries." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-trust-reform |
| **Enhanced Due Diligence** | "EDD must be applied proportionate to the specific ML/TF/PF risk level when risk is assessed as high." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform |
| **Customer Risk Rating** | "Assign risk ratings (low, medium, high) based on ML/TF factors across client, service, delivery channel, and geography." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/assigning-customer-risk-ratings-reform |
| **Delayed CDD** | "CDD may be delayed if ML/TF/PF risk is low and delay is essential to avoid interrupting ordinary business." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform |
| **Third-Party Reliance** | "You may rely on CDD from another reporting entity, but you remain responsible for compliance." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform |
| **CDD Before Service** | "CDD must be completed before providing a designated service, with limited exceptions for delayed CDD." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service |
| **Beneficial Owners** | "Beneficial owner identification is a core CDD requirement for companies, trusts, and other structures." | https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners |
| **PEP & Sanctions** | "Screen clients against the DFAT Consolidated List for targeted financial sanctions." | https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list |
| **Red Flags (Accountants)** | "AUSTRAC identifies 4 risk categories with suspicious activity indicators specific to accountants." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-accountants |
| **Risks & Indicators (General)** | "AUSTRAC provides risk insights and suspicious activity indicators across all newly regulated sectors." | https://www.austrac.gov.au/amlctf-reform/risks-and-indicators-suspicious-activity |
| **SMR Reporting** | "File an SMR when you suspect on reasonable grounds that activity relates to ML/TF, proceeds of crime, or tax evasion." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform |
| **TTR Reporting** | "File a TTR when you receive $10,000+ in physical currency in a single transaction." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform |
| **Legal Professional Privilege** | "LPP applies to lawyers. Accountants don't have LPP but should understand it when working alongside legal professionals." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/legal-professional-privilege-reform |
| **Tipping Off** | "It is a criminal offence to disclose that an SMR has been or will be filed about a client." | https://www.austrac.gov.au/about-us/amlctf-reform/current-reporting-entities/tipping-off |
| **Record Keeping** | "Records must be kept for 7 years and be retrievable within a reasonable timeframe." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/record-keeping-reform |
| **Independent Evaluation** | "An independent evaluation must be conducted at least every 3 years by someone independent of the program." | https://www.austrac.gov.au/business/core-guidance/amlctf-programs/independent-reviews |
| **AUSTRAC Online (Portal)** | "AUSTRAC Online is the portal for enrolment, SMR/TTR filing, and compliance reporting." | https://online.austrac.gov.au |
| **Money Laundering NRA 2024** | "AUSTRAC's 2024 NRA identifies accounting services as high risk for money laundering." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024 |
| **FATF Accounting Guidance** | "FATF provides risk-based approach guidance specifically for the accounting profession." | https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Rba-accounting-profession.html |
| **CPA Australia AML Guide** | "CPA Australia provides accountant-focused guidance on the AML/CTF reforms." | https://intheblack.cpaaustralia.com.au/policy/accountants-guide-anti-money-laundering-reforms |
| **Governing Body** | "The governing body must exercise ongoing oversight of ML/TF/PF risk and receive CO reports at least annually." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governing-body-reform |
| **Senior Manager** | "Senior managers must personally approve risk assessments, policies, high-risk relationships, and reliance arrangements." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/senior-manager-reform |
| **Sole Trader / Micro Business Governance** | "When one person holds all three governance roles, they remain responsible for all duties." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/governance-and-oversight-sole-traders-and-micro-businesses-reform |
| **CDD — Sole Traders** | "Specific CDD guidance for sole trader customers." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-sole-traders-reform |
| **CDD — Body Corporate / Partnership / Unincorporated** | "CDD guidance for companies, partnerships, and unincorporated associations." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-body-corporate-partnership-or-unincorporated |
| **CDD — Government Bodies** | "Specific CDD guidance for government body customers." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-government-body-reform |
| **Step 4: Review & Update Program** | "Regularly review and update your AML/CTF program." | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-4-review-and-update-your-amlctf-program-reform |
| **Step 5: Independent Evaluation** | "Independent evaluations must test policy design, evaluate risk methodology, and be free from conflicts." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-5-conduct-independent-evaluation-reform |
| **Develop Your Program (Overview)** | "AUSTRAC's 5-step process: governance → risk assessment → policies → review → independent evaluation." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform |
| **AML/CTF Reform Home** | "The central hub for all AUSTRAC reform guidance and resources." | https://www.austrac.gov.au/amlctf-reform-webpage-home-everything-reform |
| **Newly Released Guidance** | "Latest guidance releases from AUSTRAC for all regulated sectors." | https://www.austrac.gov.au/newly-released-amlctf-reforms-guidance |
| **AML/CTF Program Quick Guide (PDF)** | "AUSTRAC's one-page quick guide summarising AML/CTF program requirements." | https://www.austrac.gov.au/sites/default/files/2025-12/AML%20CTF%20program%20quick%20guide.pdf |
| **Tranche 2 Factsheet (PDF)** | "AUSTRAC's factsheet summarising obligations for newly regulated entities." | https://www.austrac.gov.au/sites/default/files/2025-07/AMLCTF_obligations_factsheet_for_tranche_2_REs.pdf |
| **Starter Kit — Getting Started** | "Before customising your starter kit, follow these 3 steps to determine if the kit is right for your practice." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-getting-started |
| **Starter Kit — Step 2 (Day-to-Day)** | "Once your program is customised, implement it across day-to-day operations: onboarding, CDD, risk rating, and monitoring." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-2-use-your-accounting-program |
| **Starter Kit — Step 3 (Maintain & Review)** | "Your program must remain current. Specific events trigger a review including control failures, regulatory changes, and new risks." | https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance/accounting-program-starter-kit/step-3-maintain-and-review-your-accounting-program |
| **Check If You'll Be Regulated** | "AUSTRAC's interactive tool to help you determine if you'll be regulated under AML/CTF reform." | https://www.austrac.gov.au/about-us/amlctf-reform/check-if-youll-be-regulated |
| **ABPF Guide (Enrolment Form)** | "Guidance on completing the AUSTRAC Business Profile Form for enrolment." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/austrac-business-profile-form-abpf-guides |
| **Geographical Link** | "AML/CTF obligations apply only when a designated service has a geographical link to Australia." | https://www.austrac.gov.au/business/new-to-austrac/geographical-link-requirement |
| **IFTIs** | "IFTI reports are required when you send or receive instructions to transfer money into or out of Australia." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/international-funds-transfer-instructions-iftis-reporting |
| **Ongoing CDD** | "Monitor clients on an ongoing basis for changes in risk, transactions inconsistent with profile, and new information." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/ongoing-customer-due-diligence-reform |
| **AML/CTF Training** | "Training must be provided on employment and ongoing, tailored to roles and responsibilities." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/amlctf-training-reform |
| **Personnel Due Diligence** | "Assess integrity and skills before employment, and on an ongoing basis, for all AML/CTF roles." | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/personnel-due-diligence-reform |
| **AUSTRAC Typologies Paper** | "Documents money laundering and terrorism financing methods and red flags across industries." | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/typologies-paper-austrac-money-laundering-and-terrorism-financing-indicators |
| **Exemptions & Modifications** | "AUSTRAC can grant exemptions from certain obligations where ML/TF risk is assessed as low." | https://www.austrac.gov.au/business/core-guidance/exemptions-and-modifications |

### 12.3 Tooltip Implementation Notes

- Same implementation as real estate version
- Tooltips stored in `data/austrac-refs-accountants.json` for easy updating
- Accountant-specific tooltips include additional references for: FATF accounting guidance, CPA Australia, Legal Professional Privilege, and sector-specific red flags
- Tooltip for each designated service should link to the Professional Services (Reform) page

---

## 13. Forms Inventory Update

Updated forms list including new sections:

| # | Form Name | Section | Purpose |
|---|---|---|---|
| 1 | CDD — Individual / Sole Trader | 7.8.1 | Client identification for individuals |
| 2 | CDD — Company | 7.8.2 | Client identification for companies |
| 3 | CDD — Trust / SMSF | 7.8.3 | Client identification for trusts and SMSFs |
| 4 | CDD — Partnership | 7.8.4 | Client identification for partnerships |
| 5 | CDD — Foreign Client (Supplement) | 7.8.5 | Additional fields for foreign clients |
| 6 | Simplified CDD Record | 7.8.6 | Document basis for simplified CDD |
| 7 | Enhanced Due Diligence Record | 7.8.7 | Document EDD measures applied |
| 8 | Ongoing CDD Review | 7.8.8 | Periodic client review checklist |
| 9 | PEP/TFS Screening Record | 7.8.9 | PEP and sanctions screening |
| 10 | Beneficial Ownership Record | 7.8.10 | Trace and record beneficial owners |
| 11 | Delayed CDD Record | 7.8.11 | Document delayed verification |
| 12 | Third-Party Reliance Record | 7.8.12 | Document reliance arrangements |
| 13 | CDD Outcome Record | 7.8.13 | Document declined/failed CDD decisions |
| 14 | Client Risk Rating Record | 7.9 | Assign and document risk rating |
| 15 | Compliance Officer Appointment | 7.6.1 | CO eligibility and appointment |
| 16 | AML/CTF Roles Assignment | 7.6.2 | Assign AML/CTF responsibilities |
| 17 | Personnel Due Diligence Record | 7.6.3 | Staff due diligence |
| 18 | Training Plan | 7.13.1 | Plan training modules and audiences |
| 19 | Training Attendance Record | 7.13.1 | Record training completion |
| 20 | Program Review Record | 7.14 | Document program reviews |
| 21 | Change Log | 7.14 | Track all program changes |
| 22 | Independent Evaluation Plan | 7.15 | Plan and record evaluations |
| 23 | Suspicious Activity Log | 7.10 | Internal suspicious activity record |
| 24 | SMR Decision Record | 7.11.1 | Document SMR filing decision |
| 25 | Annual Compliance Report Prep | 7.11.3 | Annual report preparation checklist |
| 26 | Enrolment Checklist | 7.7 | Track enrolment steps |
| 27 | Risk Assessment Summary | 7.4 | Output of risk assessment wizard |
| 28 | Designated Service Register | 7.2 | Record which services the practice provides |

---

*Document version: 1.3*  
*Created: 22 February 2026*  
*Updated: 22 February 2026*  
*Project: T2C — AML/CTF Compliance Guide for Accountants*  
*Source: AUSTRAC Accountant Guidance, Accounting Program Starter Kit, CPA Australia, and FATF Guidance*
