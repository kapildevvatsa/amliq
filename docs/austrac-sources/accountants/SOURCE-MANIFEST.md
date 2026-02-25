# AUSTRAC Accountants Source Documents

**Source:** https://www.austrac.gov.au/reforms/sector-specific-guidance/accountant-guidance
**Downloaded:** 2026-02-25
**Version:** January 2026

## Purpose

These are the official AUSTRAC starter kit documents for the accountants sector.
T2C's accountants dashboard (`app-accountants.js`, `data-accountants.js`, `forms-accountants.js`) is built from this content.
When AUSTRAC publishes updated versions, compare against these files to identify what changed.

## Folder Structure

```
accountants/
  program-core/              # Core program documents (4 files)
    Customise guide          - How to set up the AML/CTF program
    Risk assessment          - Risk assessment methodology and template
    Policy document          - AML/CTF policy template
    Process document         - Operational processes and procedures

  personnel-forms/           # Staff/governance forms (5 files)
    AMLCTF roles form
    Assign responsibilities form
    Personnel due diligence form
    Personnel due diligence for compliance officer form
    Personnel due diligence (CO = governing body) form

  customer-forms/            # CDD, onboarding, monitoring forms (14 files)
    Onboarding forms         - Individual, Body corporate, Trust, Government body
    Initial CDD forms        - Individual, Body corporate, Trust, Government body
    Enhanced CDD form
    Unusual activity report review form
    Escalation form + register
    Periodic review and update form
    Trigger event review and update form

  maintain-program-forms/    # Program review and evaluation forms (10 files)
    Maintain your AML/CTF program form
    Independent evaluation response form
    SMR effectiveness check
    Compliance officer effectiveness check
    Client onboarding effectiveness check
    Enhanced CDD effectiveness check
    TTR effectiveness check
    CBM reporting effectiveness check
    Periodic effectiveness testing summary
    Annual report to governing body

  web-pages/                 # HTML snapshots of AUSTRAC guidance pages (8 files)
    guidance-overview.html
    starter-kit-overview.html
    getting-started.html
    step-1-customise.html
    step-2-use-program.html
    step-3-maintain-review.html
    document-library.html
    examples-dealing-clients.html
```

## T2C File Mapping

| AUSTRAC Source | T2C File(s) | Content Type |
|---|---|---|
| Risk assessment.docx | `js/data-accountants.js` → riskIndicators, riskAssessmentQuestions | Risk factors, red flags |
| Policy document.docx | `js/data-accountants.js` → glossary, obligations | Definitions, obligations |
| Process document.docx | `js/data-accountants.js` → cddSteps, monitoringChecklist | CDD procedures, monitoring |
| Customer forms (all) | `js/forms-accountants.js` → form render methods | Form fields, labels, options |
| Personnel forms (all) | `js/forms-accountants.js` → governance forms | Governance form fields |
| Maintain program forms | `js/forms-accountants.js` → evaluation forms | Review/evaluation forms |
| Web pages (guidance text) | `js/data-accountants.js` → section descriptions, tooltips | Guidance text, explanations |

## How to Update

1. Visit the [AUSTRAC Document Library](https://www.austrac.gov.au/reforms/program-starter-kits/accountant-guidance/accounting-program-starter-kit/accounting-program-starter-kit-document-library)
2. Download updated .docx files (check the date in filenames)
3. Compare against existing files in this folder
4. Update the corresponding T2C code files
5. Replace the old .docx files with the new versions
6. Update the "Downloaded" date at the top of this file

## Total: 33 .docx files + 8 web page snapshots
