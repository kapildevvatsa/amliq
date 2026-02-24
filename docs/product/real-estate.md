# T2C — AML/CTF Compliance Guide for Real Estate Agents

## Product Concept Document — v2.0

---

## 1. Vision

**T2C** is a lightweight, static, single-page web application that guides Australian real estate professionals through their new Anti-Money Laundering / Counter-Terrorism Financing (AML/CTF) obligations under the reformed AML/CTF Act (Tranche 2), effective **1 July 2026**.

It is **not** legal advice. It is a practical, step-by-step guidance tool built entirely from publicly available AUSTRAC materials, including the official **Real Estate Program Starter Kit** released 30 January 2026.

> **📎 AUSTRAC Source:** [Starter Kit Media Release](https://www.austrac.gov.au/news-and-media/media-release/austrac-backs-newly-regulated-sectors-release-amlctf-program-starter-kits) | [Real Estate Guidance Hub](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance)

The tool mirrors the structure of AUSTRAC's own starter kit — **Customise → Implement → Maintain & Review** — but wraps it in an interactive, user-friendly interface with checklists, wizards, template forms, and plain-English explanations.

**Key AUSTRAC insight:** AUSTRAC CEO Brendan Thomas stated that *"for most customers who are individuals posing a low to medium risk, compliance generally boils down to just three forms"* — onboarding, initial CDD, and ongoing monitoring. T2C reflects this proportionate, risk-based approach.

**Who the starter kit is designed for:** The AUSTRAC starter kit is specifically designed for Tranche 2 entities who, from 1 July 2026, are for the first time subject to AML/CTF legislation. It is intended for typical small-to-medium real estate businesses and buyer's agencies. Larger or more complex businesses may need to supplement the starter kit with additional tailored compliance measures.

---

## 2. Problem Statement

From **1 July 2026**, real estate businesses providing designated services will be required to:

- Enrol with AUSTRAC as a reporting entity (within 28 days of providing a designated service — by **29 July 2026**)
- Develop and maintain an AML/CTF program (risk assessment, policies, processes)
- Appoint an AML/CTF compliance officer
- Conduct initial and ongoing customer due diligence (CDD)
- Screen for Politically Exposed Persons (PEPs) and Targeted Financial Sanctions (TFS)
- Report suspicious matters (SMRs), threshold transactions (TTRs), and international fund transfer instructions (IFTIs) to AUSTRAC
- Conduct personnel due diligence on staff in AML/CTF roles
- Keep records for 7 years
- Train staff on ML/TF/PF risks and obligations
- Conduct internal reviews and independent evaluations (at least every 3 years)

Most small to mid-sized real estate agencies have **zero experience** with AML/CTF compliance. AUSTRAC's 2024 National Risk Assessment rated real estate as a **high money laundering risk** sector. Real estate is one of the most common property types found in proceeds-of-crime investigations.

**T2C bridges that gap** by translating AUSTRAC's requirements into plain-English, actionable guidance with interactive tools — all for free, with no data leaving the user's browser.

---

## 3. Who Is Regulated (and Who Is Not)

> **📎 AUSTRAC Source:** [Real Estate Services (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/real-estate-services-reform)

### 3.1 Two Designated Services

The reforms capture **two categories** of real estate designated services:

| Designated Service | Who Typically Provides It |
|---|---|
| **Brokering real estate transactions** — acting on behalf of a buyer or seller in the sale, purchase, or transfer of real estate | Real estate agents, buyer's agents, seller's agents, auctioneers acting as selling agents |
| **Direct property sales** — selling real estate directly to a customer without an independent real estate agent | Property developers, businesses selling house-and-land packages, apartments off-the-plan, land subdivisions, businesses with in-house sales teams |

### 3.2 What Counts as "Real Estate"

Under the reform, real estate includes:

- **Fee simple interests** (standard freehold ownership)
- **Leasehold interests exceeding 30 years**
- **Unit trusts or share schemes** that confer entitlements to use or occupy land

The service must have a **geographical link to Australia** to trigger obligations.

### 3.3 What Is Exempt

| Service | Status |
|---|---|
| Property management (residential rentals) | **Exempt** — not a designated service |
| Commercial leasing | **Exempt** — not a designated service |
| Conveyancing | Regulated separately under conveyancer designated services |
| Legal work in property transactions | Regulated separately under legal profession designated services |

---

## 4. Target Users

| User Persona | Description |
|---|---|
| **Agency Principal / Owner** | Needs to understand overall obligations, set up the AML/CTF program, appoint a compliance officer, and get senior management sign-off |
| **Property Sales Agent** | Needs to know what CDD steps to follow per transaction, how to spot red flags, and when to escalate |
| **Buyer's Agent** | Same obligations as sales agents; needs CDD guidance tailored to representing purchasers |
| **Property Developer (Direct Sales)** | Needs to understand they are captured even without using an external agent |
| **AML/CTF Compliance Officer** | Needs templates, checklists, record-keeping guidance, review triggers, and reporting procedures |

> **Note:** Property managers are NOT a target user — property management is exempt from these obligations.

---

## 5. Design Principles

| Principle | Detail |
|---|---|
| **No APIs, No Backend** | 100% static site. All data stays in localStorage. Zero network calls after page load. |
| **No Legal Risk** | Every page carries a disclaimer. Content sourced only from public AUSTRAC documents. Tool provides guidance, never "advice". |
| **Aligned to AUSTRAC Starter Kit** | Structure mirrors AUSTRAC's 3-step approach: Customise → Implement → Maintain & Review. |
| **Plain English** | Regulatory jargon is translated. Tooltips explain technical terms. |
| **Mobile-First** | Many agents work from their phones on-site. UI must be fully responsive. |
| **Progress Persistence** | Checklist progress, risk assessment results, and form data saved in browser localStorage. |
| **Print-Friendly** | Key sections (checklists, templates, red flags, forms) can be printed or exported as PDF via browser print. |
| **Offline-Capable** | Once loaded, the entire app works without internet. |

---

## 6. Sitemap & Feature Breakdown

The app is a single-page application with tab/section-based navigation, organised into **4 phases**.

```
T2C
│
├── Home / Dashboard
│
├── PHASE 1: UNDERSTAND
│   ├── 1. Am I Regulated? (Decision Tree)
│   ├── 2. Obligations Overview
│   └── 3. Key Dates & Timeline
│
├── PHASE 2: BUILD YOUR PROGRAM (Customise — AUSTRAC Step 1)
│   ├── 4. Risk Assessment Wizard
│   │   ├── Customer Risk
│   │   ├── Service/Product Risk
│   │   ├── Delivery Channel Risk
│   │   └── Geographic/Jurisdiction Risk
│   ├── 5. AML/CTF Program Builder (Policy & Process Checklist)
│   ├── 6. Governance Setup
│   │   ├── Appoint Compliance Officer
│   │   ├── Assign AML/CTF Roles
│   │   └── Personnel Due Diligence
│   └── 7. Enrolment Guide
│
├── PHASE 3: IMPLEMENT (Day-to-Day Operations — AUSTRAC Step 2)
│   ├── 8. Customer Due Diligence (CDD)
│   │   ├── Who Is Your Customer?
│   │   ├── Customer Lifecycle (8-Step Process)
│   │   ├── Risk Rating Table (Low / Medium / High)
│   │   ├── Initial CDD — Individuals
│   │   ├── Initial CDD — Companies
│   │   ├── Initial CDD — Trusts
│   │   ├── Initial CDD — Partnerships
│   │   ├── Initial CDD — Foreign Customers
│   │   ├── Enhanced Due Diligence (EDD)
│   │   ├── Ongoing CDD
│   │   ├── PEP & Sanctions Screening
│   │   ├── Delayed CDD (Real Estate Specific)
│   │   ├── Third-Party Reliance Arrangements
│   │   ├── When CDD Cannot Be Completed
│   │   └── Privacy Obligations & CDD Data
│   ├── 9. Suspicious Activity & Red Flags
│   │   ├── Customer Risk Indicators
│   │   ├── Service/Transaction Risk Indicators
│   │   ├── Delivery Channel Risk Indicators
│   │   └── Foreign Jurisdiction Risk Indicators
│   ├── 10. Reporting to AUSTRAC
│   │   ├── Suspicious Matter Reports (SMRs)
│   │   ├── Threshold Transaction Reports (TTRs)
│   │   ├── IFTIs
│   │   ├── Annual Compliance Reports
│   │   └── Tipping-Off Prohibition
│   ├── 11. Record Keeping
│   └── 12. Staff Training & Awareness
│       ├── Training Plan Builder
│       └── Staff Knowledge Quiz
│
├── PHASE 4: MAINTAIN & REVIEW (AUSTRAC Step 3)
│   ├── 13. Program Review & Maintenance
│   │   ├── Periodic Review Triggers
│   │   ├── Review Checklist
│   │   └── Change Log
│   └── 14. Independent Evaluation Planning
│
├── RESOURCES
│   ├── 15. Forms & Templates Library
│   ├── 16. AUSTRAC Starter Kit Forms Reference
│   ├── 17. Real-World Customer Examples (Low / Medium / High Risk)
│   ├── 18. Jargon Buster (Glossary)
│   ├── 19. FAQ
│   └── 20. AUSTRAC Links & Source Documents
│
└── Disclaimer (persistent footer/banner on every page)
```

---

## 7. Detailed Feature Specifications

### 7.1 Home / Dashboard

**Purpose:** Single-screen overview of where the user stands.

**Elements:**
- Welcome message with context ("You have X days until obligations begin")
- **Live countdown timer** to 1 July 2026
- **Compliance Readiness Score** — percentage based on completed checklist items across all phases (from localStorage)
- **Phase progress cards** — 4 cards showing Phase 1–4 completion percentage
- Quick-access cards to the most critical sections (Risk Assessment, CDD, Red Flags, Enrolment)
- **"What should I do today?"** — contextual nudge based on the current date:
  - Before 31 Mar 2026: "Focus on understanding your obligations and building your program"
  - 31 Mar – 30 Jun 2026: "Enrolment is open — enrol now and finalise your program"
  - After 1 Jul 2026: "Your obligations are live — ensure day-to-day compliance"
- Prominent disclaimer banner at the top

---

### 7.2 Am I Regulated? (Decision Tree) — NEW PAGE

**Purpose:** Interactive decision tree that helps a user determine if they are captured by the reforms.

**How It Works:**
A step-by-step yes/no questionnaire:

```
Q1: Do you sell, buy, or transfer real estate on behalf of clients?
  → YES → You are likely providing a designated service (brokering). Go to Q4.
  → NO → Go to Q2.

Q2: Do you sell real estate directly to customers (e.g., as a developer)?
  → YES → You are likely providing a designated service (direct sales). Go to Q4.
  → NO → Go to Q3.

Q3: Do you only manage rental properties or commercial leases?
  → YES → You are likely EXEMPT. Property management and commercial 
           leasing are not designated services under the current reforms.
  → NO → Go to Q3b.

Q3b: Do you provide conveyancing or legal services in property transactions?
  → YES → You may be regulated under a different designated service 
           category. Check AUSTRAC's conveyancer or legal profession guidance.
  → NO → Based on your answers, you may not be captured. 
          Review AUSTRAC's full list of designated services to confirm.

Q4: Does the real estate have a geographical link to Australia?
  → YES → You are likely a reporting entity. Proceed to the Obligations Overview.
  → NO → The reforms may not apply. Seek professional advice.

Q5: Is the property interest one of: fee simple, leasehold >30 years, 
    or unit trust/share scheme conferring land use rights?
  → YES → Confirmed — you are likely providing a designated service.
  → NO → The interest may not be "real estate" under the Act. Seek advice.
```

**Output:**
- Clear result: "Based on your answers, you are likely [regulated / exempt / unsure]"
- If regulated: link to Obligations Overview and Enrolment Guide
- If exempt: explanation of why, with caveat to confirm with AUSTRAC
- If unsure: recommendation to seek professional advice

**UI Elements:**
- Card-based stepper with YES/NO buttons
- Visual flow diagram shown alongside
- Result saved to localStorage
- Print-friendly result summary

---

### 7.3 Obligations Overview

> **📎 AUSTRAC Source:** [Summary of AML/CTF Obligations for Tranche 2 Entities](https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities) | [Regulatory Expectations for Implementation](https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms)

**Purpose:** Explain, in plain English, what the new law means for real estate professionals.

**Content Sections:**

#### What Changed?
- Brief explanation of the AML/CTF Act reform (Tranche 2)
- Why real estate was included (high ML risk, proceeds-of-crime link, FATF recommendations)
- Link to AUSTRAC's reform overview page

#### Who Is Affected?
- Two designated service types (brokering vs. direct sales) with examples
- Definition of "real estate" under the Act
- What is exempt (property management, commercial leasing)

#### Your 10 Core Obligations (Summary Cards)

Each obligation is a clickable card that links to the relevant detailed section:

| # | Obligation | Links To |
|---|---|---|
| 1 | Enrol with AUSTRAC | Section 7.7 |
| 2 | Appoint a compliance officer | Section 7.6 |
| 3 | Conduct an ML/TF/PF risk assessment | Section 7.4 |
| 4 | Develop an AML/CTF program (policies & processes) | Section 7.5 |
| 5 | Conduct initial customer due diligence (CDD) | Section 7.8 |
| 6 | Conduct ongoing CDD | Section 7.8.7 |
| 7 | Screen for PEPs and sanctions | Section 7.8.8 |
| 8 | Report suspicious matters, threshold transactions, and IFTIs | Section 7.10 |
| 9 | Keep records for 7 years | Section 7.11 |
| 10 | Train staff and conduct personnel due diligence | Section 7.12 |

#### What Happens If You Don't Comply?
- AUSTRAC's regulatory expectations document states they will focus enforcement on entities that **fail to enrol or make no meaningful implementation effort**
- Overview of civil penalty provisions (reference public AUSTRAC enforcement page)
- Note: AUSTRAC has stated they will take a proportionate, risk-based approach to enforcement for newly regulated sectors

**UI Elements:**
- Accordion-style expandable sections
- "Jargon Buster" tooltips on technical terms (hover over "designated service", "reporting entity", "ML/TF/PF" etc.)
- Visual icons for each obligation
- "AUSTRAC Says" callout boxes with direct quotes from official guidance

---

### 7.4 Risk Assessment Wizard

> **📎 AUSTRAC Source:** [Step 1: Customise Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-1-customise-your-real-estate-program-using-starter-kit) | [Risk Assessment Template (Word, 995 KB)](https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx)

**Purpose:** Guide the agent through a structured self-assessment of their money laundering, terrorism financing, and proliferation financing (ML/TF/PF) risk — aligned to AUSTRAC's starter kit risk assessment template.

**Important context:** AUSTRAC's 2024 National Risk Assessment rated the real estate sector as **HIGH** for money laundering risk. Real estate is one of the most common property types in proceeds-of-crime investigations. This wizard helps agents understand *their specific* risk profile within that high-risk sector.

**How It Works:**
The wizard asks a series of multiple-choice questions across **four risk categories** (aligned to AUSTRAC's risk framework):

#### Category 1: Customer Risk

| Question | Risk Implication |
|---|---|
| Do you deal with customers you've never met face-to-face? | Higher risk — identity verification harder |
| Do you deal with foreign buyers or sellers? | Higher risk — foreign jurisdiction risk |
| Do you transact with trusts, companies, or complex legal structures? | Higher risk — beneficial ownership opacity |
| Do you deal with Politically Exposed Persons (PEPs) or their associates? | Higher risk — corruption/bribery exposure |
| Do you have customers where the source of wealth is unclear? | Higher risk — proceeds of crime |
| Do you deal with customers who are reluctant to provide identification? | Higher risk — identity concealment |
| Do you deal with professional investors or high-net-worth individuals? | Medium risk — larger transaction values |
| Do you have many one-off or short-term customer relationships? | Higher risk — less opportunity for ongoing monitoring |

#### Category 2: Service/Product Risk

| Question | Risk Implication |
|---|---|
| Do you handle residential property sales? | Standard risk (but most common ML vehicle) |
| Do you handle commercial or industrial property? | Medium risk — higher values, complex structures |
| Do you handle off-the-plan sales? | Higher risk — time gap between contract and settlement |
| Do you sell house-and-land packages? | Medium–High risk (developer direct sales) |
| Do you handle agricultural land or rural property? | Variable risk — depends on jurisdiction |
| Do you handle property valued above $5 million? | Higher risk — large single transactions attractive for ML |
| Do you handle auction sales? | Medium risk — compressed due diligence timeframes |

#### Category 3: Delivery Channel Risk

| Question | Risk Implication |
|---|---|
| Are any of your transactions conducted entirely online or remotely? | Higher risk — non-face-to-face verification challenges |
| Do you use third-party agents, introducers, or referral partners? | Higher risk — reliance on third parties for CDD |
| Do customers interact through intermediaries (e.g., lawyers, accountants) rather than directly? | Medium risk — layered relationships |
| Do you accept instructions via email or messaging without in-person contact? | Higher risk — identity verification harder |

#### Category 4: Geographic / Foreign Jurisdiction Risk

| Question | Risk Implication |
|---|---|
| Do you deal with buyers or sellers from countries identified as high-risk by FATF? | Higher risk — FATF grey/blacklist jurisdictions |
| Do funds for your transactions originate from overseas? | Higher risk — international fund flows |
| Do you operate in areas known for drug production, organised crime, or gang activity? | Higher risk — local crime nexus |
| Do your customers have no apparent connection to the area where the property is located? | Medium risk — unusual geographic pattern |
| Do you deal with customers from countries with weak AML/CTF frameworks? | Higher risk — regulatory arbitrage |

**Output:**
- **Visual risk matrix** — 4-quadrant chart (Low / Medium / High / Very High) per category
- **Overall risk rating** with colour coding
- **Tailored action items** based on rating, e.g.:
  - "You deal with foreign buyers → Apply enhanced due diligence for customers from high-risk jurisdictions"
  - "You handle trusts → Ensure you identify all beneficial owners including settlors, appointors, and protectors"
  - "You operate fully online → Implement additional identity verification controls for non-face-to-face customers"
- **"AUSTRAC Says" callout** with relevant risk insights from the official guidance
- Ability to **save and print** the risk assessment result
- Saved results feed into the Program Builder (Section 7.5) to pre-populate relevant checklist items

**Disclaimer callout:** "This wizard helps you understand your risk profile for guidance purposes. It does not replace the formal ML/TF/PF risk assessment required under the AML/CTF Rules. Consider engaging a professional to complete your formal risk assessment."

---

### 7.5 AML/CTF Program Builder (Policy & Process Checklist)

> **📎 AUSTRAC Source:** [Step 1: Customise Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-1-customise-your-real-estate-program-using-starter-kit)

**Purpose:** A comprehensive, tickable checklist of everything that should be in the AML/CTF program — structured to mirror AUSTRAC's starter kit documents (Risk Assessment, Policy Document, Process Document).

**Aligned to AUSTRAC Starter Kit Structure:**
- The starter kit contains 4 core documents: **Customise Guide**, **Risk Assessment**, **Policy Document**, **Process Document**
- Plus supporting forms for personnel and customers
- Once customised and approved by senior management, it becomes the official AML/CTF program
- **Important:** The starter kit is NOT designed to be used as-is. You must complete the customisation step to create a program that reflects your business.

**AUSTRAC Downloadable Templates:**

| Document | Download |
|---|---|
| Customise the program starter kit guide | [Word, 1.13 MB](https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Customise%20guide%20-%20January%202026.docx) |
| Risk assessment | [Word, 995 KB](https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx) |
| Policy document | [Word, 1.07 MB](https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Policy%20document%20-%20January%202026.docx) |
| Process document | [Word, 977 KB](https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx) |

**4-Step Customisation Process (from AUSTRAC Customise Guide):**
1. **Customise your risk assessment** — Identify relevant risks, their significance, and acceptable risk levels
2. **Customise personnel sections** — Assign AML/CTF roles, conduct personnel due diligence, plan training
3. **Tailor customer sections** — Establish CDD procedures, monitoring, and risk response processes
4. **Document and approve your program** — Finalise documents, obtain senior management approval

**Checklist Categories:**

#### A. Risk Assessment

- [ ] Identify the designated services your business provides
- [ ] Assess ML/TF/PF risks across 4 categories (customer, service, delivery channel, geographic)
- [ ] Document your risk appetite (what level of risk is acceptable)
- [ ] Identify high-risk scenarios specific to your agency
- [ ] Consider AUSTRAC's risk insights and indicators for real estate
- [ ] Document risk mitigation controls for each identified risk
- [ ] Have risk assessment approved by senior management / governing body
- [ ] Set a schedule to review the risk assessment (and define review triggers)

#### B. Governance

- [ ] Appoint an AML/CTF compliance officer (see Section 7.6)
- [ ] Ensure compliance officer meets eligibility requirements (management level, Australian resident, fit and proper)
- [ ] Notify AUSTRAC of compliance officer appointment within 14 days
- [ ] Define AML/CTF roles and responsibilities (use AUSTRAC Roles Form)
- [ ] Assign responsibilities to specific staff (use AUSTRAC Assign Responsibilities Form)
- [ ] Establish governing body / senior management oversight arrangements
- [ ] Set up compliance officer annual reporting to governing body
- [ ] Conduct personnel due diligence on all staff in AML/CTF roles

#### C. Customer Due Diligence Procedures

- [ ] Define initial CDD procedures for individual customers
- [ ] Define initial CDD procedures for company customers
- [ ] Define initial CDD procedures for trust customers
- [ ] Define initial CDD procedures for partnership customers
- [ ] Define initial CDD procedures for foreign customers
- [ ] Define beneficial owner identification procedures
- [ ] Define PEP and TFS screening procedures
- [ ] Define enhanced due diligence (EDD) triggers and procedures
- [ ] Define ongoing CDD procedures and monitoring frequency
- [ ] Define procedures for when CDD cannot be completed (decline/cease service)
- [ ] Define reliance arrangements (if relying on third parties for CDD)
- [ ] Document acceptable identity verification documents and methods

#### D. Transaction Monitoring & Suspicious Activity

- [ ] Establish process for monitoring transactions for suspicious indicators
- [ ] Document AUSTRAC's red flag indicators relevant to real estate (all 4 categories)
- [ ] Define internal escalation process (agent → compliance officer → report)
- [ ] Assign responsibility for transaction monitoring
- [ ] Create a suspicious activity log template

#### E. Reporting

- [ ] Establish procedure for filing Suspicious Matter Reports (SMRs)
- [ ] Define SMR timeframes (24 hours for terrorism, 3 business days for other)
- [ ] Establish procedure for Threshold Transaction Reports (TTRs) — $10,000+ physical cash
- [ ] Define TTR timeframe (10 business days)
- [ ] Establish procedure for IFTI reports (international fund transfers)
- [ ] Define IFTI timeframe (10 business days)
- [ ] Document the tipping-off prohibition and train staff on it
- [ ] Set up access to AUSTRAC Online for report filing
- [ ] Establish internal escalation flowchart

#### F. Record Keeping

- [ ] Define what records to keep (CDD records, transaction records, program docs, training records, reports)
- [ ] Establish 7-year retention policy
- [ ] Define secure storage method (digital and/or physical)
- [ ] Ensure records are retrievable within a reasonable timeframe
- [ ] Confirm storage complies with privacy obligations

#### G. Training

- [ ] Develop AML/CTF training content for staff
- [ ] Schedule initial training before 1 July 2026
- [ ] Plan ongoing refresher training (at least annually)
- [ ] Include ML/TF/PF risk awareness, CDD procedures, red flags, reporting, tipping-off, and record-keeping in training
- [ ] Maintain training attendance and completion records

#### H. Independent Evaluation

- [ ] Plan for independent evaluation of AML/CTF program
- [ ] Schedule first evaluation (required at least once every **3 years**)
- [ ] Identify who will conduct the evaluation (must be independent of the program)
- [ ] Document how adverse findings will be addressed

#### I. Senior Management Approval

- [ ] Present completed AML/CTF program to senior management / governing body
- [ ] Obtain formal approval (documented sign-off)
- [ ] Ensure program is accessible to all relevant staff

**UI Elements:**
- Checkboxes with progress bar per category
- Overall program completion percentage
- Expand/collapse detail under each item with "AUSTRAC says..." guidance
- localStorage persistence
- "Export Progress" button (JSON download for backup)
- Print-friendly view

---

### 7.6 Governance Setup — NEW PAGE

> **📎 AUSTRAC Source:** [AML/CTF Compliance Officer (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform) | [Personnel Due Diligence & Training (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform)

**Purpose:** Guide the user through establishing the governance framework for their AML/CTF program.

#### 7.6.1 Appoint Compliance Officer

**Eligibility Requirements (from AUSTRAC):**
- Must be a **fit and proper person**
- Must be employed or engaged by the business at **management level** (authority-based, not number of reports)
- Must be an **Australian resident** if the business has a permanent establishment in Australia
- For small agencies: the owner or principal may be the compliance officer
- For larger agencies: could be a general manager, operations manager, or risk manager
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

> Form data is stored in localStorage only. Can be printed as a record.

#### 7.6.2 Assign AML/CTF Roles

**Purpose:** Help the agency identify and document who is responsible for what.

**Interactive Form — AML/CTF Roles Assignment:**

| Role | Responsibilities | Assigned To |
|---|---|---|
| AML/CTF Compliance Officer | Oversee day-to-day compliance, report to governing body annually, communicate with AUSTRAC | Text input |
| CDD Lead | Conduct or supervise customer identification and verification | Text input |
| Suspicious Activity Escalation Point | Receive and assess internal escalations, decide on SMR filing | Text input |
| Training Coordinator | Plan and deliver AML/CTF training, maintain training records | Text input |
| Record Keeper | Maintain AML/CTF records, ensure 7-year retention | Text input |
| Senior Management Approver | Approve AML/CTF program, receive annual compliance reports | Text input |

> In small agencies, one person may fill multiple roles. The form allows the same name in multiple fields.

#### 7.6.3 Personnel Due Diligence

**Who Requires Due Diligence:**
According to AUSTRAC, due diligence and training applies to anyone performing AML/CTF-relevant roles, including:
- Employees, contractors, consultants, volunteers, and interns
- Customer-facing staff (agents, onboarding, account managers)
- Compliance and operations teams
- IT personnel managing compliance systems
- Service provider personnel

**Due Diligence Measures (scalable based on role):**

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
| Role | Dropdown (from roles list above) |
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

> **📎 AUSTRAC Source:** [Real Estate Services (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/real-estate-services-reform) | [Regulatory Expectations for Implementation](https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms)

**Purpose:** Walk the user through the AUSTRAC enrolment process step by step.

**Content:**

**Step 1: Confirm You Need to Enrol**
- Link to "Am I Regulated?" decision tree (Section 7.2)
- If you provide either designated service (brokering or direct sales), you must enrol

**Step 2: Prepare Your Information**
- ABN (Australian Business Number)
- Business name and structure (sole trader, partnership, company, trust)
- Contact person details
- Nominated AML/CTF compliance officer details
- Description of designated services provided
- Business address(es)

**Step 3: Enrol via AUSTRAC Online**
- Link to: [AUSTRAC Online](https://online.austrac.gov.au)
- Enrolment opens **31 March 2026**
- Must be completed within **28 days** of first providing a designated service
- Latest possible date: **29 July 2026** (if first service provided on 1 July)

**Step 4: Nominate Your Compliance Officer**
- Must notify AUSTRAC within 14 days of appointment
- Link to Section 7.6.1 for compliance officer guidance

**Step 5: Confirm and Record**
- Save enrolment confirmation
- Record enrolment date
- Add to record-keeping system

**Interactive Checklist:**
- [ ] Confirmed I am providing a designated service
- [ ] Gathered all required business information
- [ ] Appointed a compliance officer
- [ ] Enrolled via AUSTRAC Online
- [ ] Notified AUSTRAC of compliance officer
- [ ] Saved enrolment confirmation to records

**Key Date Callouts:**
- Enrolment opens: **31 March 2026**
- Obligations commence: **1 July 2026**
- Enrolment deadline: Within **28 days** of first designated service (by **29 July 2026**)

**AUSTRAC Regulatory Expectation:** By 30 June 2026, AUSTRAC expects all Tranche 2 entities to have enrolled, adopted an AML/CTF program, trained staff, and implemented reporting systems.

**UI Elements:**
- Stepper/wizard-style interface with progress indicator
- Checklist with tickable items (saved to localStorage)
- Info callout boxes for tips and deadlines
- Link to AUSTRAC Online portal

---

### 7.8 Customer Due Diligence (CDD) — EXPANDED

> **📎 AUSTRAC Source:** [Step 2: Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program) | [Examples of Dealing with Customers](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-examples-dealing-customers)

**Purpose:** Provide clear, step-by-step guidance on how to identify and verify customers for each entity type, including when to apply enhanced or ongoing due diligence.

**Overarching Principle:** You must conduct initial CDD **before providing a designated service** (i.e., before acting for the customer in a property transaction). If CDD cannot be completed satisfactorily, you should consider whether to decline or cease providing the service.

#### 7.8.0a Who Is Your Customer? — CRITICAL CLARIFICATION

> **⚠️ AUSTRAC Clarification (from Step 2: Use Your Real Estate Program):**
> *"If you act for the seller and broker the successful sale of real estate, your customer is both the buyer and the seller. If you act for the buyer and broker the successful purchase of real estate, your customer is also both the buyer and the seller."*

This is a key distinction: **both parties** to the transaction are your customers for CDD purposes, regardless of which party engaged you. Your CDD obligations apply to both.

#### 7.8.0b Customer Risk Rating Table — FROM AUSTRAC STARTER KIT

> **📎 AUSTRAC Source:** [Step 2: Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program)

AUSTRAC's starter kit defines three risk ratings with specific criteria and risk factors:

| Risk Rating | Criteria | Customer Risk Factors | Controls |
|---|---|---|---|
| **HIGH** | One or more high-risk factors, or you identify other reasons the customer is high risk | Paying with more than A$50,000 in physical currency; using a virtual asset (e.g., cryptocurrency) to pay; requesting a service with no apparent economic or legal purpose or involving unusually large/complex transactions; information suggesting criminal activity; unexplained wealth; resident of or located in a high-risk country; foreign PEP; delivery channels making it difficult to establish identity | Enhanced CDD; source of funds and source of wealth check; adverse media check; verify business relationship; senior manager approval |
| **MEDIUM** | Two or more medium-risk factors, or you identify other reasons the customer is medium risk | Real estate over A$1.5 million purchased without a mortgage; domestic or international organisation PEPs; a third party not enrolled with AUSTRAC representing the customer; operates a charity or other non-profit; interactions only through remote channels | Initial CDD (simplified CDD not appropriate) |
| **LOW** | Doesn't meet high or medium-risk criteria | Customer isn't medium or high risk | Simplified CDD |

**UI Element:** This risk rating table should be displayed prominently within the CDD section and used as the basis for the Risk Assessment Wizard (Section 7.4) scoring logic.

#### 7.8.0c Customer Lifecycle (8-Step Process) — FROM AUSTRAC STARTER KIT

> **📎 AUSTRAC Source:** [Step 2: Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program)

AUSTRAC's starter kit defines an 8-step customer lifecycle that guides how agents deal with customers from first contact to end of relationship:

| Step | Action | Description |
|---|---|---|
| 1 | **Identify the kind of customer** | Determine if they're an individual or entity (trust, company, etc.) and the type of service sought. This determines which onboarding form applies. |
| 2 | **Collect customer information** | Use the relevant onboarding form. Level of information depends on customer type, service nature, and ML/TF risk factors. |
| 3 | **Verify customer information** | Follow the relevant initial CDD form to confirm collected information is reliable for AML/CTF purposes. Supports risk assessment and service decision. |
| 4 | **Identify and assess triggers** | Watch for inconsistencies, unusual behaviour, higher-risk indicators. Can occur during onboarding or at any point during the relationship. |
| 5 | **Decide how to proceed** | Based on checks: proceed, apply additional controls, escalate/report, or decline service. Guided by policy and risk assessment controls. |
| 6 | **Provide the designated service** | Generally only after required checks are complete and risks addressed. May delay CDD if delayed CDD criteria are met (see Section 7.8.9). |
| 7 | **Ongoing customer due diligence** | Monitor for changes in behaviour, respond to new triggers, update customer information as required throughout the relationship. |
| 8 | **End of business relationship** | Determine what records to keep, how long, and how they support future reviews. No further ongoing CDD required after relationship concludes. |

**UI Element:** This lifecycle should be presented as a visual stepper/timeline that users can reference during any transaction. Each step should link to the relevant detailed section.

---

#### 7.8.1 Initial CDD — Individual Customers

**What You Must Establish (on reasonable grounds):**
- The customer's identity
- The identity of any person acting on the customer's behalf and their authority to act
- The identity of any person on whose behalf the customer is receiving the service (e.g., a trust beneficiary instructing through an individual)
- Whether the customer is a Politically Exposed Person (PEP) or designated for Targeted Financial Sanctions (TFS)
- The nature and purpose of the business relationship or transaction

**Identification Information to Collect:**
- Full legal name
- Date of birth
- Residential address (not a PO Box)

**Verification — Acceptable Documents:**

| Category | Acceptable Documents |
|---|---|
| **Primary photographic ID** | Australian passport, Australian driver's licence, Australian proof-of-age card |
| **Primary non-photographic ID** | Australian birth certificate, Australian citizenship certificate |
| **Secondary ID** | Medicare card, pensioner concession card, utilities bill (within 3 months), bank statement, government-issued letter |

**Verification rules:**
- Original documents or reliable copies
- At least ONE primary document required
- If primary photographic ID is not available, use one primary non-photographic + one secondary
- Expired documents may require additional verification
- Record the document type, number, issuer, and expiry date

**Interactive Form — Individual CDD:**

| Field | Input |
|---|---|
| Customer full name | Text |
| Date of birth | Date |
| Residential address | Text |
| Acting on own behalf? | Yes / No (if No → identify the principal) |
| ID Document 1 — Type | Dropdown |
| ID Document 1 — Number | Text |
| ID Document 1 — Issuer | Text |
| ID Document 1 — Expiry | Date |
| ID Document 2 — Type (if required) | Dropdown |
| ID Document 2 — Number | Text |
| PEP screening completed? | Yes / No + date |
| TFS screening completed? | Yes / No + date |
| Source of funds discussed? | Yes / No |
| Nature/purpose of transaction | Text |
| Risk rating | Low / Medium / High |
| EDD required? | Yes / No (auto-flagged if High risk) |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.2 Initial CDD — Company Customers

**What You Must Establish:**
- The company's full name and registration details
- That the company exists (ASIC register, ABN lookup)
- The identity of **beneficial owners** (anyone owning or controlling 25%+ of the company)
- The identity of the person authorised to instruct on behalf of the company and their authority
- PEP/TFS status of beneficial owners
- Nature and purpose of the business relationship

**Interactive Form — Company CDD:**

| Field | Input |
|---|---|
| Company name | Text |
| ACN / ABN | Text |
| Registered address | Text |
| ASIC registration verified? | Yes / No + date |
| Beneficial Owner 1 — Name | Text |
| Beneficial Owner 1 — Ownership % | Number |
| Beneficial Owner 1 — ID verified? | Yes / No |
| Beneficial Owner 2 — Name (if applicable) | Text |
| (Repeat for additional beneficial owners) | |
| Authorised representative — Name | Text |
| Authority documented? | Yes / No (e.g., board resolution, letter of authority) |
| PEP/TFS screening completed for all beneficial owners? | Yes / No |
| Source of funds | Text |
| Nature/purpose of transaction | Text |
| Risk rating | Low / Medium / High |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.3 Initial CDD — Trust Customers

> **AUSTRAC risk note:** Trusts are rated as a **high national money laundering risk** due to poor transparency.

**What You Must Establish:**
- The full name of the trust
- That the trust exists (trust deed, ABN registration)
- The identity of **all beneficial owners**, including:
  - Individual trustees (or beneficial owners of corporate trustees)
  - **Settlor** (person who established the trust)
  - **Appointor** (person who can appoint/remove the trustee)
  - **Guardian or Protector** (if applicable)
  - Any person with effective control over the trust
- The identity of all **beneficiaries**, or if not individually identifiable, each **class** of beneficiaries
- The identity of the person acting on behalf of the trust and their authority
- PEP/TFS status of all identified individuals
- Nature and purpose of the business relationship

**Interactive Form — Trust CDD:**

| Field | Input |
|---|---|
| Trust name | Text |
| Trust type | Dropdown: Discretionary / Unit / Family / Testamentary / Other |
| ABN (if registered) | Text |
| Trust deed sighted? | Yes / No + date |
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
| PEP/TFS screening completed for all individuals? | Yes / No |
| Person acting on behalf of trust — Name | Text |
| Authority documented? | Yes / No |
| Source of funds | Text |
| Nature/purpose of transaction | Text |
| Risk rating | Medium / High / Very High |
| EDD required? | Yes / No (auto-flagged for trusts) |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.4 Initial CDD — Partnership Customers — NEW

**What You Must Establish:**
- Partnership name and registration details
- Identity of all partners (or beneficial owners if partners are entities)
- Identity of the person authorised to act on behalf of the partnership
- PEP/TFS status of all partners
- Nature and purpose of the relationship

**Interactive Form — Partnership CDD:**

| Field | Input |
|---|---|
| Partnership name | Text |
| ABN | Text |
| Partnership type | General / Limited / Limited Liability |
| Partner 1 — Name | Text |
| Partner 1 — Type | Individual / Entity |
| Partner 1 — ID verified? | Yes / No |
| (Repeat for additional partners) | |
| Authorised representative — Name | Text |
| Authority documented? | Yes / No |
| PEP/TFS screening completed? | Yes / No |
| Source of funds | Text |
| Risk rating | Low / Medium / High |
| CDD completed by | Text |
| Date completed | Date |

#### 7.8.5 Initial CDD — Foreign Customers — EXPANDED

**Additional Requirements for Foreign Customers:**
- All standard CDD steps apply (same as relevant entity type above)
- **Enhanced due diligence is likely required** due to foreign jurisdiction risk
- Assess whether the customer or funds originate from a high-risk jurisdiction (FATF grey/blacklist)
- Additional documentation may be needed:
  - Foreign passport (with certified translation if not in English)
  - Foreign government-issued ID
  - Certified copies of overseas corporate registrations
  - Evidence of source of funds from overseas

**FATF High-Risk Jurisdictions Reference:**
- Embedded reference list of FATF grey-listed and blacklisted jurisdictions (updated periodically)
- Link to current FATF list for real-time reference
- Visual world map with risk-colour coding (static image, no API)

**Interactive Form:** Uses the same form as the relevant entity type (individual, company, trust) with additional fields:

| Additional Field | Input |
|---|---|
| Customer country of residence/incorporation | Dropdown (country list) |
| Is this a FATF high-risk jurisdiction? | Auto-flagged based on country selection |
| Source of overseas funds | Text |
| Reason for investing in Australian property | Text |
| Foreign ID document type | Text |
| Foreign ID document — certified translation? | Yes / No / N/A |
| Enhanced due diligence applied? | Yes / No |
| EDD measures taken | Text (free-form) |

#### 7.8.6 Enhanced Due Diligence (EDD) — NEW PAGE

**Purpose:** Explain when and how to apply enhanced due diligence.

**When EDD Is Required:**
AUSTRAC guidance indicates EDD should be applied when ML/TF/PF risk is assessed as **high**, including but not limited to:

| Trigger | Example |
|---|---|
| High-risk customer type | Trusts, complex corporate structures, PEPs |
| High-risk jurisdiction | Customer or funds from FATF grey/blacklisted country |
| Unusual transaction patterns | Significantly above/below market value, rapid buy-sell |
| Non-face-to-face relationship | Entirely online/remote transaction |
| Unclear source of funds | Customer cannot explain where funds are coming from |
| Third-party payment | Funds coming from an unrelated third party |
| Suspicion indicators present | Any red flag from Section 7.9 |

**EDD Measures (proportionate to risk level):**
- More detailed source-of-funds / source-of-wealth inquiries
- Additional identity verification documents
- Senior management approval for the business relationship
- Increased frequency of ongoing monitoring
- Independent verification of information provided
- Enhanced record keeping of the rationale for proceeding

**Interactive Form — EDD Record:**

| Field | Input |
|---|---|
| Customer name | Text |
| CDD form reference | Text (link to initial CDD form) |
| EDD trigger(s) | Multi-select checklist |
| Additional source-of-funds information obtained | Text |
| Additional documents collected | Text |
| Senior management approval obtained? | Yes / No + name + date |
| Ongoing monitoring frequency set | Dropdown: monthly / quarterly / per transaction |
| Rationale for proceeding with relationship | Text |
| Completed by | Text |
| Date | Date |

#### 7.8.7 Ongoing CDD — NEW PAGE

**Purpose:** Explain what ongoing customer due diligence means and when to apply it.

**What Is Ongoing CDD?**
After initial CDD, you must continue to monitor the customer relationship for the duration of the business relationship. This includes:

- Keeping customer information **up to date**
- Monitoring **transactions** for consistency with the customer's known profile
- Being alert to **changes in risk** (e.g., customer's circumstances change, new red flags emerge)
- **Re-verifying identity** if doubts arise about previously obtained information
- Conducting **periodic reviews** of higher-risk customers more frequently

**When to Re-Assess:**
- Customer requests unusual changes to a transaction
- New information suggests a higher risk level
- Source of funds changes unexpectedly
- Customer's business structure changes
- Adverse media about the customer emerges

**Interactive Checklist — Ongoing CDD Review:**

- [ ] Customer information is current (name, address, contact)
- [ ] Transaction is consistent with customer's known profile
- [ ] No new red flags or suspicious indicators identified
- [ ] Source of funds remains consistent with expectations
- [ ] PEP/TFS status re-checked
- [ ] Risk rating reviewed and confirmed / updated
- [ ] Review date recorded

#### 7.8.8 PEP & Sanctions Screening — NEW PAGE

**Purpose:** Explain PEP and TFS screening obligations in plain English.

**What Is a PEP?**
A Politically Exposed Person is someone who holds or has held a prominent public position, domestically or internationally. This includes:
- Heads of state, government ministers, senior politicians
- Senior government officials, military leaders, judiciary members
- Senior executives of state-owned enterprises
- **Family members** and **close associates** of the above

**What Is TFS?**
Targeted Financial Sanctions are sanctions imposed under Australian law (and UN Security Council resolutions) against specific individuals and entities. It is illegal to provide services to sanctioned persons.

**Screening Process:**
1. Ask the customer (or their representative) whether they are a PEP or associated with a PEP
2. Check the Australian Government's **Consolidated List** of sanctioned persons/entities
3. Document the screening result
4. If a PEP is identified → apply EDD (Section 7.8.6)
5. If a sanctioned person is identified → **do not proceed** and seek legal advice

**Resources Linked:**
- DFAT Consolidated List: [https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list](https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list)

**Interactive Form — PEP/TFS Screening Record:**

| Field | Input |
|---|---|
| Customer name | Text |
| PEP self-declaration obtained? | Yes / No |
| Is customer a PEP? | Yes / No / Uncertain |
| PEP type | Domestic / Foreign / International Organisation |
| Relationship to PEP (if associate/family) | Text |
| DFAT Consolidated List checked? | Yes / No + date |
| Sanctions match found? | Yes / No |
| Action taken | EDD applied / Service declined / Seek advice |
| Screened by | Text |
| Date | Date |

#### 7.8.9 Delayed CDD (Real Estate Specific) — NEW PAGE

> **📎 AUSTRAC Source:** [Delayed Initial Customer Due Diligence (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform) | [Examples of Dealing with Customers](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-examples-dealing-customers)

**Purpose:** Explain when and how CDD verification can be delayed in real estate transactions.

**When You May Delay CDD:**
AUSTRAC recognises that real estate transactions may require starting work before CDD is fully completed. You may delay initial CDD if **both** conditions are met:

1. You determine on reasonable grounds that there is **low additional ML/TF/PF risk** if you delay
2. Delaying is **essential to avoid interrupting the ordinary course of business**

**Real Estate Examples Where Delay May Be Appropriate:**
- An auction where the winning bidder signs a contract on the day and full CDD has not yet been completed (AUSTRAC's medium-risk worked example specifically addresses this)
- A fast-moving sale where the vendor insists on exchanging contracts within 24 hours
- An interstate/overseas buyer who cannot provide original ID documents immediately

**AUSTRAC Worked Example (from Starter Kit):**
> In the medium-risk customer example, an agent applies delayed CDD at an auction because: (1) they are completing CDD on the counterparty (buyer) at an auction, (2) there is low additional ML/TF risk associated with delaying as CDD will be completed before settlement, and (3) there are adequate controls to manage additional risk, including the ability to stop brokering services if the buyer falls outside risk appetite. Sanctions screening is still completed **without delay**.

**Mandatory Completion Rules:**
- CDD must be completed **as soon as reasonably practicable** after you start providing the service
- Must be completed no later than the timeframes in the AML/CTF Rules 2025
- **Sanctions screening must still be completed without delay**, even when other CDD is delayed
- **Civil penalties apply** if you fail to verify within the required timeframe

**Your AML/CTF Program Must Include:**
- When it is appropriate to delay CDD
- How you will manage and mitigate ML/TF/PF risks during the delay period
- A process for what happens if CDD reveals concerns after you've started (e.g., return deposit, cease acting)

**Interactive Checklist — Delayed CDD Record:**

| Field | Input |
|---|---|
| Customer name | Text |
| Reason for delay | Text |
| Low ML/TF/PF risk assessment documented? | Yes / No |
| Delay essential to avoid interrupting business? | Yes / No |
| Sanctions screening completed without delay? | Yes / No + date |
| Date service commenced | Date |
| CDD completion target date | Date |
| CDD actually completed date | Date |
| Any concerns identified after completion? | Yes / No |
| Action taken if concerns found | Text |

---

#### 7.8.10 Third-Party Reliance Arrangements — NEW PAGE

> **📎 AUSTRAC Source:** [Reliance Under Customer Due Diligence Arrangements (Reform)](https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform)

**Purpose:** Explain when and how you can rely on another party's CDD.

**What Is Third-Party Reliance?**
You may rely on CDD information collected and verified by another reporting entity (e.g., a lawyer, conveyancer, or another real estate agent), rather than conducting CDD yourself from scratch.

**Real Estate Example:**
A buyer's solicitor has already verified the buyer's identity as part of their own AML/CTF obligations. As the selling agent, you may be able to rely on the solicitor's CDD rather than re-verifying the buyer yourself.

**AUSTRAC Risk Factor:** Note that AUSTRAC's risk rating table treats *"a third party that isn't enrolled with AUSTRAC representing the customer"* as a **medium risk factor**. If the third party IS enrolled with AUSTRAC, this factor does not apply.

**Eligible Third Parties:**
- A reporting entity regulated under Australian AML/CTF law
- A foreign business subject to AML/CTF regulation implementing FATF recommendations

**Before Entering a Reliance Arrangement, You Must:**
1. Assess whether the arrangement is appropriate to your own ML/TF/PF risks
2. Evaluate the third party's ML/TF risk assessment, countries of operation, customer types, and business complexity
3. Review any published disciplinary actions, adverse media, or evaluation findings about the third party
4. Agree on CDD standards appropriate to the customer's risk level
5. Document the arrangement in your AML/CTF program

**Critical Rule:** You **remain responsible** for ensuring CDD obligations are met. If the third party's CDD was inadequate, you are still liable.

**Interactive Form — Third-Party Reliance Record:**

| Field | Input |
|---|---|
| Customer name | Text |
| Third party relied upon — Name/Firm | Text |
| Third party is a reporting entity? | Yes / No |
| Third party enrolled with AUSTRAC? | Yes / No |
| Jurisdiction | Text |
| Assessment of third party's ML/TF risk framework completed? | Yes / No |
| CDD standards agreed? | Yes / No |
| Arrangement documented in AML/CTF program? | Yes / No |
| Date of reliance | Date |
| CDD information received | Text |

---

#### 7.8.11 When CDD Cannot Be Completed — NEW PAGE

> **📎 AUSTRAC Source:** [CDD Before Providing a Designated Service](https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service)

**Purpose:** Guide agents on what to do when a customer refuses or is unable to complete CDD.

**When CDD Fails, Consider:**

| Scenario | Recommended Action |
|---|---|
| Customer refuses to provide ID | Decline to act. Consider filing an SMR if the refusal itself is suspicious. |
| Customer provides inconsistent or fraudulent documents | Do not proceed. Escalate internally. File an SMR. |
| Beneficial owner cannot be identified for a trust or company | Do not proceed until beneficial owners are identified. Apply EDD. |
| Customer is on the DFAT sanctions list | **Do not proceed under any circumstances.** Seek legal advice. You may have a legal obligation to freeze assets. |
| CDD reveals a PEP | Do not automatically decline — apply EDD and obtain senior management approval. |
| CDD reveals high-risk jurisdiction connection | Apply EDD. May proceed if risk can be adequately mitigated and documented. |
| Customer's source of funds cannot be verified | Consider declining. If proceeding, apply EDD and document rationale. File an SMR if suspicious. |

**AUSTRAC High-Risk Worked Example:**
> In AUSTRAC's high-risk customer example, the AML/CTF compliance officer discovers that the value of the real estate the customer seeks to buy appears grossly excessive relative to their known sources of wealth. Open-source background checks reveal the customer has been investigated internationally for fraud and corruption. The compliance officer forms reasonable grounds for suspicion and submits an SMR. Despite this, the senior manager provides written approval to continue the relationship — demonstrating that filing an SMR does not automatically mean you must decline service.

**Document the Decision:**
Whether you proceed or decline, **document the outcome** and the reasoning. This is critical for record-keeping and potential AUSTRAC review.

**Interactive Form — CDD Outcome Record:**

| Field | Input |
|---|---|
| Customer name | Text |
| CDD issue encountered | Dropdown: Refused ID / Inconsistent docs / Beneficial owner unclear / Sanctions match / PEP identified / High-risk jurisdiction / Source of funds unverifiable / Other |
| Detail of issue | Text |
| Action taken | Dropdown: Service declined / EDD applied and proceeded / SMR filed / Sanctions freeze / Seek legal advice |
| Rationale for decision | Text |
| Senior management approval (if proceeding with high risk) | Yes / No + name + date |
| SMR filed? | Yes / No |
| Documented by | Text |
| Date | Date |

---

#### 7.8.12 Privacy Obligations & CDD Data — NEW PAGE

**Purpose:** Brief guidance on how AML/CTF data collection intersects with the Australian Privacy Principles (APPs).

**Key Points:**
- When collecting personal information for CDD, you are doing so under a **legal obligation** (AML/CTF Act). This is a permitted purpose under the APPs.
- You should **only collect information that is reasonably necessary** for CDD purposes — do not over-collect.
- CDD data must be **stored securely** and protected from unauthorised access, loss, or misuse.
- You must **not use CDD information for marketing** or any purpose unrelated to your AML/CTF obligations.
- Customers have a right to know **why** you are collecting their information. You can explain that it is required under Australian AML/CTF law.
- Customers do **not** have a right to refuse CDD collection — but you must handle their data in accordance with the APPs.
- SMR-related records must be handled with **additional care** due to the tipping-off prohibition.

**Privacy Notice Template (for inclusion in CDD forms):**
```
We are required by Australian Anti-Money Laundering and Counter-Terrorism 
Financing (AML/CTF) law to collect and verify your identity information 
before providing certain services. This information will be stored securely, 
used only for AML/CTF compliance purposes, and retained for a minimum of 
7 years as required by law. For more information, please refer to our 
Privacy Policy.
```

---

### 7.9 Suspicious Activity & Red Flags — EXPANDED

> **📎 AUSTRAC Source:** [Risk Insights and Indicators of Suspicious Activity for the Real Estate Sector](https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-real-estate-sector)

**Purpose:** Help agents recognise warning signs of money laundering in real estate transactions — **aligned to AUSTRAC's 4 risk categories** from their official "Risk insights and indicators of suspicious activity for the real estate sector" guidance.

**Context:** AUSTRAC states that real estate professionals are often the **first contact point** for criminals attempting to launder money through property. Being able to recognise red flags is critical.

#### Category 1: Customer Risk Indicators

| Red Flag | Detail |
|---|---|
| Customer reluctant to provide ID | Avoids, delays, or provides inconsistent identity documents |
| Customer uses different names | Name on contract differs from name on ID or bank account |
| Customer uses nominees or shell companies | Attempts to conceal the true buyer/owner |
| Customer is evasive about source of funds | Cannot or will not explain where purchase funds originate |
| Customer is unconcerned about price | Willingly overpays or shows no interest in negotiating |
| Customer has no apparent connection to property location | Buyer has no reason to invest in the area (no work, family, or business ties) |
| Customer is a PEP or associate of a PEP | Prominent public officials or their close associates |
| Customer's wealth is inconsistent with known profile | e.g., low-income individual purchasing a high-value property |
| Customer pressures for rapid completion | Pushes to settle unusually quickly without apparent reason |
| Complex ownership structures | Multiple layers of companies, trusts, or partnerships with no clear commercial rationale |

#### Category 2: Service/Transaction Risk Indicators

| Red Flag | Detail |
|---|---|
| Cash payments for large amounts | Buyer wants to pay all or part of the purchase price in physical cash |
| Funds from unrelated third parties | Purchase funded by someone with no clear connection to the buyer |
| Significantly above/below market value | Property purchased at a price that doesn't match market conditions |
| Quick buy-and-sell | Property bought and resold rapidly with no renovations or clear profit motive |
| Back-to-back transactions | Multiple transactions on the same property in a short period |
| Deposit paid from overseas with no explanation | International funds with no clear source or reason |
| Unusual contract terms | Side agreements, undisclosed rebates, or unusual settlement conditions |
| Transaction restructured to avoid thresholds | Breaking a cash payment into amounts just under $10,000 (structuring) |

#### Category 3: Delivery Channel Risk Indicators

| Red Flag | Detail |
|---|---|
| Entirely non-face-to-face transaction | Customer never meets the agent in person; all conducted remotely |
| Customer insists on communicating only via encrypted messaging | Avoids phone calls, emails, or traceable communication |
| Third-party intermediary provides all instructions | Customer is shielded behind lawyers, agents, or other intermediaries |
| Instructions change frequently or inconsistently | Shifting requirements that don't align with normal transaction patterns |

#### Category 4: Foreign Jurisdiction Risk Indicators

| Red Flag | Detail |
|---|---|
| Funds from high-risk jurisdictions | Money originates from FATF grey-listed or blacklisted countries |
| Customer based in a jurisdiction with weak AML controls | Countries known for poor AML/CTF frameworks |
| Multiple international transfers involved | Complex fund routing through several countries before reaching Australia |
| Customer has no connection to Australia | No residency, business, or family ties to Australia |
| Foreign corporate structures used to purchase | Offshore companies or trusts used to hold Australian property |

**"What Should I Do?" Action Guidance (shown on every card):**

```
1. STOP — Do not tip off the customer about your concerns.
2. DOCUMENT — Record your observations and concerns in writing.
3. ESCALATE — Report your concerns to your AML/CTF compliance officer 
   or the designated escalation point within your agency.
4. ASSESS — The compliance officer assesses whether an SMR should be filed.
5. REPORT — If grounds exist, file an SMR with AUSTRAC within the 
   required timeframe.
6. CONTINUE MONITORING — Even if no SMR is filed, continue monitoring 
   the relationship.
```

**UI Elements:**
- Filterable card grid organised by the 4 AUSTRAC risk categories
- Search bar to filter cards by keyword
- Each card is expandable for more detail and real-world scenario examples
- Colour-coded severity: amber (be alert), red (escalate immediately)
- "What should I do?" action panel slides out from each card
- "Report This" button links to the Reporting section (Section 7.10)
- Print-friendly "Quick Reference Sheet" view of all red flags

---

### 7.10 Reporting to AUSTRAC — EXPANDED

> **📎 AUSTRAC Source:** [Suspicious Matter Reports (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform) | [Threshold Transaction Reports (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform) | [Reporting to AUSTRAC (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform)

**Purpose:** Explain the four types of reports, when to file them, how to file them, and the tipping-off prohibition.

#### 7.10.1 Suspicious Matter Reports (SMRs)

**When You Must File:**
An SMR must be submitted to AUSTRAC if you suspect, on **reasonable grounds**, that:
- A person is committing or planning money laundering or terrorism financing using a designated service
- A customer (or future customer or their agent) is not who they claim to be
- You have information that may be relevant to the investigation of an offence (including tax evasion, fraud, drug trafficking, terrorism financing, or money laundering)

**"Reasonable grounds"** = an objective standard. Would a reasonable person with similar knowledge and experience reach the same suspicion based on the available facts?

**Key SMR Rules:**
- You must submit a **separate SMR each time** you form a new suspicion about a customer
- If you've filed previous SMRs about the same person, reference those in the new report
- SMR obligations apply even if you **decide not to provide** the service
- You do NOT need to be certain — **suspicion** on reasonable grounds is sufficient

**Timeframes:**

| Scenario | Deadline |
|---|---|
| Suspicion relates to **terrorism financing** | Within **24 hours** |
| All other suspicions | Within **3 business days** |

**How to File:** Via [AUSTRAC Online](https://online.austrac.gov.au)

**What to Include:**
- Customer details (as known)
- Description of the suspicious activity
- Your grounds for suspicion
- Relevant transaction details
- Any supporting documents
- References to previous SMRs on the same person (if any)

**Real Estate Example:**
> A buyer insists on paying a $200,000 deposit in physical cash. They are evasive when asked about the source of funds and provide ID with a different address than on the contract. The agent should escalate internally, and the compliance officer should file an SMR.

#### 7.10.2 Threshold Transaction Reports (TTRs)

**When You Must File:**
A TTR is required when you receive **$10,000 or more in physical currency** (Australian or foreign equivalent) in a single transaction.

**Physical currency** = banknotes and coins. It does NOT include:
- Electronic bank transfers
- Cheques
- Credit/debit card payments
- Cryptocurrency

**Timeframe:** Within **10 business days** after the transaction.

**How to File:** Via [AUSTRAC Online](https://online.austrac.gov.au)

**What to Include:**
- Customer information
- Parties involved
- Designated services provided
- Transaction amount and date
- Purpose (if known)
- Account details (if applicable)

**Real Estate Example:**
> A customer pays a real estate agent $21,250 in cash as a deposit on a property. The agent must file a TTR within 10 business days. If the remaining settlement amount is paid by electronic transfer, no additional TTR is required for that payment.

**Structuring Warning:**
If a customer appears to be **breaking up cash payments** into amounts just under $10,000 to avoid the TTR threshold, this is called **structuring** and is itself a criminal offence. This should also trigger an SMR.

#### 7.10.3 International Fund Transfer Instructions (IFTIs)

**When You Must File:**
An IFTI report is required when you are involved in sending or receiving international electronic fund transfers.

**Timeframe:** Within **10 business days**

> Note: In most real estate transactions, the real estate agent is not directly involved in the fund transfer — the bank handles this. However, if you are directly involved in receiving or arranging international transfers, you have IFTI reporting obligations.

#### 7.10.4 Annual Compliance Reports — NEW

> **📎 AUSTRAC Source:** [Step 2: Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program)

**What Is It?**
An annual compliance report submitted to AUSTRAC about how you met your AML/CTF obligations during the previous calendar year.

**Key Details:**
- Required annually
- Covers the previous calendar year
- Reports on how the business met its obligations
- Filed via [AUSTRAC Online](https://online.austrac.gov.au)

**What to Include:**
- Confirmation that AML/CTF program is in place and current
- Summary of compliance activities undertaken
- Any material changes to the program during the reporting period
- Details of independent evaluations conducted (if applicable)

**UI Element:** Add a reminder/countdown for the annual compliance report due date in the Dashboard section.

---

#### 7.10.5 Tipping-Off Prohibition

**Critical Legal Requirement:**

You **MUST NOT** disclose ("tip off") to the customer or any other person that:
- You have filed or intend to file an SMR
- You suspect or have formed a suspicion about the customer
- AUSTRAC is investigating or may investigate the customer

**Penalties for tipping off are severe** — this is a criminal offence.

**What You CAN Do:**
- Discuss your concerns with your compliance officer
- Seek legal advice (covered by legal professional privilege)
- Continue to provide the service normally (unless declining the relationship)
- File the SMR

**What You CANNOT Do:**
- Tell the customer you've reported them
- Warn the customer that their transaction looks suspicious
- Discuss SMR details with colleagues who don't need to know
- Post about it on social media or discuss publicly

**UI Elements:**
- Interactive internal escalation flowchart
- Decision tree: "Should I file an SMR?" (yes/no questions leading to a recommendation)
- TTR calculator: enter cash amount → tells you if TTR is required
- Tipping-off prohibition highlighted in a red warning box on every reporting page
- Example scenarios for each report type with walkthrough
- Links to AUSTRAC Online

---

### 7.11 Record Keeping

> **📎 AUSTRAC Source:** [Step 2: Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program) | [Summary of Obligations (Tranche 2)](https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities)

**Purpose:** Clear guidance on what to keep, how to keep it, and for how long.

**Records to Retain:**

| Record Type | Examples |
|---|---|
| **Customer identification records** | CDD forms, copies of ID documents, beneficial owner records, PEP/TFS screening results |
| **Transaction records** | Contracts of sale, deposit receipts, settlement statements, payment records |
| **AML/CTF program documentation** | Risk assessment, policy document, process document, governance records |
| **Reporting records** | Internal copies of SMRs, TTRs, IFTIs filed; internal escalation records |
| **Training records** | Attendance records, training materials, quiz results, training dates |
| **Personnel records** | Due diligence records for AML/CTF roles, compliance officer appointment records |
| **Review and evaluation records** | Program review records, independent evaluation reports, change logs |
| **Correspondence** | Communications with AUSTRAC, internal memos on compliance matters |

**Retention Period:** Minimum **7 years** from when the record was made or the business relationship ended (whichever is later).

**Storage Requirements:**
- Must be stored **securely** (protection against unauthorised access, loss, or damage)
- Must be **retrievable within a reasonable timeframe** if AUSTRAC requests them
- Can be **digital or physical** (or both)
- Must comply with **privacy obligations** (Australian Privacy Principles)
- Digital records must be backed up

**Interactive Checklist — Record Keeping Self-Audit:**

- [ ] All CDD forms are being saved systematically
- [ ] ID document copies are stored securely
- [ ] Transaction records are linked to customer CDD records
- [ ] SMR/TTR/IFTI copies are kept separately from customer files (for tipping-off protection)
- [ ] Training records include dates, attendees, and content covered
- [ ] Personnel due diligence records are maintained
- [ ] Program review records document what was reviewed and any changes made
- [ ] All records are set for minimum 7-year retention
- [ ] Storage method is secure and privacy-compliant
- [ ] Records can be retrieved within a reasonable timeframe

---

### 7.12 Staff Training & Awareness — EXPANDED

> **📎 AUSTRAC Source:** [Personnel Due Diligence & Training (Reform)](https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform) | [Step 2: Use Your Real Estate Program — Managing Personnel](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program)

**Purpose:** Help agencies plan, deliver, and track AML/CTF training.

#### 7.12.1 Training Plan Builder — NEW

**Who Needs Training:**
According to AUSTRAC, training is required for anyone performing roles relevant to AML/CTF obligations:
- All sales agents and buyer's agents
- Administrative staff involved in CDD or record keeping
- Compliance officer (additional specialised training)
- Management / principals (governance awareness)
- Contractors and consultants performing AML/CTF functions
- New hires (before performing designated services)

**When:**
- **Initial training:** Before 1 July 2026 (or before a new hire starts performing designated services)
- **Refresher training:** At least annually
- **Ad-hoc training:** When policies or procedures change, new risks emerge, or after incidents

**What to Cover:**

| Module | Content | For Whom |
|---|---|---|
| 1. ML/TF/PF Overview | What is money laundering, terrorism financing, and proliferation financing? Why is real estate a target? | All staff |
| 2. Legal Obligations | Overview of AML/CTF Act obligations for real estate agents | All staff |
| 3. Your AML/CTF Program | Walk through your agency's specific program — risk assessment, policies, processes | All staff |
| 4. Customer Due Diligence | How to perform initial CDD for individuals, companies, trusts; how to verify identity documents | Customer-facing staff |
| 5. Beneficial Ownership | How to identify and verify beneficial owners for companies and trusts | Customer-facing staff |
| 6. PEP & Sanctions Screening | What PEPs and TFS are; how to screen; what to do if a match is found | Customer-facing staff, compliance officer |
| 7. Red Flags & Suspicious Activity | AUSTRAC's real estate red flag indicators across all 4 categories; how to recognise suspicious behaviour | All staff |
| 8. Reporting Obligations | When and how to file SMRs, TTRs, and IFTIs; internal escalation process | All staff |
| 9. Tipping-Off Prohibition | What you must not disclose; penalties for tipping off | All staff |
| 10. Record Keeping | What to keep, how to store it, for how long | Admin staff, compliance officer |
| 11. Ongoing CDD & Monitoring | How to conduct ongoing monitoring; when to re-assess risk | Customer-facing staff |
| 12. Program Review | When and how to review the AML/CTF program; review triggers | Compliance officer, management |

**Interactive Form — Training Plan:**

| Field | Input |
|---|---|
| Training module | Dropdown (from modules above) |
| Target audience | Multi-select (roles) |
| Delivery method | In-person / Online / Self-paced / External provider |
| Scheduled date | Date |
| Duration | Text (e.g., "1 hour") |
| Trainer | Text |
| Status | Not started / Scheduled / Completed |

**Interactive Form — Training Attendance Record:**

| Field | Input |
|---|---|
| Training module | Dropdown |
| Date delivered | Date |
| Attendee name | Text |
| Role | Dropdown |
| Completed? | Yes / No |
| Quiz score (if applicable) | Number |
| Notes | Text |

#### 7.12.2 Staff Knowledge Quiz — EXPANDED

**Purpose:** A self-assessment quiz (15 questions) agents can take to test their AML/CTF understanding. Purely educational — no data transmitted.

**Example Questions:**

1. *Which of the following are designated services for real estate under the AML/CTF Act?*
   - a) Property management
   - b) Brokering a property sale on behalf of a vendor
   - c) Commercial leasing
   - d) Conveyancing
   - **Answer: b**

2. *A buyer offers to pay a $15,000 deposit entirely in cash. What must you do?*
   - a) Accept the cash and proceed normally
   - b) Refuse the cash payment
   - c) Accept the cash, file a TTR with AUSTRAC within 10 business days, and consider whether an SMR is also warranted
   - d) Call the police
   - **Answer: c**

3. *You file an SMR about a customer. Can you tell the customer about it?*
   - a) Yes, they have a right to know
   - b) No — disclosing an SMR is a criminal offence (tipping off)
   - c) Only if they ask directly
   - d) Only if your manager approves
   - **Answer: b**

4. *What is a PEP?*
   - a) A Personal Equity Plan
   - b) A Politically Exposed Person — someone who holds or has held a prominent public position
   - c) A Property Evaluation Protocol
   - d) A Pre-Exchange Procedure
   - **Answer: b**

5. *A customer wants to buy a property using a complex trust structure with multiple layers of corporate trustees. The beneficial owners are unclear. What risk level does this indicate?*
   - a) Low risk
   - b) Medium risk
   - c) High risk — trusts with opaque ownership are a key ML vulnerability
   - d) No risk — trusts are normal in property transactions
   - **Answer: c**

6. *How long must you keep CDD records?*
   - a) 1 year
   - b) 3 years
   - c) 5 years
   - d) 7 years
   - **Answer: d**

7. *A buyer from a FATF-blacklisted country wants to purchase a property. What should you do?*
   - a) Refuse the sale immediately
   - b) Proceed normally — country of origin doesn't matter
   - c) Apply enhanced due diligence, verify source of funds, and consider filing an SMR if suspicious
   - d) Report the customer to immigration
   - **Answer: c**

8. *When must you file an SMR if the suspicion relates to terrorism financing?*
   - a) Within 3 business days
   - b) Within 10 business days
   - c) Within 24 hours
   - d) Within 30 days
   - **Answer: c**

9. *A customer is buying a property significantly above market value and seems unconcerned about the price. Is this a red flag?*
   - a) No — buyers sometimes pay premium prices
   - b) Yes — this is a recognised ML indicator in real estate
   - **Answer: b**

10. *You are a property manager handling residential rentals. Do you have AML/CTF obligations under the reforms?*
    - a) Yes — all real estate professionals are captured
    - b) No — property management is exempt from these designated services
    - **Answer: b**

11. *Who must be appointed to oversee your AML/CTF program?*
    - a) An external lawyer
    - b) An AML/CTF compliance officer at management level
    - c) A government inspector
    - d) The newest employee
    - **Answer: b**

12. *A customer's deposit funds come from an unrelated third party with no apparent connection to the transaction. What should you do?*
    - a) Proceed — it's the customer's choice where funds come from
    - b) Treat this as a red flag, conduct further inquiries, and escalate if concerns remain
    - **Answer: b**

13. *How often must an independent evaluation of your AML/CTF program be conducted?*
    - a) Every year
    - b) Every 2 years
    - c) At least every 3 years
    - d) Every 5 years
    - **Answer: c**

14. *Can you rely on a third party (e.g., a lawyer or another agent) to conduct CDD on your behalf?*
    - a) No — you must always do it yourself
    - b) Yes — but you remain ultimately responsible and must have a documented reliance arrangement
    - **Answer: b**

15. *What is "structuring" and why is it relevant?*
    - a) Building a property — not relevant to AML
    - b) Breaking cash payments into amounts just under $10,000 to avoid TTR reporting — this is a criminal offence and an ML red flag
    - **Answer: b**

**UI Elements:**
- One question per screen with progress bar
- Immediate feedback after each answer (correct/incorrect + explanation)
- Score summary at the end
- "Retake Quiz" option
- No data transmitted — all client-side

---

### 7.13 Program Review & Maintenance — NEW PAGE

> **📎 AUSTRAC Source:** [Step 3: Maintain and Review Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-3-maintain-and-review-your-real-estate-program)

**Purpose:** Guide the user through the ongoing obligation to review and update their AML/CTF program.

**AUSTRAC Requirement:** Your AML/CTF program must remain current as risks, operations, and regulatory expectations change.

#### Review Triggers

Your program must be reviewed when any of the following occur:

| Trigger | Example |
|---|---|
| **Scheduled periodic review** | Your program specifies reviews every 6 or 12 months |
| **Changes to designated services** | You start or stop offering a type of service (e.g., commercial property) |
| **Changes to customer types** | You begin servicing a new customer type (e.g., foreign investors, trusts) |
| **Changes to countries** | You begin dealing with customers linked to a new high-risk jurisdiction |
| **Internal incidents or control failures** | A CDD step was missed; a suspicious transaction was not escalated |
| **Regulatory or legislative updates** | AUSTRAC issues new guidance or the AML/CTF Rules change |
| **New or emerging ML/TF/PF risks** | New typologies identified by AUSTRAC or law enforcement |
| **AUSTRAC communications** | AUSTRAC issues a national risk assessment, sector alert, or direct feedback |
| **Adverse independent evaluation findings** | An independent evaluator identifies gaps or weaknesses |
| **Significant business changes** | Staff changes, new offices, new technology platforms |

#### Review Checklist

When a review is triggered:

- [ ] Identify what triggered the review
- [ ] Review and update the risk assessment (if risk profile has changed)
- [ ] Review and update policies and procedures
- [ ] Review and update forms and templates
- [ ] Review and update controls (are existing controls still adequate?)
- [ ] Confirm risks remain within your risk appetite
- [ ] Communicate changes to relevant staff
- [ ] Provide additional training if needed
- [ ] Document the review (what was reviewed, what changed, who approved)
- [ ] Update the change log

#### Change Log — Interactive

**Purpose:** A running record of all changes to the AML/CTF program.

| Field | Input |
|---|---|
| Date of change | Date |
| Review trigger | Dropdown (from triggers above) |
| What was reviewed | Text |
| What was changed | Text |
| Approved by | Text |
| Staff notified? | Yes / No |
| Training required? | Yes / No |
| Training delivered? | Yes / No + date |

> Stored in localStorage. Exportable as JSON or printable.

---

### 7.14 Independent Evaluation Planning — NEW PAGE

> **📎 AUSTRAC Source:** [Step 3: Maintain and Review Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-3-maintain-and-review-your-real-estate-program)

**Purpose:** Help agencies plan for the required independent evaluation of their AML/CTF program.

**AUSTRAC Requirement:** An independent evaluation must be conducted at least once every **3 years**. The evaluator must be independent of the program (i.e., not the compliance officer or anyone who designed the program).

**What the Evaluation Covers:**
- Adequacy of the AML/CTF program relative to the business's ML/TF/PF risks
- Effectiveness of CDD procedures
- Effectiveness of transaction monitoring and suspicious activity detection
- Compliance with reporting obligations
- Adequacy of record keeping
- Staff training effectiveness
- Governance arrangements

**Who Can Conduct It:**
- External compliance consultant
- Internal audit function (if independent of the AML/CTF program)
- Industry association compliance review service
- Note: it must NOT be conducted by the compliance officer or someone who built the program

**Interactive Planning Form:**

| Field | Input |
|---|---|
| First evaluation due by | Date (calculated: 3 years from program commencement) |
| Evaluator type | External consultant / Internal audit / Industry body |
| Evaluator name/firm | Text |
| Confirmed independent of program? | Yes / No |
| Scope agreed | Text |
| Estimated cost | Text |
| Status | Not started / Planning / In progress / Completed |
| Evaluation date | Date |
| Findings summary | Text |
| Adverse findings? | Yes / No |
| Remediation actions | Text |
| Remediation completed? | Yes / No + date |

---

### 7.15 Forms & Templates Library — NEW PAGE

**Purpose:** Central repository of all interactive forms and printable templates in the tool.

**All Forms (HTML-generated, stored in localStorage, printable):**

| # | Form Name | Used In | Purpose |
|---|---|---|---|
| 1 | CDD — Individual | Section 7.8.1 | Record customer identification for individuals |
| 2 | CDD — Company | Section 7.8.2 | Record customer identification for companies |
| 3 | CDD — Trust | Section 7.8.3 | Record customer identification for trusts |
| 4 | CDD — Partnership | Section 7.8.4 | Record customer identification for partnerships |
| 5 | CDD — Foreign Customer (Supplement) | Section 7.8.5 | Additional fields for foreign customers |
| 6 | Enhanced Due Diligence Record | Section 7.8.6 | Document EDD measures applied |
| 7 | Ongoing CDD Review | Section 7.8.7 | Periodic customer review checklist |
| 8 | PEP/TFS Screening Record | Section 7.8.8 | Document PEP and sanctions screening |
| 9 | Compliance Officer Appointment | Section 7.6.1 | Document CO eligibility and appointment |
| 10 | AML/CTF Roles Assignment | Section 7.6.2 | Assign AML/CTF responsibilities |
| 11 | Personnel Due Diligence Record | Section 7.6.3 | Document staff due diligence |
| 12 | Training Plan | Section 7.12.1 | Plan training modules, audiences, dates |
| 13 | Training Attendance Record | Section 7.12.1 | Record training completion |
| 14 | Program Review Record | Section 7.13 | Document program reviews |
| 15 | Change Log | Section 7.13 | Track all program changes |
| 16 | Independent Evaluation Plan | Section 7.14 | Plan and record independent evaluations |
| 17 | Suspicious Activity Log | Section 7.9 | Internal record of suspicious activity observations |
| 18 | SMR Decision Record | Section 7.10.1 | Document the decision to file (or not file) an SMR |
| 19 | Enrolment Checklist | Section 7.7 | Track enrolment preparation and completion |
| 20 | Risk Assessment Summary | Section 7.4 | Output of the risk assessment wizard |
| 21 | Delayed CDD Record | Section 7.8.9 | Document when and why CDD was delayed |
| 22 | Third-Party Reliance Record | Section 7.8.10 | Document reliance on another party's CDD |
| 23 | CDD Outcome Record | Section 7.8.11 | Document decisions when CDD cannot be completed |

**UI Elements:**
- Grid/list view of all forms
- "Fill Out" button opens the form in a modal/panel
- "Print" button generates a print-friendly version
- "Clear" button resets the form (with confirmation)
- "Export All Data" button exports all localStorage data as a JSON file
- "Import Data" button restores from a previously exported JSON file

---

### 7.16 AUSTRAC Starter Kit Forms Reference — NEW PAGE

> **📎 AUSTRAC Source:** [Real Estate Program Starter Kit Document Library](https://www.austrac.gov.au/reforms/program-starter-kits/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-document-library)

**Purpose:** Map AUSTRAC's official starter kit form names to the corresponding T2C template forms, so users can easily cross-reference between this tool and the official documents.

**AUSTRAC's Starter Kit Forms (as referenced in official worked examples):**

| AUSTRAC Official Form Name | Purpose | T2C Equivalent |
|---|---|---|
| Onboarding form — Individuals and sole traders | Collect initial customer information during engagement | CDD — Individual (Section 7.8.1) |
| Onboarding form — Entity (trust, company, etc.) | Collect initial information for entity customers | CDD — Company/Trust/Partnership (Sections 7.8.2–7.8.4) |
| Initial customer due diligence form — Individual | Verify identity, assess risk, complete CDD checks | CDD — Individual (Section 7.8.1) |
| Initial customer due diligence form — Entity | Verify entity identity, beneficial owners, CDD checks | CDD — Company/Trust/Partnership (Sections 7.8.2–7.8.4) |
| Guided form: Escalation | Document escalation of high-risk or suspicious matters to compliance officer | Suspicious Activity Log (Section 7.9) |
| Guided form: Enhanced CDD | Document enhanced due diligence measures for high-risk customers | Enhanced Due Diligence Record (Section 7.8.6) |
| Process: Sanctions check | Step-by-step sanctions screening process | PEP/TFS Screening Record (Section 7.8.8) |
| Process: Politically exposed persons check | Step-by-step PEP screening process | PEP/TFS Screening Record (Section 7.8.8) |
| Source of funds and source of wealth check process | Verify where transaction funds and overall wealth originate | Part of EDD Record (Section 7.8.6) |
| Adverse media check process | Open-source background checks on customers | Part of EDD Record (Section 7.8.6) |
| Periodic review and update form | Ongoing CDD review of existing customers | Ongoing CDD Review (Section 7.8.7) |
| Nature and purpose of business relationship verification | Confirm the stated reason for requesting services is truthful | Part of CDD forms |
| Personnel due diligence forms | Assess suitability of staff in AML/CTF roles | Personnel Due Diligence Record (Section 7.6.3) |
| AML/CTF Roles Form | Define AML/CTF responsibilities | AML/CTF Roles Assignment (Section 7.6.2) |
| Assign Responsibilities Form | Assign responsibilities to specific staff | AML/CTF Roles Assignment (Section 7.6.2) |

**UI Elements:**
- Two-column layout showing AUSTRAC form name alongside T2C equivalent
- Click-through links to the relevant T2C section
- Tooltip explaining: "These are the official form names used in AUSTRAC's Real Estate Program Starter Kit. Our tool provides equivalent guidance-only templates."

---

### 7.17 Real-World Customer Examples (Low / Medium / High Risk) — NEW PAGE

> **📎 AUSTRAC Source:** [Real Estate Program Starter Kit: Examples of Dealing with Customers](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-examples-dealing-customers)

**Purpose:** Present AUSTRAC's official worked examples showing how CDD works in practice for each risk level. These examples are drawn directly from AUSTRAC's published guidance and demonstrate the practical application of the starter kit.

#### Example 1: Low-Risk Customer

**Scenario:** A real estate agent brokers the sale of a property. An individual buyer makes an off-market offer of $1 million.

**Key Points:**
- Agent completes initial CDD within 15 days after exchange, before settlement or as soon as practicable
- Uses: Onboarding form, Initial CDD form, Initial CDD policy, Ongoing CDD policy
- Buyer confirms purchasing for themselves, using a bank loan + personal funds
- Buyer is not a PEP, provides driver's licence
- No medium or high-risk factors identified → rated **LOW risk**
- Simplified CDD applied: identity verification via driver's licence, sanctions check, PEP check
- Limited interaction between exchange and settlement — agent monitors for indicators but none arise
- Business relationship concludes at settlement (6 months) — no further ongoing CDD required
- **Compliance boils down to ~3 forms** for this typical customer

#### Example 2: Medium-Risk Customer

**Scenario:** An individual places a successful bid at auction ($1.3M). A representative acts on behalf of two buyers (married couple).

**Key Points:**
- **Medium risk factors:** Both buyers are domestic PEPs (parents of a State MP) + representative is a third-party agent not enrolled with AUSTRAC
- **Delayed CDD applied** at auction — agent determines low additional risk and adequate controls exist
- **Sanctions screening completed WITHOUT delay** (even though other CDD is delayed)
- CDD completed after exchange but before settlement
- Verifies identity of representative AND both buyers
- Verifies representative's authority to act
- PEP check confirms buyers are family members of a domestic PEP
- No triggers or escalation needed → final rating remains **MEDIUM**
- Ongoing monitoring throughout relationship — settlement completed within 2 months

#### Example 3: High-Risk Customer

**Scenario:** Individual seeks to buy a luxury property ($5–5.5M).

**Key Points:**
- **High risk factors:** Foreign PEP (senior government official in a foreign country) + purchasing $1.5M+ without a mortgage
- Agent must **escalate to AML/CTF compliance officer** under escalation and enhanced CDD policy
- Compliance officer conducts enhanced CDD:
  - Identity verification with foreign passport
  - Nature and purpose of business relationship verification
  - **Source of funds check:** Salary verified via pay slips
  - **Source of wealth check:** Salary and share holdings verified via share registry
  - Compliance officer finds property value appears **grossly excessive** relative to known wealth
  - **Adverse media check** reveals customer investigated internationally for fraud and corruption
- Compliance officer forms **reasonable grounds for suspicion** → submits **SMR to AUSTRAC**
- Despite SMR, senior manager provides **written approval to continue** the relationship
- **Ongoing monitoring** conducted more closely than for low/medium risk customers
- Periodic review after 1 year — no discrepancies found
- Settlement completed 14 months after engagement

**UI Elements:**
- Three tabbed panels (Low / Medium / High risk)
- Each example presented as a step-by-step timeline with visual indicators
- Key decision points highlighted with callout boxes
- Cross-references to relevant T2C sections (CDD forms, EDD, PEP screening, SMR)
- "AUSTRAC Says" attribution on each example
- Print-friendly format

---

### 7.18 Jargon Buster (Glossary) — NEW PAGE

**Purpose:** A searchable, plain-English glossary of all AML/CTF terms used in the tool.

| Term | Plain English Meaning |
|---|---|
| **AML** | Anti-Money Laundering — laws and processes to prevent criminals from disguising illegal money as legitimate |
| **CTF** | Counter-Terrorism Financing — laws and processes to prevent money being used to fund terrorism |
| **PF** | Proliferation Financing — funding the development of weapons of mass destruction |
| **ML/TF/PF** | Money Laundering / Terrorism Financing / Proliferation Financing — the three risks the AML/CTF regime addresses |
| **AUSTRAC** | Australian Transaction Reports and Analysis Centre — Australia's financial intelligence agency and AML/CTF regulator |
| **Reporting Entity** | A business that provides designated services and has obligations under the AML/CTF Act |
| **Designated Service** | A specific type of service captured by the AML/CTF Act (e.g., brokering a property sale) |
| **Tranche 2** | The second wave of AML/CTF reforms, extending obligations to real estate, lawyers, accountants, etc. |
| **CDD** | Customer Due Diligence — the process of identifying, verifying, and assessing the risk of your customers |
| **KYC** | Know Your Customer — another term for CDD |
| **EDD** | Enhanced Due Diligence — additional checks required for higher-risk customers |
| **PEP** | Politically Exposed Person — someone in a prominent public position (or their family/associates) |
| **TFS** | Targeted Financial Sanctions — sanctions against specific persons/entities under Australian law |
| **Beneficial Owner** | The natural person who ultimately owns or controls a company, trust, or other entity |
| **SMR** | Suspicious Matter Report — a report filed with AUSTRAC when you suspect ML/TF/PF activity |
| **TTR** | Threshold Transaction Report — a report filed when $10,000+ in physical cash is received |
| **IFTI** | International Fund Transfer Instruction — a report related to international money transfers |
| **Tipping Off** | Illegally telling a customer (or anyone) that an SMR has been filed about them |
| **FATF** | Financial Action Task Force — the international body that sets global AML/CTF standards |
| **FATF Grey List** | Countries with strategic deficiencies in their AML/CTF frameworks (under increased monitoring) |
| **FATF Black List** | Countries with serious strategic deficiencies (high-risk jurisdictions) |
| **Structuring** | Breaking cash payments into smaller amounts to avoid TTR reporting thresholds — this is a criminal offence |
| **Governing Body** | The board of directors, partners, or senior management responsible for oversight of the business |
| **Independent Evaluation** | A review of the AML/CTF program by someone independent of the program (required every 3 years) |
| **Source of Funds** | Where the money for a specific transaction is coming from |
| **Source of Wealth** | How the customer accumulated their overall wealth |
| **DFAT Consolidated List** | The Australian Government's list of persons and entities subject to sanctions |

**UI Elements:**
- Searchable list with filter-as-you-type
- Alphabetically sorted
- Each term is an anchor link (can be linked to from any page via tooltip)

---

### 7.19 FAQ — EXPANDED

**Purpose:** Answer the most common questions in plain English. Each answer cites the relevant AUSTRAC source.

| # | Question | Short Answer |
|---|---|---|
| 1 | I only do property management, not sales. Am I affected? | No. Property management is not a designated service under these reforms. |
| 2 | I'm a buyer's agent. Am I affected? | Yes. Brokering the purchase of real estate on behalf of a buyer is a designated service. |
| 3 | I'm a property developer with an in-house sales team. Am I affected? | Yes. Selling real estate directly to customers without an independent agent is a designated service. |
| 4 | Do I need to verify the identity of both buyer and seller? | Yes. According to AUSTRAC, if you broker a property sale, **both the buyer and the seller are your customers** regardless of which party engaged you. You must conduct CDD on both parties. *(AUSTRAC Source: [Step 2 — Use Your Real Estate Program](https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program))* |
| 5 | What if my customer refuses to provide ID? | If you cannot complete CDD satisfactorily, you should consider whether to decline or cease providing the service. You may also need to file an SMR if the refusal itself is suspicious. |
| 6 | How much does it cost to enrol with AUSTRAC? | Enrolment with AUSTRAC is free. |
| 7 | Can I use a digital ID verification service? | AUSTRAC guidance permits the use of electronic verification methods as part of CDD, subject to your risk assessment. |
| 8 | What if I suspect money laundering but I'm not sure? | You don't need to be certain. If you have suspicion on reasonable grounds, file an SMR. AUSTRAC would rather receive reports that turn out to be unfounded than miss genuine suspicious activity. |
| 9 | What are the penalties for non-compliance? | Penalties vary depending on the breach. AUSTRAC has stated it will focus enforcement on entities that fail to enrol or make no meaningful compliance effort. Civil penalties can be significant. |
| 10 | Do I need to report every cash transaction? | No — only cash transactions of $10,000 or more (TTR). However, any cash transaction that raises suspicion, regardless of amount, may require an SMR. |
| 11 | Can I outsource my AML/CTF program to a third party? | You can use external consultants to help build your program, and you can appoint an external compliance officer if they meet the eligibility criteria. However, you remain ultimately responsible for compliance. |
| 12 | Does a leasehold count as "real estate" under the reforms? | Only if the leasehold exceeds 30 years. Short-term leases are not captured. |
| 13 | What is the difference between a risk assessment and the AML/CTF program? | The risk assessment is a component of the program. The full program includes the risk assessment plus policies, processes, governance, training, and other elements. |
| 14 | Can I rely on another agent's CDD? | Yes, through a documented reliance arrangement. But you remain responsible for ensuring CDD was properly conducted. |
| 15 | Do I need to screen every customer for sanctions? | Yes — PEP and TFS screening is part of initial CDD for every customer. |

**UI Elements:**
- Searchable accordion list
- Filter by topic (enrolment, CDD, reporting, training, etc.)
- Each answer includes an "AUSTRAC Source" link

---

### 7.20 AUSTRAC Links & Source Documents — NEW PAGE

**Purpose:** Central reference of all official AUSTRAC pages and documents used as sources for this tool.

| Document | URL |
|---|---|
| **Starter Kit & Guidance Hub** | |
| Real Estate Guidance (main page) | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance |
| Real Estate Program Starter Kit | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit |
| Starter Kit — Getting Started | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-getting-started |
| Step 1: Customise Your Program | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-1-customise-your-real-estate-program-using-starter-kit |
| Step 2: Use Your Program | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-2-use-your-real-estate-program |
| Step 3: Maintain and Review | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit/step-3-maintain-and-review-your-real-estate-program |
| Starter Kit — Document Library | https://www.austrac.gov.au/reforms/program-starter-kits/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-document-library |
| Examples of Dealing with Customers | https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance/real-estate-program-starter-kit-examples-dealing-customers |
| Starter Kit Media Release (30 Jan 2026) | https://www.austrac.gov.au/news-and-media/media-release/austrac-backs-newly-regulated-sectors-release-amlctf-program-starter-kits |
| **Downloadable Templates (Word)** | |
| Customise Guide (1.13 MB) | https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Customise%20guide%20-%20January%202026.docx |
| Risk Assessment Template (995 KB) | https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Risk%20assessment%20-%20January%202026.docx |
| Policy Document Template (1.07 MB) | https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Policy%20document%20-%20January%202026.docx |
| Process Document Template (977 KB) | https://www.austrac.gov.au/sites/default/files/2026-01/Real%20estate%20-%20Process%20document%20-%20January%202026.docx |
| **Reform Guidance** | |
| Real Estate Services (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/before-you-start/new-industries-and-services-be-regulated-reform/real-estate-services-reform |
| Summary of Obligations (Tranche 2) | https://www.austrac.gov.au/about-us/amlctf-reform/summary-amlctf-obligations-tranche-2-entities |
| Risk Insights — Real Estate Suspicious Activity Indicators | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/risk-insights-and-indicators-suspicious-activity-real-estate-sector |
| Regulatory Expectations for Implementation | https://www.austrac.gov.au/austrac-regulatory-expectations-implementation-amlctf-reforms |
| **Customer Due Diligence** | |
| Initial CDD for Individuals (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-individuals-reform |
| Initial CDD for Trusts (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/initial-customer-due-diligence-guides-customer-type-reform/initial-cdd-trust-reform |
| Enhanced CDD (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/enhanced-customer-due-diligence-reform |
| Delayed Initial CDD (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/initial-customer-due-diligence-reform/delayed-initial-customer-due-diligence-reform |
| CDD Before Providing a Designated Service | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/amlctf-reforms-customer-due-diligence-providing-designated-service |
| Reliance Under CDD Arrangements (Reform) | https://www.austrac.gov.au/about-us/amlctf-reform/reforms-guidance/amlctf-program-reform/customer-due-diligence-reform/reliance-customer-identification-third-party-reform/reliance-under-customer-due-diligence-arrangements-reform |
| Beneficial Owners | https://www.austrac.gov.au/business/core-guidance/customer-identification-and-verification/beneficial-owners |
| **Governance & Personnel** | |
| AML/CTF Compliance Officer (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/develop-your-amlctf-program-reform/step-1-establish-your-governance-framework-reform/amlctf-compliance-officer-reform |
| Personnel Due Diligence & Training (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/personnel-due-diligence-and-training-reform/identifying-personnel-roles-require-due-diligence-and-training-reform |
| **Reporting** | |
| Suspicious Matter Reports (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/suspicious-matter-reports-reform |
| Threshold Transaction Reports (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform/threshold-transaction-reports-reform |
| Reporting to AUSTRAC (Reform) | https://www.austrac.gov.au/amlctf-reform/reforms-guidance/amlctf-program-reform/reporting-austrac-reform |
| AUSTRAC Online (Enrolment & Reporting) | https://online.austrac.gov.au |
| **External References** | |
| DFAT Consolidated Sanctions List | https://www.dfat.gov.au/international-relations/security/sanctions/consolidated-list |
| Money Laundering NRA 2024 | https://www.austrac.gov.au/business/how-comply-guidance-and-resources/guidance-resources/money-laundering-australia-national-risk-assessment-2024 |

---

## 8. Legal Disclaimer (Mandatory — Present on Every Page)

```
DISCLAIMER

This website is an educational aid only. Despite best efforts, some content may 
be factually unreliable.

This tool does NOT constitute legal, financial, compliance, or professional 
advice. It is NOT a substitute for the AUSTRAC Real Estate Program Starter 
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

## 9. Technical Architecture

```
┌──────────────────────────────────────────┐
│              Browser (Client)            │
│                                          │
│  ┌─────────────┐  ┌──────────────────┐   │
│  │   HTML/CSS   │  │   JavaScript     │   │
│  │  (UI Layer)  │  │  (Logic Layer)   │   │
│  └─────────────┘  └──────────────────┘   │
│                                          │
│  ┌──────────────────────────────────────┐ │
│  │          localStorage                │ │
│  │  - Checklist progress (per section)  │ │
│  │  - Risk assessment results           │ │
│  │  - CDD form entries                  │ │
│  │  - Personnel records                 │ │
│  │  - Training records                  │ │
│  │  - Change log entries                │ │
│  │  - Quiz scores                       │ │
│  └──────────────────────────────────────┘ │
│                                          │
│  ┌──────────────────────────────────────┐ │
│  │       Export / Import (JSON)         │ │
│  │  - "Export All Data" → JSON download │ │
│  │  - "Import Data" → restore from JSON │ │
│  │  - "Print" → browser print dialog   │ │
│  └──────────────────────────────────────┘ │
│                                          │
│  Zero network calls after initial load   │
│  No cookies, no tracking, no analytics   │
│  No personal data transmitted anywhere   │
└──────────────────────────────────────────┘
```

**Recommended Tech Stack for POC:**

| Layer | Technology | Rationale |
|---|---|---|
| **Structure** | HTML5 | Semantic, accessible |
| **Styling** | Tailwind CSS (CDN) | Utility-first, responsive, no build step |
| **Logic** | Vanilla JavaScript (ES6+) | No framework dependency, lightweight |
| **Data** | localStorage | Persistent, offline, no server |
| **Export** | JSON download + browser print | No API needed |
| **Hosting** | Any static host (GitHub Pages, Netlify, or local file) | Zero cost |

**File Structure (POC):**

```
amliq/
├── index.html          (single page with all sections)
├── css/
│   └── custom.css      (custom styles beyond Tailwind)
├── js/
│   ├── app.js          (navigation, routing, state management)
│   ├── forms.js        (form handling, validation, localStorage)
│   ├── quiz.js         (quiz logic and scoring)
│   ├── risk.js         (risk assessment wizard logic)
│   ├── timeline.js     (countdown timer and timeline)
│   └── export.js       (JSON export/import, print)
├── data/
│   ├── glossary.json   (jargon buster terms)
│   ├── faq.json        (FAQ content)
│   ├── redflags.json   (red flag cards content)
│   └── quiz.json       (quiz questions and answers)
├── CONCEPT.md          (this document)
└── README.md           (setup instructions)
```

---

## 10. Content Sourcing Rules

To avoid legal risk, all content MUST adhere to these rules:

1. **Only use publicly available AUSTRAC publications** — starter kits, fact sheets, guidance, the AML/CTF Act, and the AML/CTF Rules 2025
2. **Never paraphrase the law** in a way that could be interpreted as legal advice
3. **Always use hedging language** — "you may need to", "consider whether", "AUSTRAC guidance suggests", "according to AUSTRAC"
4. **Never say "you must" as our own assertion** — instead say "AUSTRAC requires reporting entities to..." or "Under the AML/CTF Act, reporting entities are required to..."
5. **Cite sources** — link to the original AUSTRAC page wherever possible
6. **Never collect or process real customer data** — the tool provides template forms for guidance; users fill them in locally
7. **Clearly distinguish the tool from AUSTRAC's starter kit** — the tool complements, not replaces, the official starter kit
8. **Include "last reviewed" dates** on all content sections
9. **Recommend professional advice** wherever the user is making a judgment call

---

## 11. Success Metrics (POC)

| Metric | How to Assess |
|---|---|
| **Completeness** | Does the tool cover all 10 core obligations identified by AUSTRAC? |
| **Alignment** | Does the structure match AUSTRAC's Customise → Implement → Maintain approach? |
| **Accuracy** | Does all content align with current AUSTRAC guidance (as of Feb 2026)? |
| **Clarity** | Can a non-expert complete the risk assessment and CDD forms without external help? |
| **Usability** | Is the UI intuitive on both desktop and mobile? |
| **Form Coverage** | Are all 23 template forms functional and printable? |
| **Quiz Quality** | Do the 15 quiz questions accurately test understanding of key obligations? |
| **Safety** | Does the disclaimer adequately protect the creator from legal liability? |

---

## 12. Future Enhancements (Post-POC)

| Enhancement | Complexity | Value |
|---|---|---|
| PDF export of completed AML/CTF program | Medium | High |
| Multi-agency support (separate localStorage namespaces) | Low | Medium |
| FATF list auto-update (periodic JSON fetch) | Low | Medium |
| Email/calendar reminders for key dates | High (needs backend) | Medium |
| Integration with AUSTRAC Online | High (needs API) | High |
| AI-powered Q&A chatbot | High (needs API) | High |
| Sector expansion (lawyers, accountants, jewellers) | Medium | High |
| Compliance dashboard for multi-office agencies | High | Medium |
| Digital ID verification integration | High (needs API) | High |
| Audit trail / version history for form entries | Medium | Medium |

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Content interpreted as legal advice | Legal liability for creator | Strong disclaimers on every page; hedging language; cite AUSTRAC sources; recommend professional advice |
| AUSTRAC guidance changes after launch | Outdated content leads to non-compliance | Version-stamp all content with "last reviewed" dates; link to source documents; monitor AUSTRAC updates |
| Users rely solely on this tool | Non-compliance if tool is incomplete or outdated | Repeatedly state tool is a complement to the AUSTRAC starter kit, not a replacement; recommend professional advice |
| localStorage cleared accidentally | Lost progress and records | Offer "Export All Data" as JSON download; encourage regular backups; display warning on data section |
| Accessibility issues | Exclusion of users with disabilities | Follow WCAG 2.1 AA guidelines; test with screen readers; ensure keyboard navigation |
| Browser compatibility | Tool doesn't work for some users | Test across Chrome, Firefox, Edge, Safari; use standard APIs only |
| Tool confused with official AUSTRAC product | Misleading users; potential regulatory issue | Clear branding as independent tool; explicit statement that this is not an AUSTRAC product |

---

*Document version: 3.0*  
*Created: 22 February 2026*  
*Updated: 22 February 2026*  
*Project: T2C — AML/CTF Compliance Guide for Real Estate Agents*  
*Source: AUSTRAC Real Estate Guidance, Starter Kit, Reform Documentation, and austrac.gov.au sector-specific guidance pages*  
*AUSTRAC cross-reference review: 22 February 2026 — verified against all published AUSTRAC real estate starter kit pages*
