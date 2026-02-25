# AUSTRAC Real Estate Source Documents

**Source:** https://www.austrac.gov.au/reforms/sector-specific-guidance/real-estate-guidance
**Downloaded:** 2026-02-25
**Version:** January 2026

## Purpose

These are the official AUSTRAC starter kit documents for the real estate sector.
T2C's real estate dashboard (`app.js`, `data.js`, `forms.js`) is built from this content.
When AUSTRAC publishes updated versions, compare against these files to identify what changed.

## Folder Structure

```
real-estate/
  program-core/           # Core program documents (4 files)
    Customise guide       - How to set up the AML/CTF program
    Risk assessment       - Risk assessment methodology and template
    Policy document       - AML/CTF policy template
    Process document      - Operational processes and procedures

  personnel-forms/        # Staff/governance forms (5 files)
    AML_CTF roles form
    Assign responsibilities form
    Personnel due diligence form
    Personnel due diligence for compliance officer form
    Personnel due diligence (CO = governing body) form

  customer-forms/         # CDD, onboarding, monitoring forms (16 files)
    Onboarding forms      - Individual, Body corporate, Trust, Government body
    Initial CDD forms     - Individual, Body corporate, Trust, Government body
    Enhanced CDD form
    Request to verify information
    Unusual activity report (info + review)
    Escalation form + register
    Periodic review and update form
    Trigger event review and update form

  maintain-program-forms/ # Program review and evaluation forms (9 files)
    Maintain your AML/CTF program form
    Independent evaluation response form
    SMR effectiveness check
    Compliance officer effectiveness check
    Customer onboarding effectiveness check
    Enhanced CDD effectiveness check
    TTR effectiveness check
    Periodic effectiveness testing summary
    Annual report to governing body

  web-pages/              # HTML snapshots of AUSTRAC guidance pages (8 files)
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
| Risk assessment.docx | `js/data.js` → riskIndicators, riskAssessmentQuestions | Risk factors, red flags |
| Policy document.docx | `js/data.js` → glossary, obligations | Definitions, obligations |
| Process document.docx | `js/data.js` → cddSteps, monitoringChecklist | CDD procedures, monitoring |
| Customer forms (all) | `js/forms.js` → form render methods | Form fields, labels, options |
| Personnel forms (all) | `js/forms.js` → governance forms | Governance form fields |
| Maintain program forms | `js/forms.js` → evaluation forms | Review/evaluation forms |
| Web pages (guidance text) | `js/data.js` → section descriptions, tooltips | Guidance text, explanations |

## How to Update

1. Visit the [AUSTRAC Document Library](https://www.austrac.gov.au/reforms/program-starter-kits/real-estate-guidance/real-estate-program-starter-kit/real-estate-program-starter-kit-document-library)
2. Download updated .docx files (check the date in filenames)
3. Compare against existing files in this folder
4. Update the corresponding T2C code files
5. Replace the old .docx files with the new versions
6. Update the "Downloaded" date at the top of this file

## Total: 34 .docx files + 8 web page snapshots
