# AUSTRAC Jewellers Source Documents

**Source:** https://www.austrac.gov.au/reforms/sector-specific-guidance/dealers-precious-metals-stones-and-products-guidance
**Downloaded:** 2026-02-25
**Version:** January 2026

## Purpose

These are the official AUSTRAC starter kit documents for the jewellers (dealers in precious metals, stones, and products) sector.
T2C's jewellers dashboard (`app-jewellers.js`, `data-jewellers.js`, `forms-jewellers.js`) is built from this content.
When AUSTRAC publishes updated versions, compare against these files to identify what changed.

## Folder Structure

```
jewellers/
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

  customer-forms/            # CDD, onboarding, monitoring forms (9 files)
    Onboarding form          - Individual or sole trader
    Initial CDD form         - Individual or sole trader
    Enhanced CDD form
    Unusual activity report (info + review)
    Escalation form + register
    Periodic review and update form
    Trigger event review and update form

  maintain-program-forms/    # Program review and evaluation forms (10 files)
    Maintain your AML/CTF program form
    Independent evaluation response form
    SMR effectiveness check
    Compliance officer effectiveness check
    Customer onboarding effectiveness check
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
    examples-dealing-customers.html
```

## T2C File Mapping

| AUSTRAC Source | T2C File(s) | Content Type |
|---|---|---|
| Risk assessment.docx | `js/data-jewellers.js` → riskIndicators, riskAssessmentQuestions | Risk factors, red flags |
| Policy document.docx | `js/data-jewellers.js` → glossary, obligations | Definitions, obligations |
| Process document.docx | `js/data-jewellers.js` → cddSteps, monitoringChecklist | CDD procedures, monitoring |
| Customer forms (all) | `js/forms-jewellers.js` → form render methods | Form fields, labels, options |
| Personnel forms (all) | `js/forms-jewellers.js` → governance forms | Governance form fields |
| Maintain program forms | `js/forms-jewellers.js` → evaluation forms | Review/evaluation forms |
| Web pages (guidance text) | `js/data-jewellers.js` → section descriptions, tooltips | Guidance text, explanations |

## Note: Fewer Customer Forms

Jewellers have fewer customer entity types than real estate or accountants.
AUSTRAC only provides onboarding/CDD forms for individuals/sole traders (not for body corporates, trusts, or government bodies), reflecting the simpler customer base typical of jewellery businesses.

## How to Update

1. Visit the [AUSTRAC Document Library](https://www.austrac.gov.au/reforms/program-starter-kits/dealers-precious-metals-stones-and-products-guidance/jeweller-program-starter-kit/jeweller-program-starter-kit-document-library)
2. Download updated .docx files (check the date in filenames)
3. Compare against existing files in this folder
4. Update the corresponding T2C code files
5. Replace the old .docx files with the new versions
6. Update the "Downloaded" date at the top of this file

## Total: 28 .docx files + 8 web page snapshots
